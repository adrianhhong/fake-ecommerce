import { ProfileType } from "../client/types";
import client from "../client";
import { useState, useEffect, Fragment } from "react";
import {
  Box,
  AppBar,
  TextField,
  Toolbar,
  LinearProgress,
  Fab,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import BasicAppBar from "../components/app-bar/BasicAppBar";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Profile = () => {
  const loggedInUser = 1;
  const unloadedUser = {
    id: 0,
    email: "",
    username: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
    address: {
      city: "",
      street: "",
      number: 0,
      zipcode: "",
      geolocation: {
        lat: "",
        long: "",
      },
    },
    phone: "",
  };

  const [profile, setProfile] = useState<ProfileType>(unloadedUser);
  const [originalProfile, setOriginalProfile] =
    useState<ProfileType>(unloadedUser);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarIsOpen, setSnackbarIsOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  async function getProfile() {
    setIsLoading(true);
    const newProfile = await client.getProfile(loggedInUser);
    if (newProfile != null) {
      setProfile(newProfile);
      setOriginalProfile(newProfile);
    }
    setIsLoading(false);
  }

  // Get Profile
  useEffect(() => {
    (async function profileGetter() {
      await getProfile();
    })();
  }, []);

  const handleOnBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      name: {
        ...profile.name,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleOnAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      address: {
        ...profile.address,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSaveEdit = async () => {
    // This doesn't actually PATCH the profile, but we can console.log what we PATCHed
    const resProfile = await client.patchProfile(loggedInUser, profile);
    if (resProfile) {
      setSnackbarMessage(
        `Successfully edited profile. This does not update any database, but the response of the update is: ${JSON.stringify(
          resProfile
        )}`
      );
      setSnackbarIsOpen(true);
    }
    getProfile();
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setProfile(originalProfile);
    setIsEditMode(false);
  };

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarIsOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <BasicAppBar />
          </Toolbar>
        </AppBar>
      </Box>
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box sx={{ width: "90%", m: 5 }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Fab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="add"
              sx={{ mb: 4, textTransform: "capitalize" }}
            >
              <ArrowBackIosNewIcon sx={{ mr: 1 }} />
              Return
            </Fab>
          </Link>
          <Typography gutterBottom variant="h3" component="div">
            Profile
          </Typography>
          <TextField
            onChange={handleOnNameChange}
            id="firstname"
            label="First Name"
            name="firstname"
            value={profile.name.firstname}
            variant="outlined"
            disabled={!isEditMode}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            onChange={handleOnNameChange}
            id="lastname"
            label="Last Name"
            name="lastname"
            value={profile.name.lastname}
            variant="outlined"
            disabled={!isEditMode}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            onChange={handleOnBasicChange}
            id="email"
            label="Email"
            name="email"
            value={profile.email}
            variant="outlined"
            disabled={!isEditMode}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            onChange={handleOnBasicChange}
            id="username"
            label="Username"
            name="username"
            value={profile.username}
            variant="outlined"
            disabled={!isEditMode}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            onChange={handleOnBasicChange}
            id="password"
            label="Password"
            name="password"
            value={profile.password}
            variant="outlined"
            disabled={!isEditMode}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            onChange={handleOnAddressChange}
            id="number"
            label="Number"
            name="number"
            value={profile.address.number}
            variant="outlined"
            disabled={!isEditMode}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            onChange={handleOnAddressChange}
            id="street"
            label="Street"
            name="street"
            value={profile.address.street}
            variant="outlined"
            disabled={!isEditMode}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            onChange={handleOnAddressChange}
            id="city"
            label="City"
            name="city"
            value={profile.address.city}
            variant="outlined"
            disabled={!isEditMode}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            onChange={handleOnAddressChange}
            id="zipcode"
            label="Zipcode"
            name="zipcode"
            value={profile.address.zipcode}
            variant="outlined"
            disabled={!isEditMode}
            fullWidth
            sx={{ mb: 2 }}
          />
          {!isEditMode && !isLoading && (
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              sx={{ textTransform: "capitalize" }}
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </Fab>
          )}
          {isEditMode && !isLoading && (
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="add"
              sx={{ mr: 2, textTransform: "capitalize" }}
              onClick={handleSaveEdit}
            >
              Save
            </Fab>
          )}
          {isEditMode && !isLoading && (
            <Fab
              variant="extended"
              size="medium"
              color="secondary"
              aria-label="add"
              sx={{ textTransform: "capitalize" }}
              onClick={handleCancelEdit}
            >
              Cancel
            </Fab>
          )}
        </Box>
      </Box>
      <Snackbar
        open={snackbarIsOpen}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
      />
    </div>
  );
};

export default Profile;
