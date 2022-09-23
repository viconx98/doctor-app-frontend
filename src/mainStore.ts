import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice";
import doctorInfoReduer from "./slices/doctorOnboardingSlice"
import userInfoReduer from "./slices/userOnboardingSlice"

const mainStore = configureStore({
    reducer: {
        auth: authReducer,
        doctorInfo: doctorInfoReduer,
        userInfo: userInfoReduer
    }
})

export type RootState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch

export default mainStore