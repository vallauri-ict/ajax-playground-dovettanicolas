<?php
    header("Content-type:application/json;charset=utf-8");
    session_start();
    session_destroy();
    echo(json_encode(array("logout"=>"eff")));
?>