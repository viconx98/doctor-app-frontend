import { Box, Card, Typography, Chip } from "@mui/material";
import { FC, useEffect } from "react";
import { userHomeAsyncActions } from "../../slices/userHomeSlice";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import AppointmentDialog from "./AppointmentDialog";
import DoctorCard from "./DoctorCard";

// TODO: Redirect back to home if user type is not appropriate
const BrowseDoctors: FC = () => {
    const dispatch = useAppDispatch()
    const { doctors } = useAppSelector(state => state.userHome)

    useEffect(() => {
        dispatch(userHomeAsyncActions.fetchAllDoctors())
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
        {<AppointmentDialog />}
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>
            {doctors.map(doctor => <DoctorCard doctor={doctor} />)}
        </Box>
    </Box>
}

export default BrowseDoctors