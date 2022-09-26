import { FC, useEffect, useState, useRef } from "react";
import { Outlet, useSearchParams } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../types/hooks";
import { useNavigate } from "react-router-dom";
import FullscreenLoading from "../reusable/FullscreenLoading";
import { authAsyncActions } from "../../slices/authSlice";
import { Box, Typography, Chip, Slider, TextField, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { PasswordResetRequest, PerformPasswordResetRequest } from "../../types/auth";
import { passwordResetActions, passwordResetAsyncActions } from "../../slices/passwordResetSlice";
import * as yup from "yup"

// TODO: Remove the weird margin from top
const PerformPasswordReset: FC = () => {
    const [searchParams] = useSearchParams()
    const passwordRef = useRef<any>("")

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { secret, userType, isInvalidResetLink, isParsing, isLoading, isSuccess, success, isError, error } = useAppSelector(state => state.passwordReset)

    useEffect(() => {
        const secret = searchParams.get("secret")
        const userType = searchParams.get("type")

        if (secret === null || userType === null || (userType !== "patient" && userType !== "doctor")) {
            dispatch(passwordResetActions.setError([true, "Invalid password reset link"]))
            dispatch(passwordResetActions.setIsInvalidResetLink(true))
            dispatch(passwordResetActions.setIsParsing(false))
            return
        }
        
        dispatch(passwordResetActions.setUser([secret, userType]))
        dispatch(passwordResetActions.setIsParsing(false))
    }, [])

    const performPasswordRequest = () => {
        const newPassword = passwordRef.current.value

        try {
            yup.string()
                .min(6, "Password is too short at least 6 characters are required")
                .max(50, "Password is too long only 50 characters are allowed")
                .required("Required")
                .validate(newPassword)

            const request: PerformPasswordResetRequest = {
                secret: secret!,
                newPassword: newPassword!,
                type: userType!
            }

            dispatch(passwordResetAsyncActions.performPasswordReset(request))
        } catch (err: any) {
            dispatch(passwordResetActions.setError([true, "Invalid password reset link"]))

        }
    }

    return <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh"
    }}>
        {
            isParsing
                ? <Typography variant="h4">
                    Please Wait
                </Typography>
                : <Box sx={{
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
                    <Typography variant="h4">
                        Doctor App
                    </Typography>

                    <Typography >
                        Please enter your new password
                    </Typography>

                    <TextField
                        inputRef={passwordRef}
                        disabled={isInvalidResetLink}
                        label="New Password"
                        type="password"
                    />
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
                        disabled={isInvalidResetLink}
                        onClick={performPasswordRequest}
                        variant="contained">Reset</Button>
                </Box>
        }
    </Box>
}

export default PerformPasswordReset