import BaseModel from './BaseModel'

export default class Department extends BaseModel {
    async getDepartmentLastCode(data) {
        return this.authFetch({
            url: "department/getDepartmentLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getDepartmentBy(data) {
        return this.authFetch({
            url: "department/getDepartmentBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getDepartmentByCode(data) {
        return this.authFetch({
            url: "department/getDepartmentByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async insertDepartment(data) {
        return this.authFetch({
            url: "department/insertDepartment",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateDepartmentBy(data) {
        console.log(data);
        return this.authFetch({
            url: "department/updateDepartmentBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async deleteDepartmentByCode(data) {
        console.log(data);
        return this.authFetch({
            url: "department/deleteDepartmentByCode",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteMachineByCode(data) {
        console.log(data);
        return this.authFetch({
            url: "department/deleteMachineByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
