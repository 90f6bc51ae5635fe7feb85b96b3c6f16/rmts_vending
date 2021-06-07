import BaseModel from './BaseModel'

export default class Product extends BaseModel {

    async getProductLastCode(data) {
        return this.authFetch({
            url: "product/getProductLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getProductBy(data) {
        return this.authFetch({
            url: "product/getProductBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getProductByCode(data) {
        return this.authFetch({
            url: "product/getProductByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateProductBy(data) {
       console.log(data);
        return this.authFetch({
            url: "product/updateProductBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertProduct(data) {
       
        return this.authFetch({
            url: "product/insertProduct",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteProductByCode(data) {
       
        return this.authFetch({
            url: "product/deleteProductByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
