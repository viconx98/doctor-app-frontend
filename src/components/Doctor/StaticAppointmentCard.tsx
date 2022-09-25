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

interface StaticAppointmentCardProps {
    expanded: boolean;
    appointment: Appointment;
}

const StaticAppointmentCard: FC<StaticAppointmentCardProps> = ({ expanded, appointment }) => {
    const dispatch = useAppDispatch()

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
                    {
                        appointment.status === "completed"
                        && <Typography variant="subtitle1" color="greenyellow">
                            Completed
                        </Typography>
                    }

                    {
                        appointment.status === "cancelled"
                        && <Typography variant="subtitle1" color="error">
                            Cancelled
                        </Typography>
                    }

                </Box>
            </Box>
        </AccordionSummary>
        <AccordionDetails>
            <Card sx={{
                gap: 2,
                display: "flex",
                width: "100%",
                flexDirection: "column",
                boxShadow: "none"

            }}>
                <Typography component="div">
                    Patient History
                    <Typography>
                        {appointment.patient.healthHistory}
                    </Typography>
                </Typography>

                <Typography component="div">
                    Notes
                    <Typography>
                        {appointment.notes}
                    </Typography>
                </Typography>

                <Typography component="div">
                    Prescriptions
                    <Typography component="div">
                        <pre>
                            {appointment.notes}
                        </pre>
                    </Typography>
                </Typography>
            </Card>
        </AccordionDetails>
    </Accordion>
}

export default StaticAppointmentCard