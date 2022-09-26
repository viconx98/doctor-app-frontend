export interface Patient {
    id: number;
    name: string;
    email: string,
    onboardingComplete: boolean,
    age: number,
    gender: string,
    healthHistory: string,
    location: string,
    lookingFor: string[]
}

export interface DoctorAppointment {
    id: number;
    doctorId: number;
    patientId: number;
    patient: Patient;
    date: string;
    slot: string;
    status: "pending" | "completed" | "cancelled";
    prescriptions?: string;
    notes?: string;
    feedbackCompleted: boolean;
    rating?: number;
    review?: string;
}


export interface AppointmentsRequest {
    date?: string;
    status?: string;
}

export interface CloseAppointmentRequest {
    appointmentId: number;
    notes?: string;
    prescriptions: string;
}