<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

    checkSession("email");

	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
        //1. Controllo parametri
		if(!isset($_POST["password"]))
		{
			http_response_code(400);
			die("Parametro mancante: password.");
        }

        //2. Connessione
        $con = connection("progetto");
        $password = $con->real_escape_string($_POST["password"]);
        $email=$_SESSION["email"];

        //3. Creazione query
        $sql="UPDATE utenti SET Password = '$password' WHERE Email = '$email'";
        $data=eseguiQuery($con,$sql);

        //4.Stampa risultato
        echo(json_encode(array("logout"=>"eff")));

        //5. Close
		$con->close();
	}
?>