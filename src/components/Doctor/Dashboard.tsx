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


// TODO: Remove the weird margin from top
const Dashboard: FC = () => {
    const dispatch = useAppDispatch()
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs())
    const [expand, setExpand] = useState<boolean>(true)
    const { currentExpanded, appointments } = useAppSelector(state => state.doctorDashboard)

    useEffect(() => {

    }, [])

    // TODO: Validation and loading and error states
    const getAppointmentsOnDay = (date: any) => {
        setSelectedDate(date)

        const request: AppointmentsRequest = {
            date: date.toISOString()
        }

        dispatch(doctorDashboardAsyncActions.fetchAppointments(request))
    }

    return <Box sx={{
        position: "relative",
        height: "100%",
        minHeight: "100%",
        width: "100%",
        display: "flex",
        gap: 2,
        flexDirection: "column"
    }}>
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
                            No appointments
                        </Typography>
                        : appointments.map(apt => <AppointmentCard
                            expanded={currentExpanded === apt.id}
                            appointment={apt}
                        />)
                }
            </Box>
        </Box>
    </Box>
}

export default Dashboard