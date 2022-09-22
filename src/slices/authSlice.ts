
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { AuthData, SigninRequest, SignupRequest } from "../types/auth";
import { SliceState } from "../types/slice";

interface AuthState extends SliceState {
    authData: AuthData | null
    authComplete: boolean,
}

const initialAuthData = JSON.parse(localStorage.getItem("authdata")!)

const initialState: AuthState = {
    isLoading: false,
    loading: null,
    isError: false,
    error: null,
    authData: initialAuthData,
    authComplete: false
}

const userSignup = createAsyncThunk(
    "authSlice/userSignup",
    async (data: SignupRequest) => {
        const response = await axiosClient.post(Endpoints.Doctor + Endpoints.Signup, data)

        const authData = response.data as AuthData

        localStorage.setItem("authdata", JSON.stringify(authData))

        return authData
    }
)

const userSignin = createAsyncThunk(
    "authSlice/userSignin",
    async (data: SigninRequest) => {
        const response = await axiosClient.post(Endpoints.Doctor + Endpoints.Signin, data)

        const authData = response.data as AuthData

        localStorage.setItem("authdata", JSON.stringify(authData))

        return authData
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(userSignup.pending, (state, action) => {

        }).addCase(userSignup.fulfilled, (state, action) => {

        }).addCase(userSignup.rejected, (state, action) => {

        })

        builder.addCase(userSignin.pending, (state, action) => {

        }).addCase(userSignin.fulfilled, (state, action) => {

        }).addCase(userSignin.rejected, (state, action) => {

        })
    }
})


export const authActions = { ...authSlice.actions }
export const authAsyncActions = { userSignup, userSignin }

export default authSlice.reducer
