import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



interface Props {
    children: ReactNode;
}

export default function AuthMiddleware({ children }: Props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('ryd-parent-token');

    useEffect(() => {
        if (!token) {
            toast.error('Session Expired! Login');
            navigate('/parent/sign-in');
        }
    }, [navigate, token]);

    return <div>{children}</div>;
}
