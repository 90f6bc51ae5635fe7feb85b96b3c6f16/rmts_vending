import BaseModel from './BaseModel'

export default class JobOpModel extends BaseModel {

    async getJobBy(data) {
        return this.authFetch({
            url: 'job/getJobBy',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getJobOpBy(data) {
        return this.authFetch({
            url: 'job-op/getJobOpBy',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getJobOpByCode(data) {
        return this.authFetch({
            url: 'job-op/getJobOpByCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getMachineByJobOpCode(data) {
        return this.authFetch({
            url: 'takeouttool/getMachineByJobOpCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getProcressByJobOpCode(data) {
        return this.authFetch({
            url: 'takeouttool/getProcressByJobOpCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getToolUseByJobOpToolCode(data) {
        return this.authFetch({
            url: 'takeouttool/getToolUseByJobOpToolCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getStocklayoutByProductCode(data) {
        return this.authFetch({
            url: 'takeouttool/getStocklayoutByProductCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async updateProductUnitByProductCode(data) {
        return this.authFetch({
            url: 'takeouttool/updateProductUnitByProductCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getProductByProductCodeAndName(data) {
        return this.authFetch({
            url: 'takeouttool/getProductByProductCodeAndName',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

}