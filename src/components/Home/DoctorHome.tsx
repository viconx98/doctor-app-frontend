import { Box, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";

const DoctorHome: FC = () => {

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
                    <Typography>
                        Dashboard
                    </Typography>

                    <Typography>
                        Appointments
                    </Typography>

                    <Typography>
                        Profile
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