import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProviderService } from 'src/app/shared/services/provider.service';

declare let $: any;

@Component({
    selector: 'app-providers',
    templateUrl: './providers.component.html',
    styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

    data = [];
    data_c = [];
    mtitle;
    mode;
    current;
    filter_provider = {
        serviceType : '-1'
    }
    userdata = JSON.parse(localStorage.getItem("userdata"))

    form = new FormGroup({
        providersId: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        serviceType: new FormControl('', [Validators.required]),
        cellphone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        managerOrOwner: new FormControl('', [Validators.required]),
        operationalStaff: new FormControl('', [Validators.required]),
        commissionEstablished: new FormControl('', [Validators.required]),
        provider_state: new FormControl('', [Validators.required]),
    })

    constructor(private providerservice: ProviderService, private modalservice: NgbModal) { }

    getData(){
        this.providerservice.getAll().subscribe((res:any) => {
            this.data = res
            this.data_c = res
        });
    }

    submit(){
        if(this.form.valid){
            if(this.mode){
                this.form.value.acc_state = 0

                this.providerservice.create(this.form.value).subscribe(res => {
                    this.modalservice.dismissAll();
                    console.log(res);
                    setTimeout(() => {
                        alert("Account created!")
                        this.getData();
                    }, 500);
                })
            }
            else{
                this.current.company = this.form.value.company;
                this.current.serviceType = this.form.value.serviceType;
                this.current.cellphone = this.form.value.cellphone;
                this.current.address = this.form.value.address;
                this.current.email = this.form.value.email;
                this.current.managerOrOwner = this.form.value.managerOrOwner
                this.current.operationalStaff = this.form.value.operationalStaff
                this.current.commissionEstablished = this.form.value.commissionEstablished
                this.current.provider_state = this.form.value.provider_state,
                

                this.providerservice.update(this.current).subscribe(res => {
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
        this.mtitle = "Update Provider";
        this.mode = false;
        this.modalservice.open(modal);
        this.form.patchValue({
            providersId: data.providersId,
            company: data.company,
            serviceType: data.serviceType,
            cellphone: data.cellphone,
            address: data.address,
            password: data.password,
            email: data.email,
            managerOrOwner: data.managerOrOwner,
            operationalStaff: data.operationalStaff,
            commissionEstablished: data.commissionEstablished,
            provider_state: data.provider_state
        })

        this.current = data;
    }

    changeState(e){
        $(e.target).parent().find(".input-switch").trigger("click")
    }

    create(modal){
        this.mtitle = "New Provider";
        this.form.reset()
        this.form.patchValue({
            providersId: '1',
            provider_state: '-1'
        })
        this.mode = true;
        this.modalservice.open(modal);
    }

    deletes(data){
        this.providerservice.delete(data.providersId).subscribe(res => {
            this.modalservice.dismissAll();
            setTimeout(() => {
                alert("Account removed!")
                this.getData();
            }, 500);
        })
    }

    updateState(e, data){
        data.acc_state = e.target.checked ? '1':'0'
        this.providerservice.update(data).subscribe(res => {
            if(!e.target.checked){
                alert("Account disabled!")
            }
            else{
                alert("Account enabled!")
            }
            this.getData();
        })
    }

    resetFilter(){
        this.filter_provider.serviceType = '-1'
        this.data = this.data_c
    }

    filter(){
        this.data = this.data_c
        setTimeout(() => {
            if(this.filter_provider.serviceType){
                this.data = this.data.filter(m => m.serviceType == this.filter_provider.serviceType)
                
            }
            else{
                this.data = this.data_c
            }
        }, 150)
    }

    ngOnInit(): void {
        this.getData()
    }

}
