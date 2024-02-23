import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Container, Paper } from '@mui/material';

interface User {
  fullName: string;
  contactNumber: string;
  birthdate: {
    day: string;
    month: string;
    year: string;
  };
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

const CreateUserForm: React.FC = () => {
  const [user, setUser] = useState<User>({
    fullName: '',
    contactNumber: '',
    birthdate: {
      day: '',
      month: '',
      year: ''
    },
    emailAddress: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleDateChange = (fieldName: string, value: string) => {
    setUser({
      ...user,
      birthdate: {
        ...user.birthdate,
        [fieldName]: value
      }
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(user); // You can handle form submission here
    e.preventDefault();
  };

  const handleCancel = () => {
    console.log('Cancel');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" align="left" gutterBottom>
        Create User Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" style={{ paddingBottom: 5 }}>Full Name</Typography>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={user.fullName}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Contact Number</Typography>
              <TextField
                fullWidth
                label="Contact Number"
                name="contactNumber"
                value={user.contactNumber}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" style={{ paddingBottom: 5 }}>Birthdate</Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    label="Day"
                    name="day"
                    type="number"
                    value={user.birthdate.day}
                    onChange={(e) => handleDateChange('day', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Month"
                    name="month"
                    type="number"
                    value={user.birthdate.month}
                    onChange={(e) => handleDateChange('month', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="Year"
                    name="year"
                    type="number"
                    value={user.birthdate.year}
                    onChange={(e) => handleDateChange('year', e.target.value)}
                    required
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" style={{ paddingBottom: 5 }}>Email Address</Typography>
              <TextField
                fullWidth
                label="Email Address"
                name="emailAddress"
                type="email"
                value={user.emailAddress}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" style={{ paddingBottom: 5 }}>Password</Typography>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" style={{ paddingBottom: 5 }}>Confirm Password</Typography>
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={user.confirmPassword}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>
        </Paper>
        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" color="primary" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateUserForm;
