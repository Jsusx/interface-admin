import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuoteService } from 'src/app/shared/services/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

    data;
    mtitle;
    mode;
    current;

    form = new FormGroup({
        cotizadorId: new FormControl('', [Validators.required]),
        userName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        cellphone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
        asignation: new FormControl('', [Validators.required]),
        company: new FormControl('', [Validators.required]),
        type: new FormControl('', [Validators.required])
    })

    constructor(private quoteservice: QuoteService, private modalservice: NgbModal) { }

    getData(){
        this.quoteservice.getAll().subscribe(res => this.data = res);
    }

    submit(){
        if(this.form.valid){
            if(this.mode){
                this.form.value.acc_state = 0

                this.quoteservice.create(this.form.value).subscribe(res => {
                    this.modalservice.dismissAll();
                    setTimeout(() => {
                        alert("Account created!")
                        this.getData();
                    }, 500);
                })
            }
            else{
                this.current.userName = this.form.value.userName;
                this.current.lastName = this.form.value.lastName;
                this.current.cellphone = this.form.value.cellphone;
                this.current.address = this.form.value.address;
                this.current.email = this.form.value.email;
                this.current.asignation = this.form.value.asignation;
                this.current.company = this.form.value.company
                this.current.type = this.form.value.type;

                this.quoteservice.update(this.current).subscribe(res => {
                    this.modalservice.dismissAll();
                    setTimeout(() => {
                        alert("Account edited!")
                        this.getData();
                    }, 500);
                })
            }
        }
        else{
            alert("Check your information and fill in all the spaces!");
        }
    }

    edit(modal, data){
        this.mtitle = "Update Quote";
        this.mode = false;
        this.modalservice.open(modal);
        this.form.patchValue({
            cotizadorId: data.cotizadorId,
            userName: data.userName,
            lastName: data.lastName,
            cellphone: data.cellphone,
            address: data.address,
            password: data.password,
            email: data.email,
            asignation: data.asignation,
            company: data.company,
            type: data.type
        })

        this.current = data;
    }

    create(modal){
        this.mtitle = "New Quote";
        this.form.reset()
        this.form.patchValue({
            cotizadorId: '1',
            type: '-1'
        })
        this.mode = true;
        this.modalservice.open(modal);
    }

    deletes(data){
        this.quoteservice.delete(data.cotizadorId).subscribe(res => {
            this.modalservice.dismissAll();
            setTimeout(() => {
                alert("Account removed!")
                this.getData();
            }, 500);
        })
    }

    updateState(e, data){
        data.acc_state = e.target.checked ? '1':'0'
        this.quoteservice.update(data).subscribe(res => {
            if(!e.target.checked){
                alert("Account disabled!")
            }
            else{
                alert("Account enabled!")
            }
        })
    }
        
    ngOnInit(): void {
        this.getData();
    }

}
