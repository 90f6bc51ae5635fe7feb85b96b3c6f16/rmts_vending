import BaseModel from './BaseModel'

export default class MachineModel extends BaseModel {
    async generateMachineModelLastCode(data) {
        return this.authFetch({
            url: "machine-model/generateMachineModelLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getMachineModelLastCode(data) {
        return this.authFetch({
            url: "machine-model/getMachineModelLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getMachineModelBy(data) {
        return this.authFetch({
            url: "machine-model/getMachineModelBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getMachineModelByCode(data) {
        return this.authFetch({
            url: "machine-model/getMachineModelByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateMachineModelBy(data) {
       
        return this.authFetch({
            url: "machine-model/updateMachineModelBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertMachineModel(data) {
      
        return this.authFetch({
            url: "machine-model/insertMachineModel",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteMachineModelByCode(data) {
       
        return this.authFetch({
            url: "machine-model/deleteMachineModelByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
