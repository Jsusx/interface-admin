<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, x-requested-with");

    require_once './Connection/db.php';

    $db = new Database();
    $con = $db->Connect();

    $body = json_decode(file_get_contents("php://input"), true);

    $controller;

    if(isset($body['controlName']) || isset($_POST['controlName'])){
        $controller = !isset($body['controlName']) ? $_POST['controlName'] : $body['controlName'];
        $controllerFile = "./Controllers/" . $controller . "Controller.php";
        
        if(file_exists($controllerFile)){
            require_once $controllerFile;

            $control = $controller."Controller";
            $class = new $control($con);
            $method = !isset($body['method']) ? $_POST['method'] : $body['method'];
            $class->$method($body, $_POST, $_FILES);         
        }
        else{
            echo "<h2>This controller dont exists!</h2>";
            
        }
    }
    else{
        echo "<h2>Error</h2><h3>Reason: This action dont exists!</h3>";
    }
    

?>