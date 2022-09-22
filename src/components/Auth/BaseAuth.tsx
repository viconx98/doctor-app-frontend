import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom"
import { useAppSelector, useAppDispatch } from "../../types/hooks";
import { useNavigate } from "react-router-dom";
import FullscreenLoading from "../reusable/FullscreenLoading";
import { Box } from "@mui/material";
import { authAsyncActions } from "../../slices/authSlice";

// TODO: Remove the weird margin from top
const BaseAuth: FC = () => {
    const { authData, authComplete, onboardStatusDoctor, onboardStatusUser, isLoading } = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()


    useEffect(() => {
        if (authData?.user.type === "doctor") {
            dispatch(authAsyncActions.doctorOnboardStatus())
        } else if (authData?.user.type === "patient") (
            dispatch(authAsyncActions.userOnboardStatus())
        )
    }, [authComplete])

    useEffect(() => {
        if (onboardStatusDoctor) {
            navigate("/")
        } else {
            navigate("/onboard/doctor")
        }
    }, [onboardStatusDoctor])

    useEffect(() => {
        if (onboardStatusUser) {
            navigate("/")
        } else {
            navigate("/onboard/user")
        }
    }, [onboardStatusUser])

    return <Box mt={0} sx={{
        marginTop: 0,
        height: "100vh",
        width: "100%",
    }}>
        {
            isLoading
                ? <FullscreenLoading />
                : <Outlet />
        }
    </Box>
}

export default BaseAuth