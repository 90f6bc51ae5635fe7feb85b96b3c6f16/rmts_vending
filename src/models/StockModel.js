import BaseModel from './BaseModel'

export default class Stock extends BaseModel {
    async generateStockLastCode(data) {
        return this.authFetch({
            url: "stock/generateStockLastCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getStockByCode(data) {
        return this.authFetch({
            url: "stock/getStockByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getStock(data) {
        return this.authFetch({
            url: "stock/getStock",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getStockCode(data) {
        return this.authFetch({
            url: "stock/getStockCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async updateStock(data) {
        return this.authFetch({
            url: "stock/updateStock",
            method: "POST",
            body: JSON.stringify(data),
        });
       
    }

    async insertStock(data) {
        return this.authFetch({
            url: "stock/insertStock",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteStockByCode(data) {
        console.log(data);
        return this.authFetch({
            url: "stock/deleteStockByCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
}
