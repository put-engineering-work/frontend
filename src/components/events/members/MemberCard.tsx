import { Avatar, Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const MemberCard = ({
  name,
  lastName,
  role,
  image,
  numberOfMembers,
}: {
  name: string;
  lastName: string;
  role: string;
  image?: string;
  numberOfMembers?: number;
}) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        width: 220,
        height: 220,
        border: "1px solid",
        borderColor: "primary",
        borderRadius: "15px",
        flexDirection: "column",
        alignItems: "center",
        py: 3,
        px: 2,
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
      <Avatar
        sx={{ width: 100, height: 100, mr: 2, mb: 1 }}
        src={image}
        alt="image"
      >
        {numberOfMembers}
      </Avatar>
      <Typography sx={{ fontSize: 20 }}>{`${name} ${lastName}`}</Typography>
    </Box>
  );
};

export default MemberCard;
