import { Box, Card, Typography, Chip, Button, TextField, TextFieldProps } from "@mui/material";
import { FC, JSXElementConstructor, ReactElement, useEffect } from "react";

import moment from "moment";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { userHomeActions } from "../../slices/userHomeSlice";

const AppointmentDialog: FC = () => {
    const { appointmentDate, doctorId } = useAppSelector(state => state.userHome)
    const dispatch = useAppDispatch()

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
                            onChange={date => dispatch(userHomeActions.setAppointmentDate(date))}
                            value={appointmentDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Box>


                <Box sx={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Typography >
                        Available Slots
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2
                    }}>
                        <Chip label="slot"/>
                    </Box>
                </Box>
            </Box>
        </Card>
    </Box>
}

export default AppointmentDialog