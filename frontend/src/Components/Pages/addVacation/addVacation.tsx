import { useNavigate } from "react-router-dom";
import "./addVacation.css";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Vacation } from "../../Models/vacations";
import axios from "axios";
import notify from "../../Utils/Notify";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";


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
  const today = new Date().toISOString().split('T')[0];
  console.log(today) 

// Separate file change handler function
const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    setSelectedFile(file); // Save the selected file in the component state
  }
};
  const onSubmit = async (data: Vacation) => {
    //validation 
    //event.preventDefault();
    // Generate a UUID filename only if a file was selected
    if (selectedFile) {
      const uniqueFileName = uuidv4() + ".jpg"; // Generate a unique filename
      data.image_filename = `vacation_images/${uniqueFileName}`;

      // Here, you would manually move the file to the public/vacation_images/ folder
      // with the generated name. This is a manual step you'd perform in your development environment.
    }
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/vacations/add",
        data
      );
      console.log("Vacation added:", response.data);
      notify.success("Vacation added successfully");
      reset();
      // navigate("/adminPage");
    } catch (error: any) {
      console.error("Error adding vacation:", error);
    }
  };

  const handleCancel = () => {
    navigate("/adminPage"); // Navigate back to the admin page or wherever appropriate
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
                  new Date(value) >= new Date(today) || "End date must be today or in the future" &&
                  new Date(value) >= new Date(context.start_date) || "End date must be after start date",
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
        {/*   <TextField
            {...register("image_filename", {
              required: "Image Filename is required",
              minLength: {
                value: 4,
                message: "Image Filename must be at least 4 characters long",
              },
            })}
            margin="normal"
            label="Image Filename"
            type="text"
            fullWidth
            variant="outlined"
            error={!!errors.image_filename}
            helperText={
              errors.image_filename ? errors.image_filename.message : ""
            }
          /> */}
            <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Use the separate file change handler
            className="fileInput"
          />
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
