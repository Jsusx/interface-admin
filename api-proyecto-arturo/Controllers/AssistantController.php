<?php 

    class AssistantController{
            
        public $conn;

        function __construct($db)
        {
            $this->conn = $db;
        }


        function GetAll($body){
            $query = "SELECT * FROM assitantadm";
            $res = $this->conn->query($query);
            $data = [];
            if($res->num_rows > 0){
                while($rows = $res -> fetch_assoc()){
                    array_push($data, $rows);
                }

                echo json_encode($data);
            }
        }

        function Update($body){
            $assistantAdmId = $body['assistantAdmId'];
            $userName = $body['userName'];
            $lastName = $body['lastName'];
            $cellphone = $body['cellphone'];
            $address = $body['address'];
            $email = $body['email'];
            $password = $body['password'];
            $acc_state = $body['acc_state'];
    
            $query = "UPDATE assitantadm " . 
                    "SET userName = " . "'$userName'" . 
                    ", lastName = " . "'$lastName'" . 
                    ", cellphone = " . "'$cellphone'" .
                    ", address = " . "'$address'" .
                    ", email = " . "'$email'" .
                    ", password = " . "'$password'" .
                    ", acc_state = " . "'$acc_state'" .
                    " WHERE assistantAdmId = " . "'$assistantAdmId'";
    
            $res = $this->conn->query($query);
    
            if($this->conn->error == ""){
                echo json_encode(
                    array(
                        "success" => true,
                        "error" => false
                    )
                );
            }
            else{
                echo json_encode(
                    array(
                        "success" => false,
                        "error" => true,
                        "message" => $this->conn->error
                    )
                ); 
            }
        }

        function Delete($body){
            $assistantAdmId = $body['assistantAdmId'];
    
            $query = "DELETE from assitantadm WHERE assistantAdmId = '$assistantAdmId'";
    
            $res = $this->conn->query($query);
    
            if($this->conn->error == ""){

                $query = "ALTER TABLE assitantadm AUTO_INCREMENT $assistantAdmId";

                $res = $this->conn->query($query);

                if($this->conn->error == ""){
                    echo json_encode(
                        array(
                            "success" => true,
                            "error" => false
                        )
                    );
                }
                else{
                    echo json_encode(
                        array(
                            "success" => false,
                            "error" => true,
                            "message" => $this->conn->error
                        )
                    ); 
                }
            }
            else{
                echo json_encode(
                    array(
                        "success" => false,
                        "error" => true,
                        "message" => $this->conn->error
                    )
                ); 
            }
        }

        function Create($body){
            $userName = $body['userName'];
            $lastName = $body['lastName'];
            $cellphone = $body['cellphone'];
            $address = $body['address'];
            $email = $body['email'];
            $password = $body['password'];
            $acc_state = $body['acc_state'];
    
            $query = "INSERT INTO assitantadm(userName, lastName, cellphone, address, email, password, acc_state) VALUES(" . 
                    "'$userName'" . 
                    ", '$lastName'" . 
                    ", '$cellphone'" .
                    ", '$address'" .
                    ", '$email'" .
                    ", '$password'" .
                    ", '$acc_state'" .
                    ")";
    
            $res = $this->conn->query($query);
    
            if($this->conn->error == ""){
                echo json_encode(
                    array(
                        "success" => true,
                        "error" => false
                    )
                );
            }
            else{
                echo json_encode(
                    array(
                        "success" => false,
                        "error" => true,
                        "message" => $this->conn->error,
                        "query" => $query
                    )
                ); 
            }
        }

        function GetPayments($body){
            $query = "SELECT * FROM admassistant_payments";
            $res = $this->conn->query($query);
            $data = [];
            if($res->num_rows > 0){
                while($rows = $res -> fetch_assoc()){
                    array_push($data, $rows);
                }

                echo json_encode($data);
            }
        }

        function SavePayment($body){
            //$admassispayment_id = $post['admassispayment_id'];
            $month = $body['month'];
            $salary = $body['salary'];
            $comission_payment = $body['comission_payment'];
            $total = $body['total'];
            $payment_type = $body['payment_type'];
            $deposit_date = $body['deposit_date'];
            $voucher_url = $body['voucher_url'];
            $assistantAdmId = $body['assistantAdmId'];

            $query = "INSERT INTO admassistant_payments(month, salary, comission_payment, total, payment_type, deposit_date, voucher_url, assistantAdmId) VALUES(" .
            "'$month' ," .
            "'$salary' ," .
            "'$comission_payment' , " .
            "'$total' , " .
            "'$payment_type', " .
            "'$deposit_date', " .
            "'$voucher_url', " .
            "'$assistantAdmId'" .
            ")";

            $res = $this->conn->query($query);

            if($this->conn->error != ""){
                echo json_encode(
                    array(
                        "success" => false,
                        "error" => true,
                        "message" => $this->conn->error
                    )
                );
            }
            else{
                echo json_encode(
                    array(
                        "success" => true,
                        "error" => false
                    )
                );
            }

        }

        function UpdatePayment($body){
            $admassispayment_id = $body['admassispayment_id'];
            $month = $body['month'];
            $salary = $body['salary'];
            $comission_payment = $body['comission_payment'];
            $total = $body['total'];
            $payment_type = $body['payment_type'];
            $deposit_date = $body['deposit_date'];
            $voucher_url = $body['voucher_url'];
            $assistantAdmId = $body['assistantAdmId'];

            $query = "UPDATE admassistant_payments" .
            " SET month = " . "'$month' ," .
            "salary = " . "'$salary' ," .
            "comission_payment = " . "'$comission_payment' , " .
            "total = " . "'$total' , " .
            "payment_type = " . "'$payment_type' , " .
            "deposit_date = " . "'$deposit_date' , " .
            "voucher_url = " . "'$voucher_url' , " .
            "assistantAdmId = " . "'$assistantAdmId' " .
            "WHERE admassispayment_id = '$admassispayment_id'";

            $res = $this->conn->query($query);

            if($this->conn->error != ""){
                echo json_encode(
                    array(
                        "success" => false,
                        "error" => true,
                        "message" => $this->conn->error,
                        "query" => $query
                    )
                );
            }
            else{
                echo json_encode(
                    array(
                        "success" => true,
                        "error" => false
                    )
                );
            }
        }

        function DeletePayment($body){
            $admassispayment_id = $body['admassispayment_id'];

            $query = "DELETE FROM admassistant_payments WHERE admassispayment_id = '$admassispayment_id'";

            $res = $this->conn->query($query);

            if($this->conn->error != ""){

                $query = "ALTER TABLE admassistant_payments AUTO_INCREMENT $admassispayment_id";

                $res = $this->conn->query($query);

                if($this->conn->error == ""){
                    echo json_encode(
                        array(
                            "success" => true,
                            "error" => false
                        )
                    );
                }
                else{
                    echo json_encode(
                        array(
                            "success" => false,
                            "error" => true,
                            "message" => $this->conn->error,
                            "query" => $query
                        )
                    );
                }
                
            }
            else{
                echo json_encode(
                    array(
                        "success" => true,
                        "error" => false
                    )
                );
            }
        }
    }

?>