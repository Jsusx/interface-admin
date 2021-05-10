import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/shared/services/client.service';
import { ProviderService } from 'src/app/shared/services/provider.service';

declare let $: any;

@Component({
    selector: 'app-providers',
    templateUrl: './provider-assign.component.html',
    styleUrls: ['./provider-assign.component.css']
})
export class ProviderAssignComponent implements OnInit {

    data;
    assignaments;
    client_data;
    userdata = JSON.parse(localStorage.getItem("userdata"))
    selected_client;
    current_client;
    current_prov;
    assign_state;
    formclient = {
        userName: "",
        lastName: ""
    }

    constructor(private providerservice: ProviderService, private clientservice: ClientService, private modalservice: NgbModal) { }


    getAll(){
        this.providerservice.getAll().subscribe(res => this.data = res)
    }

    checkassign(id){
        if(this.assignaments){
            if(this.assignaments.find(a => a.providersId == id)){
                return true;
            }
            else{
                return false;
            }
        }
    }

    assignclient(){
        if(this.selected_client){
            let data = {
                clientId: this.selected_client.clientId,
                providersId: this.current_prov.providersId,
                assign_date: new Date().getFullYear() + "-" + ((new Date().getMonth()+1).toString().length == 1 ? "0" + (new Date().getMonth()+1):new Date().getMonth()+1) + "-" + (new Date().getDate().toString().length == 1 ? "0"+(new Date().getDate()):new Date().getDate()),
                service_state: this.assign_state,
                callCenterId: this.userdata.usertype == 'callcenter' ? this.userdata.userdata.callCenterId:'1'
            }


            this.providerservice.assignClient(data).subscribe((res: any) => {
                this.modalservice.dismissAll()
                if(res.success){
                    setTimeout(() => {
                        //alert("Successfully assigned to provider " + this.current_prov.company)
                        this.getAssignaments();
                        this.getAll();
                    }, 500)
                }
                else{
                    alert("Error")
                    console.log(res)
                }
            })
        }
        else{
            alert("Seleccione un cliente")
        }
    }

    assign(modal, data){
        this.getAllClients();
        this.assign_state = "-1";
        this.selected_client = null;
        this.modalservice.open(modal, { size: 'lg' });
        this.current_prov = data;
    }

    select(e, data){
        $(".btn-assign").removeClass("selected")
        $(e.target).addClass("selected")

        this.selected_client = data;
    }

    searchclient(e){
        if(e.target.value){
            this.client_data = this.client_data.filter(c => c.userName.includes(e.target.value))
        }
        else{
            this.getAllClients();
        }
    }

    getAllClients(){
        this.clientservice.getAll().subscribe(res => this.client_data = res);
    }

    getAssignaments(){
        this.providerservice.getAllProviderAssignaments().subscribe(res => this.assignaments = res);
    }

    showuserinfo(modal, data){
        this.current_client = this.client_data.find(c => c.clientId == this.assignaments.find(a => a.providersId == data.providersId).clientId);
        if(this.current_client){
            this.formclient.userName = this.current_client.userName;
            this.formclient.lastName = this.current_client.lastName;
            this.modalservice.open(modal)
        }
    }

    ngOnInit(): void {
        this.getAll();
        this.getAllClients();
        this.getAssignaments();
    }

}
