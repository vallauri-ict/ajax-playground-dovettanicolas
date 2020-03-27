<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");
    //Parameters Check
    if (!isset($_REQUEST["cBanca"]))
    {
        http_response_code(422);
        die ("Parametro mancante (cBanca).");
    }
    //Load Of Connection And Query Execution
    $con=connection("4b_banche");
    $cBanca = $con->real_escape_string($_REQUEST["cBanca"]);
    if (!is_numeric($cBanca))
    {
        $con->close();
        http_response_code(400);
        die ("Il parametro cBanca deve essere numerico.");
    }
    $sql = "SELECT cFiliale, filiali.nome AS nomeFiliale, comuni.nome AS nomeComune
            FROM filiali, comuni
            WHERE cBanca = $cBanca AND filiali.cComune = comuni.cComune;";
    $data = eseguiQuery($con, $sql);
    //Return Of Data Recived From The Query
    echo json_encode($data);
    $con->close();
?>