import BaseModel from './BaseModel'

export default class ProductBrand extends BaseModel {
    async generateProductBrandLastCode(data) {
        return this.authFetch({
            url: "product-brand/getProductBrandLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getProductBrandLastCode(data) {
        return this.authFetch({
            url: "product-brand/getProductBrandLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getProductBrandBy(data) {
        return this.authFetch({
            url: "product-brand/getProductBrandBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getProductBrandByCode(data) {
        return this.authFetch({
            url: "product-brand/getProductBrandByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateProductBrandBy(data) {
      
        return this.authFetch({
            url: "product-brand/updateProductBrandBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertProductBrand(data) {
       
        return this.authFetch({
            url: "product-brand/insertProductBrand",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteProductBrandByCode(data) {
      
        return this.authFetch({
            url: "product-brand/deleteProductBrandByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
