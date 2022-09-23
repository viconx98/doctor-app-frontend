import { Box, Typography, Chip, Slider, TextField, Button, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { FC, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../types/hooks";
import DoneIcon from '@mui/icons-material/Done';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import * as yup from "yup"
import { AvailabilityData, DoctorOnboardingRequest, UserOnboardingRequest } from "../../types/onboarding";
import { userInfoActions, userInfoAsyncActions } from "../../slices/userOnboardingSlice";
import { useNavigate } from "react-router-dom"

const onboardingValidations = yup.object().shape({
    age: yup.number()
        .required("Please select your age"),
    location: yup.string()
        .required("Please select a location"),
    lookingFor: yup.array()
        .min(1, "Please select at least one preference")
        .required("Please select at least one preference"),
    healthHistory: yup.string()
        .test(
            "not-empty-history",
            "Please describe your health history",
            (history) => history !== undefined && history?.trim().length > 0
        )
        .required("Please describe your health history")
})

const UserOnboarding: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { gender, age, healthHistory, location, lookingFor, onBoardingComplete } = useAppSelector(state => state.userInfo)

    useEffect(() => {
        if (onBoardingComplete) {
            navigate("/")
        }
    }, [onBoardingComplete])

    const toggleLookingFor = (index: number) => {
        dispatch(userInfoActions.toggleLookingFor(index))
    }

    const attemptOnboarding = () => {
        const request: UserOnboardingRequest = {
            gender: gender,
            age: age,
            healthHistory: healthHistory,
            location: location,
            lookingFor: lookingFor.filter(s => s.selected).map(s => s.title)
        }

        // TODO: yup validation

        dispatch(userInfoAsyncActions.completeOnboarding(request))
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
                Doctor User
            </Typography>

            <Typography>
                Gender
            </Typography>
            <RadioGroup
                defaultValue="female"
                name="radio-buttons-group"
                row
                onChange={e => dispatch(userInfoActions.setGender(e.target.value))}
            >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>

            <Typography>
                Age
            </Typography>
            <TextField type="number" defaultValue={18} onChange={e => dispatch(userInfoActions.setAge(Number(e.target.value)))} />


            <Typography>
                Health History
            </Typography>
            <TextField onChange={e => dispatch(userInfoActions.setHealthHistory(e.target.value))} />

            {/* TODO: Use some kind of place picker */}
            <Typography>
                Location
            </Typography>
            <TextField onChange={e => dispatch(userInfoActions.setLocation(e.target.value))} />

            <Typography>
                Looking For
            </Typography>

            <Box sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap"
            }}>
                {
                    lookingFor.map((q, i) => {
                        return q.selected
                            ? <Chip label={q.title} color="primary" icon={<DoneIcon />} onClick={e => toggleLookingFor(i)} />
                            : <Chip label={q.title} onClick={e => toggleLookingFor(i)} />
                    })
                }
            </Box>

            <Button onClick={attemptOnboarding}>Submit</Button>

        </Box>
    </Box>
}

export default UserOnboarding