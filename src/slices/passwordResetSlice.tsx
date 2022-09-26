import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { AuthData, PasswordResetRequest, PerformPasswordResetRequest, SigninRequest, SignupRequest } from "../types/auth";
import { SliceState } from "../types/slice";

interface RequestPasswordResetState extends SliceState {
    isSuccess: boolean;
    success: string;

    // Perform Password Reset
    secret: string | null;
    userType: string | null;
    isInvalidResetLink: boolean;
    isParsing: boolean; 
}


const initialState: RequestPasswordResetState = {
    isParsing: true,
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    isSuccess: false,
    success: "",
    secret: null,
    userType: null,
    isInvalidResetLink: false
}

const requestPasswordReset = createAsyncThunk(
    "passwordResetSlice/requestPasswordReset",
    async (request: PasswordResetRequest) => {
        let url = request.type === "doctor"
            ? Endpoints.Doctor + Endpoints.RequestPasswordReset
            : Endpoints.Patient + Endpoints.RequestPasswordReset

        const response = await axiosClient.post(url, request)

        return response.data
    }
)

const performPasswordReset = createAsyncThunk(
    "passwordResetSlice/performPasswordReset",
    async (request: PerformPasswordResetRequest) => {
        let url = request.type === "doctor"
            ? Endpoints.Doctor + Endpoints.PerformPasswordReset
            : Endpoints.Patient + Endpoints.PerformPasswordReset

        const response = await axiosClient.post(url, request)

        return response.data
    }
)

const passwordResetSlice = createSlice({
    name: "passwordResetSlice",
    initialState: initialState,
    reducers: {
        setUser(state, action: PayloadAction<string[]>) {
            state.secret = action.payload[0]
            state.userType = action.payload[1]
        },
        setError(state, action: PayloadAction<[boolean, string]>) {
            state.isError = action.payload[0]
            state.error = action.payload[1]
        },
        setLoading(state, action: PayloadAction<[boolean, string]>) {
            state.isLoading = action.payload[0]
            state.loading = action.payload[1]
        },
        setIsParsing(state, action: PayloadAction<boolean>) {
            state.isParsing = action.payload
        },
        setIsInvalidResetLink(state, action: PayloadAction<boolean>) {
            state.isInvalidResetLink = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(requestPasswordReset.pending, (state, action) => {
            state.isLoading = true
        }).addCase(requestPasswordReset.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true

            state.success = action.payload.message
        }).addCase(requestPasswordReset.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false

            state.isError = true
            state.error = action.error.message!
        })
        
        builder.addCase(performPasswordReset.pending, (state, action) => {
            state.isLoading = true
        }).addCase(performPasswordReset.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = true

            state.success = action.payload.message
        }).addCase(performPasswordReset.rejected, (state, action) => {
            state.isLoading = false
            state.isSuccess = false

            state.isError = true
            state.error = action.error.message!
        })
    }
})

export const passwordResetActions = { ...passwordResetSlice.actions }
export const passwordResetAsyncActions = { requestPasswordReset, performPasswordReset }
export default passwordResetSlice.reducer
