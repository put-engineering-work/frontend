import { Avatar, Box, Rating, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getFormatedDate } from "../../../utils/utlits";
import { format } from "date-fns";

const CommentCard = ({
  content,
  grade,
  commentDate,
}: {
  content: string;
  grade: number;
  commentDate: string;
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 220,
        border: "1px solid",
        borderColor: "primary",
        borderRadius: "15px",
        gap: 2,
        py: 3,
        px: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ paddingBottom: 1 }}>
          {format(new Date(commentDate), "dd.MM.y, HH:mm")}
        </Typography>
        <Rating
          sx={{ paddingBottom: 1 }}
          name="simple-controlled"
          value={grade}
          readOnly
        />

        <Typography sx={{ fontSize: 20 }}>&emsp;{content}</Typography>
      </Box>
    </Box>
  );
};

export default CommentCard;
