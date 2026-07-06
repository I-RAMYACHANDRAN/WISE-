import { useState } from "react";

import {
  Typography,
  TextField,
  Button,
  Stack,
  Link,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import {
  Person,
  Email,
  Phone,
  Business,
  Work,
  Lock,
} from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";

import AuthCard from "./AuthCard";

import { register } from "../services/authService";

function RegisterForm() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [company, setCompany] = useState("");

  const [designation, setDesignation] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [role, setRole] =
    useState("attendee");

  const [
    organizerAccessCode,
    setOrganizerAccessCode,
  ] = useState("");

  const handleRegister = async () => {

    if (password !== confirmPassword) {

      alert("Passwords do not match.");

      return;

    }

    try {

      await register({

        name,

        email,

        phone,

        organization: company,

        designation,

        password,

        role,

        organizerAccessCode,

      });

      alert(
        "Registration successful.\nPlease login."
      );

      navigate("/login");

    } catch (error) {

      console.error(error);

      if (error.response?.status === 409) {

        alert(
          "User already registered.\nPlease login."
        );

        navigate("/login");

      } else {

        alert(
          error.response?.data?.message ||
          "Registration failed."
        );

      }

    }

  };

  return (

    <AuthCard>

      <Typography
        variant="h4"
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        Create Account
      </Typography>

      <Typography
        align="center"
        color="text.secondary"
        mb={4}
      >
        Register to access the WISE Conference.
      </Typography>

      <Stack spacing={2}>

        <TextField
          label="Full Name"
          fullWidth
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

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
          label="Phone Number"
          fullWidth
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Company"
          fullWidth
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Business />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Designation"
          fullWidth
          value={designation}
          onChange={(e) =>
            setDesignation(e.target.value)
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Work />
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

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
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
            Register As
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

        {role === "organizer" && (

          <TextField
            label="Organizer Access Code"
            fullWidth
            value={organizerAccessCode}
            onChange={(e) =>
              setOrganizerAccessCode(
                e.target.value
              )
            }
          />

        )}

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={handleRegister}
        >
          Create Account
        </Button>

        <Typography align="center">
          Already have an account?
        </Typography>

        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          align="center"
          sx={{
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Sign In
        </Link>

      </Stack>

    </AuthCard>

  );

}

export default RegisterForm;