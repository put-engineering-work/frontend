import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const AddEventForm: React.FC = () => {
  const [formData, setFormData] = useState({
    address: "",
    description: "",
    endDate: "",
    latitude: 0,
    longitude: 0,
    name: "",
    startDate: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь вы можете добавить логику для обработки данных формы
    console.log("Submitted data:", formData);
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Add Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="datetime-local"
          value={formData.startDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="datetime-local"
          value={formData.endDate}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Latitude"
          name="latitude"
          type="number"
          value={formData.latitude}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Longitude"
          name="longitude"
          type="number"
          value={formData.longitude}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Add Event
        </Button>
      </form>
    </Box>
  );
};

export default AddEventForm;
