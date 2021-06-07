import BaseModel from './BaseModel'

export default class ProductType extends BaseModel {
    async generateProductTypeLastCode(data) {
        return this.authFetch({
            url: "product-type/generateProductTypeLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getProductTypeLastCode(data) {
        return this.authFetch({
            url: "product-type/getProductTypeLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getProductTypeBy(data) {
        return this.authFetch({
            url: "product-type/getProductTypeBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getProductTypeByCode(data) {
        return this.authFetch({
            url: "product-type/getProductTypeByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateProductTypeBy(data) {
        console.log(data);
        return this.authFetch({
            url: "product-type/updateProductTypeBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertProductType(data) {
        console.log(data);
        return this.authFetch({
            url: "product-type/insertProductType",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteProductTypeByCode(data) {
        console.log(data);
        return this.authFetch({
            url: "product-type/deleteProductTypeByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
