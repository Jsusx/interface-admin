import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/services/admin.service';
import { ClientService } from 'src/app/shared/services/client.service';

declare let $: any;

@Component({
    selector: 'app-clients',
    templateUrl: './clients.component.html',
    styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    zones = ["West", "Palm Beach", "Broward", "Miami Dade"];
    data = [];
    client_data;
    data_client = [];
    current;
    mode = false;
    mtitle;
    //
    files;
    file = {
        name: "",
        type: false
    }
    //
    client_note;
    search_client = {
        text: '',
        type: '-1'
    }
    filter_client = {
        username: {
            text: '',
            disabled: false
        },
        address: {
            text: '',
            disabled: false
        },
        serviceType: {
            text: '-1',
            disabled: false
        }
    }
    userdata = JSON.parse(localStorage.getItem("userdata"));

    form = new FormGroup({
        clientId: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        cellphone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        state: new FormControl('', [Validators.required]),
        zone: new FormControl('', [Validators.required])
    })

    constructor(private clientservice: ClientService, private modalservice: NgbModal, private adminservice: AdminService) { }

    getAll(){
        this.clientservice.getAll().subscribe((res: any) => {
            this.data_client = res
            this.data = res
        })
    }

    edit(modal, data){
        this.mtitle = "Update Cliente";
        this.mode = false;
        this.modalservice.open(modal);
        setTimeout(() => {
            this.form.patchValue({
                clientId: data.clientId,
                userName: data.userName,
                lastName: data.lastName,
                cellphone: data.cellphone,
                address: data.address,
                password: data.password,
                email: data.email,
                state: data.state,
                zone: data.zone
            })
            this.current = data;
        }, 150)
    }

    create(modal){
        this.mtitle = "New Cliente";
        this.form.reset()
        this.form.patchValue({
            clientId: '1',
            state: '-1',
            zone: '-1'
        })
        this.mode = true;
        this.modalservice.open(modal);
    }

    submit(){
        if(this.form.valid){
            if(this.mode){
                this.form.value.impactWindow = 0
                this.form.value.panelSolar = 0
                this.form.value.marmol = 0
                this.form.value.remodeling = 0
                this.form.value.acc_state = 0

                this.clientservice.create(this.form.value).subscribe((res: any) => {
                    if(res.success){
                        this.modalservice.dismissAll();
                        setTimeout(() => {
                            alert("Account created!")
                            this.getAll();
                        }, 500);
                    }
                    else{
                        alert("Error, contact with an admin")
                    }
                })
            }
            else{
                this.current.userName = this.form.value.userName;
                this.current.lastName = this.form.value.lastName;
                this.current.cellphone = this.form.value.cellphone;
                this.current.address = this.form.value.address;
                this.current.email = this.form.value.email;
                this.current.state = this.form.value.state;
                this.current.zone = this.form.value.zone;

                this.clientservice.update(this.current).subscribe((res: any) => {
                    if(res.success){
                        this.modalservice.dismissAll();
                        console.log(res)
                        setTimeout(() => {
                            alert("Account edited!")
                            this.getAll();
                        }, 500);
                    }
                    else{
                        alert("Error, contact with admin")
                        console.log(res)
                    }

                })
            }
        }
    }

    notes(modal, data){
        this.mtitle = data.userName + " - Notes"
        this.client_note = data.notes
        this.current = data;
        this.modalservice.open(modal)
    }

    saveNote(){
        this.current.notes = this.client_note;
        this.clientservice.update(this.current).subscribe((res: any) => {
            if(res.success){
                alert("Note Saved!")
                this.modalservice.dismissAll()
                setTimeout(() => {
                    this.getAll();
                }, 250)
            }
            else{
                alert("Note not saved")
            }
        })
    }

    updateState(e, data){
        setTimeout(() => {
            let t = e.target.getAttribute("data-table");
            data[t] = e.target.checked ? 1:0;
            this.clientservice.update(data).subscribe((res: any) => {
                if(res.success){
                    let state = e.target.checked ? "enabled":"disabled";
                    let dat = {
                        userType: "admin_assistant",
                        message: "<b>Call Center:</b> Service " + state + " in client <br>" +
                                "<b>Information:</b> <br>" +
                                "<b>Client Name: </b>" +  data.userName + " " + data.lastName  + "<br>" +
                                "<b>Service: </b>" + t + "<br>"
                    }
                    this.adminservice.createNotification(dat).subscribe((res: any) => {
                        if(res.success){
                            this.getAll()
                            if(t == "acc_state" && e.target.checked){
                                alert("Account enabled")
                            }
                        }
                        else{
                            alert("Notification sending failed, contact with an admin")
                            console.log(res)
                        }
                    })
                }
                else{
                    alert("Error, contact with an admin")
                }
            })
        }, 350)
    }

    changeState(e){
        $(e.target).parent().find(".input-switch").trigger("click")
    }

    searchClient(e){
        if(this.search_client.text){
            switch(this.search_client.type){
                case 'Username':
                    this.data = this.data.filter(c => c.userName.includes(this.search_client.text))
                    break;
                case 'Address':
                    this.data = this.data.filter(c => c.address.includes(this.search_client.text))
                    break;
                case 'Zone':
                    this.data = this.data.filter(c => c.zone.includes(this.search_client.text))
                    break;
                default:
                    this.getAll();
                    break;
            }
        }
        else{
            this.getAll();
        }
    }

    delete(data){
        this.clientservice.delete(data.clientId).subscribe((res: any) => {
            if(res.success){
                this.getAll()
                alert("Client removed successfully!")
            }
            else{
                alert("Error, contact with admin")
                console.log(res)
            }
        })
    }

    filterClient(e){
        if(this.filter_client.username.disabled || this.filter_client.address.disabled && !this.filter_client.serviceType.disabled){
            this.data = this.data.filter((m) => {
                return m.userName.includes(this.filter_client.username.text) && m.address.includes(this.filter_client.address.text)
            })
        }
        
        if(this.filter_client.serviceType.disabled){
            this.data = this.data.filter((m) => {
                return m[this.filter_client.serviceType.text].includes("1")
            })
            console.log(this.data)
        }
        /*
        if(this.filter_client.username.disabled && !this.filter_client.address.disabled && !this.filter_client.serviceType.disabled){
            if(this.filter_client.username.text){
                this.data = this.data.filter(m => m.userName.includes(this.filter_client.username.text))
            }
            else{
                this.data = this.data_client
            }
        }
        else if(!this.filter_client.username.disabled && this.filter_client.address.disabled && !this.filter_client.serviceType.disabled){
            console.log(this.filter_client.username.disabled + " " + this.filter_client.address.disabled + " " + this.filter_client.serviceType.disabled)
        }else if(!this.filter_client.username.disabled && !this.filter_client.address.disabled && this.filter_client.serviceType.disabled){
            console.log(this.filter_client.username.disabled + " " + this.filter_client.address.disabled + " " + this.filter_client.serviceType.disabled)
        }
        else{
            if(this.filter_client.username.disabled && this.filter_client.username.disabled && !this.filter_client.username.disabled){

            }
            else if(!this.filter_client.username.disabled && this.filter_client.username.disabled && this.filter_client.username.disabled){

            }
        }
        */
    }

    importFile(m){
        this.mtitle = "Import Data"
        this.modalservice.open(m);

        setTimeout(() => {
            this.dropzone()
        }, 50);
    }

    resetFilter(){
        this.filter_client.username.text = ''
        this.filter_client.address.text = ''
        this.filter_client.serviceType.text = '-1'
        this.filter_client.username.disabled = false
        this.filter_client.address.disabled = false
        this.filter_client.serviceType.disabled = false

        setTimeout(() => {
            this.getAll();
        }, 50)
    }

    //

    uploadRemove(){
        $(".file-group").removeClass("active")
        setTimeout(() => {
            $(".file-group").removeClass("show")
        }, 50)  
    }

    uploadDisplay(){
        $(".file-group").addClass("active")
        setTimeout(() => {
            $(".file-group").addClass("show")
        }, 50)
    }

    dropzone(){
        $(".drag-zone").on("dragover", (e) => {
            e.preventDefault()
            this.files = null;
            $(".drag-zone").addClass("drag")
            this.uploadRemove();
        })

        $(".drag-zone").on("dragleave dragend", () => {
            if(!this.files){
                $(".drag-zone").addClass("drag")
                $(".drop-icon").removeClass("hide")
            }
            else{
                $(".drag-zone").removeClass("drag")
                this.uploadRemove()
            }

            console.log(this.files)
        })

        $(".drag-zone").click(() => {
            $(".drag-zone").removeClass("drag")
            $(".drop-icon").removeClass("hide")
            this.uploadRemove()

            $("#files").trigger("click")
        })

        $(".drag-zone").on("drop", (e) => {
            e.preventDefault();

            let data = e.originalEvent.dataTransfer.files[0];

            if(["vnd.openxmlformats-officedocument.spreadsheetml.sheet", "vnd.ms-excel"].find(m => m == data.type.substring(data.type.indexOf("/")+1, data.type.length) && m != "")){

                this.files = data;

                $(".drop-icon").addClass("hide")
    
                this.uploadDisplay();
                
                this.file.name = this.files ? this.files.name:null;
                this.file.type = ["vnd.openxmlformats-officedocument.spreadsheetml.sheet", "vnd.ms-excel"].find(m => m.includes(this.files.type.substring(this.files.type.indexOf("/")+1, this.files.type.length))) ? true:false;
            }
            else{
                alert("Upload an excel file or csv file!")
                this.files = null;
            }

        })
    }

    changeFile(e){
        let data = e.target.files[0];

        if(["vnd.openxmlformats-officedocument.spreadsheetml.sheet", "vnd.ms-excel"].find(m => m == data.type.substring(data.type.indexOf("/")+1, data.type.length) && m != "")){
            this.files = data

            $(".drop-icon").addClass("hide")

            this.uploadDisplay();
            
            this.file.name = this.files ? this.files.name:null;
            this.file.type = ["vnd.openxmlformats-officedocument.spreadsheetml.sheet", "vnd.ms-excel"].find(m => m.includes(this.files.type.substring(this.files.type.indexOf("/")+1, this.files.type.length))) ? true:false;
        }
        else{
            alert("Upload an excel file or csv file!")
            this.files = null;
        }
    }

    importData(){
        if(this.files){
            let dat = new FormData();
            dat.append("data_file", this.files)
            this.clientservice.getImportedFileData(dat).subscribe((res_data: any) => {
                if(res_data.success){
                    let data = JSON.parse(res_data.data)
                    data.forEach((x) => {
                        this.clientservice.create(x).subscribe((res: any) => {
                            if(!res.success){
                                alert("Failed to insert data, contact with an admin!")
                                return;
                            }
                        })
                    })

                    alert("Data imported successfully!")

                    setTimeout(() => {
                        this.modalservice.dismissAll()
                        this.getAll();
                        
                    }, 150);
                }else{
                    alert("Check your file and format or contact with an admin!")
                }
            })
        }
    }


    ngOnInit(): void {
        this.getAll()
        console.log(this.userdata.userdata.usertype)
    }

}
