import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminAssistantService {

    constructor(private http: HttpClient, @Inject("API_URL") private API_URL) { }

    getAll(){
        let data = {
            controlName: "Assistant",
            method: "GetAll"
        }
        return this.http.post(this.API_URL, data);
    }

    create(data){
        let dat = {
            ...data,
            controlName: "Assistant",
            method: "Create"
        }

        return this.http.post(this.API_URL, dat)
    }

    update(data){
        let dat = {
            controlName: "Assistant",
            method: "Update",
            ...data
        }
        return this.http.post(this.API_URL, dat)
    }

    delete(id){
        let dat = {
            controlName: "Assistant",
            method: "Delete",
            assistantAdmId: id
        }
        return this.http.post(this.API_URL, dat)
    }

    GetPayments(){
        let dat = {
            controlName: "Assistant",
            method: "GetPayments"
        }

        return this.http.post(this.API_URL, dat)
    }

    savePayment(data){
        let dat = {
            ...data,
            controlName: "Assistant",
            method: "SavePayment"
        }

        return this.http.post(this.API_URL, dat)
    }

    updatePayment(data){
        let dat = {
            ...data,
            controlName: "Assistant",
            method: "UpdatePayment"
        }

        return this.http.post(this.API_URL, dat)
    }

    deletePayment(id){
        let dat = {
            controlName: "Assistant",
            method: "DeletePayment",
            admassispayment_id: id
        }

        return this.http.post(this.API_URL, dat)
    }

    uploadImage(data){
        return this.http.post("http://localhost/api-proyecto-arturo/Files/Upload.php", data)
    }

}
