import { useNavigate } from "react-router-dom";
import "./addVacation.css";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { Vacation } from "../../Models/vacations";
import axios from "axios";
import notify from "../../Utils/Notify";
import { ChangeEvent, useState } from "react";

function AddVacation(): JSX.Element {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Vacation>({
    defaultValues: {
      destination: "",
      description: "",
      price: 0,
      start_date: new Date(),
      end_date: new Date(),
      image_filename: "",
    },
  });
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Separate file change handler function
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmit = async (data: Vacation) => {
    const formData = new FormData();
    formData.append("destination", data.destination);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("start_date", data.start_date.toString());
    formData.append("end_date", data.end_date.toString());
    if (selectedFile) {
      formData.append("image", selectedFile); // Append the file to the form data
    }
    //post new vacation
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/vacations/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the content type is set to multipart/form-data
          },
        }
      );
      notify.success("Vacation added successfully");
      reset();
    } catch (error: any) {
      console.error("Error adding vacation:", error);
    }
  };

  const handleCancel = () => {
    navigate("/adminPage");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          textAlign: "center",
          backgroundColor: "white",
          padding: 6,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add Vacation
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            {...register("destination", {
              required: "Destination is required",
              minLength: {
                value: 2,
                message: "Destination must be at least 2 characters long",
              },
            })}
            autoFocus
            margin="normal"
            label="Destination"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.destination}
            helperText={errors.destination ? errors.destination.message : ""}
          />
          <TextField
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 4,
                message: "Description must be at least 4 characters long",
              },
            })}
            margin="normal"
            label="Description"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ""}
          />
          <TextField
            {...register("price", {
              required: "Price is required",
              min: {
                value: 0,
                message: "Price must be at least 0",
              },
              max: {
                value: 10000,
                message: "Price must be at most 10000",
              },
            })}
            margin="normal"
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            error={!!errors.price}
            helperText={errors.price ? errors.price.message : ""}
          />
          <TextField
            {...register("start_date", {
              required: "Start Date is required",
              validate: (value) =>
                new Date(value) >= new Date(today) ||
                "Start date must be today or in the future",
            })}
            margin="normal"
            label="Start Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.start_date}
            helperText={errors.start_date ? errors.start_date.message : ""}
          />
          <TextField
            {...register("end_date", {
              required: "End date is required",
              validate: (value, context) =>
                new Date(value) >= new Date(today) ||
                ("End date must be today or in the future" &&
                  new Date(value) >= new Date(context.start_date)) ||
                "End date must be after start date",
            })}
            margin="normal"
            label="End Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            error={!!errors.end_date}
            helperText={errors.end_date ? errors.end_date.message : ""}
          />

          <Box
            sx={{
              border: "2px dashed #ccc",
              borderRadius: "4px",
              padding: "16px",
              textAlign: "center",
              cursor: "pointer",
              marginBottom: 2,
              position: "relative", // Ensure relative positioning
            }}
          >
            <input
              {...register("image_filename", { required: "Image is required" })}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="fileInput"
              style={{
                width: "100%",
                height: "100%",
                opacity: 0,
                position: "absolute",
                top: 0,
                left: 0,
                cursor: "pointer",
              }}
            />
            <Typography variant="body2">
              {selectedFile
                ? `Selected file: ${selectedFile.name}`
                : "Drag and drop an image here, or click to select"}
            </Typography>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleCancel}
              sx={{ marginBottom: 2 }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Vacation
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AddVacation;
