import { Box, Typography, Chip, Slider, TextField } from "@mui/material";
import { FC } from "react";
import { useAppSelector, useAppDispatch } from "../../types/hooks";
import DoneIcon from '@mui/icons-material/Done';
import { doctorInfoActions } from "../../slices/doctorOnboardingSlice";

const timeLookup: any = {
    "0": "00:00",
    "30": "00:30",
    "60": "01:00",
    "90": "01:30",
    "120": "02:00",
    "150": "02:30",
    "180": "03:00",
    "210": "03:30",
    "240": "04:00",
    "270": "04:30",
    "300": "05:00",
    "330": "05:30",
    "360": "06:00",
    "390": "06:30",
    "420": "07:00",
    "450": "07:30",
    "480": "08:00",
    "510": "08:30",
    "540": "09:00",
    "570": "09:30",
    "600": "10:00",
    "630": "10:30",
    "660": "11:00",
    "690": "11:30",
    "720": "12:00",
    "750": "12:30",
    "780": "13:00",
    "810": "13:30",
    "840": "14:00",
    "870": "14:30",
    "900": "15:00",
    "930": "15:30",
    "960": "16:00",
    "990": "16:30",
    "1020": "17:00",
    "1050": "17:30",
    "1080": "18:00",
    "1110": "18:30",
    "1140": "19:00",
    "1170": "19:30",
    "1200": "20:00",
    "1230": "20:30",
    "1260": "21:00",
    "1290": "21:30",
    "1320": "22:00",
    "1350": "22:30",
    "1380": "23:00",
    "1410": "23:30"
}

const DoctorOnboarding: FC = () => {
    const { qualifications, specialities, days, selectedDay, availability } = useAppSelector(state => state.doctorInfo)
    const dispatch = useAppDispatch()

    const experienceMarks = [
        {
            value: 1,
            label: '1 Year or less',
        },
        {
            value: 10,
            label: '10 Years or more',
        },
    ]

    function experiencetext(value: number) {
        return `${value} Years`;
    }

    const toggleQualification = (index: number) => {
        dispatch(doctorInfoActions.toggleQualification(index))
    }

    const toggleSpeciality = (index: number) => {
        dispatch(doctorInfoActions.toggleSpeciality(index))
    }

    const selectDay = (day: string) => {
        dispatch(doctorInfoActions.setSelectedDay(day))
    }

    const selectSlot = (slot: string) => {
        dispatch(doctorInfoActions.toggleDaySlot(slot))
    }

    // TODO: Redirect back to auth if user is null
    return <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh"
    }}>
        <Box sx={{
            p: 2,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            flexDirection: "column",
            width: "100%",
            maxWidth: "lg",
            minHeight: "100vh",
        }}>
            <Typography variant="h4">
                Doctor
            </Typography>

            <Typography>
                Qualifications
            </Typography>

            <Box sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap"
            }}>
                {
                    qualifications.map((q, i) => {
                        return q.selected
                            ? <Chip label={q.title} color="primary" icon={<DoneIcon />} onClick={e => toggleQualification(i)} />
                            : <Chip label={q.title} onClick={e => toggleQualification(i)} />
                    })
                }
            </Box>

            <Typography>
                Experience (in years)
            </Typography>
            <Slider
                valueLabelDisplay="auto"
                marks={experienceMarks}
                getAriaValueText={experiencetext}
                defaultValue={1} step={1} min={1} max={10}
                onChange={(e, val) => dispatch(doctorInfoActions.setExperience(val as number))}
            />

            <Typography>
                Hospital affiliation (optional)
            </Typography>
            <TextField onChange={e => dispatch(doctorInfoActions.setHospital(e.target.value))} />

            {/* TODO: Use some kind of place picker */}
            <Typography>
                Location
            </Typography>
            <TextField onChange={e => dispatch(doctorInfoActions.setLocation(e.target.value))} />

            <Typography>
                Specialities
            </Typography>

            <Box sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap"
            }}>
                {
                    specialities.map((q, i) => {
                        return q.selected
                            ? <Chip label={q.title} color="primary" icon={<DoneIcon />} onClick={e => toggleSpeciality(i)} />
                            : <Chip label={q.title} onClick={e => toggleSpeciality(i)} />
                    })
                }
            </Box>

            {/* TODO: Different styling for chips */}
            <Typography>
                Availability
            </Typography>

            <Box sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                textTransform: "capitalize"
            }}>
                {
                    days.map(day => {
                        const hasSlots = Object.values(availability[day]).some(slot => slot)

                        return day === selectedDay
                            ? <Chip label={day} color="primary" onClick={e => selectDay(day)} />
                            : hasSlots
                                ? <Chip label={day} onClick={e => selectDay(day)} icon={<DoneIcon />}/>
                                : <Chip label={day} onClick={e => selectDay(day)} />
                    })
                }
            </Box>

            <Box sx={{
                mt: 2,
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
            }}>
                {
                    Object.entries(availability[selectedDay])
                        .map(entry => {
                            let [key, val] = entry
                            return val
                                ? <Chip label={timeLookup[key]} color="primary" onClick={e => selectSlot(key)} />
                                : <Chip label={timeLookup[key]} onClick={e => selectSlot(key)} />
                        })
                }
            </Box>
        </Box>
    </Box>
}

export default DoctorOnboarding