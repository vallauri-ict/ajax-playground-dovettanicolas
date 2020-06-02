<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

    checkSession("email");

    //1. Controllo parametri.

    //2. Connessione.
    $con= connection("progetto");

    //3. Lancio la query.
    $email=$_SESSION["email"];
    $sql="SELECT * FROM settimanale WHERE Email = '$email';";
    $data = eseguiQuery($con,$sql);
    echo(json_encode(array($data)));
    $con->close();
?>