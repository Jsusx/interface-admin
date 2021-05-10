import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {

    constructor(private http: HttpClient, @Inject("API_URL") private API_URL) { }

    getAll(){
        let data = {
            controlName: "Provider",
            method: "GetAll"
        }
        return this.http.post(this.API_URL, data);
    }

    getAllProviderAssignaments(){
        let data = {
            controlName: "Provider",
            method: "GetAssignaments"
        }
        return this.http.post(this.API_URL, data);
    }

    getAsignedProviders(service){
        let data = {
            controlName: "Provider",
            method: "GetAssignedProviders",
            service: service
        }
        return this.http.post(this.API_URL, data);
    }

    assignClient(data){
        let dat = {
            controlName: "Provider",
            method: "Assign",
            ...data
        }
        return this.http.post(this.API_URL, dat);
    }

    create(data){
        let dat = {
            ...data,
            controlName: "Provider",
            method: "Create"
        }

        return this.http.post(this.API_URL, dat)
    }

    update(data){
        let dat = {
            controlName: "Provider",
            method: "Update",
            ...data
        }
        return this.http.post(this.API_URL, dat)
    }

    delete(id){
        let dat = {
            controlName: "Provider",
            method: "Delete",
            providersId: id
        }
        return this.http.post(this.API_URL, dat)
    }
    
    GetPayments() {
        let dat = {
            controlName: "Provider",
            method: "GetPayments"
        }

        return this.http.post(this.API_URL, dat)
    }

    savePayment(data) {
        let dat = {
            ...data,
            controlName: "Provider",
            method: "SavePayment"
        }

        return this.http.post(this.API_URL, dat)
    }

    updatePayment(data) {
        let dat = {
            ...data,
            controlName: "Provider",
            method: "UpdatePayment"
        }

        return this.http.post(this.API_URL, dat)
    }

    deletePayment(id) {
        let dat = {
            controlName: "Provider",
            method: "DeletePayment",
            providerpayment_id: id
        }

        return this.http.post(this.API_URL, dat)
    }

    uploadImage(data) {
        return this.http.post("http://localhost/api-proyecto-arturo/Files/Upload.php", data)
    }
}
