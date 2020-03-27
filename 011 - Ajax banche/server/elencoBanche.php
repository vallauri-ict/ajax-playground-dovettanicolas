<?php
    header("Content-type:application/json;charset=utf-8");
    require ("libreria.php");
    //Load Of Connection And Query Execution
    $con=connection("4b_banche");
	$sql = "SELECT cBanca, nome
            FROM banche;";
    $data = eseguiQuery($con, $sql);
    //Return Of Data Recived From The Query
    echo json_encode($data);
    $con->close();
?>