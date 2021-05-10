import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProviderService } from 'src/app/shared/services/provider.service';

@Component({
    selector: 'app-provider-reports',
    templateUrl: './provider-reports.component.html',
    styleUrls: ['./provider-reports.component.css']
})
export class ProviderReportsComponent implements OnInit {

    data;
    provider = {
        type: '-1'
    }

    constructor(private providerservice: ProviderService) { }

    getData() {
        this.providerservice.getAll().subscribe(res => this.data = res);
    }

    filter(e){
        if(this.provider.type != '-1'){
            this.data = this.data.filter(p => p.provider_state.includes(this.provider.type))
        }
        else{
            this.getData();
        }
    }

    ngOnInit(): void {
        this.getData();
    }

}
