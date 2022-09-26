export interface Doctor {
    id: number;
    name: string;
    email: string;
    onboardingComplete: boolean;
    consultationFees: number;
    qualifications: string[];
    experience: number;
    hospital: string;
    location: string;
    specialities: string[];
    availability: {
        [key: string]: {
            [key: string]: boolean
        }
    }
}

export interface UserAppointment {
    id: number;
    doctorId: number;
    patientId: number;
    doctor: Doctor;
    date: string;
    slot: string;
    status: "pending" | "completed" | "cancelled";
    prescriptions?: string;
    notes?: string;
    feedbackCompleted: boolean;
    rating?: number;
    review?: string;
}

export interface SubmitReviewRequest {
    rating: number;
    review?: string;
    appointmentId: number;
}
