import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  FormControl,
} from "@mui/material";
import { postData, postFormData } from "../../../utils/fetchData";
import { useTranslation } from "react-i18next";

interface CommentFormProps {
  eventId: string;
  onCommentSubmit: () => void;
}

const AddCommentForm: React.FC<CommentFormProps> = ({
  eventId,
  onCommentSubmit,
}) => {
  const [commentData, setCommentData] = useState({
    content: "",
    grade: 0,
  });
  const { t } = useTranslation();
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

  const [errorForm, setErrorForm] = useState("");
  const validateForm = (commentData: any) => {
    if (!commentData.content) {
      setErrorForm("CONTENT_ERROR");
      return false;
    }

    if (commentData.grade < 1 || commentData.grade > 5) {
      setErrorForm("GRADE_ERROR");
      return false;
    }

    setErrorForm("");
    return true;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm(commentData)) {
      return;
    }
    try {
      const result = await postData(`events/create/${eventId}/comment`, {
        content: commentData.content,
        grade: commentData.grade,
      });

      if (result.code === "CREATED") {
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
        label={t("event.comments.comment")}
        name="content"
        value={commentData.content}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        margin="normal"
        variant="outlined"
        error={errorForm === "CONTENT_ERROR"}
        helperText={
          errorForm === "CONTENT_ERROR" && t(`event.comments.add_comment_btn`)
        }
      />
      <Box>
        <FormControl error={errorForm === "RATING_ERROR"}>
          <Typography>{t("event.comments.rating")}</Typography>
          <Rating
            name="grade"
            value={commentData.grade}
            onChange={(event, newValue) =>
              handleRatingChange(newValue as number)
            }
          />
          {errorForm === "GRADE_ERROR" && (
            <Typography color="error">
              {t("event.comments.RATING_ERROR")}
            </Typography>
          )}
        </FormControl>
      </Box>
      <Button type="submit" variant="contained" color="primary">
        {t("event.comments.add_comment_btn")}
      </Button>
    </form>
  );
};

export default AddCommentForm;
