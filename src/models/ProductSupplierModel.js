import BaseModel from './BaseModel'


export default class ProductSupplierModel extends BaseModel {
    async getProductSupplierLastCode(data) {
        return this.authFetch({
            url: 'product-supplier/getProductSupplierLastCode',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getProductSupplierBy(data) {
        console.log(data);
        return this.authFetch({
            url: 'product-supplier/getProductSupplierBy',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async getProductSupplierByCode(data) {
        return this.authFetch({
            url: 'product-supplier/getProductSupplierByCode',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async saveProductSupplierBy(data) {
        return this.authFetch({
            url: 'product-supplier/saveProductSupplierBy',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async updateProductSupplierBy(data) {
        return this.authFetch({
            url: 'product-supplier/updateProductSupplierBy',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async insertProductSupplier(data) {
        return this.authFetch({
            url: 'product-supplier/insertProductSupplier',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async createRowProductSupplier(data) {
        return this.authFetch({
            url: 'product-supplier/createRowProductSupplier',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async deleteProductSupplierByCode(data) {
        return this.authFetch({
            url: 'product-supplier/deleteProductSupplierByCode',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    async deleteProductSupplierByCodeNotIn(data) {
        return this.authFetch({
            url: 'product-supplier/deleteProductSupplierByCodeNotIn',
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

  

  
 

   

}