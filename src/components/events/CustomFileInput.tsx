import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface CustomFileInputProps {
  onChange: (files: FileList | null) => void;
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({ onChange }) => {
  const { t } = useTranslation();

  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setSelectedFiles(files);
    onChange && onChange(files);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        multiple
        style={{ display: "none" }}
      />
      <Button variant="outlined" component="label">
        {selectedFiles ? (
          <Typography>
            {selectedFiles.length} {selectedFiles.length > 1 ? "files" : "file"}
            {t(`event.add_event.selected`)}
          </Typography>
        ) : (
          <Typography> {t(`event.add_event.choose_files`)}</Typography>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
          style={{ display: "none" }}
        />
      </Button>
    </div>
  );
};

export default CustomFileInput;
