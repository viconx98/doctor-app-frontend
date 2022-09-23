
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { Doctor } from "../types/home";
import { SliceState } from "../types/slice";
import dayjs, { Dayjs } from 'dayjs';

interface AvailableSlots {
    [key: string]: boolean
}

interface UserHomeState extends SliceState {
    doctors: Doctor[];
    showAppointmentDialog: boolean;
    appointmentDate: Dayjs | null;
    doctorId: string | null;
    avaialbleSlots: AvailableSlots | null;
    selectedSlot: string | null;
}

const initialState: UserHomeState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    doctors: [],

    // Appointment Booking Dialog
    showAppointmentDialog: false,
    appointmentDate: dayjs(),
    doctorId: null,
    avaialbleSlots: null,
    selectedSlot: null
}

const fetchAllDoctors = createAsyncThunk(
    "userHomeSlice/fetchAllDoctors",
    async () => {
        const response = await axiosClient.get(Endpoints.Patient + Endpoints.AllDoctors)

        return response.data as Doctor[]
    }
)

const fetchDoctorSlots = createAsyncThunk(
    "userHomeSlice/fetchDoctorSlots",
    async () => {
        const response = await axiosClient.get(Endpoints.Patient + Endpoints.DoctorSlots)

        return response.data
    }
)

const userHomeSlice = createSlice({
    name: "userHomeSlice",
    initialState: initialState,
    reducers: {
        setShowAppointmentDialog(state, action: PayloadAction<boolean>) {
            state.showAppointmentDialog = action.payload
        },
        setAppointmentDate(state, action: PayloadAction<any>) {
            state.appointmentDate = action.payload
        },
        setSelectedSlot(state, action: PayloadAction<string>) {
            const currentSlot = state.selectedSlot
            const selectedSlot = action.payload
            
            if (currentSlot !== null && state.avaialbleSlots !== null) {
                state.avaialbleSlots[currentSlot] = false
                state.avaialbleSlots[selectedSlot] = true
            }

            state.selectedSlot = selectedSlot
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllDoctors.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchAllDoctors.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            state.doctors = action.payload
        }).addCase(fetchAllDoctors.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!

        })

        builder.addCase(fetchDoctorSlots.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchDoctorSlots.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

        }).addCase(fetchDoctorSlots.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!

        })
    }
})

export const userHomeActions = { ...userHomeSlice.actions }
export const userHomeAsyncActions = { fetchAllDoctors }

export default userHomeSlice.reducer