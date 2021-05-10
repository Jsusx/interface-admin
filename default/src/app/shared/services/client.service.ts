import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(private http: HttpClient, @Inject("API_URL") private API_URL) { }

    getAll(){
        let data = {
            controlName: "Client",
            method: "GetAll"
        }
        return this.http.post(this.API_URL, data);
    }

    create(data){
        let dat = {
            ...data,
            controlName: "Client",
            method: "Create"
        }

        return this.http.post(this.API_URL, dat)
    }

    update(data){
        let dat = {
            controlName: "Client",
            method: "Update",
            ...data
        }
        return this.http.post(this.API_URL, dat)
    }


    delete(id){
        let dat = {
            controlName: "Client",
            method: "Delete",
            clientId: id 
        }
        return this.http.post(this.API_URL, dat)
    }


    getImportedFileData(data){
        return this.http.post("http://localhost/api-proyecto-arturo/Files/Upload.php", data)
    }


}
