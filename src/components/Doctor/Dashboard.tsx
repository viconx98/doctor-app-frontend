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


// TODO: Remove the weird margin from top
const Dashboard: FC = () => {
    const [appointmentDate, setAppointmentDate] = useState<Dayjs | null>(dayjs())
    const [expand, setExpand] = useState<boolean>(true)


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
                            // getSlotsOnDay(date)
                        }}
                        value={appointmentDate}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>

            <Box sx={{
                width: "100%",
                display: "flex",
                gap: 2,
                alignItems: "flex-start",
                p: 2
            }}>
                <Accordion
                    expanded={expand}
                    onChange={e => { setExpand(!expand) }}
                    sx={{
                        width: "100%"
                    }}

                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box sx={{
                            display: "flex",
                            gap: 4
                        }}>
                            <Typography variant="h6">
                                <span style={{ fontWeight: "normal", color: "gray" }}>#4</span> Mr. Test Doe
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: "normal", color: "gray" }}>
                                at 4:00
                            </Typography>
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
                            </Typography>

                            <TextField
                                type="text"
                                label="Notes"
                            />

                            <TextField
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


            </Box>
        </Box>
    </Box>
}

export default Dashboard