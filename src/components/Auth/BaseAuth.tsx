import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../types/hooks";
import { useNavigate } from "react-router-dom";
import FullscreenLoading from "../reusable/FullscreenLoading";
import { Box } from "@mui/material";
import { authAsyncActions } from "../../slices/authSlice";

// TODO: Remove the weird margin from top
const BaseAuth: FC = () => {
    const { authData, authComplete, onboardStatusDoctor, onboardStatusUser, isVerifying } = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    useEffect(() => {
        console.log("useEffect authComplete")
        if (authComplete) {
            if (authData?.user.type === "doctor") {
                console.log("useEffect authComplete doctor")
                dispatch(authAsyncActions.doctorOnboardStatus())
            } else if (authData?.user.type === "patient") {
                console.log("useEffect authComplete user")
                dispatch(authAsyncActions.userOnboardStatus())
            }
        }
    }, [authComplete])

    useEffect(() => {
        console.log("useEffect doctor")
        if (authData?.user.type === "doctor") {
            console.log("useEffect doctor onboarding completed")
            if (onboardStatusDoctor) {
                navigate("/")
            } else {
                console.log("useEffect doctor onboarding not completed")
                navigate("/onboard/doctor")
            }
        }
    }, [onboardStatusDoctor])
    
    useEffect(() => {
        console.log("useEffect user")
        if (authData?.user.type === "patient") {
            console.log(onboardStatusUser)
            if (onboardStatusUser) {
                console.log("useEffect user onboarding completed")
                navigate("/")
            } else {
                console.log("useEffect user onboarding not completed")
                navigate("/onboard/user")
            }
        }
    }, [onboardStatusUser])

    return <Box mt={0} sx={{
        marginTop: 0,
        height: "100vh",
        width: "100%",
    }}>
        {
            isVerifying
                ? <FullscreenLoading />
                : <Outlet />
        }
    </Box>
}

export default BaseAuth