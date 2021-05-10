import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from 'src/app/shared/services/client.service';
import { QuoteService } from 'src/app/shared/services/quote.service';

declare let $: any;

@Component({
    selector: 'app-edit-quote',
    templateUrl: './edit-quote.component.html',
    styleUrls: ['./edit-quote.component.css']
})
export class EditQuoteComponent implements OnInit {

    files;
    client_data;
    client_username;
    selected_client;
    changes = {
        file: false,
        client: false
    }
    quotes;
    quote_data;
    file = {
        name: "",
        type: false
    }

    constructor(private clientservice: ClientService, private modalservice: NgbModal, private quoteservice: QuoteService, private route: Router, private aroute: ActivatedRoute) {
        this.aroute.params.subscribe((res: any) => {
            this.quoteservice.getQuotes().subscribe((qt: any) => {
                this.quote_data = qt.find(q => q.quoteid == res['id'])
                $(".drop-icon").addClass("hide")
                this.uploadDisplay()
                this.file.name = this.quote_data.name
                this.file.type = this.quote_data.url.split(".")[this.quote_data.url.split(".").length-1] == ("pdf" || "docx") ? true:false;
                this.clientservice.getAll().subscribe((ct: any) => {
                    this.client_username = ct.find(c => c.clientId == this.quote_data.clientId).userName + " " + ct.find(c => c.clientId == this.quote_data.clientId).lastName
                    this.selected_client = ct.find(c => c.clientId == res['id'])
                })
            })
        })
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

    getDataQuotes(){
        this.quoteservice.getQuotes().subscribe(res => this.quotes = res);
    }

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
        $(".drag-zone").on("mousemove", (e) => {
            e.preventDefault()
            if(!this.changes.file){
                $(".drop-icon").addClass("hide")
                this.uploadDisplay();
            }
        })

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
            this.changes.file = true;

            $(".drop-icon").addClass("hide")
            this.uploadDisplay();

            console.log(this.files)
        })

        $(".drag-zone").on("drop", (e) => {
            e.preventDefault();
            this.changes.file = true;
            $(".drop-icon").addClass("hide")
            this.uploadDisplay();
            this.files = e.originalEvent.dataTransfer.files[0];
            this.file.name = this.files ? this.files.name:null;
            this.file.type = this.files && this.files.type == 'application/pdf' ? true:false;
            console.log(this.files)
            
        })
    }

    back(){
        this.route.navigate(['/dashboard/quotes/list']);
    }

    saveQuote(){
        let data = new FormData();
        if(this.changes.file && this.changes.client || this.changes.file && !this.changes.client){
            data.append("file-img", this.files)
            data.append("clientId", this.selected_client.clientId);
            data.append("num", "N"+Date.now().toString());
            data.append("name", this.file.name);
            data.append("state", "1");
            data.append("file_status", "1")
            data.append("quoteid", this.quote_data.quoteid)

            this.quoteservice.updateQuotation(data).subscribe(res => {
                alert("Editado correctamente!")

                setTimeout(() => {
                    this.route.navigate(['/dashboard/quotes/list']);
                }, 500)
            },
            err => {
                console.log(err)
            });
        }
        else{
            data.append("clientId", this.selected_client.clientId);
            data.append("state", "1");
            data.append("file_status", "0")
            data.append("quoteid", this.quote_data.quoteid)

            this.quoteservice.updateQuotation(data).subscribe(res => {
                alert("Editado cliente correctamente!")

                setTimeout(() => {
                    this.route.navigate(['/dashboard/quotes/list']);
                }, 500)
            },
            err => {
                console.log(err)
            });
        }
    }

    select(e, data){
        $(".btn-assign").removeClass("selected")
        $(e.target).addClass("selected")

        this.changes.client = true;
        this.selected_client = data;
    }

    
    ngOnInit(): void {
        this.getData();
        this.dropzone();
        this.getDataQuotes();

        setTimeout(() => {
            console.log(this.quote_data)
        }, 150)
    }

}
