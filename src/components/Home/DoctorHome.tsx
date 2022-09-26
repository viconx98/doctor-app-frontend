import { Box, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../slices/authSlice";
import { doctorDashboardAsyncActions } from "../../slices/doctorDashboardSlice";
import { useAppDispatch, useAppSelector } from "../../types/hooks";

const DoctorHome: FC = () => {
    const { onBoardingComplete } = useAppSelector(state => state.doctorDashboard)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(authActions.logout())
        navigate("/auth")
    }

    useEffect(() => {
        if (onBoardingComplete === false) {
            navigate("/auth")
        }

        dispatch(doctorDashboardAsyncActions.verifyOnboard())
    }, [onBoardingComplete])

    return <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh"
    }}>
        {/* TODO: Navbar, move it to component */}
        <Box sx={{
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            backgroundColor: "primary.main",
            position: "fixed",
            top: 0,
            left: 0
        }}>
            <Box sx={{
                p: 2,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                width: "100%",
                maxWidth: "lg",
            }}>
                <Typography>
                    Doctor App
                </Typography>

                <Box sx={{
                    display: "flex",
                    gap: 2
                }}>
                    <Typography onClick={e => navigate("")} sx={{ userSelect: "none", cursor: "pointer" }}>
                        Dashboard
                    </Typography>

                    <Typography onClick={logout} sx={{ userSelect: "none", cursor: "pointer" }}>
                        Logout
                    </Typography>
                </Box>
            </Box>
        </Box>

        {/* Outlet container */}
        <Box sx={{
            p: 2,
            pt: 8,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            width: "100%",
            maxWidth: "lg",
            height: "100vh",
            minHeight: "100vh",
        }}>
            <Outlet />
        </Box>
    </Box>
}

export default DoctorHome