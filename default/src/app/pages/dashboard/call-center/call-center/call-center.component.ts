import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallCenterService } from 'src/app/shared/services/call-center.service';

@Component({
    selector: 'app-call-center',
    templateUrl: './call-center.component.html',
    styleUrls: ['./call-center.component.css']
})
export class CallCenterComponent implements OnInit {

    data;
    mtitle;
    mode;
    current;

    form = new FormGroup({
        callCenterId: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        cellphone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        workingHours: new FormControl('', [Validators.required]),
        monthlySalary: new FormControl('', [Validators.required]),
        extraAllocation: new FormControl('', [Validators.required])
    })

    constructor(private callcenterservice: CallCenterService, private modalservice: NgbModal) { }

    getData(){
        this.callcenterservice.getAll().subscribe(res => this.data = res);
    }

    submit(){
        if(this.form.valid){
            if(this.mode){
                this.form.value.acc_state = 0

                this.callcenterservice.create(this.form.value).subscribe(res => {
                    this.modalservice.dismissAll();
                    console.log(res);
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
                this.current.workingHours = this.form.value.workingHours
                this.current.monthlySalary = this.form.value.monthlySalary
                this.current.extraAllocation = this.form.value.extraAllocation

                this.callcenterservice.update(this.current).subscribe(res => {
                    this.modalservice.dismissAll();
                    setTimeout(() => {
                        alert("Account edited!")
                        this.getData();
                    }, 500);
                })
            }
        }
        else{
            alert("Check your information and fill in all the spaces!")
        }
    }

    edit(modal, data){
        this.mtitle = "Update Call-Center";
        this.mode = false;
        this.modalservice.open(modal);
        this.form.patchValue({
            callCenterId: data.callCenterId,
            userName: data.userName,
            lastName: data.lastName,
            cellphone: data.cellphone,
            address: data.address,
            password: data.password,
            email: data.email,
            workingHours: data.workingHours,
            monthlySalary: data.monthlySalary,
            extraAllocation: data.extraAllocation
        })

        this.current = data;
    }

    create(modal){
        this.mtitle = "New Call-Center";
        this.form.reset()
        this.form.patchValue({
            callCenterId: '1'
        })
        this.mode = true;
        this.modalservice.open(modal);
    }

    deletes(data){
        this.callcenterservice.delete(data.callCenterId).subscribe(res => {
            this.modalservice.dismissAll();
            setTimeout(() => {
                alert("Account removed!")
                this.getData();
            }, 500);
        })
    }

    updateState(e, data){
        data.acc_state = e.target.checked ? '1':'0'
        this.callcenterservice.update(data).subscribe(res => {
            if(!e.target.checked){
                alert("Account disabled!")
            }
            else{
                alert("Account enabled!")
            }

            this.getData();
        })
    }

    ngOnInit(): void {
        this.getData();
    }

}
