import { request } from "../hook/api";
import { AddChildProps, AddProgramProps, AddTestimonial, PasswordUpdateProps, ProfileUpdateProps } from "./_model";

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



class UserService {
    async getUserData() {
        try {
            const response = await request(
                '/parent/auth/register' ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async profileUpdate(payload: ProfileUpdateProps) {
        try {
            const response = await request(
                '/parent/auth/profile-update' ,
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async passwordUpdate(payload: PasswordUpdateProps) {
        try {
            const response = await request(
                '/parent/auth/password-update' ,
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async getAllPackages() {
        try {
            const response = await request(
                '/common/package/all' ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getDayTime() {
        try {
            const response = await request(
                '/common/program/daytime' ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async addChild(payload: AddChildProps){
        try {
            const response = await request(
                '/parent/child/add' ,
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async deleteChild(payload: AddChildProps){
        try {
            const response = await request(
                `/parent/child/remove/${payload}` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async addProgram(payload: AddProgramProps, id: number | string){
        try {
            const response = await request(
                `/parent/program/add/${id}` ,
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async addTestimonial(payload: AddTestimonial){
        try {
            const response = await request(
                `/parent/testimonial` ,
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async getCart(){
        try {
            const response = await request(
                '/parent/program/get/cart' ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async deleteProgram(id: number | string){
        try {
            const response = await request(
                `/parent/program/del/cart/${id}` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async getCurrency(){
        try {
            const response = await request(
                `/parent/get/currency` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async getChildren(){
        try {
            const response = await request(
                `/parent/program/get/all` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getSurvey(){
        try {
            const response = await request(
                `/parent/survey/get` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async answerSurvey(id: string | number, payload: { response: boolean }){
        try {
            const response = await request(
                `/parent/survey/answer/${id}` ,
                'POST',
                payload,
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getAllChildren(){
        try {
            const response = await request(
                `/parent/child/get` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getProgramsCertificate(id:number){
        try {
            const response = await request(
                `/common/certificate/${id}` ,
                'GET',
                {},
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getProgramsCertificateData(id:number){
        try {
            const response = await request(
                `/common/preview/certificate/${id}` ,
                'GET',
                {},
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }


    async getCohort(){
        try {
            const response = await request(
                `/parent/program/get/cohort` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getChildPrograms(id: number | string){
        try {
            const response = await request(
                `/parent/program/child/${id}` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async checkEmail(email:string){
        try {
            const response = await request(
                `/promo/parent/get/email/${email}` ,
                'GET',
                {},
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async checkMigration(id:any){
        try {
            const response = await request(
                `/common/migration/check/${id}` ,
                'GET',
                {},
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async Migration(id:any){
        try {
            const response = await request(
                `/promo/parent/migrate/${id}` ,
                'POST',
                {},
                false,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getChildReports(id:any){
        try {
            const response = await request(
                `/parent/report/child/${id}` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getReportById(id:any){
        try {
            const response = await request(
                `/parent/report/${id}` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async getAllChildReportById(id:any){
        try {
            const response = await request(
                `/parent/report/all/child/${id}` ,
                'GET',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async commentSubmit(comment: string,id:any) {
        try {
            const response = await request(
                `/parent/report/comment/${id}` ,
                'PUT',
                {comment},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }

    async clickedReport(id:any) {
        try {
            const response = await request(
                `/parent/report/clicked/${id}` ,
                'PUT',
                {},
                true,
                false,
                false,
            )
            return response;
        }catch(err){
            throw err;
        }
    }
}


export default UserService;
