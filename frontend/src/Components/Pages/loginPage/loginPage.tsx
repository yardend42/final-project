import { useNavigate } from "react-router-dom";
import "./loginPage.css";
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import notify from "../../Utils/Notify";
import { store } from "../../Redux/store";
import { loginAction, logoutAction } from "../../Redux/AuthReducer";

interface userCred {
  email: string;
  password: string;
}

function LoginPage(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userCred>();
  const navigate = useNavigate();

  const makeLogin: SubmitHandler<userCred> = (data) => {
    axios
      .post("http://localhost:8080/api/v1/login/loginUser", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        const result = res.data;
        const jwt = result.jwt;

        store.dispatch(logoutAction()); // Clear previous state
        store.dispatch(loginAction(res.data)); // Update with new state

        localStorage.setItem("jwt", jwt);

        notify.success("Welcome" + result.role);
        // Navigate to another page after successful login
        switch (res.data.role) {
          case "admin":
            navigate("/adminPage");
            break;
          case "user":
            navigate("/vacations");
            break;
          case "guest":
            navigate("/register");
            break;
          default:
            navigate("/");
            break;
        }
      })
      .catch((err) => {
        notify.error("user not found");
      });
  };

  return (
    <div className="loginPage">
      <Box
        sx={{
          height: "100vh",
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
            Login
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(makeLogin)}
          >
            <TextField
              autoFocus
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
              Login
            </Button>
            <Box sx={{ marginTop: 2, textAlign: "center" }}>
              <Typography variant="body2">
                Don't have an account? <br />
                <Link href="#" onClick={() => navigate("/register")}>
                  Register now
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default LoginPage;
