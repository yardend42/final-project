import { useNavigate } from "react-router-dom";
import "./registerPage.css";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { UserCred } from "../../Models/UserCred";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import notify from "../../Utils/Notify";

function RegisterPage(): JSX.Element {
  console.log("register page");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCred>();

  const handleRegister: SubmitHandler<UserCred> = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/login/registerUser",
        {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          role: "user" /* hard code database to create admin */,
        }
      );
      notify.success("User registered successful");
      navigate("/vacations");
    } catch (error) {
      console.log(error);
      notify.error("User registration unsuccessful");
    }
  };

  return (
    <div className="registerPage">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
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
            Register
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleRegister)}
          >
            <TextField
              autoFocus
              margin="normal"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              {...register("first_name", {
                required: "First name is required",
                minLength: {
                  value: 2,
                  message: "First name must be at least 2 characters long",
                },
              })}
              error={!!errors.first_name}
              helperText={errors.first_name ? errors.first_name.message : ""}
            />

            <TextField
              margin="normal"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              {...register("last_name", {
                required: "Last name is required",
                minLength: {
                  value: 2,
                  message: "Last name must be at least 2 characters long",
                },
              })}
              error={!!errors.last_name}
              helperText={errors.last_name ? errors.last_name.message : ""}
            />

            <TextField
              margin="normal"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              {...register("email", {
                required: "Email is required",
                validate: {
                  validEmail: (value) =>
                    /\S+@\S+\.\S+/.test(value) ||
                    "Email must be a valid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ""}
            />

            <TextField
              margin="normal"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters long",
                },
                maxLength: {
                  value: 10,
                  message: "Password must be at most 10 characters long",
                },
              })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ""}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Register
            </Button>
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2">
                Already a member? <br />
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default RegisterPage;
