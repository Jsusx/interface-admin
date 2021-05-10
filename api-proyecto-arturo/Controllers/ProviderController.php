<?php 

    class ProviderController{
                    
        public $conn;

        function __construct($db)
        {
            $this->conn = $db;
        }


        function GetAll($body){
            $query = "SELECT * FROM providers";
            $res = $this->conn->query($query);
            $data = [];
            if($res->num_rows > 0){
                while($rows = $res -> fetch_assoc()){
                    array_push($data, $rows);
                }

                echo json_encode($data);
            }
        }

        function Assign($body){
            $clientId = $body['clientId'];
            $providersId = $body['providersId'];
            $assign_date = $body['assign_date'];
            $service_state = $body['service_state'];
            $callCenterId = $body['callCenterId'];

            $query = "INSERT INTO provider_client(clientId, providersId, assign_date, service_state, callCenterId) VALUES(" . 
                "'$clientId'" . 
                ", '$providersId'" . 
                ", '$assign_date'" .
                ", '$service_state'" .
                ", '$callCenterId'" .
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
                        "message" => $this->conn->error
                    )
                ); 
            }
        }

        function GetAssignaments(){
            $query = "SELECT * FROM provider_client";
            $res = $this->conn->query($query);
            $data = [];
            if($res->num_rows > 0){
                while($rows = $res -> fetch_assoc()){
                    array_push($data, $rows);
                }

                echo json_encode($data);
            }
        }

        function GetAssignedProviders($body){
            //$callCenterId = $body['callCenterId'];
            $service = $body['service'];

            $query = null;

            if($service == "assigned"){
                $query = "SELECT * FROM provider_client";
            }
            else if($service == "concluded"){
                $query = "SELECT * FROM provider_client WHERE service_state = '1'";
            }

            $res = $this->conn->query($query);
            $data = [];
            if($res->num_rows > 0){
                while($rows = $res -> fetch_assoc()){
                    array_push($data, $rows);
                }

                echo json_encode(
                    array(
                        "success" => true,
                        "error" => false,
                        "empty" => false,
                        "size" => count($data),
                        "data" => $data
                    )
                );
            }
            else{
                echo json_encode(
                    array(
                        "success" => true,
                        "error" => false,
                        "empty" => true,
                        "size" => 0
                    )
                );
            }
        }

        function Update($body){
            $providersId = $body['providersId'];
            $company = $body['company'];
            $serviceType = $body['serviceType'];
            $cellphone = $body['cellphone'];
            $address = $body['address'];
            $email = $body['email'];
            $password = $body['password'];
            $managerOrOwner = $body['managerOrOwner'];
            $operationalStaff = $body['operationalStaff'];
            $commissionEstablished = $body['commissionEstablished'];
            $acc_state = $body['acc_state'];
            $provider_state = $body['provider_state'];
    
            $query = "UPDATE providers " . 
                    "SET company = " . "'$company'" . 
                    ", serviceType = " . "'$serviceType'" . 
                    ", cellphone = " . "'$cellphone'" .
                    ", address = " . "'$address'" .
                    ", email = " . "'$email'" .
                    ", managerOrOwner = " . "'$managerOrOwner'" .
                    ", operationalStaff = " . "'$operationalStaff'" .
                    ", commissionEstablished = " . "'$commissionEstablished'" .
                    ", password = " . "'$password'" .
                    ", acc_state = " . "'$acc_state'" .
                    ", provider_state = " . "'$provider_state'" .
                    " WHERE providersId = " . "'$providersId'";
    
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
            $providersId = $body['providersId'];
    
            $query = "DELETE from providers WHERE providersId = '$providersId'";
    
            $res = $this->conn->query($query);
    
            if($this->conn->error == ""){

                $query = "ALTER TABLE providers AUTO_INCREMENT $providersId";

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
            $company = $body['company'];
            $serviceType = $body['serviceType'];
            $cellphone = $body['cellphone'];
            $address = $body['address'];
            $email = $body['email'];
            $password = $body['password'];
            $managerOrOwner = $body['managerOrOwner'];
            $operationalStaff = $body['operationalStaff'];
            $commissionEstablished = $body['commissionEstablished'];
            $acc_state = $body['acc_state'];
            $provider_state = $body['provider_state'];
    
            $query = "INSERT INTO providers(company, serviceType, cellphone, address, email, managerOrOwner, operationalStaff, commissionEstablished, password, acc_state, provider_state) VALUES(" . 
                    "'$company'" . 
                    ", '$serviceType'" . 
                    ", '$cellphone'" .
                    ", '$address'" .
                    ", '$email'" .
                    ", '$managerOrOwner'" .
                    ", '$operationalStaff'" .
                    ", '$commissionEstablished'" .
                    ", '$password'" .
                    ", '$acc_state'" .
                    ", '$provider_state'" .
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
            $query = "SELECT * FROM provider_payments";
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
            $providersId = $body['providersId'];

            $query = "INSERT INTO provider_payments(month, salary, comission_payment, total, payment_type, deposit_date, voucher_url, providersId) VALUES(" .
            "'$month' ," .
            "'$salary' ," .
            "'$comission_payment' , " .
            "'$total' , " .
            "'$payment_type' ," .
            "'$deposit_date' ," .
            "'$voucher_url' ," .
            "'$providersId'" .
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
            $providerpayment_id = $body['providerpayment_id'];
            $month = $body['month'];
            $salary = $body['salary'];
            $comission_payment = $body['comission_payment'];
            $total = $body['total'];
            $payment_type = $body['payment_type'];
            $deposit_date = $body['deposit_date'];
            $voucher_url = $body['voucher_url'];
            $providersId = $body['providersId'];

            $query = "UPDATE provider_payments" .
            " SET month = " . "'$month' ," .
            "salary = " . "'$salary' ," .
            "comission_payment = " . "'$comission_payment' , " .
            "total = " . "'$total' , " .
            "payment_type = " . "'$payment_type' ," .
            "deposit_date = " . "'$deposit_date' ," .
            "voucher_url = " . "'$voucher_url' ," .
            "providersId = " . "'$providersId'" .
            "WHERE providerpayment_id = '$providerpayment_id'";

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
            $providerpayment_id = $body['providerpayment_id'];

            $query = "DELETE FROM provider_payments WHERE providerpayment_id = '$providerpayment_id'";

            $res = $this->conn->query($query);

            if($this->conn->error != ""){

                $query = "ALTER TABLE provider_payments AUTO_INCREMENT $providerpayment_id";

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