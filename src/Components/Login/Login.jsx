import * as React from "react";
import {
  Avatar,
  Button,
  Link,
  TextField,
  Typography,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity";

import { signInWithEmailAndPassword } from "firebase/auth";
import useForm from "../../hooks/useForm";
import { auth } from "../../firebase";

const validate = (name, value) => {
  switch (name) {
    case "email":
      if (!value) return "Email is required";
      if (!/\S+@\S+\.\S+/.test(value)) return "Invalid email format";
      break;
    case "password":
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      break;
    default:
      break;
  }
  return "";
};

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "19px auto",
    backgroundColor: "#E6F4F1",
    borderRadius: "12px",
    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.25)",
  };
  const avatarStyle = { backgroundColor: "#D9D9D9" };
  const btnstyle = { backgroundColor: "#1B6DA1", margin: "12px 0" };
  const logoStyle = {
    backgroundColor: "#D9D9D9",
    margin: "10px 0",
    width: 70,
    height: 70,
  };

  const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    validate
  );

  const onSubmit = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
    } catch (error) {
      alert(error.message); 
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar style={logoStyle}>
          <LocationCityIcon
            style={{ color: "#002A57", width: 56, height: 56 }}
          />
        </Avatar>
        <Typography variant="h5" sx={{ marginTop: 1, fontWeight: "bold" }}>
          Company Name
        </Typography>
      </Box>

      <Paper elevation={12} style={paperStyle}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon style={{ color: "#002A57" }} />
          </Avatar>
          <Typography variant="h6" sx={{ marginTop: 1 }}>
            Login
          </Typography>
        </Box>
        <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
          <TextField
            id="username"
            name="email"
            label="Email"
            variant="standard"
            placeholder="Enter Your Username"
            fullWidth
            required
            value={values.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ marginTop: 2 }}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="standard"
            placeholder="Enter Your Password"
            type="password"
            fullWidth
            required
            value={values.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ marginTop: 2 }}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember Me"
            sx={{ marginTop: 2 }}
          />
          <Button
            style={btnstyle}
            type="submit"
            color="primary"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            sx={{ marginTop: 2 }}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <Typography sx={{ marginTop: 2 }}>
          <Link href="#">Forgot Password?</Link>
        </Typography>
        <Typography sx={{ marginTop: 1 }}>
          Don't have an account? <Link href="#">Sign Up Here.</Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
