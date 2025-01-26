import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Paper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await login("admin@123.com", "admin@123");
    } catch (error) {
      alert(error.message);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (!user) return;
    navigate("/students");
  }, [user]);

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
          Student CRM
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
        <form onSubmit={handleSubmit}>
          <TextField
            id="username"
            label="Email"
            variant="standard"
            placeholder="Enter Your Email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginTop: 2 }}
          />
          <TextField
            id="password"
            label="Password"
            variant="standard"
            placeholder="Enter Your Password"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      </Paper>
    </Box>
  );
};

export default Login;
