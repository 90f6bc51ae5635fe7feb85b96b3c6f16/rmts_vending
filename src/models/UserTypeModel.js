import BaseModel from './BaseModel'

export default class UserType extends BaseModel {
    async generateUserTypeLastCode(data) {
        return this.authFetch({
            url: "user-type/generateUserTypeLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getUserTypeLastCode(data) {
        return this.authFetch({
            url: "user-type/getUserTypeLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getUserTypeBy(data) {
        return this.authFetch({
            url: "user-type/getUserTypeBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getUserTypeByCode(data) {
        return this.authFetch({
            url: "user-type/getUserTypeByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateUserTypeBy(data) {
    
        return this.authFetch({
            url: "user-type/updateUserTypeBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertUserType(data) {
     
        return this.authFetch({
            url: "user-type/insertUserType",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteUserTypeByCode(data) {
        
        return this.authFetch({
            url: "user-type/deleteUserTypeByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
