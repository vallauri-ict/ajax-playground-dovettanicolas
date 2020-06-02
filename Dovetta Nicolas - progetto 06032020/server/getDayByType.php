<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

    checkSession("email");

    //1. Controllo parametri.
    if(!isset($_REQUEST["type"]))
    {
        http_response_code(400);
        die("Parametro mancante: tipo.");
    }
    if(!isset($_REQUEST["day"]))
    {
        http_response_code(400);
        die("Parametro mancante: giorno.");
    }

    //2. Connessione.
    $con= connection("progetto");

    //3. Lancio la query.
    $email=$_SESSION["email"];
    $type=$_REQUEST["type"];
    $day=$_REQUEST["day"];
    $sql="SELECT * FROM settimanale WHERE Tipo='$type' AND Email = '$email' AND Giorno = '$day';";
    $data = eseguiQuery($con,$sql);
    echo(json_encode(array($data)));
    $con->close();
?>