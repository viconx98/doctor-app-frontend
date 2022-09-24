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

export const timeLookup: any = {
    "0": "00:00",
    "30": "00:30",
    "60": "01:00",
    "90": "01:30",
    "120": "02:00",
    "150": "02:30",
    "180": "03:00",
    "210": "03:30",
    "240": "04:00",
    "270": "04:30",
    "300": "05:00",
    "330": "05:30",
    "360": "06:00",
    "390": "06:30",
    "420": "07:00",
    "450": "07:30",
    "480": "08:00",
    "510": "08:30",
    "540": "09:00",
    "570": "09:30",
    "600": "10:00",
    "630": "10:30",
    "660": "11:00",
    "690": "11:30",
    "720": "12:00",
    "750": "12:30",
    "780": "13:00",
    "810": "13:30",
    "840": "14:00",
    "870": "14:30",
    "900": "15:00",
    "930": "15:30",
    "960": "16:00",
    "990": "16:30",
    "1020": "17:00",
    "1050": "17:30",
    "1080": "18:00",
    "1110": "18:30",
    "1140": "19:00",
    "1170": "19:30",
    "1200": "20:00",
    "1230": "20:30",
    "1260": "21:00",
    "1290": "21:30",
    "1320": "22:00",
    "1350": "22:30",
    "1380": "23:00",
    "1410": "23:30"
}