import BaseModel from './BaseModel'

export default class Stock extends BaseModel {
    async generateClassByStockLayoutCode(data) {
        return this.authFetch({
            url: "stock_layout/generateClassByStockLayoutCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getStockLayout(data) {
        return this.authFetch({
            url: "stock_layout/getStockLayout",
            method: "POST",
            body: JSON.stringify(data),
        });
    }
    async getProductBy(data) {
        return this.authFetch({
            url: "stock_layout/getProductBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getSuppliersBy(data) {
        return this.authFetch({
            url: "stock_layout/getSuppliersBy",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async getSuppliersByProductCode(data) {
        return this.authFetch({
            url: "stock_layout/getSuppliersByProductCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }


    async updateStockLayout(data) {
        return this.authFetch({
            url: "stock_layout/updateStockLayout",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async insertStockLayoutCode(data) {
        return this.authFetch({
            url: "stock_layout/insertStockLayoutCode",
            method: "POST",
            body: JSON.stringify(data),
        });

    }

    async deleteStockLayoutByStockYCode(data) {
        console.log(data);
        return this.authFetch({
            url: "stock_layout/deleteStockLayoutByStockYCode",
            method: "POST",
            body: JSON.stringify(data),
        });
    }

}
