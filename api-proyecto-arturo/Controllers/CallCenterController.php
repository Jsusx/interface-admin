<?php 

    class CallCenterController{
                
        public $conn;

        function __construct($db)
        {
            $this->conn = $db;
        }


        function GetAll($body){
            $query = "SELECT * FROM callcenter";
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
            $callCenterId = $body['callCenterId'];
            $userName = $body['userName'];
            $lastName = $body['lastName'];
            $cellphone = $body['cellphone'];
            $address = $body['address'];
            $email = $body['email'];
            $password = $body['password'];
            $workingHours = $body['workingHours'];
            $monthlySalary = $body['monthlySalary'];
            $extraAllocation = $body['extraAllocation'];
            $acc_state = $body['acc_state'];
    
            $query = "UPDATE callcenter " . 
                    "SET userName = " . "'$userName'" . 
                    ", lastName = " . "'$lastName'" . 
                    ", cellphone = " . "'$cellphone'" .
                    ", address = " . "'$address'" .
                    ", email = " . "'$email'" .
                    ", workingHours = " . "'$workingHours'" .
                    ", monthlySalary = " . "'$monthlySalary'" .
                    ", extraAllocation = " . "'$extraAllocation'" .
                    ", password = " . "'$password'" .
                    ", acc_state = " . "'$acc_state'" .
                    " WHERE callCenterId = " . "'$callCenterId'";
    
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
            $callCenterId = $body['callCenterId'];
    
            $query = "DELETE from callcenter WHERE callCenterId = '$callCenterId'";
    
            $res = $this->conn->query($query);
    
            if($this->conn->error == ""){

                $query = "ALTER TABLE callcenter AUTO_INCREMENT $callCenterId";

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
                        "success" => false,
                        "error" => true,
                        "message" => $this->conn->error,
                        "query" => $query
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
            $workingHours = $body['workingHours'];
            $monthlySalary = $body['monthlySalary'];
            $extraAllocation = $body['extraAllocation'];
            $acc_state = $body['acc_state'];
    
            $query = "INSERT INTO callcenter(userName, lastName, cellphone, address, email, workingHours, monthlySalary, extraAllocation, password, acc_state) VALUES(" . 
                    "'$userName'" . 
                    ", '$lastName'" . 
                    ", '$cellphone'" .
                    ", '$address'" .
                    ", '$email'" .
                    ", '$workingHours'" .
                    ", '$monthlySalary'" .
                    ", '$extraAllocation'" .
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
            $query = "SELECT * FROM callcenter_payments";
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
            $callCenterId = $body['callCenterId'];

            $query = "INSERT INTO callcenter_payments(month, salary, comission_payment, total, payment_type, deposit_date, voucher_url, callCenterId) VALUES(" .
            "'$month' ," .
            "'$salary' ," .
            "'$comission_payment' , " .
            "'$total' , " .
            "'$payment_type' ," .
            "'$deposit_date' ," .
            "'$voucher_url' ," .
            "'$callCenterId'" .
            ")";

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

        function UpdatePayment($body){
            $callcenterpayment_id = $body['callcenterpayment_id'];
            $month = $body['month'];
            $salary = $body['salary'];
            $comission_payment = $body['comission_payment'];
            $total = $body['total'];
            $payment_type = $body['payment_type'];
            $deposit_date = $body['deposit_date'];
            $voucher_url = $body['voucher_url'];
            $callCenterId = $body['callCenterId'];

            $query = "UPDATE callcenter_payments" .
            " SET month = " . "'$month' ," .
            "salary = " . "'$salary' ," .
            "comission_payment = " . "'$comission_payment' , " .
            "total = " . "'$total' , " .
            "payment_type = " . "'$payment_type' ," .
            "deposit_date = " . "'$deposit_date' ," .
            "voucher_url = " . "'$voucher_url' ," .
            "callCenterId = " . "'$callCenterId'" .
            "WHERE callcenterpayment_id = '$callcenterpayment_id'";

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
            $callcenterpayment_id = $body['callcenterpayment_id'];

            $query = "DELETE FROM callcenter_payments WHERE callcenterpayment_id = '$callcenterpayment_id'";

            $res = $this->conn->query($query);

            if($this->conn->error != ""){

                $query = "ALTER TABLE callcenter_payments AUTO_INCREMENT $callcenterpayment_id";

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