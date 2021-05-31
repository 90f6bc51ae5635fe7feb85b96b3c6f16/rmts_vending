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

    async getStockNull(data) {
        return this.authFetch({
            url: 'receivetool/getStockNull',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getcompartmentNullByWLH(data) {
        return this.authFetch({
            url: 'receivetool/getcompartmentNullByWLH',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getProductBy(data) {
        return this.authFetch({
            url: 'product/getProductBy',
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async getSupplierBy(data) {
        return this.authFetch({
            url: 'stock_layout/getSuppliersByProductCode',
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