import { Avatar, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const CommentCard = ({
  name,
  lastName,
  role,
  image,
  numberOfComments,
}: {
  name: string;
  lastName: string;
  role: string;
  image?: string;
  numberOfComments?: number;
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
          width: "15%",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            alignSelf: "flex-start",
            fontSize: 13,
            color: "text.secondary",
          }}
        >
          {t(`event.roles.${role}`)}:
        </Typography>
        <Avatar sx={{ width: 100, height: 100, mb: 1 }} src={image} alt="image">
          {numberOfComments}
        </Avatar>
        <Typography sx={{ fontSize: 20 }}>{`${name} ${lastName}`}</Typography>
      </Box>
      <Box sx={{ width: "80%", borderLeft: "1px solid", paddingLeft: 2 }}>
        <Typography
          sx={{
            alignSelf: "flex-start",
            fontSize: 13,
            color: "text.secondary",
          }}
        >
          {t(`event.comment`)}:
        </Typography>
        <Typography sx={{ fontSize: 20 }}>{`${name} ${lastName}`}</Typography>
      </Box>
    </Box>
  );
};

export default CommentCard;
