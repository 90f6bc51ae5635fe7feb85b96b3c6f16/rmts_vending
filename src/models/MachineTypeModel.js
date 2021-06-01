import BaseModel from './BaseModel'

export default class MachineType extends BaseModel {
    async generateMachineTypeLastCode(data) {
        return this.authFetch({
            url: "machine-type/generateMachineTypeLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getMachineTypeLastCode(data) {
        return this.authFetch({
            url: "machine-type/getMachineTypeLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getMachineTypeBy(data) {
        return this.authFetch({
            url: "machine-type/getMachineTypeBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getMachineTypeByCode(data) {
        return this.authFetch({
            url: "machine-type/getMachineTypeByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateMachineTypeBy(data) {
       
        return this.authFetch({
            url: "machine-type/updateMachineTypeBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertMachineType(data) {
       
        return this.authFetch({
            url: "machine-type/insertMachineType",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteMachineTypeByCode(data) {
        
        return this.authFetch({
            url: "machine-type/deleteMachineTypeByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
