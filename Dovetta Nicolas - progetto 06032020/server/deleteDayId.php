<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

    checkSession("email");

    //1. Controllo parametri.
    if(!isset($_REQUEST["id"]))
    {
        http_response_code(400);
        die("Parametro mancante: idGiorno.");
    }

    //2. Connessione.
    $con= connection("progetto");

    //3.Query
    $dayId=$_REQUEST["id"];
    $mail=$_SESSION["email"];
    $sql="DELETE FROM settimanale WHERE DayId = $dayId AND email = '$mail'";
    $data=eseguiQuery($con, $sql);
    echo(json_encode(array("DeletedStatus"=>"ok")));

    //4. Chiusura connessione.
    $con->close();
?>