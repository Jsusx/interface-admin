import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class QuoteService {

    constructor(private http: HttpClient, @Inject("API_URL") private API_URL) { }

    getAll() {
        let data = {
            controlName: "Quote",
            method: "GetAll"
        }
        return this.http.post(this.API_URL, data);
    }

    assignClient(data) {
        let dat = {
            controlName: "Quote",
            method: "Assign",
            ...data
        }
        return this.http.post(this.API_URL, dat);
    }

    getAllQuoteAssignaments() {
        let data = {
            controlName: "Quote",
            method: "GetAssignaments"
        }
        return this.http.post(this.API_URL, data);
    }

    getQuotes() {
        let data = {
            controlName: "Quote",
            method: "GetQuotes"
        }

        return this.http.post(this.API_URL, data);
    }

    updateQuotation(data) {
        data.append("controlName", "Quote")
        data.append("method", "UpdateQuotes")
        return this.http.post(this.API_URL, data);
    }

    createQuotation(data: FormData) {
        data.append("controlName", "Quote")
        data.append("method", "CreateQuotation")
        return this.http.post(this.API_URL, data)
    }

    create(data) {
        let dat = {
            ...data,
            controlName: "Quote",
            method: "Create"
        }

        return this.http.post(this.API_URL, dat)
    }

    update(data) {
        let dat = {
            controlName: "Quote",
            method: "Update",
            ...data
        }
        return this.http.post(this.API_URL, dat)
    }

    delete(id) {
        let dat = {
            controlName: "Quote",
            method: "Delete",
            cotizadorId: id
        }
        return this.http.post(this.API_URL, dat)
    }

    GetPayments() {
        let dat = {
            controlName: "Quote",
            method: "GetPayments"
        }

        return this.http.post(this.API_URL, dat)
    }

    savePayment(data) {
        let dat = {
            ...data,
            controlName: "Quote",
            method: "SavePayment"
        }

        return this.http.post(this.API_URL, dat)
    }

    updatePayment(data) {
        let dat = {
            ...data,
            controlName: "Quote",
            method: "UpdatePayment"
        }

        return this.http.post(this.API_URL, dat)
    }

    deletePayment(id) {
        let dat = {
            controlName: "Quote",
            method: "DeletePayment",
            quotepayment_id: id
        }

        return this.http.post(this.API_URL, dat)
    }

    uploadImage(data) {
        return this.http.post("http://localhost/api-proyecto-arturo/Files/Upload.php", data)
    }
}
