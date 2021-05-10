<?php 

    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

    require "../vendor/autoload.php";

    use PhpOffice\PhpSpreadsheet\Spreadsheet;
    use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        if(isset($_FILES["file"]) && $_POST["dir"]){
            $img_tmp = $_FILES["file"]["tmp_name"];
            $img_name = $_FILES["file"]["name"];
            $img_ext_sep = explode(".", $_FILES["file"]["name"]);
            $img_ext = end($img_ext_sep);
            //$img_sname = "upload_" . $img_ext_sep[0] . "_" . rand(111111111,999999999) . "." . $img_ext;
            $img_sname = "upload_" . rand(111111111,999999999) . "." . $img_ext;
            $img_url_prot = substr($_SERVER["SERVER_PROTOCOL"], 0, strrpos($_SERVER["SERVER_PROTOCOL"] , "/")) == "HTTP" ? "http":"https";
            $img_url = $img_url_prot . "://" . $_SERVER["HTTP_HOST"]. substr($_SERVER["REQUEST_URI"], 0, strrpos($_SERVER["REQUEST_URI"], "/")+1) . $_POST["dir"] . "/" . $img_sname;
    
            move_uploaded_file($img_tmp, $_SERVER["DOCUMENT_ROOT"]."/api-proyecto-arturo/Files/" . $_POST["dir"] . "/".$img_sname);
    
            echo json_encode(array(
                "success" => true,
                "error" => false,
                "url" => $img_url
            ));
        }
        else if(isset($_FILES["data_file"])){
            $file = $_FILES["data_file"];
            $file_path = $file["tmp_name"];
            $spread = \PhpOffice\PhpSpreadsheet\IOFactory::load($file_path);
            $data = $spread->getActiveSheet()->toArray();

            $data_array = [];
            $count = 0;

            foreach($data as $row){
                if(isset($row["0"]) && isset($row["1"]) && isset($row["2"]) && isset($row["3"]) && isset($row["4"]) && isset($row["5"]) && isset($row["6"])
                    && isset($row["7"]) && isset($row["8"]) && isset($row["9"]) && isset($row["10"]) && isset($row["11"]) && isset($row["12"]) && isset($row["13"])
                    ){
                    array_push($data_array, array(
                        "userName" => $row['0'],
                        "lastName" => $row['1'],
                        "cellphone" => $row['2'],
                        "address" => $row['3'],
                        "email" => $row['4'],
                        "password" => $row['5'],
                        "impactWindow" => $row['6'],
                        "panelSolar" => $row['7'],
                        "marmol" => $row['8'],
                        "remodeling" => $row['9'],
                        "acc_state" => $row['10'],
                        "reg_date" => $row['11'],
                        "zone" => $row['12'],
                        "state" => $row['13']
                    ));
                }
            }

            if(count($data_array) > 0){
                echo json_encode(array(
                    "success" => true,
                    "error" => false,
                    "data" => json_encode($data_array)
                ));
            }
            else{
                echo json_encode(array(
                    "success" => false,
                    "error" => true
                ));
            }
            
        }
        else{
            echo json_encode(array(
                "success" => false,
                "error" => true
            ));
        }
    }
    else{
        echo "<h1>This page is disabled</h1>";
    }

?>