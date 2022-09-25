import { FC, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography, Chip, Button, TextField, TextFieldProps, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import DoneIcon from '@mui/icons-material/Done';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Appointment } from "../../types/dashboard";
import { timeLookup } from "../../types/onboarding";
import { doctorDashboardActions } from "../../slices/doctorDashboardSlice";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface AppointmentCardProps {
    expanded: boolean;
    appointment: Appointment;
}

// TODO: Close the appointment
// TODO: Cancel the appointment
// TODO: Button states based on the appointment time
const AppointmentCard: FC<AppointmentCardProps> = ({ expanded, appointment }) => {
    const dispatch = useAppDispatch()

    const notesRef = useRef<any>()
    const prescriptionsRef = useRef<any>()

    const expand = (e: any, exp: any) => {
        if (exp) {
            dispatch(doctorDashboardActions.setCurrentExpanded(appointment.id))
        } else {
            dispatch(doctorDashboardActions.setCurrentExpanded(-1))
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
                    <span style={{ fontWeight: "normal", color: "gray" }}>#{appointment.id}</span> Mr. {appointment.patient.name}
                </Typography>

                <Box sx={{
                    flex: 1,
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
                flexDirection: "column"
            }}>
                <Typography>
                    Patient History
                    <Typography>
                        {appointment.patient.healthHistory}
                    </Typography>
                </Typography>

                <TextField
                    ref={notesRef}
                    type="text"
                    label="Notes"
                />

                <TextField
                    ref={prescriptionsRef}
                    type="text"
                    label="Prescriptions"
                    multiline
                    minRows={4}
                    maxRows={4}
                />

                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mt: "auto",
                    justifyContent: "flex-end"
                }}>
                    <Button
                        variant="contained"
                        color="error"
                    >Cancel</Button>
                    <Button
                        variant="contained"
                        startIcon={<DoneIcon />}
                    >Close</Button>
                </Box>
            </Card>
        </AccordionDetails>
    </Accordion>
}

export default AppointmentCard