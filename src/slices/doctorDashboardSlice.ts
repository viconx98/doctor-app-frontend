import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { AppointmentsRequest, DoctorAppointment, CloseAppointmentRequest } from "../types/dashboard";
import { SliceState } from "../types/slice";

interface DoctorDashboardState extends SliceState {
    currentExpanded: number | null;
    appointments: DoctorAppointment[];
    staticAppointments: DoctorAppointment[];
    onBoardingComplete: boolean | null;
}

const initialState: DoctorDashboardState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    currentExpanded: null,
    appointments: [],
    staticAppointments: [],
    onBoardingComplete: null
}

const verifyOnboard = createAsyncThunk(
    "doctorDashboardSlice/verifyOnboard",
    async () => {
        const response = await axiosClient.get(Endpoints.Doctor + Endpoints.OnboardStatus)

        return response.data.onboardingCompleted as boolean
    }
)

const fetchAppointments = createAsyncThunk(
    "doctorDashboardSlice/fetchAppointments",
    async (request: AppointmentsRequest) => {
        let query: any = {}

        if (request.date !== undefined) query.date = request.date
        if (request.status !== undefined) query.status = request.status

        const response = await axiosClient.get(Endpoints.Doctor + Endpoints.GetAppointments, { params: query })

        return response.data as DoctorAppointment[]
    }
)

const fetchStaticAppointments = createAsyncThunk(
    "doctorDashboardSlice/fetchStaticAppointments",
    async (request: AppointmentsRequest) => {
        let query: any = {}

        if (request.date !== undefined) query.date = request.date
        if (request.status !== undefined) query.status = request.status

        const response = await axiosClient.get(Endpoints.Doctor + Endpoints.GetAppointments, { params: query })

        return response.data as DoctorAppointment[]
    }
)

const cancelAppointment = createAsyncThunk(
    "doctorDashboardSlice/cancelAppointment",
    async (appointmentId: number) => {
        const response = await axiosClient.post(Endpoints.Doctor + Endpoints.CancelAppointment, { appointmentId })

        return response.data as DoctorAppointment
    }
)

const closeAppointment = createAsyncThunk(
    "doctorDashboardSlice/closeAppointment",
    async (request: CloseAppointmentRequest) => {
        const response = await axiosClient.post(Endpoints.Doctor + Endpoints.CloseAppointment, request)

        return response.data as DoctorAppointment
    }
)

const doctorDashboardSlice = createSlice({
    name: "doctorDashboardSlice",
    initialState: initialState,
    reducers: {
        setCurrentExpanded(state, action: PayloadAction<number>) {
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

        // Fetch static/past appointments
        builder.addCase(fetchStaticAppointments.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchStaticAppointments.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            state.staticAppointments = action.payload
        }).addCase(fetchStaticAppointments.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.error = action.error.message!
        })

        // Cancel appointment
        builder.addCase(cancelAppointment.pending, (state, action) => {
            state.isLoading = true
        }).addCase(cancelAppointment.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            const cancelledAppointment = action.payload
            const appointmentIdx = state.appointments.findIndex(apt => apt.id === cancelledAppointment.id)

            state.appointments.splice(appointmentIdx, 1)
            state.staticAppointments.push(cancelledAppointment)
        }).addCase(cancelAppointment.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.error = action.error.message!

        })


        // Close appointment
        builder.addCase(closeAppointment.pending, (state, action) => {
            state.isLoading = true
        }).addCase(closeAppointment.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            const closeedAppointment = action.payload
            const appointmentIdx = state.appointments.findIndex(apt => apt.id === closeedAppointment.id)

            state.appointments.splice(appointmentIdx, 1)

            state.staticAppointments.push(closeedAppointment)
            // TODO: Move appointment object
        }).addCase(closeAppointment.rejected, (state, action) => {
            state.isError = true
            state.isLoading = false
            state.error = action.error.message!

        })

        builder.addCase(verifyOnboard.pending, (state, action) => {
            state.isLoading = true
        }).addCase(verifyOnboard.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false
            console.log(action.payload)
            state.onBoardingComplete = action.payload
        }).addCase(verifyOnboard.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!
        })
    }
})


export const doctorDashboardActions = { ...doctorDashboardSlice.actions }
export const doctorDashboardAsyncActions = { verifyOnboard, fetchAppointments, cancelAppointment, fetchStaticAppointments, closeAppointment }
export default doctorDashboardSlice.reducer