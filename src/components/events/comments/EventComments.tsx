import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import CommentCard from "./CommentCard";
import UserImage from "../../../assets/userImage.png";

interface EventDetailsMembers {
  host: Host;
  members: Member[];
}

const EventDetailsMembers = ({ host, members }: EventDetailsMembers) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 10 }}>
      <Typography variant="h6">{t("event.comments")}</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: 2,
          overflow: "auto",
          width: "100%",
        }}
      >
        <CommentCard
          key={host.id}
          name={host.name}
          lastName={host.lastname}
          image={UserImage}
          role={"ROLE_HOST"}
        />
        {members &&
          members
            .slice(0, 4)
            .map((member) => (
              <CommentCard
                key={member.id}
                name={member.name}
                lastName={member.lastName}
                image={UserImage}
                role={member.type}
              />
            ))}
        {members && members.length > 4 && (
          <CommentCard
            key="and"
            name={t("event.more_guests")}
            lastName=""
            role="And"
            numberOfComments={members.length - 4}
          />
        )}
      </Box>
    </Box>
  );
};

export default EventDetailsMembers;
