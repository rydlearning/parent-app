export interface Props {
    id: number | string
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
    country: string
    state: string
    timezone: string
    timeOffset: number
    token: string
    status: boolean
    createdAt: string
    updatedAt: string
}

export interface UserInfoProps extends Props {}

export interface TimeProps {}