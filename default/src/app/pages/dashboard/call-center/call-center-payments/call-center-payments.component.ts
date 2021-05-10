import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CallCenterService } from 'src/app/shared/services/call-center.service';

declare let $:any;

@Component({
    selector: 'app-call-center-payments',
    templateUrl: './call-center-payments.component.html',
    styleUrls: ['./call-center-payments.component.css']
})
export class CallCenterPaymentsComponent implements OnInit {

    data;
    //
    mtitle;
    mode;
    //
    files;
    file_dir = "vouchers/callcenters";
    //
    user ={
        name: ''
    };
    //
    current;
    selected_user;
    callcenter_data;

    months = ["JANUARY", "FREBRUARY", "MARCH", "APRIL", "MAY", "JUNE", 'JULY', "AUGUST", "OCTOBER", "NOVEMBER", "DECEMBER"]

    //

    form = new FormGroup({
        callcenterpayment_id: new FormControl('', [Validators.required]),
        month: new FormControl('', [Validators.required]),
        salary: new FormControl('', [Validators.required]),
        comission_payment: new FormControl('', [Validators.required]),
        total: new FormControl('', [Validators.required]),
        payment_type: new FormControl('', [Validators.required]),
        deposit_date: new FormControl('', [Validators.required]),
        voucher_url: new FormControl('', [Validators.required]),
        callCenterId: new FormControl('', [Validators.required]),
    })

    constructor(private callcenterservice: CallCenterService, private modalservice: NgbModal) { }

    getPayments(){
        this.callcenterservice.GetPayments().subscribe(res => this.data = res);
    }

    getData(){
        this.callcenterservice.getAll().subscribe(res => this.callcenter_data = res)
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
    
                    this.callcenterservice.uploadImage(data).subscribe((ccres: any) => {
                        this.form.value.voucher_url = ccres.url
                        this.callcenterservice.savePayment(this.form.value).subscribe((res: any) => {
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
                this.current.callcenterpayment_id = this.form.value.callcenterpayment_id;
                this.current.month = this.form.value.month;
                this.current.salary = this.form.value.salary;
                this.current.comission_payment = this.form.value.comission_payment;
                this.current.total = this.form.value.total;
                this.current.deposit_date = this.form.value.deposit_date
                this.current.payment_type = this.form.value.payment_type;
                this.current.voucher_url = this.form.value.voucher_url
                this.current.callCenterId = this.form.value.callCenterId

                if(this.files){
                    let dat = new FormData();
                    dat.append("file", this.files);
                    dat.append("dir", this.file_dir)
                    this.callcenterservice.uploadImage(dat).subscribe((data: any) => {
                        this.current.voucher_url = data.url
                        this.callcenterservice.updatePayment(this.current).subscribe((res: any) => {
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
                    this.callcenterservice.updatePayment(this.current).subscribe((res: any) => {
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
        this.mtitle = "Update Call-Center Payment";
        this.mode = false;
        this.modalservice.open(modal);
        this.form.patchValue({
            callcenterpayment_id: data.callcenterpayment_id,
            month: data.month,
            salary: data.salary,
            comission_payment: data.comission_payment,
            total: data.total,
            deposit_date: data.deposit_date,
            payment_type: data.payment_type,
            voucher_url: data.voucher_url,
            callCenterId: data.callCenterId,
        })

        $(".drop-icon").addClass("hide")
        this.uploadDisplay();

        this.current = data;

        //
        this.callcenterservice.getAll().subscribe((res: any) => {
            let d = res.find(c => c.callCenterId == data.callCenterId)
            this.user.name = d.userName + " " + d.lastName
        })


        setTimeout(() => {
            this.dropzone();
        }, 250)
    }

    create(modal){
        this.mtitle = "New Call-Center Payment";
        this.form.reset()
        this.user.name = "";
        this.form.patchValue({
            callcenterpayment_id: '1',
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
        this.callcenterservice.deletePayment(data.quotepayment_id).subscribe(res => {
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
            callCenterId: this.selected_user.callCenterId
        })
    }

    searchUser(e){
        if(e.target.value){
            this.callcenter_data = this.callcenter_data.filter(c => c.userName.includes(e.target.value))
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
        this.getPayments();
        this.getData();
    }

}
