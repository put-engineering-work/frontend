import { Modal, useTheme } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = ({ loading }: { loading: boolean }) => {
  const theme = useTheme();
  return (
    <ClipLoader
      color={theme.palette.primary.main}
      loading={loading}
      cssOverride={{
        display: "block",
        margin: "0 auto",
        zIndex: 2000,
      }}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Loader;
