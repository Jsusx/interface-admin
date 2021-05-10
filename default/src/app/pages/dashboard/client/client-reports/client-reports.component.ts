import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/shared/services/client.service';

declare let $: any;

@Component({
    selector: 'app-client-reports',
    templateUrl: './client-reports.component.html',
    styleUrls: ['./client-reports.component.css']
})
export class ClientReportsComponent implements OnInit {

    data = [];
    client = {
        state: '-1',
        zone: '-1',
        ad: '-1'
    }

    changeState(e){
        $(e.target).parent().find(".input-switch").trigger("click")
    }

    constructor(private clientservice: ClientService, private modalservice: NgbModal) { }

    getData(){
        this.clientservice.getAll().subscribe((res: any) => this.data = res)
    }

    filter(type){
        if(type == 'state'){
            if(this.client.state != '-1'){
                this.data = this.data.filter(c => c.state.includes(this.client.state))
            }
            else{
                this.getData();
            }
        }
        else if(type == 'zone'){
            if(this.client.zone != '-1'){
                this.data = this.data.filter(c => c.zone.includes(this.client.zone))
            }
            else{
                this.getData();
            }
        }
        else{
            if(this.client.ad != '-1'){
                this.data = this.data.filter(c => c[this.client.ad] == '1')
            }
            else{
                this.getData();
            }
        }
    }

    resetFilter(){
        this.getData();
        this.client.state = '-1'
        this.client.zone = '-1'
        this.client.ad = '-1'
    }

    updateState(e, data){

    }

    ngOnInit(): void {
        this.getData();
    }

}
