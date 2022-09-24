import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosClient, { Endpoints } from "../axios_config";
import { AuthData, SigninRequest, SignupRequest } from "../types/auth";
import { SliceState } from "../types/slice";

interface DoctorDashboardState extends SliceState {
    currentExpanded: number | null;
}

const initialState: DoctorDashboardState = {
    isLoading: true,
    loading: null,
    isError: false,
    error: null,
    currentExpanded: null
}

const doctorDashboardSlice = createSlice({
    name: "doctorDashboardSlice",
    initialState: initialState,
    reducers: {
        setCurrentExpanded(state, action: PayloadAction<number>){
            state.currentExpanded = action.payload
        }
    },
    extraReducers: (builder) => {

    }
})
