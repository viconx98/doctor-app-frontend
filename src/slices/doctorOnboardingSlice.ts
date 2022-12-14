
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { AvailabilityData, DoctorOnboardingRequest } from "../types/onboarding";
import { SliceState } from "../types/slice";

interface DoctorInfoState extends SliceState {
    qualifications: { id: number, title: string, selected: boolean }[];
    specialities: { id: number, title: string, selected: boolean }[];
    experience: number;
    hospital: string;
    location: string;
    days: string[];
    selectedDay: string;
    fees: number;
    availability: AvailabilityData;
    onBoardingComplete: boolean;

}

// TODO: Fetch qualifications and specialities from backend
const initialState: DoctorInfoState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    qualifications: [],
    specialities: [
        { id: 6, title: "ABCD", selected: false },
        { id: 7, title: "EFGH", selected: false },
        { id: 8, title: "HIJK", selected: false },
        { id: 9, title: "LMNO", selected: false },
        { id: 10, title: "PQRST", selected: false },
    ],
    experience: 1,
    hospital: "",
    location: "",
    days: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
    selectedDay: "monday",
    availability: {},
    fees: 1,
    onBoardingComplete: false
}

// Generate availability object
for (const day of initialState.days) {
    initialState.availability[day] = {}
    for (let slot = 0; slot < 1440; slot += 30) {
        initialState.availability[day][slot] = false
    }
}

const fetchQualifications = createAsyncThunk(
    "doctorInfoSlice/fetchQualifications",
    async () => {
        const response = await axiosClient.get(Endpoints.Doctor + Endpoints.Qualifications)

        const qualifications = response.data 

        for (const q of qualifications) {
            q.selected = false
        }

        return qualifications
    }
)

const fetchSpecialities = createAsyncThunk(
    "doctorInfoSlice/fetchSpecialities",
    async () => {
        const response = await axiosClient.get(Endpoints.Doctor + Endpoints.Specialities)

        const specialities = response.data 

        for (const s of specialities) {
            s.selected = false
        }

        return specialities
    }
)

const completeOnboarding = createAsyncThunk(
    "doctorInfoSlice/completeOnboarding",
    async (obRequest: DoctorOnboardingRequest) => {
        const response = await axiosClient.post(Endpoints.Doctor + Endpoints.Onbard, obRequest)

        return response.data
    }
)


const doctorInfoSlice = createSlice({
    name: "doctorInfoSlice",
    initialState: initialState,
    reducers: {
        toggleQualification(state, action: PayloadAction<number>) {
            const index = action.payload
            state.qualifications[index].selected = !state.qualifications[index].selected
        },
        toggleSpeciality(state, action: PayloadAction<number>) {
            const index = action.payload
            state.specialities[index].selected = !state.specialities[index].selected
        },
        setExperience(state, action: PayloadAction<number>) {
            state.experience = action.payload
        },
        setHospital(state, action: PayloadAction<string>) {
            state.hospital = action.payload
        },
        setLocation(state, action: PayloadAction<string>) {
            state.location = action.payload
        },
        setFees(state, action: PayloadAction<number>) {
            state.fees = action.payload
        },
        setSelectedDay(state, action: PayloadAction<string>) {
            state.selectedDay = action.payload
        },
        toggleDaySlot(state, action: PayloadAction<string>) {
            const day = state.selectedDay
            const slot = action.payload

            state.availability[day][slot] = !state.availability[day][slot]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(completeOnboarding.pending, (state, action) => {
            state.isLoading = true
        }).addCase(completeOnboarding.fulfilled, (state, action) => {
            state.isLoading = false
            state.onBoardingComplete = true
        }).addCase(completeOnboarding.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!
        })

        builder.addCase(fetchQualifications.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchQualifications.fulfilled, (state, action) => {
            state.isLoading = false

            state.qualifications = action.payload
        }).addCase(fetchQualifications.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!
        })

        builder.addCase(fetchSpecialities.pending, (state, action) => {
            state.isLoading = true
        }).addCase(fetchSpecialities.fulfilled, (state, action) => {
            state.isLoading = false

            state.specialities = action.payload
        }).addCase(fetchSpecialities.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!
        })
    }
})


export const doctorInfoActions = { ...doctorInfoSlice.actions }
export const doctorInfoAsyncActions = { completeOnboarding, fetchQualifications, fetchSpecialities }

export default doctorInfoSlice.reducer
