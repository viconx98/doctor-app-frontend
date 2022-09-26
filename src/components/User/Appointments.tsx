import { Box, Card, Typography, Chip } from "@mui/material";
import { FC, useEffect } from "react";
import { userApoointmentsAsyncActions } from "../../slices/userAppointmentsSlice";
import { userHomeAsyncActions } from "../../slices/userHomeSlice";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import AppointmentDialog from "./AppointmentDialog";
import DoctorCard from "./DoctorCard";
import PastUserAppointmentCard from "./PastUserAppointmentCard";
import StaticUserAppointmentCard from "./StaticUserAppointmentCard";

// TODO: Redirect back to home if user type is not appropriate
const Appointments: FC = () => {
    const dispatch = useAppDispatch()
    const { appointments, pastAppointments, currentExpanded } = useAppSelector(state => state.userAppointments)

    useEffect(() => {
        dispatch(userApoointmentsAsyncActions.fetchUserAppointments())
        dispatch(userApoointmentsAsyncActions.fetchUserPastAppointments())
    }, [])

    return <Box sx={{
        position: "relative",
        height: "100%",
        minHeight: "100%",
        width: "100%",
        display: "flex",
        gap: 2,
        flexDirection: "column"
    }}>
        <Typography variant="h5">
            Upcoming Appointments
        </Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            {appointments.map(apt => <StaticUserAppointmentCard expanded={currentExpanded === apt.id} appointment={apt} />)}
        </Box>

        <Typography variant="h5">
            Previous Appointments
        </Typography>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            {pastAppointments.map(apt => <PastUserAppointmentCard expanded={currentExpanded === apt.id} appointment={apt} />)}
        </Box>
    </Box>
}

export default Appointments