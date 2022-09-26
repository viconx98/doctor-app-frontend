import { FC, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography, Chip, Button, TextField, TextFieldProps, CircularProgress, IconButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import DoneIcon from '@mui/icons-material/Done';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DoctorAppointment } from "../../types/dashboard";
import { timeLookup } from "../../types/onboarding";
import { UserAppointment } from "../../types/appointments";
import { userApoointmentsActions } from "../../slices/userAppointmentsSlice";
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
interface StaticUserAppointmentCardProps {
    expanded: boolean;
    appointment: UserAppointment;
}

const StaticUserAppointmentCard: FC<StaticUserAppointmentCardProps> = ({ expanded, appointment }) => {
    const dispatch = useAppDispatch()

    const expand = (e: any, exp: any) => {
        if (exp) {
            dispatch(userApoointmentsActions.setCurrentExpanded(appointment.id))
        } else {
            dispatch(userApoointmentsActions.setCurrentExpanded(-1))
        }
    }

    return <Accordion
        expanded={expanded}
        onChange={expand}
        sx={{
            width: "100%"
        }}

    >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>

            <Box sx={{
                width: "100%",
                display: "flex",
                gap: 4,
            }}>
                <Typography variant="h6">
                    <span style={{ fontWeight: "normal", color: "gray" }}>#{appointment.id}</span> Dr. {appointment.doctor.name}
                </Typography>

                <div style={{ flex: 1 }}></div>

                <Box sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    justifyContent: "flex-end"
                }}>
                    <CalendarTodayIcon />
                    <Typography variant="button" sx={{ fontSize: "16px", color: "gray" }} >
                        {new Date(appointment.date).toLocaleDateString()}
                    </Typography>
                </Box>

                <Box sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    mr: 2,
                    justifyContent: "flex-end"
                }}>
                    <AccessTimeIcon />
                    <Typography variant="button" sx={{ fontSize: "16px", color: "gray" }} >
                        {timeLookup[appointment.slot]}
                    </Typography>
                </Box>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
            <Card sx={{
                gap: 2,
                display: "flex",
                width: "100%",
                boxShadow: "none"
            }}>
                <IconButton><EmailIcon /></IconButton>
                <IconButton><CallIcon /></IconButton>
                <IconButton><PlaceIcon /></IconButton>
                {/* <Button
                    sx={{ ml: "auto" }}
                    variant="contained"
                    color="error"
                >Cancel</Button> */}
            </Card>
        </AccordionDetails>
    </Accordion>
}

export default StaticUserAppointmentCard