import React, { useState } from "react";
import { Box, Button, TextField, Typography, Rating } from "@mui/material";
import { postFormData } from "../../../utils/fetchData";

interface CommentFormProps {
  eventId: string;
  onCommentSubmit: () => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  eventId,
  onCommentSubmit,
}) => {
  const [commentData, setCommentData] = useState({
    content: "",
    grade: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (value: number) => {
    setCommentData((prevData) => ({
      ...prevData,
      grade: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await postFormData(`/events/create/${eventId}/comment`, {
        content: commentData.content,
        grade: commentData.grade,
      });

      if (result.code === "COMMENT_CREATED") {
        onCommentSubmit();
      } else {
        console.log("Error creating comment");
      }
    } catch (error) {
      console.error("API request failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Comment"
        name="content"
        value={commentData.content}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        variant="outlined"
      />
      <Box>
        <Typography>Rating:</Typography>
        <Rating
          name="grade"
          value={commentData.grade}
          onChange={(event, newValue) => handleRatingChange(newValue as number)}
        />
      </Box>
      <Button type="submit" variant="contained" color="primary">
        Submit Comment
      </Button>
    </form>
  );
};

export default CommentForm;
