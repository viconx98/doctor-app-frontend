import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice";
import doctorInfoReduer from "./slices/doctorOnboardingSlice"

const mainStore = configureStore({
    reducer: {
        auth: authReducer,
        doctorInfo: doctorInfoReduer
    }
})

export type RootState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch

export default mainStore