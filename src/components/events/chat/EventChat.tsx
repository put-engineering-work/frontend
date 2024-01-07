import { useEffect, useState, useCallback } from "react";
import { getToken } from "../../../utils/getToken";
import { Client } from "@stomp/stompjs";
import { useLocation } from "react-router-dom";
import {
  Box,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useTranslation } from "react-i18next";
import { smallScrollbarStyle } from "../../../constants/styles/scroll";

import { useTheme } from "@mui/material/styles";

const EventChat = () => {
  const theme = useTheme();
  const {
    state: { eventId, eventName },
  } = useLocation();
  const { t } = useTranslation();

  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: `ws://localhost:8085/chat?token=${getToken()}`,
      onConnect: () => {
        console.log("Connected!");
        // Подписка на получение истории сообщений
        client.publish({
          destination: `/app/history/${eventId}`,
        });

        client.subscribe(`/topic/history/${eventId}`, (historyMessage) => {
          const messages = JSON.parse(historyMessage.body);
          console.log("History message:", messages);

          setMessages(messages);
        });

        // Подписка на получение текущих сообщений
        client.subscribe(`/topic/messages/${eventId}`, (currentMessage) => {
          const messages = JSON.parse(currentMessage.body);
          console.log("Current message:", messages);
          setMessages((prevMessages: any) => [
            ...prevMessages,
            JSON.parse(currentMessage.body),
          ]);
        });
      },
      onDisconnect: () => {
        console.log("Disconnected");
        setStompClient(null);
      },
    });

    client.activate();

    setStompClient(client);

    return () => {
      if (client) {
        client.deactivate();
        setStompClient(null);
      }
    };
  }, [eventId]);

  const sendMessage = () => {
    if (stompClient) {
      const messageTest = {
        message: newMessage,
      };

      stompClient.publish({
        destination: `/app/send/${eventId}`,
        body: JSON.stringify(messageTest),
      });

      // Clear the input field after sending the message
      setNewMessage("");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: 2,
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
          mt: 2,
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" gutterBottom>
            {`${eventName} ${t("chat.room")}`}
          </Typography>
          <List
            sx={{
              maxHeight: "75vh",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              ...smallScrollbarStyle,
            }}
          >
            {messages.map((item: any, index: any) => (
              <ListItem
                key={index}
                sx={{
                  py: 0,
                  pt: 1,
                  justifyContent: "flex-end",
                }}
              >
                <Typography
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 1,
                    padding: "8px 35px",
                    fontSize: 15,
                    bgcolor: "primary.main",
                  }}
                >
                  {item.message}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            mt: 2,
          }}
        >
          <TextField
            label={t("chat.write")}
            variant="outlined"
            autoComplete="off"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <IconButton
            onClick={sendMessage}
            disabled={!stompClient && !newMessage}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default EventChat;
