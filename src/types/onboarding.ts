export interface AvailabilityData {
    [key: string]: {
        [key: string]: boolean
    }
}

export interface OnboardingRequest {
    qualifications: string[];
    specialities: string[];
    experience: number;
    hospital: string;
    location: string;
    consultationFees: number;
    availability: AvailabilityData
}