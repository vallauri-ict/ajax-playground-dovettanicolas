<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");

	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		//1. Controllo parametri
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

		//2. Connessione
		$con = connection("progetto");

        //3. Query
        $mail=$_REQUEST["mail"];
        $pw=$_REQUEST["password"];
        $sql="SELECT Email FROM utenti WHERE Email='$mail';";
        $data= eseguiQuery($con, $sql);
        if(count($data)==0)
        {
            http_response_code(400);
            die("Utente non registrato.");
        }
        else
        {
            $sql="UPDATE utenti SET Password='$pw'  WHERE Email = '$mail';";
            $data= eseguiQuery($con, $sql);
        }

        //4. Ritorno dati
        echo(json_encode($data));

		//5. Close
		$con->close();
	}
?>