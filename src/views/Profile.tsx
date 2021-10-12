import { ProfileType } from "../client/types";
import client from "../client";
import { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  TextField,
  Button,
  Toolbar,
  LinearProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import BasicAppBar from "../components/app-bar/BasicAppBar";

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

  async function getProfile() {
    const newProfile = await client.getProfile(loggedInUser);
    if (newProfile != null) {
      setProfile(newProfile);
      setOriginalProfile(newProfile);
    }
  }

  // Get Profile
  useEffect(() => {
    setIsLoading(true);
    (async function profileGetter() {
      await getProfile();
    })();
    setIsLoading(false);
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
    console.log(await client.patchProfile(loggedInUser, profile));
    getProfile();
    setIsEditMode(false);
  };

  const handleCancelEdit = () => {
    setProfile(originalProfile);
    setIsEditMode(false);
  };

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
      <Link to="/">
        <Button color="inherit">Return to Home</Button>
      </Link>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
      <TextField
        onChange={handleOnNameChange}
        id="firstname"
        label="First Name"
        name="firstname"
        value={profile.name.firstname}
        variant="outlined"
        disabled={!isEditMode}
        fullWidth
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
      />
      {!isEditMode && (
        <Button color="inherit" onClick={() => setIsEditMode(true)}>
          EDIT
        </Button>
      )}
      {isEditMode && (
        <Button color="inherit" onClick={handleSaveEdit}>
          SAVE
        </Button>
      )}
      {isEditMode && (
        <Button color="inherit" onClick={handleCancelEdit}>
          CANCEL
        </Button>
      )}
    </div>
  );
};

export default Profile;
