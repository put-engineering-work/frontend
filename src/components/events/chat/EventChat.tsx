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

const EventChat = () => {
  let location = useLocation();

  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  console.log(1);

  const stompClient = new Client({
    brokerURL: `ws://localhost:8085/chat?token=${getToken()}`,
    onConnect: () => {
      console.log("Connected!");
      // Подписка на получение сообщений
      stompClient.subscribe(
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
    },
  });

  const sendMessage = useCallback(() => {
    const messageTest = {
      message: newMessage,
    };

    stompClient.publish({
      destination: `/app/send/${location.state.eventId}`,
      body: JSON.stringify(messageTest),
    });

    // Clear the input field after sending the message
    setNewMessage("");
  }, [stompClient, location.state.eventId]);

  useEffect(() => {
    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [stompClient]);

  return (
    <Box sx={{ height: "100%" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          p: 2,
          mt: 2,
          width: 800,
          height: "80vh",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" gutterBottom>
            Chat Room
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
            justifyContent: "space-between",
            gap: 4,
            mt: 2,
          }}
        >
          <TextField
            sx={{ mb: 2 }}
            label="Type your message"
            variant="outlined"
            fullWidth
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <IconButton onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default EventChat;
