import axios from "axios"

const baseUrl = process.env.REACT_APP_BACKEND_URL 

console.log(baseUrl)

export enum Endpoints {
    Doctor = "/doctor",
    Patient = "/patient",
    Signup = "/auth/signup",
    Signin = "/auth/signin",
    OnboardStatus = "/onboardStatus",
    Onbard = "/onboard",
    AllDoctors = "/doctors",
    DoctorSlots = "/doctorSlots",
    CreateAppointment = "/createAppointment",
    GetAppointments = "/appointments",
    CancelAppointment = "/cancelAppointment",
    CloseAppointment = "/closeAppointment"
}

const axiosClient = axios.create({
    baseURL: baseUrl
})

// Response interceptor to replace default error messages with backend error messages
axiosClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        try {
            error.message = error.response.data.message
        } catch (error) {
            console.log("Cannot find error property", error)
        } finally {
            return Promise.reject(error)
        }
    }
)

// Request interceptor to pass the token
axiosClient.interceptors.request.use(
    (request) => {
        if ( request.url?.endsWith(Endpoints.Signin) || request.url?.endsWith(Endpoints.Signup))
            return request

        const authData = JSON.parse(localStorage.getItem("authdata")!)

        const accessToken = authData.accessToken

        request.headers!.Authorization = `Bearer ${accessToken}`

        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)


export default axiosClient