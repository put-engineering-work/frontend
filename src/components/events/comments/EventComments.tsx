import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CommentCard from "./CommentCard";
import AddCommentForm from "./AddCommentForm";
import { getToken } from "../../../utils/getToken";
import { useNavigate } from "react-router";
interface EventDetailsMembers {
  comments: Comment[];
  eventId: any;
  onCommentSubmit: () => void;
}

const EventDetailsMembers = ({
  comments,
  eventId,
  onCommentSubmit,
}: EventDetailsMembers) => {
  const { t } = useTranslation();
  const handleCommentSubmit = () => {
    onCommentSubmit();
  };
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 10 }}>
      {getToken() ? (
        <AddCommentForm
          eventId={eventId}
          onCommentSubmit={handleCommentSubmit}
        />
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#fff",
            backgroundColor: "#42A5F5",
            borderRadius: "13px",
            mr: 2,
            minWidth: 100,
          }}
          onClick={() => {
            {
              navigate("/login");
            }
          }}
        >
          {t("event.comments.login")}
        </Button>
      )}
      <Typography variant="h6">{t("event.comments.comments")}</Typography>
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
            content={t("event.comments.more_guests")}
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
