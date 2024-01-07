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

const EventChat = () => {
  let location = useLocation();
  const { t } = useTranslation();

  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [stompClient, setStompClient] = useState<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: `ws://localhost:8085/chat?token=${getToken()}`,
      onConnect: () => {
        console.log("Connected!");
        // Подписка на получение сообщений
        client.subscribe(
          `/topic/messages/${location.state.eventId}`,
          (message) => {
            // Обработка полученного сообщения
            console.log(message.body);
            setMessages((prevMessages: any) => [...prevMessages, message.body]);
          }
        );
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
  }, [location.state.eventId]);

  const sendMessage = () => {
    if (stompClient) {
      const messageTest = {
        message: newMessage,
      };

      stompClient.publish({
        destination: `/app/send/${location.state.eventId}`,
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
          height: "89vh",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" gutterBottom>
            {`${location.state.eventName} ${t("chat.room")}`}
          </Typography>
          <List style={{ maxHeight: "300px", overflowY: "auto" }}>
            {messages.map((message: any, index: number) => (
              <ListItem
                key={index}
                style={{
                  marginBottom: "10px",
                  padding: "15px",
                  border: "1px solid #ddd",
                }}
              >
                {message}
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
            label="Type your message"
            variant="outlined"
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
