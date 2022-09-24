import { FC, useEffect } from "react";
import { useAppSelector } from "../../types/hooks";
import { useNavigate } from "react-router-dom";
import FullscreenLoading from "../reusable/FullscreenLoading";
import UserHome from "./UserHome";
import DoctorHome from "./DoctorHome";

// TODO: Remove the weird margin from top
const BaseHome: FC = () => {
    const { authData } = useAppSelector(state => state.auth)
    const navigate = useNavigate()


    useEffect(() => {
        if (authData === null) {
            navigate("/auth")
        }
    }, [])

    return authData === null
        ? <FullscreenLoading/>
        : authData.user.type === "doctor"
            ? <DoctorHome/>
            : <UserHome/>
}

export default BaseHome