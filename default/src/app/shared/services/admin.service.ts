import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient, @Inject("API_URL") private API_URL) { }

    getAll(){
        let data = {
            controlName: "Admin",
            method: "GetAll"
        }
        return this.http.post(this.API_URL, data);
    }

    update(data){
        let dat = {
            controlName: "Admin",
            method: "Update",
            ...data
        }
        return this.http.post(this.API_URL, dat);
    }

    getNotifications(data){
        let dat = {
            controlName: 'Notification',
            method: 'GetNotifications',
            ...data
        }

        return this.http.post(this.API_URL, dat)
    }

    deleteNotification(id){
        let dat = {
            controlName: 'Notification',
            method: 'RemoveNotification',
            notificationId: id
        }

        return this.http.post(this.API_URL, dat)
    }

    createNotification(data){
        let dat = {
            controlName: 'Notification',
            method: 'CreateNotification',
            ...data
        }

        return this.http.post(this.API_URL, dat)
    }
}
