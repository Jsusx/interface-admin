import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAssistantService } from 'src/app/shared/services/admin-assistant.service';

@Component({
    selector: 'app-admin-assistant',
    templateUrl: './admin-assistants.component.html',
    styleUrls: ['./admin-assistants.component.css']
})
export class AdminAssistantsComponent implements OnInit {

    data;
    mtitle;
    mode;
    current;

    form = new FormGroup({
        assistantAdmId: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        cellphone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })

    constructor(private assistantservice: AdminAssistantService, private modalservice: NgbModal) { }

    getData(){
        this.assistantservice.getAll().subscribe(res => this.data = res);
    }

    submit(){
        if(this.form.valid){
            if(this.mode){
                this.form.value.acc_state = 0

                this.assistantservice.create(this.form.value).subscribe(res => {
                    this.modalservice.dismissAll();
                    setTimeout(() => {
                        alert("Account created!")
                        this.getData();
                    }, 500);
                })
            }
            else{
                this.current.userName = this.form.value.userName;
                this.current.lastName = this.form.value.lastName;
                this.current.cellphone = this.form.value.cellphone;
                this.current.address = this.form.value.address;
                this.current.email = this.form.value.email;

                this.assistantservice.update(this.current).subscribe(res => {
                    this.modalservice.dismissAll();
                    setTimeout(() => {
                        alert("Account edited!")
                        this.getData();
                    }, 500);
                })
            }
        }
        else{
            alert("Check your information and fill in all the spaces!");
        }
    }

    edit(modal, data){
        this.mtitle = "Update Assistant";
        this.mode = false;
        this.modalservice.open(modal);
        this.form.patchValue({
            assistantAdmId: data.assistantAdmId,
            userName: data.userName,
            lastName: data.lastName,
            cellphone: data.cellphone,
            address: data.address,
            password: data.password,
            email: data.email
        })

        this.current = data;
    }

    create(modal){
        this.mtitle = "New Assistant";
        this.form.reset()
        this.form.patchValue({
            assistantAdmId: '1'
        })
        this.mode = true;
        this.modalservice.open(modal);
    }

    deletes(data){
        this.assistantservice.delete(data.assistantAdmId).subscribe(res => {
            this.modalservice.dismissAll();
            setTimeout(() => {
                alert("Account removed!")
                this.getData();
            }, 500);
        })
    }

    updateState(e, data){
        data.acc_state = e.target.checked ? '1':'0'
        this.assistantservice.update(data).subscribe(res => {
            if(!e.target.checked){
                alert("Account disabled!")
            }
            else{
                alert("Account enabled!")
            }
        })
    }

    ngOnInit(): void {
        this.getData();
    }

}
