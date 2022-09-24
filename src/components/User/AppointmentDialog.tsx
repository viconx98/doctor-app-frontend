import { Box, Card, Typography, Chip, Button, TextField, TextFieldProps, CircularProgress } from "@mui/material";
import { FC, useEffect, useState } from "react";

import moment from "moment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { userHomeActions, userHomeAsyncActions } from "../../slices/userHomeSlice";
import dayjs, { Dayjs } from "dayjs";
import { SlotRequest, AppointmentRequest } from "../../types/home";
import { timeLookup } from "../../types/onboarding";
import DoneIcon from '@mui/icons-material/Done';

const AppointmentDialog: FC = () => {
    const { doctorId, selectedSlot, avaialbleSlots, isFetchingSlots } = useAppSelector(state => state.userHome)
    const dispatch = useAppDispatch()

    const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(dayjs())

    useEffect(() => {
        const request: SlotRequest = {
            doctorId: doctorId!,
            date: new Date(Date.now()).toString()
        }

        dispatch(userHomeAsyncActions.fetchDoctorSlots(request))

        return () => {
            console.log("AppointmentDialog cleanup")
            dispatch(userHomeActions.resetDialog())
        }
    }, [])

    // TODO: Validations
    const getSlotsOnDay = (date: any) => {
        setAppointmentDate(date)

        const request: SlotRequest = {
            doctorId: doctorId!,
            date: date.toString()
        }

        dispatch(userHomeAsyncActions.fetchDoctorSlots(request))
    }

    const toggleSlot = (slotId: string) => {
        dispatch(userHomeActions.setSelectedSlot(slotId))
    }

    const bookAppointment = () => {
        const request: AppointmentRequest = {
            doctorId: doctorId!,
            date: appointmentDate!.toString(),
            slot: selectedSlot!
        }

        dispatch(userHomeAsyncActions.bookAppointment(request))
    }

    // TODO: Extra designs, hospital and location    
    return <Box sx={{
        zIndex: 10,
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backdropFilter: "blur(4px)"
    }}>

        <Card sx={{
            p: 2,
            minWidth: "800px",
            maxWidth: "sm",
            maxHeight: "sm",
            display: "flex",
            flexDirection: "column",
            gap: 2
        }}>

            <Typography variant="h6">
                Schedule an appointment with Dr Test
            </Typography>

            <Box sx={{
                display: "flex",
                gap: 2
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
                                getSlotsOnDay(date)
                            }}
                            value={appointmentDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>


                {/* TODO: Design */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}>
                    <Typography >
                        Available Slots
                    </Typography>

                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2
                    }}>
                        {
                            avaialbleSlots === null || isFetchingSlots
                                ? <CircularProgress />
                                : Object.entries(avaialbleSlots).length === 0
                                    ? <Typography color="gray">
                                        No slots available
                                    </Typography>
                                    : Object.entries(avaialbleSlots).map(entry => {
                                        const [key, val] = entry
                                        return val
                                            ? <Chip label={timeLookup[key]} color="primary" />
                                            : <Chip label={timeLookup[key]} onClick={e => toggleSlot(key)} />
                                    })
                        }
                    </Box>

                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        mt: "auto",
                        justifyContent: "flex-end"
                    }}>
                        <Button
                            onClick={e => dispatch(userHomeActions.resetDialog())}
                            variant="contained"
                            color="error"
                        >Cancel</Button>
                        <Button
                            onClick={bookAppointment}
                            disabled={isFetchingSlots || selectedSlot === null}
                            variant="contained"
                            startIcon={<DoneIcon />}
                        >Confirm</Button>
                    </Box>
                </Box>
            </Box>
        </Card>
    </Box>
}

export default AppointmentDialog