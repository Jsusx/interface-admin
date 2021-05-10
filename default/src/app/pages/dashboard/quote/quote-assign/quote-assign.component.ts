import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/shared/services/client.service';
import { QuoteService } from 'src/app/shared/services/quote.service';

declare let $: any;


@Component({
    selector: 'app-quotes',
    templateUrl: './quote-assign.component.html',
    styleUrls: ['./quote-assign.component.css']
})
export class QuoteAssignComponent implements OnInit {

    data;
    client_data;
    assignaments;
    selected_client;
    current_client;
    current_quot;
    formclient = {
        userName: "",
        lastName: ""
    }

    constructor(private quoteservice: QuoteService, private clientservice: ClientService, private modalservice: NgbModal) { }

    getAll(){
        this.quoteservice.getAll().subscribe(res => this.data = res);
    }

    checkassign(id){
        if(this.assignaments){
            if(this.assignaments.find(a => a.cotizadorId == id)){
                return true;
            }
            else{
                return false;
            }
        }
    }

    showuserinfo(modal, data){
        this.current_client = this.client_data.find(c => c.clientId == this.assignaments.find(a => a.providersId == data.providersId).clientId);
        if(this.current_client){
            this.formclient.userName = this.current_client.userName;
            this.formclient.lastName = this.current_client.lastName;
            this.modalservice.open(modal)
        }
    }

    assign(modal, data){
        this.current_quot = data;
        this.getAll();
        this.modalservice.open(modal, { size: 'lg' });
    }

    assignclient(){
        if(this.selected_client){
            let data = {
                clientId: this.selected_client.clientId,
                cotizadorId: this.current_quot.cotizadorId
            }
    
            this.quoteservice.assignClient(data).subscribe(res => {
                this.modalservice.dismissAll();
                setTimeout(() => {
                    this.getAll();
                    this.getAssignaments();
                }, 500)
            })
        }
        else{
            alert("Select a client!")
        }
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
        this.quoteservice.getAllQuoteAssignaments().subscribe(res => this.assignaments = res)
    }

    ngOnInit(): void {
        this.getAll();
        this.getAllClients();
        this.getAssignaments();
    }

}
