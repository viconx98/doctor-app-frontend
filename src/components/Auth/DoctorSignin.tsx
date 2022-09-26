import { Box, Card, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { FC } from "react";
import * as yup from "yup"
import { authAsyncActions } from "../../slices/authSlice";
import { useAppDispatch } from "../../types/hooks";
import TextButton from "../reusable/TextButton";
import { useNavigate } from "react-router-dom";

export const signupValidations = yup.object().shape({
    email: yup.string()
        .email("Invalid email")
        .required("Required"),

    password: yup.string()
        .required("Required")
})

const DoctorSignin: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: signupValidations,
        onSubmit: (values) => {
            dispatch(authAsyncActions.doctorSignin({
                email: values.email,
                password: values.password,
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
            <p>Doctor Signin</p>
            <form onSubmit={formik.handleSubmit}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4
                }}>
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

                    <Button color="primary" variant="contained" fullWidth type="submit" sx={{ mt: 2 }}>
                        Sign in
                    </Button>
                    <Button color="primary" variant="text" fullWidth onClick={e => navigate("/auth/doctor/signup")}>
                        Sign up
                    </Button>
                </Box>
            </form>
        </Card>
        <TextButton onClick={e => navigate("/auth")}>Looking for a doctor? Sign in here</TextButton>
        <TextButton onClick={e => navigate("/auth/requestPasswordReset")}>Forgot password?</TextButton>
    </Box>
}

export default DoctorSignin