export interface AvailabilityData {
    [key: string]: {
        [key: string]: boolean
    }
}

export interface DoctorOnboardingRequest {
    qualifications: string[];
    specialities: string[];
    experience: number;
    hospital: string;
    location: string;
    consultationFees: number;
    availability: AvailabilityData
}

export interface UserOnboardingRequest {
    gender: string;
    age: number;
    healthHistory: string;
    location: string;
    lookingFor: string[]
}