import { Box, Card, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import * as yup from "yup"
import { authAsyncActions } from "../../slices/authSlice";
import { useAppDispatch } from "../../types/hooks";
import { useNavigate } from "react-router-dom";
import TextButton from "../reusable/TextButton";

export const signupValidations = yup.object().shape({
    fullname: yup.string()
        .min(2, "Full name is too short at least 2 characters are required")
        .max(20, "Full name is too long at only 20 characters are allowed")
        .required("Required"),

    email: yup.string()
        .email("Invalid email")
        .required("Required"),

    password: yup.string()
        .min(6, "Password is too short at least 6 characters are required")
        .max(50, "Password is too long only 50 characters are allowed")
        .required("Required"),

    confirmPassword: yup.string()
        .oneOf([yup.ref("password"), null], "Passwords don't match")
        .required("Required")
})

const UserSignup: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: signupValidations,
        onSubmit: (values) => {
            dispatch(authAsyncActions.userSignup({
                email: values.email,
                password: values.password,
                name: values.fullname
            }))
        }
    })

    // TODO: Responsive width
    // TODO: Show backend errors 
    return <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",

        width: "100%",
        height: "100%"
    }}>
        <Card sx={{
            p: 4
        }}> 
            <p>User Signup</p>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
                }}>
                    <TextField
                        fullWidth
                        id="fullname"
                        name="fullname"
                        label="Full name"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
                        error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                        helperText={formik.touched.fullname && formik.errors.fullname}
                        type="text"
                    />
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        type="email"
                    />
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        type="password"
                    />
                    <TextField
                        fullWidth
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                        type="password"
                    />

                    <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                        Sign up
                    </Button>
                    <Button color="primary" variant="text" fullWidth onClick={e => navigate("/auth")}>
                        Sign in
                    </Button>
                </Box>
            </form>
        </Card>

        <TextButton onClick={e => navigate("/auth/doctor/signin")}>Are you a doctor? Sign in here</TextButton>
        <TextButton onClick={e => navigate("/auth/requestPasswordReset")}>Forgot password?</TextButton>

    </Box>
}

export default UserSignup