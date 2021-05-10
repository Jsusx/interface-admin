<?php

    class Database{
        
        function Connect(){
            $server = "localhost";
            $username = "root";
            $password = "";
            $db = "db_test";
            $con = new mysqli($server, $username, $password, $db);

            if($con->connect_error){
                die("Connection failed");
            }
            else{
                return $con;
            }


        }
    }
    

?>