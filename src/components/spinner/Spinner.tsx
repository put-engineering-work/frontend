import { Modal, useTheme } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = ({ loading }: { loading: boolean }) => {
  const theme = useTheme();

  return (
    <>
      {loading && (
        <Modal open={true}>
          <div>
            <ClipLoader
              color={theme.palette.text.primary}
              loading={loading}
              cssOverride={{
                display: "block",
                margin: "0 auto",
                zIndex: 2000,
                position: "absolute",
                top: "50%",
                left: "50%",
              }}
              size={35}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Spinner;
