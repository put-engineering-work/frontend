import { useEffect, useState, useCallback } from "react";
import { getToken } from "../../../utils/getToken";
import { Client } from "@stomp/stompjs";
import { useLocation } from "react-router-dom";
import {
  Avatar,
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

import AvatarImage from "../../../assets/userImage.png";
import { getFormatedDate } from "../../../utils/utlits";
import { getDataJson } from "../../../utils/fetchData";

const EventChat = () => {
  const {
    state: { eventId, eventName },
  } = useLocation();
  const { t } = useTranslation();

  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>("");

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    console.log(currentUserId);
  }, [currentUserId]);

  const getCurrentUserId = async () => {
    const result = await getDataJson("user/user-id");
    setCurrentUserId(result.id);
  };

  useEffect(() => {
    getCurrentUserId();

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
                  justifyContent:
                    item.sender.senderId === currentUserId
                      ? "flex-end"
                      : "flex-start",
                  alignItems: "flex-end",
                }}
              >
                {item.sender.senderId !== currentUserId && (
                  <Avatar
                    sx={{ width: 40, height: 40, marginRight: 1 }}
                    src={AvatarImage}
                    alt="image"
                  />
                )}

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    mr: 1,
                  }}
                >
                  {item.sender.senderId !== currentUserId && (
                    <Typography fontSize={10}>
                      {item.sender.name} {item.sender.lastname}
                    </Typography>
                  )}

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      gap: 3,
                      alignItems: "flex-end",
                      justifyContent: "flex-end",
                      borderRadius: 1,
                      bgcolor: "primary.main",
                      padding: "6px 10px",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: 15,
                      }}
                    >
                      {item.message}
                    </Typography>
                    <Typography fontSize={10}>
                      {getFormatedDate(item.createdDate)}
                    </Typography>
                  </Box>
                </Box>
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
