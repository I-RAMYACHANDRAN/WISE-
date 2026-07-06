import { useState } from "react";

import {
  Typography,
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  Link,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";

import { Email, Lock } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import AuthCard from "./AuthCard";

import { login } from "../services/authService";

function LoginForm() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [role, setRole] = useState("attendee");

  const handleLogin = async () => {

    if (!email || !password) {

      alert("Please enter email and password.");

      return;

    }

    try {

      const response = await login({

        email,

        password,

        role,

      });

      const user = response.user;

if (user.role === "organizer") {

  localStorage.setItem(
    "organizerUser",
    JSON.stringify(user)
  );

  navigate("/admin");

} else {

  localStorage.setItem(
    "attendeeUser",
    JSON.stringify(user)
  );

  navigate("/dashboard");

}

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Login failed."
      );

    }

  };

  return (

    <AuthCard
      elevation={10}
      sx={{
        width: 430,
        p: 5,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
      }}
    >

      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        Sign In
      </Typography>

      <Typography
        align="center"
        color="text.secondary"
        mb={4}
      >
        Sign in to continue your conference journey.
      </Typography>

      <Stack spacing={3}>

        <TextField
          label="Email Address"
          fullWidth
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />

        <FormControl>

          <FormLabel>

            Login As

          </FormLabel>

          <RadioGroup
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >

            <FormControlLabel
              value="attendee"
              control={<Radio />}
              label="Attendee"
            />

            <FormControlLabel
              value="organizer"
              control={<Radio />}
              label="Conference Organizer"
            />

          </RadioGroup>

        </FormControl>

        <FormControlLabel
          control={<Checkbox />}
          label="Remember Me"
        />

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleLogin}
        >
          Sign In
        </Button>

        <Typography align="center">
          Don't have an account?
        </Typography>

        <Link
          component={RouterLink}
          to="/register"
          underline="hover"
          align="center"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Create Account
        </Link>

      </Stack>

    </AuthCard>

  );

}

export default LoginForm;