<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

    checkSession("email");

    //1. Controllo parametri.
    if(!isset($_REQUEST["day"]))
    {
        http_response_code(400);
        die("Parametro mancante: giorno.");
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
    if(!isset($_REQUEST["type"]))
    {
        http_response_code(400);
        die("Parametro mancante: tipo.");
    }

    //2. Connessione.
    $con= connection("progetto");

    //3.Query
    $day=$_REQUEST["day"];
    $ant=$_REQUEST["ant"];
    $prim=$_REQUEST["prim"];
    $sec=$_REQUEST["sec"];
    $dolc=$_REQUEST["dolc"];
    $mail=$_SESSION["email"];
    $tipo=$_REQUEST["type"];
    deleteDay($con, $day, $tipo);
    $sql="INSERT INTO settimanale (DayId, Giorno, Antipasto, Primo, Secondo, Dolce, Email, Tipo) VALUES (NULL, '$day', '$ant', '$prim', '$sec', '$dolc', '$mail', '$tipo');";
    $data=eseguiQuery($con, $sql);
    echo($data);

    //4. Chiusura connessione.
    $con->close();
?>