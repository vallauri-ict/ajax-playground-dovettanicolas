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
    if(!isset($_REQUEST["ant"]))
    {
        http_response_code(400);
        die("Parametro mancante: antipasto.");
    }
    if(!isset($_REQUEST["prim"]))
    {
        http_response_code(400);
        die("Parametro mancante: primo.");
    }
    if(!isset($_REQUEST["sec"]))
    {
        http_response_code(400);
        die("Parametro mancante: secondo.");
    }
    if(!isset($_REQUEST["dolc"]))
    {
        http_response_code(400);
        die("Parametro mancante: dolce.");
    }

    //2. Connessione.
    $con= connection("progetto");

    //3.Query
    $dayId=$_REQUEST["id"];
    $ant=$_REQUEST["ant"];
    $prim=$_REQUEST["prim"];
    $sec=$_REQUEST["sec"];
    $dolc=$_REQUEST["dolc"];
    $mail=$_SESSION["email"];
    $sql="UPDATE settimanale SET Antipasto='$ant', Primo='$prim', Secondo='$sec', Dolce='$dolc'  WHERE DayId = $dayId AND Email = '$mail'";
    $data=eseguiQuery($con,$sql);

    echo(json_encode(array("ModifiedStatus"=>"ok")));

    //4. Chiusura connessione.
    $con->close();
?>