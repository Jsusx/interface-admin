import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminAssistantService } from 'src/app/shared/services/admin-assistant.service';
import { AdminService } from 'src/app/shared/services/admin.service';
import { CallCenterService } from 'src/app/shared/services/call-center.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { ProviderService } from 'src/app/shared/services/provider.service';
import { QuoteService } from 'src/app/shared/services/quote.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    remember = false;

    formLogin = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })

    rememberAccount(e){
        if(e.target.checked){
            this.remember = true;
        }else{
            this.remember = false;
        }
    }

    constructor(private assistantservice: AdminAssistantService, 
                private adminservice: AdminService, 
                private callcenterservice: CallCenterService, 
                private clientservice: ClientService, 
                private providerservice: ProviderService, 
                private quoteservice: QuoteService,
                private route: Router) { }


    submit() {
        if (this.formLogin.valid) {
            this.adminservice.getAll().subscribe((admins: any) => {
                this.assistantservice.getAll().subscribe((assistants: any) => {
                    this.callcenterservice.getAll().subscribe((callcenters: any) => {
                        this.providerservice.getAll().subscribe((providers: any) => {
                            this.quoteservice.getAll().subscribe((quotes: any) => {
                                let data;
                                //
                                let adm = admins.find(a => a.email == this.formLogin.value.email && a.password == this.formLogin.value.password);
                                let assis = assistants.find(a => a.email == this.formLogin.value.email && a.password == this.formLogin.value.password);
                                let callcent = callcenters.find(a => a.email == this.formLogin.value.email && a.password == this.formLogin.value.password);
                                let prov = providers.find(a => a.email == this.formLogin.value.email && a.password == this.formLogin.value.password);
                                let quot = quotes.find(a => a.email == this.formLogin.value.email && a.password == this.formLogin.value.password);
                                if(adm){
                                    data = {
                                        __session : adm.adminId,
                                        userdata: adm,
                                        usertype: "admin"
                                    }
                                }
                                else if(assis && assis.acc_state){
                                    if(assis.acc_state == "1"){
                                        data = {
                                            __session : assis.assistantAdmId,
                                            userdata: assis,
                                            usertype: "admin_assistant"
                                        }
                                    }
                                    else{
                                        alert("Account disabled!")
                                    }
                                }
                                else if(callcent && callcent.acc_state){
                                    if(callcent.acc_state == "1"){
                                        data = {
                                            __session : callcent.callCenterId,
                                            userdata: callcent,
                                            usertype: "callcenter"
                                        }
                                    }
                                    else{
                                        alert("Account disabled!")
                                    }
                                }
                                else if(prov && prov.acc_state){
                                    if(prov.acc_state == "1"){
                                        data = {
                                            __session : prov.providersId,
                                            userdata: prov,
                                            usertype: "provider"
                                        }
                                    }
                                    else{
                                        alert("Account disabled!")
                                    }
                                }
                                else if(quot && quot.acc_state){
                                    if(quot.acc_state == "1"){
                                        data = {
                                            __session : quot.cotizadorId,
                                            userdata: quot,
                                            usertype: "quote"
                                        }
                                    }
                                    else{
                                        alert("Account disabled!")
                                    }
                                }
                                else{
                                    alert("Invalid Credentials")
                                }

                                /*

                                if(data){
                                    if(this.remember){
                                        this.route.navigateByUrl("/dashboard")
                                        delete data.userdata.password
                                        data.userdata.remember = true;
                                        localStorage.setItem("userdata", JSON.stringify(data));
                                    }
                                    else{
                                        this.route.navigateByUrl("/dashboard")
                                        data.userdata.remember = false;
                                        localStorage.setItem("userdata", JSON.stringify(data));
                                    }
                                }

                                */

                                if(data){
                                    this.route.navigateByUrl("/dashboard")
                                    delete data.userdata.password
                                    localStorage.setItem("userdata", JSON.stringify(data));
                                }
                            })
                        })
                    })
                })
            })
        }
    }

    ngOnInit(): void {
    }

}
