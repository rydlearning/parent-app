import React, { ReactNode, useEffect } from 'react';
import UserService from '../services/user.service';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../redux/reducers/authSlice';

interface Props {
    children: ReactNode;
}

export default function UserMiddleware({ children }: Props) {
    const userService = new UserService();
    const dispatch = useDispatch();

    useEffect(() => {
        getUser();
    }, []);

    const getUser = async() => {
        const response = await userService.getUserData()
        if(!response.status){
            toast.error(response.message);
            return;
        }
        dispatch(setUserInfo(response.data));
    }

    return (
        <div>{ children }</div>
    )
}
