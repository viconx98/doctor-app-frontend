import { FC, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, Typography, Chip, Button, TextField, TextFieldProps, CircularProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import DoneIcon from '@mui/icons-material/Done';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DoctorAppointment, CloseAppointmentRequest } from "../../types/dashboard";
import { timeLookup } from "../../types/onboarding";
import { doctorDashboardActions, doctorDashboardAsyncActions } from "../../slices/doctorDashboardSlice";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import * as yup from "yup"

const closingValidations = yup.object().shape({
    prescriptions: yup.string()
        .required("Please enter your prescriptions")
})


interface AppointmentCardProps {
    expanded: boolean;
    appointment: DoctorAppointment;
}

// TODO: Close the appointment
// TODO: Cancel the appointment
// TODO: Button states based on the appointment time
const AppointmentCard: FC<AppointmentCardProps> = ({ expanded, appointment }) => {
    const dispatch = useAppDispatch()

    const notesRef = useRef<any>()
    const prescriptionsRef = useRef<any>()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isError, setIsError] = useState<boolean>(false)
    const [error, setError] = useState<string | null>("This is an error")

    const expand = (e: any, exp: any) => {
        if (exp) {
            dispatch(doctorDashboardActions.setCurrentExpanded(appointment.id))
        } else {
            dispatch(doctorDashboardActions.setCurrentExpanded(-1))
        }
    }


    const closeAppointment = async () => {
        const request: CloseAppointmentRequest = {
            appointmentId: appointment.id,
            notes: notesRef.current.value,
            prescriptions: prescriptionsRef.current.value
        }

        console.log(request, prescriptionsRef.current.value)

        try {
            await closingValidations.validate(request)

            dispatch(doctorDashboardAsyncActions.closeAppointment(request))
        } catch (error: any) {
            setIsError(true)
            setError(error.message || "error")
        }
    }

    const cancelAppointment = () => {
        dispatch(doctorDashboardAsyncActions.cancelAppointment(appointment.id))
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
            <Card  sx={{
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

                <TextField
                    inputRef={notesRef}
                    type="text"
                    label="Notes"
                />

                <TextField
                    inputRef={prescriptionsRef}
                    type="text"
                    label="Prescriptions"
                    multiline
                    minRows={4}
                    maxRows={4}
                />

                {isError && <Typography sx={{ ml: "auto", color: "red" }}>
                    {error}
                </Typography>}

                <Box sx={{
                    width: "100%",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                    mt: "auto",
                    justifyContent: "flex-end"
                }}>
                    <Button
                        onClick={cancelAppointment}
                        variant="contained"
                        color="error"
                        >Cancel</Button>
                    <Button
                        disabled={isLoading}
                        onClick={closeAppointment}
                        variant="contained"
                        startIcon={<DoneIcon />}
                    >Close</Button>
                </Box>
            </Card>
        </AccordionDetails>
    </Accordion>
}

export default AppointmentCard