import { FC, useEffect, useState, useRef } from "react";
import { Outlet } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../types/hooks";
import { useNavigate } from "react-router-dom";
import FullscreenLoading from "../reusable/FullscreenLoading";
import { authAsyncActions } from "../../slices/authSlice";
import { Box, Typography, Chip, Slider, TextField, Button, RadioGroup, FormControlLabel, Radio, IconButton } from "@mui/material";
import { PasswordResetRequest } from "../../types/auth";
import { passwordResetAsyncActions } from "../../slices/passwordResetSlice";
import HomeIcon from '@mui/icons-material/Home';

// TODO: Remove the weird margin from top
const RequestPasswordReset: FC = () => {
    const emailRef = useRef<any>("")
    const [userType, setUserType] = useState<string>("patient")

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { isSuccess, success, isError, error } = useAppSelector(state => state.passwordReset)

    const requestPasswordReset = () => {
        const request: PasswordResetRequest = {
            email: emailRef.current.value,
            type: userType
        }

        dispatch(passwordResetAsyncActions.requestPasswordReset(request))
    }

    return <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh"
    }}>
        <Box sx={{
            p: 2,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "100%",
            maxWidth: "lg",
            minHeight: "100vh",
            gap: 2
        }}>
            <Typography variant="h4" component="div">
                <IconButton onClick={e => navigate("/auth")}>
                    <HomeIcon />
                </IconButton>
                Doctor App
            </Typography>

            <Typography >
                Please enter your registered email
            </Typography>

            <TextField
                inputRef={emailRef}
                label="Email"
                type="email"
            />

            <RadioGroup
                defaultValue="patient"
                name="user-type-group"

                onChange={e => setUserType(e.target.value)}
            >
                <FormControlLabel defaultChecked value="patient" control={<Radio />} label="I am an end user" />
                <FormControlLabel value="doctor" control={<Radio />} label="I am a doctor" />
            </RadioGroup>

            {
                isError
                && <Typography sx={{ color: "red" }} >
                    {error}
                </Typography>
            }

            {
                isSuccess
                && <Typography sx={{ color: "greenyellow" }} >
                    {success}
                </Typography>
            }

            <Button
                onClick={requestPasswordReset}
                variant="contained">Submit</Button>
        </Box>
    </Box>
}

export default RequestPasswordReset