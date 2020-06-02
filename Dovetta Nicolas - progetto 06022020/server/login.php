<?php
    header("Content-type:application/json;charset=utf-8");
	require ("libreria.php");

	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		//1. Controllo parametri
		if(!isset($_POST["email"]))
		{
			http_response_code(400);
			die("Parametro mancante: email.");
		}
		if(!isset($_POST["password"]))
		{
			http_response_code(400);
			die("Parametro mancante: password.");
		}
		//2. Connessione
		$con = connection("progetto");
		$user = $con->real_escape_string($_POST["email"]);
		$password = $con->real_escape_string($_POST["password"]);

		//3. Query
		$sql = "SELECT * FROM utenti WHERE Email='$user';";
		$data= eseguiQuery($con, $sql);
		if(count($data)==0)
		{
			http_response_code(401);
			die("Email non valida.");
		}
		else if($data[0]['Password']!= $password)
		{
			http_response_code(401);
			die("Password non valida.");
		}

		//4. Creazione session e restituzione risultato
		else{
			session_start();
			$_SESSION["email"]=$data[0]['Email'];
			$_SESSION["scadenza"] = time() + SCADENZA;
			setcookie(session_name(), session_id(), time()+SCADENZA, "/");
			//echo(json_encode({"ris":"ok"}))
			echo(json_encode(array("ris"=>"ok")));
		}

		//5. Close
		$con->close();
	}
?>