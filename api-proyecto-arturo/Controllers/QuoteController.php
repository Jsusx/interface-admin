<?php 

    class QuoteController{
                        
        public $conn;

        function __construct($db)
        {
            $this->conn = $db;
        }


        function GetAll($body){
            $query = "SELECT * FROM cotizador";
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
            $cotizadorId = $body['cotizadorId'];

            $query = "INSERT INTO client_quote(clientId, cotizadorId) VALUES(" . 
            "'$clientId'" . 
            ", '$cotizadorId'" . 
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
            $query = "SELECT * FROM client_quote";
            $res = $this->conn->query($query);
            $data = [];
            if($res->num_rows > 0){
                while($rows = $res -> fetch_assoc()){
                    array_push($data, $rows);
                }

                echo json_encode($data);
            }
        }
    
        function GetQuotes(){
            $query = "SELECT * FROM quotes";
            $res = $this->conn->query($query);
            $data = [];
            if($res->num_rows > 0){
                while($rows = $res -> fetch_assoc()){
                    array_push($data, $rows);
                }

                echo json_encode($data);
            }
        }

        function UpdateQuotes($body, $post, $files){
            if(isset($post['file_status'])){

                $file_status = $post['file_status'] == "1" ? true:false;
                $quoteid = $post['quoteid'];
                $clientId = $post['clientId'];
                $quotation_state = $post['state'];

                $query = null;

                if($file_status){
                    $quotation_num = $post['num'];
                    $quotation_file_name = $quotation_num . "." . explode("/", $files['file-img']['type'])[1];
                    $quotation_name = $post['name'];
                    $quotation_url_type = substr($_SERVER["SERVER_PROTOCOL"], 0, strrpos($_SERVER["SERVER_PROTOCOL"] , "/")) == "HTTP" ? "http":"https";
                    $quotation_url =  $quotation_url_type . "://" . $_SERVER["HTTP_HOST"]. substr($_SERVER["REQUEST_URI"], 0, strrpos($_SERVER["REQUEST_URI"], "/")+1) . "Files/documents/" . $quotation_file_name;                

                    if(move_uploaded_file($files['file-img']['tmp_name'], "Files/documents/" . $quotation_file_name)){
                        $query = "UPDATE quotes SET " .
                            "url = " . "'$quotation_url' ," .
                            "clientId = ". "'$clientId' ," .
                            "num = '$quotation_num' , " .
                            "name = " . "'$quotation_name' , " .
                            "state = " . "'$quotation_state'" .
                            " WHERE quoteid = " . "'$quoteid'";
                    }
                    else{
                        echo json_encode(
                            array(
                                "success" => false,
                                "error" => true
                            )
                        );
                    }
                }
                else{
                    $query = "UPDATE quotes SET " .
                            "clientId = ". "'$clientId' ," .
                            "state = " . "'$quotation_state'" .
                            " WHERE quoteid = " . "'$quoteid'";
                }

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
        }

        function CreateQuotation($body, $post, $files){
            
            $clientId = $post['clientId'];
            $quotation_num = $post['num'];
            $quotation_state = $post['state'];
            $quotation_file_name = $quotation_num . "." . explode("/", $files['file-img']['type'])[1];
            $quotation_name = $post['name'];
            $quotation_url_type = substr($_SERVER["SERVER_PROTOCOL"], 0, strrpos($_SERVER["SERVER_PROTOCOL"] , "/")) == "HTTP" ? "http":"https";
            $quotation_url =  $quotation_url_type . "://" . $_SERVER["HTTP_HOST"]. substr($_SERVER["REQUEST_URI"], 0, strrpos($_SERVER["REQUEST_URI"], "/")+1) . "Files/documents/" . $quotation_file_name;

            if(move_uploaded_file($files['file-img']['tmp_name'], "Files/documents/" . $quotation_file_name)){
                
                $query = "INSERT INTO quotes(url, clientId, num, name, state) VALUES(" .
                        "'$quotation_url' ," .
                        "'$clientId' ," .
                        "'$quotation_num' , " .
                        "'$quotation_name' , " .
                        "'$quotation_state'" .
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
        }

        function Update($body){
            $cotizadorId = $body['cotizadorId'];
            $userName = $body['userName'];
            $lastName = $body['lastName'];
            $cellphone = $body['cellphone'];
            $address = $body['address'];
            $email = $body['email'];
            $asignation = $body['asignation'];
            $type = $body['type'];
            $password = $body['password'];
            $company = $body['company'];
            $acc_state = $body['acc_state'];
    
            $query = "UPDATE cotizador " . 
                    "SET userName = " . "'$userName'" . 
                    ", lastName = " . "'$lastName'" . 
                    ", cellphone = " . "'$cellphone'" .
                    ", address = " . "'$address'" .
                    ", email = " . "'$email'" .
                    ", asignation = " . "'$asignation'" .
                    ", type = " . "'$type'" .
                    ", password = " . "'$password'" .
                    ", company = " . "'$company'" .
                    ", acc_state = " . "'$acc_state'" .
                    " WHERE cotizadorId = " . "'$cotizadorId'";
    
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
            $cotizadorId = $body['cotizadorId'];
    
            $query = "DELETE from cotizador WHERE cotizadorId = '$cotizadorId'";
    
            $res = $this->conn->query($query);
    
            if($this->conn->error == ""){

                $query = "ALTER TABLE cotizador AUTO_INCREMENT $cotizadorId";

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
            $asignation = $body['asignation'];
            $type = $body['type'];
            $password = $body['password'];
            $company = $body['company'];
            $acc_state = $body['acc_state'];
    
            $query = "INSERT INTO cotizador(userName, lastName, cellphone, address, email, asignation, type, password, company, acc_state) VALUES(" . 
                    "'$userName'" . 
                    ", '$lastName'" . 
                    ", '$cellphone'" .
                    ", '$address'" .
                    ", '$email'" .
                    ", '$asignation'" .
                    ", '$type'" .
                    ", '$password'" .
                    ", '$company'" .
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
            $query = "SELECT * FROM quote_payments";
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
            $comission_payment = $body['comission_payment'];
            $total = $body['total'];
            $payment_type = $body['payment_type'];
            $deposit_date = $body['deposit_date'];
            $voucher_url = $body['voucher_url'];
            $cotizadorId = $body['cotizadorId'];

            $query = "INSERT INTO quote_payments(month, comission_payment, total, payment_type, deposit_date, voucher_url, cotizadorId) VALUES(" .
            "'$month' ," .
            "'$comission_payment' , " .
            "'$total' , " .
            "'$payment_type' ," .
            "'$deposit_date' ," .
            "'$voucher_url' ," .
            "'$cotizadorId'" .
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
            $quotepayment_id = $body['quotepayment_id'];
            $month = $body['month'];
            $comission_payment = $body['comission_payment'];
            $total = $body['total'];
            $payment_type = $body['payment_type'];
            $deposit_date = $body['deposit_date'];
            $voucher_url = $body['voucher_url'];
            $cotizadorId = $body['cotizadorId'];

            $query = "UPDATE quote_payments" .
            " SET month = " . "'$month' ," .
            "comission_payment = " . "'$comission_payment' , " .
            "total = " . "'$total' , " .
            "payment_type = " . "'$payment_type' ," .
            "deposit_date = " . "'$deposit_date' ," .
            "voucher_url = " . "'$voucher_url' ," .
            "cotizadorId = " . "'$cotizadorId'" .
            "WHERE quotepayment_id = '$quotepayment_id'";

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
            $quotepayment_id = $body['quotepayment_id'];

            $query = "DELETE FROM quote_payments WHERE quotepayment_id = '$quotepayment_id'";

            $res = $this->conn->query($query);

            if($this->conn->error != ""){

                $query = "ALTER TABLE callcenter_payments AUTO_INCREMENT $quotepayment_id";

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