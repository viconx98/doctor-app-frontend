import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { SubmitReviewRequest, UserAppointment } from "../types/appointments";
import { AuthData, SigninRequest, SignupRequest } from "../types/auth";
import { SliceState } from "../types/slice";

interface UserAppointmentsState extends SliceState {
    currentExpanded: number | null;
    appointments: UserAppointment[];
    pastAppointments: UserAppointment[];
}

const initialState: UserAppointmentsState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    currentExpanded: null,
    appointments: [],
    pastAppointments: []
}

const fetchUserAppointments = createAsyncThunk(
    "userAppointmentsSlice/fetchUserAppointments",
    async () => {
        const query = { status: "pending" }
        const response = await axiosClient.get(Endpoints.Patient + Endpoints.GetAppointments, { params: query })

        return response.data as UserAppointment[]
    }
)

const fetchUserPastAppointments = createAsyncThunk(
    "userAppointmentsSlice/fetchUserPastAppointments",
    async () => {
        const query = { status: "completed,cancelled" }
        const response = await axiosClient.get(Endpoints.Patient + Endpoints.GetAppointments, { params: query })

        return response.data as UserAppointment[]
    }
)

const submitReview = createAsyncThunk(
    "userAppointmentsSlice/submitReview",
    async (request: SubmitReviewRequest) => {
        const response = await axiosClient.post(Endpoints.Patient + Endpoints.RateAndReview, request)

        return response.data as UserAppointment
    }
)

const userAppointmentsSlice = createSlice({
    name: "userAppointmentsSlice",
    initialState: initialState,
    reducers: {
        setCurrentExpanded(state, action: PayloadAction<number>) {
            state.currentExpanded = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserAppointments.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchUserAppointments.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            state.appointments = action.payload
        }).addCase(fetchUserAppointments.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!
        })

        builder.addCase(fetchUserPastAppointments.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchUserPastAppointments.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            state.pastAppointments = action.payload
        }).addCase(fetchUserPastAppointments.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!
        })

        builder.addCase(submitReview.pending, (state, action) => {
            state.isLoading = true
        }).addCase(submitReview.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            const newAppointment = action.payload
            const oldAppointmentIdx = state.pastAppointments.findIndex(apt => apt.id === newAppointment.id)

            state.pastAppointments[oldAppointmentIdx] = newAppointment
        }).addCase(submitReview.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!
        })
    }
})


export const userApoointmentsActions = { ...userAppointmentsSlice.actions }
export const userApoointmentsAsyncActions = { fetchUserAppointments, fetchUserPastAppointments, submitReview }
export default userAppointmentsSlice.reducer