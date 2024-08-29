import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import "./adminBtns.css";
import { Vacation } from "../../Models/vacations";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

interface AdminBtnsProps {
  vacation: Vacation;
  onDelete?: (vacationId: number) => void;
  onEdit?: () => void;
}

function AdminBtns(props: AdminBtnsProps): JSX.Element {
  const { vacation, onDelete, onEdit } = props;
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    vacation.image_filename
      ? `http://localhost:8080/uploads/vacationImg/${vacation.image_filename}`
      : null
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<Vacation>({
    defaultValues: vacation,
  });

  // Function to format dates as YYYY-MM-DD
  function formatDateForInput(date: Date): string {
    const d = new Date(date);
    const month = ("0" + (d.getMonth() + 1)).slice(-2); // Add leading zero for month
    const day = ("0" + d.getDate()).slice(-2); // Add leading zero for day
    const year = d.getFullYear();
    return `${year}-${month}-${day}`; // Return as YYYY-MM-DD
  }

  //edit btn&modal
  const handleEdit = () => {
    setEditOpen(true);
    // Reset the form with current vacation data
    reset({
      ...vacation,
      start_date: formatDateForInput(
        new Date(vacation.start_date)
      ) as unknown as Date, // Cast to bypass type check
      end_date: formatDateForInput(
        new Date(vacation.end_date)
      ) as unknown as Date, // Cast to bypass type check
    });
  };

  const handleUpdate = async (data: Vacation) => {
    try {
      const formData = new FormData();
      // Append the form data
      formData.append("destination", data.destination);
      formData.append("description", data.description);
      formData.append("start_date", data.start_date.toString());
      formData.append("end_date", data.end_date.toString());
      formData.append("price", data.price.toString());

      // If a new image is selected, append it to the form data
      const fileInput = document.getElementById(
        "image-upload"
      ) as HTMLInputElement;
      if (fileInput.files?.[0]) {
        formData.append("image", fileInput.files[0]);
      } else {
        // If no new image is selected, append the existing image filename
        formData.append("image_filename", vacation.image_filename);
      }

      await axios.put(
        `http://localhost:8080/api/v1/vacations/edit/${data.vacation_id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setEditOpen(false);
      onEdit?.(); // Refresh the vacation list after update the . is . Optional chaining
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //delete btn&modal
  const handleDelete = async () => {
    // Implement delete vacation logic here
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/vacations/delete/${vacation.vacation_id}`
      );
      // Call the onDelete function
      onDelete?.(vacation.vacation_id);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDeleteClickOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleConfirmDelete = () => {
    handleDelete();
    handleDeleteClose();
  };

  return (
    <div className="adminBtns">
      <IconButton className="admin-btn" onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton className="admin-btn" onClick={handleDeleteClickOpen}>
        <DeleteIcon />
      </IconButton>
      {/* Delete Vacation Dialog */}
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this vacation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Vacation Dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Vacation</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleUpdate)}>
            <TextField
              {...register("destination", {
                required: "Destination is required",
                minLength: {
                  value: 2,
                  message: "Destination must be at least 2 characters long",
                },
              })}
              autoFocus
              margin="dense"
              label="Destination"
              type="text"
              fullWidth
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
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
            />
            <TextField
              {...register("start_date", {
                required: "Start Date is required",
              })}
              margin="dense"
              label="Start Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.start_date}
              helperText={errors.start_date ? errors.start_date.message : ""}
              defaultValue={formatDateForInput(new Date(vacation.start_date))} // Format for display
            />
            <TextField
              {...register("end_date", {
                required: "End date is required",
                validate: (value) => {
                  const startDate = new Date(getValues("start_date"));
                  const endDate = new Date(value);
                  return (
                    endDate >= startDate || "End date must be after start date"
                  );
                },
              })}
              margin="dense"
              label="End Date"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.end_date}
              helperText={errors.end_date ? errors.end_date.message : ""}
              defaultValue={formatDateForInput(new Date(vacation.end_date))} // Format for display
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
              margin="dense"
              label="Price"
              type="number"
              fullWidth
              error={!!errors.price}
              helperText={errors.price ? errors.price.message : ""}
            />
            <div className="image-input" style={{ textAlign: "center" }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="image-upload"
              />
              <label htmlFor="image-upload">
                {imagePreview ? (
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      component="img"
                      src={imagePreview}
                      alt="Vacation"
                      sx={{
                        width: "100%", // Full width to match the inputs
                        height: "auto", // Adjust height to maintain aspect ratio
                        objectFit: "cover",
                        borderRadius: 2,
                        boxShadow: 3,
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      color="white"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        padding: "4px 8px",
                        borderRadius: 1,
                      }}
                    >
                      Click to change
                    </Typography>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    component="span"
                    onClick={() =>
                      document.getElementById("image-upload")?.click()
                    }
                    fullWidth
                  >
                    Upload Image
                  </Button>
                )}
              </label>
            </div>
            <DialogActions>
              <Button onClick={() => setEditOpen(false)} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminBtns;
