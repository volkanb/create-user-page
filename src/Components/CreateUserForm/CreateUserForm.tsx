import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Container,
    Paper,
    Alert,
    Snackbar,
} from "@mui/material";
import BirthdateSelector from "../BirthdateSelector/BirthdateSelector";
import {
    validEmail,
    validFullName,
    validPassword,
    validPhone,
} from "../../regex";
import axios from "axios";

interface User {
    fullName: string;
    contactNumber: string;
    birthdate: {
        day: number | undefined;
        month: number | undefined;
        year: number | undefined;
    };
    emailAddress: string;
    password: string;
    confirmPassword: string;
}

const CreateUserForm: React.FC = () => {
    const [user, setUser] = useState<User>({
        fullName: "",
        contactNumber: "",
        birthdate: {
            day: undefined,
            month: undefined,
            year: undefined,
        },
        emailAddress: "",
        password: "",
        confirmPassword: "",
    });
    const [isFullNameInvalid, setIsFullNameInvalid] = useState(false);
    const [isContactNumberInvalid, setIsContactNumberInvalid] = useState(false);
    const [isBirthdateInvalid, setIsBirthdateInvalid] = useState(false);
    const [isEmailInvalid, setIsEmailInvalid] = useState(false);
    const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
    const [isConfirmPasswordInvalid, setIsConfirmPasswordInvalid] =
        useState(false);

    const [isSubmitTriggered, setIsSubmitTriggered] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [responseMessage, setResponseMessage] = useState("");
    const [openAlert, setOpenAlert] = useState(false);

    const [severity, setSeverity] = useState<"success" | "error">("success");

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenAlert(false);
    };

    const sendRequest = () => {
        const data = {
            full_name: user.fullName,
            contact_number: user.contactNumber,
            email: user.emailAddress,
            date_of_birth: user.birthdate,
            password: user.password,
        };
        axios
            .post(
                "https://fullstack-test-navy.vercel.app/api/users/create",
                data
            )
            .then((response) => {
                setResponseData(response.data);
                setSeverity("success");
                setResponseMessage("User account successfully created.");
                setOpenAlert(true);
            })
            .catch((error) => {
                console.error("Error:", error);
                setSeverity("error");
                setResponseMessage("There was an error creating user account.");
                setOpenAlert(true);
            });
    };

    useEffect(() => {
        if (isSubmitTriggered && validate()) {
            sendRequest();
        }
        setIsSubmitTriggered(false);
    }, [isSubmitTriggered]);

    const validate = () => {
        validateFullName(user.fullName);
        validateContactNumber(user.contactNumber);
        validateBirthdate(user.birthdate);
        validateEmail(user.emailAddress);
        validatePassword(user.password);
        validateConfirmPassword(user.confirmPassword);
        return !(
            isFullNameInvalid ||
            isContactNumberInvalid ||
            isBirthdateInvalid ||
            isEmailInvalid ||
            isPasswordInvalid ||
            isConfirmPasswordInvalid
        );
    };

    const validateFullName = (userFullName: string) => {
        if (userFullName !== "" && validFullName.test(userFullName)) {
            setIsFullNameInvalid(false);
            return true;
        } else {
            setIsFullNameInvalid(true);
            return false;
        }
    };

    const validateContactNumber = (contactNumber: string) => {
        if (contactNumber !== "" && validPhone.test(contactNumber)) {
            setIsContactNumberInvalid(false);
            return true;
        } else {
            setIsContactNumberInvalid(true);
            return false;
        }
    };

    const validateBirthdate = (birthdate: {
        day: number | undefined;
        month: number | undefined;
        year: number | undefined;
    }) => {
        if (birthdate.day && birthdate.month && birthdate.year) {
            setIsBirthdateInvalid(false);
            return true;
        } else {
            setIsBirthdateInvalid(true);
            return false;
        }
    };

    const validateEmail = (email: string) => {
        if (email !== "" && validEmail.test(email)) {
            setIsEmailInvalid(false);
            return true;
        } else {
            setIsEmailInvalid(true);
            return false;
        }
    };

    const validatePassword = (password: string) => {
        if (password !== "" && validPassword.test(password)) {
            setIsPasswordInvalid(false);
            return true;
        } else {
            setIsPasswordInvalid(true);
            return false;
        }
    };

    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== "" && confirmPassword === user.password) {
            setIsConfirmPasswordInvalid(false);
            return true;
        } else {
            setIsConfirmPasswordInvalid(true);
            return false;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validate();
        setIsSubmitTriggered(true);
    };

    const handleCancel = () => {
        window.location.reload();
    };

    const setBirthdate = ({
        day,
        month,
        year,
    }: {
        day: number | undefined;
        month: number | undefined;
        year: number | undefined;
    }) => {
        setUser({
            ...user,
            birthdate: {
                day,
                month,
                year,
            },
        });
    };

    return (
        <Container
            maxWidth="sm"
            style={{ marginTop: 30, marginBottom: 30 }}
            sx={{ paddingX: { xs: 0 } }}
        >
            <Typography
                variant="h6"
                align="left"
                gutterBottom
                sx={{ paddingLeft: { xs: 2 } }}
            >
                Create User Account
            </Typography>
            <form onSubmit={handleSubmit}>
                <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                                Full Name
                            </Typography>
                            <TextField
                                fullWidth
                                label="Full Name*"
                                name="fullName"
                                value={user.fullName}
                                onChange={handleChange}
                                error={isFullNameInvalid}
                                helperText={
                                    isFullNameInvalid &&
                                    "Required full name with letters and no symbols!"
                                }
                                onFocus={() => setIsFullNameInvalid(false)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                                Contact Number
                            </Typography>
                            <TextField
                                fullWidth
                                label="Contact Number*"
                                name="contactNumber"
                                value={user.contactNumber}
                                onChange={handleChange}
                                error={isContactNumberInvalid}
                                helperText={
                                    isContactNumberInvalid &&
                                    "Required valid phone number with ten digits(no symbols, space or letters)!"
                                }
                                onFocus={() => setIsContactNumberInvalid(false)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                                Birthdate
                            </Typography>
                            <BirthdateSelector
                                birthdate={user.birthdate}
                                setBirthdateCallback={setBirthdate}
                                isBirthdateInvalid={isBirthdateInvalid}
                                setIsBirthdateInvalidCallback={
                                    setIsBirthdateInvalid
                                }
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                                Email Address
                            </Typography>
                            <TextField
                                fullWidth
                                label="Email Address*"
                                name="emailAddress"
                                value={user.emailAddress}
                                onChange={handleChange}
                                error={isEmailInvalid}
                                helperText={
                                    isEmailInvalid &&
                                    "Required valid email address!"
                                }
                                onFocus={() => setIsEmailInvalid(false)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                                Password
                            </Typography>
                            <TextField
                                fullWidth
                                label="Password*"
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={handleChange}
                                error={isPasswordInvalid}
                                helperText={
                                    isPasswordInvalid &&
                                    "Required, exactly 8 characters(lowercase letters, uppercase letters and numbers)!"
                                }
                                onFocus={() => setIsPasswordInvalid(false)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom>
                                Confirm Password
                            </Typography>
                            <TextField
                                fullWidth
                                label="Confirm Password*"
                                name="confirmPassword"
                                type="password"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                error={isConfirmPasswordInvalid}
                                helperText={
                                    isConfirmPasswordInvalid &&
                                    "Required, must be the same as the password!"
                                }
                                onFocus={() =>
                                    setIsConfirmPasswordInvalid(false)
                                }
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <Grid
                    container
                    spacing={2}
                    justifyContent="center"
                    style={{ marginTop: 20 }}
                >
                    <Grid item xs={11} sm={4}>
                        <Button
                            variant="outlined"
                            fullWidth
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={11} sm={4}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            type="submit"
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {responseMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CreateUserForm;
