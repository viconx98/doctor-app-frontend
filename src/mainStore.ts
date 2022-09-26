import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice";
import doctorDashboardReducer from "./slices/doctorDashboardSlice";
import doctorInfoReduer from "./slices/doctorOnboardingSlice"
import userHomeReducer from "./slices/userHomeSlice";
import userInfoReduer from "./slices/userOnboardingSlice"
import userAppointmentsReducer from "./slices/userAppointmentsSlice";

const mainStore = configureStore({
    reducer: {
        auth: authReducer,
        doctorInfo: doctorInfoReduer,
        userInfo: userInfoReduer,
        userHome: userHomeReducer,
        doctorDashboard: doctorDashboardReducer,
        userAppointments: userAppointmentsReducer
    }
})

export type RootState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch

export default mainStore