<?php

class ClientController{

    public $conn;

    function __construct($con)
    {
        $this->conn = $con;
    }

    function GetAll($body){

        /*
            $data['clientId'] = $rows['clientId'];
            $data['userName'] = $rows['userName'];
            $data['lastName'] = $rows['lastName'];
            $data['cellphone'] = $rows['cellphone'];
            $data['address'] = $rows['address'];
            $data['email'] = $rows['email'];
            $data['password'] = $rows['password'];
            $data['impactWindow'] = $rows['impactWindow'];
            $data['panelSolar'] = $rows['panelSolar'];
            $data['marmol'] = $rows['marmol'];
            $data['remodeling'] = $rows['remodeling'];
        */

        $query = "SELECT * FROM clients";
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
        $clientId = $body['clientId'];
        $userName = $body['userName'];
        $lastName = $body['lastName'];
        $cellphone = $body['cellphone'];
        $address = $body['address'];
        $email = $body['email'];
        $password = $body['password'];
        $impactWindow = $body['impactWindow'];
        $panelSolar = $body['panelSolar'];
        $marmol = $body['marmol'];
        $remodeling = $body['remodeling'];
        $acc_state = $body['acc_state'];
        $notes = $body['notes'];
        $zone = $body['zone'];
        $state = $body['state'];

        $query = "UPDATE clients " . 
                "SET userName = " . "'$userName'" . 
                ", lastName = " . "'$lastName'" . 
                ", cellphone = " . "'$cellphone'" .
                ", address = " . "'$address'" .
                ", email = " . "'$email'" .
                ", password = " . "'$password'" .
                ", impactWindow = " . "'$impactWindow'" .
                ", panelSolar = " . "'$panelSolar'" .
                ", marmol = " . "'$marmol'" .
                ", remodeling = " . "'$remodeling'" .
                ", acc_state = " . "'$acc_state'" .
                ", notes = " . "'$notes'" .
                ", zone = " . "'$zone'" .
                ", state = " . "'$state'" .
                " WHERE clientId = " . "'$clientId'";

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


    function Create($body){
        $userName = $body['userName'];
        $lastName = $body['lastName'];
        $cellphone = $body['cellphone'];
        $address = $body['address'];
        $email = $body['email'];
        $password = $body['password'];
        $impactWindow = $body['impactWindow'];
        $panelSolar = $body['panelSolar'];
        $marmol = $body['marmol'];
        $remodeling = $body['remodeling'];
        $state = $body['state'];
        $reg_date = $body['reg_date'];
        $zone = $body['zone'];
        $acc_state = $body['acc_state'];

        $query = "INSERT INTO clients(userName, lastName, cellphone, address, email, password, impactWindow, panelSolar, marmol, remodeling, reg_date, zone,state, acc_state) VALUES(" . 
                "'$userName'" . 
                ", '$lastName'" . 
                ", '$cellphone'" .
                ", '$address'" .
                ", '$email'" .
                ", '$password'" .
                ", '$impactWindow'" .
                ", '$panelSolar'" .
                ", '$marmol'" .
                ", '$remodeling'" .
                ", '$reg_date'" .
                ", '$zone'" .
                ", '$state'" .
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

    function Delete($body){
        $clientId = $body['clientId'];

        $query = "DELETE FROM clients WHERE clientId = '$clientId'";

        $res = $this->conn->query($query);

        if($this->conn->error != ""){

            $query = "ALTER TABLE clients AUTO_INCREMENT $clientId";

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