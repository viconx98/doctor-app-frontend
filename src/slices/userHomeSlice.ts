
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { AppointmentRequest, Doctor, SlotRequest } from "../types/home";
import { SliceState } from "../types/slice";
import dayjs, { Dayjs } from 'dayjs';

interface AvailableSlots {
    [key: string]: boolean
}

interface UserHomeState extends SliceState {
    doctors: Doctor[];

    showAppointmentDialog: boolean;
    doctorId: number | null;
    avaialbleSlots: AvailableSlots | null;
    selectedSlot: string | null;
    isFetchingSlots: boolean;
    onBoardingComplete: boolean | null;
}   

// TODO: Dynamically set doctorId based on whatever card was clicked
const initialState: UserHomeState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    doctors: [],

    // Appointment Booking Dialog
    showAppointmentDialog: false,
    doctorId: 5,
    avaialbleSlots: null,
    selectedSlot: null,
    isFetchingSlots: false,
    onBoardingComplete: null
}

const verifyOnboard = createAsyncThunk(
    "userHomeSlice/verifyOnboard",
    async () => {
        const response = await axiosClient.get(Endpoints.Patient + Endpoints.OnboardStatus)

        return response.data.onboardingCompleted as boolean
    }
)

const fetchAllDoctors = createAsyncThunk(
    "userHomeSlice/fetchAllDoctors",
    async () => {
        const response = await axiosClient.get(Endpoints.Patient + Endpoints.AllDoctors)

        return response.data as Doctor[]
    }
)

const fetchDoctorSlots = createAsyncThunk(
    "userHomeSlice/fetchDoctorSlots",
    async (request: SlotRequest) => {
        console.log(request)
        const response = await axiosClient.post(Endpoints.Patient + Endpoints.DoctorSlots, request)

        const slots = response.data

        for (const key in slots) {
            slots[key] = false
        }

        return slots as AvailableSlots
    }
)

const bookAppointment = createAsyncThunk(
    "userHomeSlice/bookAppointment",
    async (request: AppointmentRequest) => {
        const response = await axiosClient.post(Endpoints.Patient + Endpoints.CreateAppointment, request)

        return response.data
    }
)

const userHomeSlice = createSlice({
    name: "userHomeSlice",
    initialState: initialState,
    reducers: {
        setShowAppointmentDialog(state, action: PayloadAction<[boolean, number | null]>) {
            state.showAppointmentDialog = action.payload[0]
            state.doctorId = action.payload[1]
        },
        setSelectedSlot(state, action: PayloadAction<string>) {
            const currentSlot = state.selectedSlot
            const selectedSlot = action.payload

            if (state.avaialbleSlots !== null) {
                if (currentSlot !== null)
                    state.avaialbleSlots[currentSlot] = false

                state.avaialbleSlots[selectedSlot] = true
            }

            state.selectedSlot = selectedSlot
        },
        resetDialog(state, action: PayloadAction<void>){
            state.showAppointmentDialog = false
            state.avaialbleSlots = null
            state.selectedSlot = null
            state.doctorId = null
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
            state.isFetchingSlots = true
            state.selectedSlot = null
            state.isLoading = true
        }).addCase(fetchDoctorSlots.fulfilled, (state, action) => {
            state.isFetchingSlots = false
            state.isLoading = false
            state.isError = false

            state.avaialbleSlots = action.payload
        }).addCase(fetchDoctorSlots.rejected, (state, action) => {
            state.isFetchingSlots = false
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!

        })

        builder.addCase(bookAppointment.pending, (state, action) => {
            state.isLoading = true
        }).addCase(bookAppointment.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            state.showAppointmentDialog = false
        }).addCase(bookAppointment.rejected, (state, action) => {
            state.isFetchingSlots = false
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!
        })

        builder.addCase(verifyOnboard.pending, (state, action) => {
            state.isLoading = true
        }).addCase(verifyOnboard.fulfilled, (state, action) => {
            state.isLoading = false
            state.isError = false

            state.onBoardingComplete = action.payload
        }).addCase(verifyOnboard.rejected, (state, action) => {
            state.isFetchingSlots = false
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!
        })

    }
})

export const userHomeActions = { ...userHomeSlice.actions }
export const userHomeAsyncActions = { fetchAllDoctors, fetchDoctorSlots, bookAppointment, verifyOnboard }

export default userHomeSlice.reducer