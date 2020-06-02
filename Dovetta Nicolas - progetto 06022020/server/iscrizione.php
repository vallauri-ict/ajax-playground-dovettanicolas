<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		//1. Controllo parametri
		if(!isset($_REQUEST["nome"]))
		{
			http_response_code(400);
			die("Parametro mancante: nome.");
		}
		if(!isset($_REQUEST["cognome"]))
		{
			http_response_code(400);
			die("Parametro mancante: cognome.");
        }
        if(!isset($_REQUEST["mail"]))
		{
			http_response_code(400);
			die("Parametro mancante: mail.");
        }
        if(!isset($_REQUEST["password"]))
		{
			http_response_code(400);
			die("Parametro mancante: password.");
        }
        if(!isset($_REQUEST["numero"]))
		{
			http_response_code(400);
			die("Parametro mancante: numero.");
        }
        if(!isset($_REQUEST["indirizzo"]))
		{
			http_response_code(400);
			die("Parametro mancante: indirizzo.");
		}
		//2. Connessione
		$con = connection("progetto");

        //3. Query
        $nome=$_REQUEST["nome"];
        $cognome=$_REQUEST["cognome"];
        $mail=$_REQUEST["mail"];
        $pass=$_REQUEST["password"];
        $num=$_REQUEST["numero"];
        $ind=$_REQUEST["indirizzo"];
        $sql="SELECT Email FROM utenti WHERE Email='$mail';";
        $data= eseguiQuery($con, $sql);
        if(count($data)==0)
        {
            $sql="INSERT INTO utenti (Id, Nome, Cognome, Telefono, Indirizzo, Email, Password) VALUES (NULL, '$nome', '$cognome', '$num', '$ind', '$mail', '$pass');";
            $data= eseguiQuery($con, $sql);
        }
        else
        {
            http_response_code(401);
            die("Utente già registrato.");
        }

        //4. Ritorno dati
        echo(json_encode($data));

		//5. Close
		$con->close();
	}
?>