import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CommentCard from "./CommentCard";
import AddCommentForm from "./AddCommentForm";
interface EventDetailsMembers {
  comments: Comment[];
  eventId: any;
}

const EventDetailsMembers = ({ comments, eventId }: EventDetailsMembers) => {
  const { t } = useTranslation();
  const handleCommentSubmit = () => {
    // Handle any necessary actions after submitting a comment
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 10 }}>
      <AddCommentForm eventId={eventId} onCommentSubmit={handleCommentSubmit} />
      <Typography variant="h6">{t("event.comments")}</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 2,
          overflow: "auto",
          width: "100%",
          paddingInline: 2,
        }}
      >
        {comments &&
          comments
            .slice(0, 4)
            .map((comment) => (
              <CommentCard
                key={comment.id}
                content={comment.content}
                grade={comment.grade}
                commentDate={comment.commentDate}
              />
            ))}
        {comments && comments.length > 10 && (
          <CommentCard
            key="and"
            content={t("event.more_guests")}
            grade={NaN}
            commentDate={"2024-12-02T18:00:00+01:00"}
            // numberOfComments={comments.length - 10}
          />
        )}
      </Box>
    </Box>
  );
};

export default EventDetailsMembers;
