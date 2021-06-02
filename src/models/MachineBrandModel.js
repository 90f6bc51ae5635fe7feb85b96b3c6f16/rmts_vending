import BaseModel from './BaseModel'

export default class MachineBrand extends BaseModel {
    async generateMachineLastCode(data) {
        return this.authFetch({
            url: "machine-brand/generateMachineBrandLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getmachineBrandLastCode(data) {
        return this.authFetch({
            url: "machine-brand/getmachineBrandLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getMachineBrandBy(data) {
        return this.authFetch({
            url: "machine-brand/getMachineBrandBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getMachineBrandByCode(data) {
        return this.authFetch({
            url: "machine-brand/getMachineBrandByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateMachineBrandBy(data) {
        console.log(data);
        return this.authFetch({
            url: "machine-brand/updateMachineBrandBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertMachineBrand(data) {
        console.log(data);
        return this.authFetch({
            url: "machine-brand/insertMachineBrand",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteMachineBrandByCode(data) {
        console.log(data);
        return this.authFetch({
            url: "machine-brand/deleteMachineBrandByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
