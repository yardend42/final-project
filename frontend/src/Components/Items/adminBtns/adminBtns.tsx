import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import "./adminBtns.css";
import { Vacation } from "../../Models/vacations";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useState } from "react";
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

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm<Vacation>({
    defaultValues: vacation,
  });

  //edit btn&modal
  const handleEdit = () => {
    setEditOpen(true);
    reset(vacation); // Reset the form with current vacation data
  };

  const handleUpdate = async (data: Vacation) => {
    try {
      await axios.put(
        `http://localhost:8080/api/v1/vacations/edit/${data.vacation_id}`,
        data
      );
      console.log("Updated vacation:", data);
      setEditOpen(false);
      onEdit?.(); // Refresh the vacation list after update
    } catch (error: any) {
      console.log(error);
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
      console.log("Delete vacation:", vacation);
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
            <TextField
              {...register("image_filename")}
              margin="dense"
              label="Image Filename"
              type="text"
              fullWidth
              error={!!errors.image_filename}
              helperText={
                errors.image_filename ? errors.image_filename.message : ""
              }
            />
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
