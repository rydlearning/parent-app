import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import { CreateNewPassword, ErrorPage, ForgotPassword, Home, SignIn, SignUp, SurveyForm } from "../pages";
import SuccessPage from "../pages/auth/sign-up/SuccessPage";
import AuthMiddleware from "./AuthMiddleware";
import CertificateView from "../pages/CertificateView";
import DownloadCertificate from "../pages/DownloadCertificate";
import PreviewDownloadCertificate from "../pages/PreviewDownloadCertificate";
import SingleReportView from "../pages/dashboard/home/SingleReportView";


const routes: RouteObject[] = [
    { path: '/', element: <Navigate to="/parent/sign-in" replace />},
    { path: '/parent/sign-up', element: <SignUp />},
    { path: '/parent/sign-in', element: <SignIn />},
    { path: '/parent/forgot-psd', element: <ForgotPassword />},
    { path: '/parent/create-psd', element: <CreateNewPassword />},
    { path: '/parent/certificate', element: <CertificateView />},
    { path: '/parent/certificate/download/:id', element: <DownloadCertificate />},
    { path: '/parent/certificate/preview/:id', element: <PreviewDownloadCertificate />},
    { path: '/parent/report/preview/:id', element: <SingleReportView />},
    { path: '/parent/home', element: (
         <AuthMiddleware>
            <Home/>
        </AuthMiddleware> 
    )},
    { path: '/success', element: <SuccessPage />},
    { path: '*', element: <ErrorPage />},
    // { path: '/survey', element: <SurveyForm />}
];

export { routes };
