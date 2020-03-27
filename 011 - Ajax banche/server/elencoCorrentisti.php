<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");
    //Parameters Check
    if (!isset($_REQUEST["cFiliale"]))
    {
        http_response_code(422);
        die ("Parametro mancante (cFiliale).");
    }
    //Load Of Connection And Query Execution
    $con=connection("4b_banche");
    $cFiliale = $con->real_escape_string($_REQUEST["cFiliale"]);
    if (!is_numeric($cFiliale))
    {
        $con->close();
        http_response_code(400);
        die ("Il parametro cFiliale deve essere numerico.");
    }
    $sql = "SELECT correntisti.cCorrentista, correntisti.nome AS nomeCorrentista, comuni.nome AS comuneCorrentista, telefono, cConto, saldo
            FROM correntisti, comuni, conti
            WHERE cFiliale = $cFiliale AND correntisti.cComune = comuni.cComune AND correntisti.cCorrentista = conti.cCorrentista ";
    $data = eseguiQuery($con, $sql);
    //Return Of Data Recived From The Query
    echo json_encode($data);
    $con->close();
?>