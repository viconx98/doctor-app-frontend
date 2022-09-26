
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { AuthData, SigninRequest, SignupRequest } from "../types/auth";
import { SliceState } from "../types/slice";

interface AuthState extends SliceState {
    authData: AuthData | null;
    authComplete: boolean;
    onboardStatusDoctor: boolean | null;
    onboardStatusUser: boolean | null;
    isVerifying: boolean
}

const initialAuthData = JSON.parse(localStorage.getItem("authdata")!)

const initialState: AuthState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    authData: initialAuthData,
    authComplete: initialAuthData !== null,
    onboardStatusDoctor: null,
    onboardStatusUser: null,
    isVerifying: false
}

const userSignup = createAsyncThunk(
    "authSlice/userSignup",
    async (data: SignupRequest) => {
        const response = await axiosClient.post(Endpoints.Patient + Endpoints.Signup, data)

        const authData = response.data as AuthData

        localStorage.setItem("authdata", JSON.stringify(authData))

        return authData
    }
)

const userSignin = createAsyncThunk(
    "authSlice/userSignin",
    async (data: SigninRequest) => {
        const response = await axiosClient.post(Endpoints.Patient + Endpoints.Signin, data)

        const authData = response.data as AuthData

        localStorage.setItem("authdata", JSON.stringify(authData))

        return authData
    }
)

const doctorSignup = createAsyncThunk(
    "authSlice/doctorSignup",
    async (data: SignupRequest) => {
        const response = await axiosClient.post(Endpoints.Doctor + Endpoints.Signup, data)

        const authData = response.data as AuthData

        localStorage.setItem("authdata", JSON.stringify(authData))

        return authData
    }
)

const doctorSignin = createAsyncThunk(
    "authSlice/doctorSignin",
    async (data: SigninRequest) => {
        const response = await axiosClient.post(Endpoints.Doctor + Endpoints.Signin, data)

        const authData = response.data as AuthData

        localStorage.setItem("authdata", JSON.stringify(authData))

        return authData
    }
)

const doctorOnboardStatus = createAsyncThunk(
    "authSlice/doctorOnboardStatus",
    async () => {
        const response = await axiosClient.get(Endpoints.Doctor + Endpoints.OnboardStatus)

        return response.data.onboardingCompleted
    }
)

const userOnboardStatus = createAsyncThunk(
    "authSlice/userOnboardStatus",
    async () => {
        const response = await axiosClient.get(Endpoints.Patient + Endpoints.OnboardStatus)

        return response.data.onboardingCompleted
    }
)

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        setError(state, action: PayloadAction<[boolean, string | null]>) {
            state.isError = action.payload[0]
            state.error = action.payload[1]
        },
        setLoading(state, action: PayloadAction<[boolean, string | null]>) {
            state.isLoading = action.payload[0]
            state.loading = action.payload[1]
        },
        logout(state, action: PayloadAction<void>){
            state.authData = null
            state.authComplete = false
            
        }
    },
    extraReducers: (builder) => {
        // User sign up
        builder.addCase(userSignup.pending, (state, action) => {
            state.isLoading = true
        }).addCase(userSignup.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.error = null

            state.authComplete = true
            state.authData = action.payload
        }).addCase(userSignup.rejected, (state, action) => {
            state.isError = true
            state.error = action.error.message!
        })
        
        // User sign in
        builder.addCase(userSignin.pending, (state, action) => {
            state.isLoading = true

        }).addCase(userSignin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.error = null

            state.authComplete = true
            state.authData = action.payload
        }).addCase(userSignin.rejected, (state, action) => {
            state.isError = true
            state.error = action.error.message!
        })

        // doctor sign up
        builder.addCase(doctorSignup.pending, (state, action) => {
            state.isLoading = true
            
        }).addCase(doctorSignup.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.error = null

            state.authComplete = true
            state.authData = action.payload
        }).addCase(doctorSignup.rejected, (state, action) => {
            state.isError = true
            state.error = action.error.message!
        })

        // doctor sign in
        builder.addCase(doctorSignin.pending, (state, action) => {
            state.isLoading = true

        }).addCase(doctorSignin.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.error = null

            state.authComplete = true
            state.authData = action.payload
        }).addCase(doctorSignin.rejected, (state, action) => {
            state.isError = true
            state.error = action.error.message!
        })
        
        // doctor on board status 
        builder.addCase(doctorOnboardStatus.pending, (state, action) => {
            state.isLoading = true
            state.isVerifying = true
            
        }).addCase(doctorOnboardStatus.fulfilled, (state, action) => {
            state.isLoading = false
            state.isVerifying = false
            state.isError = false
            state.error = null
            
            state.onboardStatusDoctor = action.payload
        }).addCase(doctorOnboardStatus.rejected, (state, action) => {
            state.isVerifying = false
            state.isError = true
            state.error = action.error.message!
        })
        
        // user on board status 
        builder.addCase(userOnboardStatus.pending, (state, action) => {
            state.isVerifying = true
            state.isLoading = true
            
        }).addCase(userOnboardStatus.fulfilled, (state, action) => {
            state.isVerifying = false
            state.isLoading = false
            state.isError = false
            state.error = null
            
            state.onboardStatusUser = action.payload
        }).addCase(userOnboardStatus.rejected, (state, action) => {
            state.isVerifying = false
            state.isError = true
            state.error = action.error.message!
        })
    }
})


export const authActions = { ...authSlice.actions }
export const authAsyncActions = { userSignup, userSignin, doctorSignup, doctorSignin, doctorOnboardStatus, userOnboardStatus }

export default authSlice.reducer
