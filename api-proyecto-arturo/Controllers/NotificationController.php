<?php 

    class NotificationController{

        public $conn;

        function __construct($db){
            $this->conn = $db;
        }


        function GetNotifications($body){
            $userType = $body['userType'];
            $data = [];

            $query = "SELECT * FROM notification where userType = '$userType'";

            $res = $this->conn->query($query);

            if($res->num_rows > 0){
                while($rows = $res->fetch_assoc()){
                    array_push($data, $rows);
                }
                
                echo json_encode($data);
            }
            else{
                echo json_encode(
                    array(
                        "Error" => true,
                        "message" => "Empty Data",
                        "query" => $query
                    )
                );
            }
        }


        function RemoveNotification($body){
            $notificationId = $body['notificationId'];

            $query = "DELETE FROM notification where notificationId = $notificationId";

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

        function CreateNotification($body){
            $userType = $body['userType'];
            $message = $body['message'];

            $query = "INSERT INTO notification(userType, message) VALUES(" .
                    "'$userType' ," .
                    "'$message'" .
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
    }

?>