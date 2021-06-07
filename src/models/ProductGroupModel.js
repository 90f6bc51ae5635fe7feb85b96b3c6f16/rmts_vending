import BaseModel from './BaseModel'

export default class ProductGroup extends BaseModel {
    async generateProductGroupLastCode(data) {
        return this.authFetch({
            url: "product-group/generateProductGroupLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getProductGroupLastCode(data) {
        return this.authFetch({
            url: "product-group/getProductGroupLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getProductGroupBy(data) {
        return this.authFetch({
            url: "product-group/getProductGroupBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getProductGroupByCode(data) {
        return this.authFetch({
            url: "product-group/getProductGroupByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateProductGroupBy(data) {
      
        return this.authFetch({
            url: "product-group/updateProductGroupBy",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertProductGroup(data) {
       
        return this.authFetch({
            url: "product-group/insertProductGroup",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteProductGroupByCode(data) {
      
        return this.authFetch({
            url: "product-group/deleteProductGroupByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
