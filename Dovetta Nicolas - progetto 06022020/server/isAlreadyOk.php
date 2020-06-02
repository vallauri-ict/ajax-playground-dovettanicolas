<?php
    header("Content-type:application/json;charset=utf-8");
    require("libreria.php");
    checkSession("email");
    echo(json_encode(array("logout"=>"eff")));
?>