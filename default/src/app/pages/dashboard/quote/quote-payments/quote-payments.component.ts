import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuoteService } from 'src/app/shared/services/quote.service';

declare let $: any;

@Component({
    selector: 'app-quote-payments',
    templateUrl: './quote-payments.component.html',
    styleUrls: ['./quote-payments.component.css']
})
export class QuotePaymentsComponent implements OnInit {

    data;
    //
    mtitle;
    mode;
    //
    files;
    file_dir = "vouchers/quoters";
    //
    user ={
        name: ''
    };
    //
    current;
    selected_user;
    quote_data;

    months = ["JANUARY", "FREBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 'JULY', "AUGUST", "OCTOBER", "NOVEMBER", "DECEMBER"]

    //

    form = new FormGroup({
        quotepayment_id: new FormControl('', [Validators.required]),
        month: new FormControl('', [Validators.required]),
        comission_payment: new FormControl('', [Validators.required]),
        total: new FormControl('', [Validators.required]),
        payment_type: new FormControl('', [Validators.required]),
        deposit_date: new FormControl('', [Validators.required]),
        voucher_url: new FormControl('', [Validators.required]),
        cotizadorId: new FormControl('', [Validators.required]),
    })

    constructor(private quoteservice: QuoteService, private modalservice: NgbModal) { }

    getPayments(){
        this.quoteservice.GetPayments().subscribe(res => this.data = res);
    }

    getData(){
        this.quoteservice.getAll().subscribe(res => this.quote_data = res)
    }

    changeFile(e){
        let data = e.target.files[0];

        if(data.type.substring(0, data.type.indexOf("/")) == "image"){
            this.files = data

            $(".drop-icon").addClass("hide")

            this.uploadDisplay();

            this.readFile();
        }
        else{
            alert("Upload an image!")
        }
    }

    submit(){
        if(this.form.valid){
            if(this.mode){
                
                if(this.files){
                    let data = new FormData();
                    data.append("dir", this.file_dir);
                    data.append("file", this.files)
    
                    this.quoteservice.uploadImage(data).subscribe((ccres: any) => {
                        this.form.value.voucher_url = ccres.url
                        this.quoteservice.savePayment(this.form.value).subscribe((res: any) => {
                            if(res.success){
                                alert("Payment Saved!")
                                this.modalservice.dismissAll()
    
                                setTimeout(() => {
                                    this.getPayments();
                                }, 250)
                            }
                            else{
                                alert("Error")
                                console.log(res)
                            }
                        })
                    })
                }
                else{
                    alert("Please upload your voucher")
                }

            }
            else{
                this.current.quotepayment_id = this.form.value.quotepayment_id;
                this.current.month = this.form.value.month;
                this.current.comission_payment = this.form.value.comission_payment;
                this.current.total = this.form.value.total;
                this.current.deposit_date = this.form.value.deposit_date
                this.current.payment_type = this.form.value.payment_type;
                this.current.voucher_url = this.form.value.voucher_url
                this.current.cotizadorId = this.form.value.cotizadorId

                if(this.files){
                    let dat = new FormData();
                    dat.append("file", this.files);
                    dat.append("dir", this.file_dir)
                    this.quoteservice.uploadImage(dat).subscribe((data: any) => {
                        this.current.voucher_url = data.url
                        this.quoteservice.updatePayment(this.current).subscribe((res: any) => {
                            if(res.success){
                                alert("Payment Updated!")
                                this.modalservice.dismissAll()
    
                                setTimeout(() => {
                                    this.getPayments();
                                }, 250)
                            }
                            else{
                                alert("Error")
                                console.log(res)
                            }
                        })
                    })
                }
                else{
                    this.quoteservice.updatePayment(this.current).subscribe((res: any) => {
                        if(res.success){
                            alert("Payment Updated!")
                            this.modalservice.dismissAll()

                            setTimeout(() => {
                                this.getPayments();
                            }, 250)
                        }
                        else{
                            alert("Error")
                            console.log(res)
                        }
                    })
                }

            }

        }
        else{
            alert("Check your information and fill in all the spaces!")
        }
    }

    uploadRemove(){
        $(".file-group").removeClass("active")
        setTimeout(() => {
            $(".file-group").removeClass("show")
        }, 50)  
    }

    uploadDisplay(){
        $(".file-group").addClass("active")
        setTimeout(() => {
            $(".file-group").addClass("show")
        }, 50)
    }

    readFile(){
        let read = new FileReader()

        read.onload = (e) => {
            this.form.patchValue({
                voucher_url: e.target.result
            })
        }

        read.readAsDataURL(this.files)
    }

    resetImgEdit(e){
        if(!this.mode){
            $(".drop-icon").addClass("hide")
            this.uploadDisplay();
        }
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

        $(".drag-zone").on("drop", (e) => {
            e.preventDefault();

            let data = e.originalEvent.dataTransfer.files[0];

            if(data.type.substring(0, data.type.indexOf("/")) == "image"){
                $(".drop-icon").addClass("hide")
                this.uploadDisplay();
                this.files = data;

                this.readFile();
            }
            else{
                alert("Upload an image!")
            }
            
        })
    }

    edit(modal, data){
        this.mtitle = "Update Quote Payment";
        this.mode = false;
        this.modalservice.open(modal);
        this.form.patchValue({
            quotepayment_id: data.quotepayment_id,
            month: data.month,
            comission_payment: data.comission_payment,
            total: data.total,
            deposit_date: data.deposit_date,
            payment_type: data.payment_type,
            voucher_url: data.voucher_url,
            cotizadorId: data.cotizadorId,
        })

        $(".drop-icon").addClass("hide")
        this.uploadDisplay();

        this.current = data;

        //
        this.quoteservice.getAll().subscribe((res: any) => {
            let d = res.find(c => c.cotizadorId == data.cotizadorId)
            this.user.name = d.userName + " " + d.lastName
        })


        setTimeout(() => {
            this.dropzone();
        }, 250)
    }

    create(modal){
        this.mtitle = "New Quote Payment";
        this.form.reset()
        this.user.name = "";
        this.form.patchValue({
            quotepayment_id: '1',
            month: '-1',
            voucher_url: 'url'
        })
        this.mode = true;
        this.modalservice.open(modal);

        setTimeout(() => {
            this.dropzone();
        }, 250)
    }

    deletes(data){
        this.quoteservice.deletePayment(data.quotepayment_id).subscribe(res => {
            this.modalservice.dismissAll();
            setTimeout(() => {
                alert("Payment removed!")
                this.getPayments();
            }, 500);
        })
    }

    /**/

    select(e, data){
        $(".btn-assign").removeClass("selected")
        $(e.target).addClass("selected")
        this.selected_user = data;
    }

    done(){
        $("#closeUsers").trigger("click")
        this.user.name = this.selected_user.userName + " " + this.selected_user.lastName

        this.form.patchValue({
            cotizadorId: this.selected_user.cotizadorId
        })
    }

    searchUser(e){
        if(e.target.value){
            this.quote_data = this.quote_data.filter(c => c.userName.includes(e.target.value))
        }
        else{
            this.getData();
        }
    }

    //

    showUsers(modal){
        this.getData();
        this.modalservice.open(modal, { size: 'lg' })
    }

    ngOnInit(): void {
        this.getData();
        this.getPayments();
    }

}
