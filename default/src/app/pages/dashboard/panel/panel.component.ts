import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAssistantService } from 'src/app/shared/services/admin-assistant.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { CallCenterService } from 'src/app/shared/services/call-center.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { QuoteService } from 'src/app/shared/services/quote.service';

declare let $: any;

@Component({
    selector: 'app-panel',
    templateUrl: './panel.component.html',
    styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {

    visible_bar = true;
    visible_ntfs = false;
    userdata;
    user_notfs = [];
    mtitle;
    current;

    formAssistant = new FormGroup({
        assistantAdmId: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        cellphone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })

    formAdmin = new FormGroup({
        adminId: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        cellphone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })

    formCallCenter = new FormGroup({
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

    formClient = new FormGroup({
        clientId: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        cellphone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })

    formProvider = new FormGroup({
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
    })

    formQuote = new FormGroup({
        cotizadorId: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        cellphone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        asignation: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required])
    })


    constructor(private route: Router, 
                private modalservice: NgbModal,
                private clientservice: ClientService,
                private assistantservice: AdminAssistantService,
                private callcenterservice: CallCenterService,
                private providerservice: ProviderService,
                private quoteservice: QuoteService,
                private adminservice: AdminService) { }


    account(){
        if(!localStorage.getItem("userdata")){
            this.route.navigateByUrl('/auth/login');
        }
        else{
            /*
            let data = JSON.parse(localStorage.getItem("userdata"))
            if(data.remember){
                this.userdata = data
            }
            else{
                this.userdata = data;
                localStorage.removeItem("userdata")
            }
            */
            this.userdata = JSON.parse(localStorage.getItem("userdata"))

            if(this.userdata.usertype == "admin_assistant" || this.userdata.usertype == "admin"){
                let data = {
                    userType: 'admin_assistant'
                }
    
                this.adminservice.getNotifications(data).subscribe((res: any) => this.user_notfs = res)
            }

        }
    }

    updateClientData(){
        this.clientservice.getAll().subscribe((res: any) => {
            let data = res.find(d => d.clientId == this.userdata.userdata.clientId)
            this.current = data;

            this.formClient.patchValue({
                clientId: data.clientId,
                userName: data.userName,
                lastName: data.lastName,
                cellphone: data.cellphone,
                address: data.address,
                password: data.password,
                email: data.email
            })
        })
    }

    updateAssistantData(){
        this.assistantservice.getAll().subscribe((res: any) => {
            let data = res.find(d => d.assistantAdmId == this.userdata.userdata.assistantAdmId)
            this.current = data;

            this.formAssistant.patchValue({
                assistantAdmId: data.assistantAdmId,
                userName: data.userName,
                lastName: data.lastName,
                cellphone: data.cellphone,
                address: data.address,
                password: data.password,
                email: data.email
            })
        })
    }

    updateCallCenterData(){
        this.callcenterservice.getAll().subscribe((res: any) => {
            let data = res.find(d => d.callCenterId == this.userdata.userdata.callCenterId)
            this.current = data;

            this.formCallCenter.patchValue({
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
        })
    }

    updateProviderData(){
        this.providerservice.getAll().subscribe((res: any) => {
            let data = res.find(d => d.providersId == this.userdata.userdata.providersId)
            this.current = data;
            
            this.formProvider.patchValue({
                providersId: data.providersId,
                company: data.company,
                serviceType: data.serviceType,
                cellphone: data.cellphone,
                address: data.address,
                password: data.password,
                email: data.email,
                managerOrOwner: data.managerOrOwner,
                operationalStaff: data.operationalStaff,
                commissionEstablished: data.commissionEstablished
            })
        })
    }

    updateQuoteData(){
        this.quoteservice.getAll().subscribe((res: any) => {
            let data = res.find(d => d.cotizadorId == this.userdata.userdata.cotizadorId)
            this.current = data;

            this.formQuote.patchValue({
                cotizadorId: data.cotizadorId,
                userName: data.userName,
                lastName: data.lastName,
                cellphone: data.cellphone,
                address: data.address,
                password: data.password,
                email: data.email,
                asignation: data.asignation,
                type: data.type
            })
        })
    }

    updateAdminData(){
        this.adminservice.getAll().subscribe((res: any) => {
            let data = res.find(d => d.adminId == this.userdata.userdata.adminId)
            this.current = data;

            this.formAdmin.patchValue({
                adminId: data.adminId,
                userName: data.userName,
                lastName: data.lastName,
                cellphone: data.cellphone,
                address: data.address,
                password: data.password,
                email: data.email
            })
        })
    }

    editProfile(modal){
        if(this.userdata){
            this.mtitle = "Your Profile"
            if(this.userdata.usertype == 'client'){
                this.updateClientData();
            }
            else if(this.userdata.usertype == 'admin_assistant'){
                this.updateAssistantData()
            }
            else if(this.userdata.usertype == 'callcenter'){
                this.updateCallCenterData()
            }
            else if(this.userdata.usertype == 'provider'){
                this.updateProviderData()
            }
            else if(this.userdata.usertype == 'quote'){
                this.updateQuoteData();
            }
            else if(this.userdata.usertype == 'admin'){
                this.updateAdminData()
            }
            this.modalservice.open(modal)
        }
    }

    submit(){
        if(this.userdata){
            if(this.userdata.usertype == 'client'){
                this.formClient.value.acc_state = '1'
                this.clientservice.update(this.formClient.value).subscribe(res => {
                    this.updateClientData();
                    this.modalservice.dismissAll();
                })
            }
            else if(this.userdata.usertype == 'admin_assistant'){
                this.formAssistant.value.acc_state = '1'
                this.assistantservice.update(this.formAssistant.value).subscribe(res => {
                    this.updateAssistantData()
                    this.modalservice.dismissAll();

                })
            }
            else if(this.userdata.usertype == 'callcenter'){
                this.formCallCenter.value.acc_state = '1'
                this.callcenterservice.update(this.formCallCenter.value).subscribe(res => {
                    this.updateCallCenterData()
                    this.modalservice.dismissAll();
                })
            }
            else if(this.userdata.usertype == 'provider'){
                this.formProvider.value.acc_state = '1'
                this.providerservice.update(this.formProvider.value).subscribe(res => {
                    this.updateProviderData()
                    this.modalservice.dismissAll();
                })
            }
            else if(this.userdata.usertype == 'quote'){
                this.formQuote.value.acc_state = '1'
                this.quoteservice.update(this.formQuote.value).subscribe(res => {
                    this.updateQuoteData()
                    this.modalservice.dismissAll();
                })
            }
            else if(this.userdata.usertype == 'admin'){
                this.adminservice.update(this.formAdmin.value).subscribe(res => {
                    this.updateAdminData()
                    this.modalservice.dismissAll();
                })
            }

            if(this.current){
                setTimeout(() => {
                    this.userdata.userdata = this.current
                    localStorage.removeItem("userdata")
                    delete this.userdata.userdata.password
                    localStorage.setItem("userdata", JSON.stringify(this.userdata))

                    alert("Information Edited & Saved!")
                }, 500);
            }
        }
    }

    removeNotification(data){
        this.adminservice.deleteNotification(data.notificationId).subscribe((res: any) => {
            if(!res.success){
                alert("Error, contact with an admin");
            }
            else{
                this.account();
            }
        })
    }

    logout(){
        this.route.navigateByUrl('/auth/login');
        localStorage.clear();
    }

    ngOnInit(): void {
        $("body").css("background-color", "#e9ecf3")
        this.account()


        setInterval(() => {
            this.account();
        }, 10000)
    }

}
