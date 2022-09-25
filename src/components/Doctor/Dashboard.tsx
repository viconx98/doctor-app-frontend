import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullscreenLoading from "../reusable/FullscreenLoading";
import { Box, Card, Typography, Chip, Button, TextField, TextFieldProps, CircularProgress } from "@mui/material";
import moment from "moment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import dayjs, { Dayjs } from "dayjs";
import { timeLookup } from "../../types/onboarding";
import DoneIcon from '@mui/icons-material/Done';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppointmentsRequest } from "../../types/dashboard";
import { doctorDashboardActions, doctorDashboardAsyncActions } from "../../slices/doctorDashboardSlice";
import AppointmentCard from "./AppointmentCard";
import StaticAppointmentCard from "./StaticAppointmentCard";


// TODO: Remove the weird margin from top
const Dashboard: FC = () => {
    const dispatch = useAppDispatch()
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
    const [expand, setExpand] = useState<boolean>(true)
    const { currentExpanded, appointments, staticAppointments } = useAppSelector(state => state.doctorDashboard)

    useEffect(() => {
        const request: AppointmentsRequest = {
            date: new Date(Date.now()).toISOString(),
            status: "pending"
        }
        
        dispatch(doctorDashboardAsyncActions.fetchAppointments(request))
        
        const request2: AppointmentsRequest = {
            date: new Date(Date.now()).toISOString(),
            status: "cancelled,completed"
        }

        dispatch(doctorDashboardAsyncActions.fetchStaticAppointments(request2))
    }, [])

    // TODO: Validation and loading and error states
    const getAppointmentsOnDay = (date: any) => {
        setSelectedDate(date)

        const request: AppointmentsRequest = {
            date: date.toISOString(),
            status: "pending"
        }
        
        dispatch(doctorDashboardAsyncActions.fetchAppointments(request))
        
        const request2: AppointmentsRequest = {
            date: date.toISOString(),
            status: "cancelled,completed"
        }

        dispatch(doctorDashboardAsyncActions.fetchStaticAppointments(request2))
    }

    return <Box sx={{
        position: "relative",
        minHeight: "100%",
        width: "100%",
        display: "flex",
        gap: 2,
        flexDirection: "column"
    }}>

        <Typography variant="h5">
            Manage Appointments
        </Typography>

        <Box sx={{
            width: "100%",
            display: "flex",
            maxHeight: "600px",
            gap: 2,
        }}>
            <Box sx={{
                "& .MuiButton-text": {
                    display: "none"
                }
            }}>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                        openTo="day"
                        disablePast
                        onChange={(date: any) => {
                            getAppointmentsOnDay(date)
                        }}
                        value={selectedDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>

            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 2,
                alignItems: "flex-start",
                p: 2,
            }}>
                {
                    appointments.length === 0
                        ? <Typography sx={{ color: "gray" }}>
                            No pending appointments
                        </Typography>
                        : appointments.map(apt => <AppointmentCard
                            expanded={currentExpanded === apt.id}
                            appointment={apt}
                        />)
                }
            </Box>
        </Box>

        <Typography variant="h5">
            Previous Appointments
        </Typography>

        <Box sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "flex-start",
            p: 2,
        }}>
            {
                staticAppointments.length === 0
                    ? <Typography sx={{ color: "gray" }}>
                        No appointments
                    </Typography>
                    : staticAppointments.map(apt => <StaticAppointmentCard
                        expanded={currentExpanded === apt.id}
                        appointment={apt}
                    />)
            }
        </Box>
    </Box>
}

export default Dashboard