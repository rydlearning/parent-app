import { request } from "../hook/api";
import { ForgotPasswordProps, PasswordResetProps, SignInProps, SignUpProps } from "./_model";

/**
 *
 * @param {string} url
 * @param {string, [GET, POST, PATCH, PUT...]} method
 * @param {payload} payload
 * @param {boolean} token
 * @param {boolean} text
 * @param {boolean} form
 * @param {string | null} xHash
 * @returns Response Data;
 */



class AuthService {
    async signIn(payload: SignInProps) {

        try {
            const response = await request(
                '/parent/auth/login' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async signUp(payload: SignUpProps) {
        try {
            const response = await request(
                '/parent/auth/register' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async verifyEmail(payload: { email: string }) {
        try {
            const response = await request(
                '/common/verify/email' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async passwordReset(payload: PasswordResetProps) {
        try {
            const response = await request(
                '' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


       
    async forgotPassword(payload: ForgotPasswordProps) {
        try {
            const response = await request(
                '/parent/auth/password-reset' , 
                'POST',
                payload,
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

}


export default AuthService;