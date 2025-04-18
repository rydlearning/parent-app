import { ProfileUpdate } from "../components/ui"

export interface SignUpProps {
    firstName: string,
    lastName: string,
    email: string,
    country: string,
    state: string,
    phone: string,
    password: string,
    timezone: string,
    timeOffset: number

}

export interface SignInProps {
    email: string,
    password: string
}

export interface PasswordResetProps {}

export interface ForgotPasswordProps {}

export interface ProfileUpdateProps {
    firstName: string,
    lastName: string
}

export interface PasswordUpdateProps {
    password1: string,
    password2: string,
    passwordOld: string
}

export interface AddTestimonial {
    testimonial: string,
}

export interface AddChildProps {
    firstName: string,
    lastName: string,
    age: number,
    gender: string
}

export interface AddProgramProps {
    time: number,
    day: number,
    timeOffset: number,
    packageId: number,
    cohortId: number
}
