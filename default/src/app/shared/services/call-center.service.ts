import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CallCenterService {

    constructor(private http: HttpClient, @Inject("API_URL") private API_URL) { }

    getAll() {
        let data = {
            controlName: "CallCenter",
            method: "GetAll"
        }
        return this.http.post(this.API_URL, data);
    }

    create(data){
        let dat = {
            ...data,
            controlName: "CallCenter",
            method: "Create"
        }

        return this.http.post(this.API_URL, dat)
    }

    update(data){
        let dat = {
            controlName: "CallCenter",
            method: "Update",
            ...data
        }
        return this.http.post(this.API_URL, dat)
    }

    delete(id){
        let dat = {
            controlName: "CallCenter",
            method: "Delete",
            callCenterId: id
        }
        return this.http.post(this.API_URL, dat)
    }

    GetPayments(){
        let dat = {
            controlName: "CallCenter",
            method: "GetPayments"
        }

        return this.http.post(this.API_URL, dat)
    }

    savePayment(data){
        let dat = {
            ...data,
            controlName: "CallCenter",
            method: "SavePayment"
        }

        return this.http.post(this.API_URL, dat)
    }

    updatePayment(data){
        let dat = {
            ...data,
            controlName: "CallCenter",
            method: "UpdatePayment"
        }

        return this.http.post(this.API_URL, dat)
    }

    deletePayment(id){
        let dat = {
            controlName: "CallCenter",
            method: "DeletePayment",
            callcenterpayment_id: id
        }

        return this.http.post(this.API_URL, dat)
    }

    uploadImage(data){
        return this.http.post("http://localhost/api-proyecto-arturo/Files/Upload.php", data)
    }
}
