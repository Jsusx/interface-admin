<?php 

    class AdminController{
        
        public $conn;

        function __construct($db)
        {
            $this->conn = $db;
        }


        function GetAll($body){
            $query = "SELECT * FROM administrator";
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
            $adminId = $body['adminId'];
            $userName = $body['userName'];
            $lastName = $body['lastName'];
            $cellphone = $body['cellphone'];
            $address = $body['address'];
            $email = $body['email'];
            $password = $body['password'];
    
            $query = "UPDATE administrator " . 
                    "SET userName = " . "'$userName'" . 
                    ", lastName = " . "'$lastName'" . 
                    ", cellphone = " . "'$cellphone'" .
                    ", address = " . "'$address'" .
                    ", email = " . "'$email'" .
                    ", password = " . "'$password'" .
                    " WHERE adminId = " . "'$adminId'";
    
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

    }
?>