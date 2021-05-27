import BaseModel from './BaseModel'

export default class ReceiveToolModel extends BaseModel {

    async getProductByProductCodeAndName(data) {
        return this.authFetch({
            url: 'receivetool/getProductByProductCodeAndName',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getStocklayoutByProductCode(data) {
        return this.authFetch({
            url: 'receivetool/getStocklayoutByProductCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async updateProductUnitByProductCode(data) {
        return this.authFetch({
            url: 'receivetool/updateProductUnitByProductCode',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

}