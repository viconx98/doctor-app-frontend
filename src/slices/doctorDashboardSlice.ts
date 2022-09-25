import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { AppointmentsRequest, Appointment } from "../types/dashboard";
import { SliceState } from "../types/slice";

interface DoctorDashboardState extends SliceState {
    currentExpanded: number | null;
    appointments: Appointment[]
}

const initialState: DoctorDashboardState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    currentExpanded: null,
    appointments: []
}

const fetchAppointments = createAsyncThunk(
    "doctorDashboardSlice/fetchAppointments",
    async (request: AppointmentsRequest) => {
        let query: any = {}

        if (request.date !== undefined) query.date = request.date
        if (request.status !== undefined) query.status = request.status

        const response = await axiosClient.get(Endpoints.Doctor + Endpoints.GetAppointments, { params: query })

        return response.data as Appointment[]
    }
)

const doctorDashboardSlice = createSlice({
    name: "doctorDashboardSlice",
    initialState: initialState,
    reducers: {
        setCurrentExpanded(state, action: PayloadAction<number>) {
            console.log('sdfsdfsdfsdfs', action.payload)
            state.currentExpanded = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAppointments.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchAppointments.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            state.appointments = action.payload
        }).addCase(fetchAppointments.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.error = action.error.message!

        })
    }
})


export const doctorDashboardActions = { ...doctorDashboardSlice.actions }
export const doctorDashboardAsyncActions = { fetchAppointments }
export default doctorDashboardSlice.reducer