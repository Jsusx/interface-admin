import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProviderService } from 'src/app/shared/services/provider.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    prov_assigneds;
    prov_concluded;
    providers;
    prov_data = [];
    modal_title;
    prov_concluded_data = []

    constructor(private providerservice: ProviderService, private modalservice: NgbModal) { }

    getAsignedProviders(){
        this.providerservice.getAsignedProviders('assigned').subscribe((res: any) => {
            this.prov_assigneds = res.size

            if(!res.empty){
                this.providerservice.getAll().subscribe((p: any) => {
                    res.data.forEach((x) => {
                        this.prov_data.push(p.find(prov => x.providersId == prov.providersId))
                    })
                })
            }
        })
        
    }

    getAsignedProvidersConcluded(){
        this.providerservice.getAsignedProviders('concluded').subscribe((res: any) => {
            this.prov_concluded = res.size

            if(!res.empty){
                this.providerservice.getAll().subscribe((p: any) => {
                    res.data.forEach((x) => {
                        this.prov_concluded_data.push(p.find(prov => x.providersId == prov.providersId && x.service_state == '1'))
                    })
                    console.log(this.prov_concluded_data)
                })
            }

            console.log(this.prov_concluded_data)
        })
    }

    assignedproviders(modal, type){
        this.prov_data = [];
        this.prov_concluded_data = [];

        if(type == 'assigned'){
            this.modal_title = "Proveedores Asignados"
            this.getAsignedProviders()
            this.modalservice.open(modal, { size: 'xl' })
        }
        else{
            this.modal_title = "Proveedores con Servicio Concluido"
            this.getAsignedProvidersConcluded();

            setTimeout(() => {
                if(this.prov_concluded_data.length != 0){
                    this.modalservice.open(modal, { size: 'xl' })
                }
                else{
                    this.modalservice.open(modal, { size: 'lg' })
                }
            }, 50)
        }
    }



    ngOnInit(): void {
        this.getAsignedProviders()
        this.getAsignedProvidersConcluded();

    }

}
