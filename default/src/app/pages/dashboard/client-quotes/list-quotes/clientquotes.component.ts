import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/shared/services/quote.service';

@Component({
    selector: 'app-clientquotes',
    templateUrl: './clientquotes.component.html',
    styleUrls: ['./clientquotes.component.css']
})
export class ListQuotesComponent implements OnInit {

    data;
    clients;
    client_quotes;
    userdata = JSON.parse(localStorage.getItem('userdata'))


    constructor(private quoteservice: QuoteService, private http: HttpClient) { }

    getQuotes(){
        this.quoteservice.getQuotes().subscribe((res: any) => {
            this.data = res

            this.client_quotes = res.filter(c => c.clientId == this.userdata.userdata.clientId)
        })
    }

    changeState(e, d){
        let data = new FormData();
        data.append("clientId", d.clientId);
        data.append("state", e.target.checked ? '1':'0');
        data.append("file_status", "0")
        data.append("quoteid", d.quoteid)

        this.quoteservice.updateQuotation(data).subscribe(res => {
            if(e.target.checked){
                alert("Quote enabled!")
            }
            else{
                alert("Quote disabled!")
            }

            this.getQuotes();
        })
    }

    ngOnInit(): void {
        this.getQuotes();
    }

}
