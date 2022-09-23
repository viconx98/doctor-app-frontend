
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { AuthData, SigninRequest, SignupRequest } from "../types/auth";
import { AvailabilityData, DoctorOnboardingRequest, UserOnboardingRequest } from "../types/onboarding";
import { SliceState } from "../types/slice";

interface UserInfoState extends SliceState {
    lookingFor: { id: number, title: string, selected: boolean }[];
    healthHistory: string;
    gender: string;
    age: number;
    location: string;
    onBoardingComplete: boolean;
}

const initialState: UserInfoState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    lookingFor: [
        { id: 6, title: "ABCD", selected: false },
        { id: 7, title: "EFGH", selected: false },
        { id: 8, title: "HIJK", selected: false },
        { id: 9, title: "LMNO", selected: false },
        { id: 10, title: "PQRST", selected: false },
    ],
    gender: "female",
    age: 18,
    healthHistory: "",
    location: "",
    onBoardingComplete: false
}

const completeOnboarding = createAsyncThunk(
    "userInfoSlice/completeOnboarding",
    async (obRequest: UserOnboardingRequest) => {
        const response = await axiosClient.post(Endpoints.Patient + Endpoints.Onbard, obRequest)

        return response.data
    }
)

// TODO: Fetch specialities from backend
const userInfoSlice = createSlice({
    name: "userInfoSlice",
    initialState: initialState,
    reducers: {
        setHealthHistory(state, action: PayloadAction<string>) {
            state.healthHistory = action.payload
        },
        setAge(state, action: PayloadAction<number>) {
            state.age = action.payload
        },
        setGender(state, action: PayloadAction<string>) {
            state.gender = action.payload
        },
        setLocation(state, action: PayloadAction<string>) {
            state.location = action.payload
        },
        toggleLookingFor(state, action: PayloadAction<number>) {
            const index = action.payload

            state.lookingFor[index].selected = !state.lookingFor[index].selected
        }
    },
    extraReducers: (builder) => {
        builder.addCase(completeOnboarding.pending, (state, action) => {
            state.isLoading = true
        }).addCase(completeOnboarding.fulfilled, (state, action) => {
            state.onBoardingComplete = true
            
        }).addCase(completeOnboarding.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.error = action.error.message!
        })
    },
})


export const userInfoActions = { ...userInfoSlice.actions }
export const userInfoAsyncActions = {completeOnboarding}

export default userInfoSlice.reducer
