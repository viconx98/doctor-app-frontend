export interface Doctor {
    id: number;
    name: string;
    email: string;
    onboardingComplete: false;
    consultationFees: number;
    qualifications: string[];
    experience: number;
    hospital: string;
    location: string;
    specialities: string[];
}

export interface SlotRequest {
    doctorId: number;
    date: string;
}

export interface AppointmentRequest {
    doctorId: number;
    date: string;
    slot: string;
}