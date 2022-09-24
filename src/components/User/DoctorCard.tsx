import { Box, Card, Typography, Chip, Button } from "@mui/material";
import { FC, useEffect } from "react";
import { Doctor } from "../../types/home";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { userHomeActions } from "../../slices/userHomeSlice";

interface DoctorCardProps {
    doctor: Doctor
}

const DoctorCard: FC<DoctorCardProps> = ({ doctor }) => {
    const dispatch = useAppDispatch()

    const showAppointmentDialog = () => {
        dispatch(userHomeActions.setShowAppointmentDialog([true, doctor.id]))
    }

    // TODO: Extra esigns, hospital and location    
    return <Card sx={{
        p: 2,
        display: "flex",
        gap: 2
    }}>
        {/* TODO: Replace with image */}
        <Box sx={{ height: "160px", width: "160px", borderRadius: "8px", backgroundColor: "gray" }}>

        </Box>

        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
        }}>

            <Typography variant="h5">
                Dr. {doctor.name}
                <Typography variant="body2">
                    {doctor.qualifications.join(", ")}
                </Typography>
            </Typography>

            <Box sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap"
            }}>
                {doctor.specialities.map(sp => <Chip label={sp} />)}
            </Box>

            <Typography variant="h6">
                $ {doctor.consultationFees} <span style={{ fontWeight: "normal", fontSize: "14px", color: "gray" }}>per consultation</span>
            </Typography>

        </Box>
        <Button
            onClick={showAppointmentDialog}
            variant="contained"
            startIcon={<CalendarMonthIcon />}
            sx={{ ml: "auto", mt: "auto" }}>Book an appointment</Button>
    </Card>
}

export default DoctorCard