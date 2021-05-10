import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/shared/services/client.service';
import { QuoteService } from 'src/app/shared/services/quote.service';

declare let $: any;

@Component({
    selector: 'app-create-quote',
    templateUrl: './create-quote.component.html',
    styleUrls: ['./create-quote.component.css']
})
export class CreateQuoteComponent implements OnInit {


    files;
    client_data;
    client_username;
    selected_client;
    file = {
        name: "",
        type: false
    }

    constructor(private quoteservice: QuoteService, private clientservice: ClientService, private modalservice: NgbModal, private route: Router) { }

    uploadRemove(){
        $(".file-group").removeClass("active")
        setTimeout(() => {
            $(".file-group").removeClass("show")
        }, 150)  
    }

    uploadDisplay(){
        $(".file-group").addClass("active")
        setTimeout(() => {
            $(".file-group").addClass("show")
        }, 150)
    }


    dropzone(){
        $(".drag-zone").on("dragover", (e) => {
            e.preventDefault()
            this.files = null;
            $(".drag-zone").addClass("drag")
            this.uploadRemove();
        })

        $(".drag-zone").on("dragleave dragend", () => {
            if(!this.files){
                $(".drag-zone").addClass("drag")
                $(".drop-icon").removeClass("hide")
            }
            else{
                $(".drag-zone").removeClass("drag")
                this.uploadRemove()
            }

            console.log(this.files)
        })

        $(".drag-zone").click(() => {
            $(".drag-zone").removeClass("drag")
            $(".drop-icon").removeClass("hide")
            this.uploadRemove()

            $("#files").trigger("click")
        })

        $("#files").change((e) => {
            this.files = e.target.files[0];
            this.file.name = this.files ? this.files.name:null;


            $(".drop-icon").addClass("hide")
            this.uploadDisplay();

            console.log(this.files)
        })

        $(".drag-zone").on("drop", (e) => {
            e.preventDefault();
            $(".drop-icon").addClass("hide")
            this.uploadDisplay();
            this.files = e.originalEvent.dataTransfer.files[0];
            this.file.name = this.files ? this.files.name:null;
            this.file.type = this.files && this.files.type == 'application/pdf' ? true:false;
            console.log(this.files)
            
        })
    }

    saveQuote(){
        if(this.files){
            if(this.selected_client){
                let data = new FormData();
                data.append("file-img", this.files)
                data.append("clientId", this.selected_client.clientId);
                data.append("num", "N"+Date.now().toString());
                data.append("name", this.file.name);
                data.append("state", "1");
    
                this.quoteservice.createQuotation(data).subscribe(res => {
                    alert("Cotizacion Guardada!")

                    setTimeout(() => {
                        this.route.navigate(['/dashboard/quotes/list']);
                    }, 500)
                })
            }
            else{
                alert("Seleccione un cliente!")
            }
        }
    }

    back(){
        this.route.navigate(['/dashboard/quotes/list']);
    }

    assignclient(){
        this.client_username = this.selected_client.userName + " " + this.selected_client.lastName
        this.modalservice.dismissAll();
    }

    searchclient(e){
        if(e.target.value){
            this.client_data = this.client_data.filter(c => c.userName.includes(e.target.value))
        }
        else{
            this.getData();
        }
    }

    selectclient(modal){
        this.modalservice.open(modal, { size: 'lg' });
    }

    getData(){
        this.clientservice.getAll().subscribe(res => this.client_data = res);
    }

    select(e, data){
        $(".btn-assign").removeClass("selected")
        $(e.target).addClass("selected")

        this.selected_client = data;
    }

    ngOnInit(): void {
        this.dropzone()
        this.getData();
    }

}