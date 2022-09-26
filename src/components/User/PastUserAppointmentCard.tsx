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
import { SubmitReviewRequest, UserAppointment } from "../../types/appointments";
import { userApoointmentsActions, userApoointmentsAsyncActions } from "../../slices/userAppointmentsSlice";
import Rating from '@mui/material/Rating';


interface StaticUserAppointmentCardProps {
    expanded: boolean;
    appointment: UserAppointment;
}

const PastUserAppointmentCard: FC<StaticUserAppointmentCardProps> = ({ expanded, appointment }) => {
    const dispatch = useAppDispatch()
    const [rating, setRating] = useState<number>(1)
    const reviewRef = useRef<any>()

    const expand = (e: any, exp: any) => {
        if (exp) {
            dispatch(userApoointmentsActions.setCurrentExpanded(appointment.id))
        } else {
            dispatch(userApoointmentsActions.setCurrentExpanded(-1))
        }
    }

    const submitReview = () => {
        const request: SubmitReviewRequest = {
            appointmentId: appointment.id,
            rating: rating,
            review: reviewRef.current.value
        }

        dispatch(userApoointmentsAsyncActions.submitReview(request))
    }

    return <Accordion
        expanded={expanded}
        onChange={expand}
        sx={{
            width: "100%"
        }}>

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
                flexDirection: "column",
                width: "100%",
                boxShadow: "none"
            }}>
                <Typography variant="button" sx={{ fontSize: "16px", color: "gray" }} >
                    {new Date(appointment.date).toLocaleDateString()} -  {timeLookup[appointment.slot]}
                </Typography>

                {
                    appointment.feedbackCompleted
                        ? <>
                            <Rating
                                name="doctor-rating"
                                value={appointment.rating}
                                readOnly
                            />

                            <Typography >
                                {appointment.review}
                            </Typography>
                        </>
                        : <>
                            <Rating
                                name="doctor-rating"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue!);
                                }}
                            />

                            <TextField
                                inputRef={reviewRef}
                                type="text"
                                label="Review"
                                multiline
                                minRows={4}
                                maxRows={4}
                            />

                            <Button
                                onClick={submitReview}
                                variant="contained"
                                startIcon={<DoneIcon />}
                                sx={{ ml: "auto" }}
                            >Submit Review</Button>
                        </>
                }
            </Card>
        </AccordionDetails>
    </Accordion>
}

export default PastUserAppointmentCard