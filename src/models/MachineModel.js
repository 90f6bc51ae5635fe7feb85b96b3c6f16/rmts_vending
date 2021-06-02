import BaseModel from './BaseModel'

export default class Machine extends BaseModel {
    async generateMachineLastCode(data) {
        return this.authFetch({
            url: "machine/getMachineLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getMachineLastCode(data) {
        return this.authFetch({
            url: "machine/getmachineLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getMachineBy(data) {
        return this.authFetch({
            url: "machine/getMachineBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getMachineByCode(data) {
        return this.authFetch({
            url: "machine/getMachineByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateMachineBy(data) {
        return this.authFetch({
            url: "machine/updateMachineBy",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async insertMachine(data) {
        return this.authFetch({
            url: "machine/insertMachine",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteMachineByCode(data) {
        return this.authFetch({
            url: "machine/deleteMachineByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
