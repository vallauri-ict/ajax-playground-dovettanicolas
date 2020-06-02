"use strict"

$(document).ready(function(){
    $("#navBar").hide();
    $("#wrapper").hide();
    $("#footer").hide();
    $("#errorPw").hide();
    $("#error").hide();

    let trySession=inviaRichiesta("POST","server/isAlreadyOk.php",{});

    trySession.fail(function(jqXHR, test_status, str_error) {
        if(jqXHR.status==403)
        {
            window.location.href="login.html";
        }
        else
        {
            error(jqXHR, test_status, str_error);
        }
    });

    trySession.done(function(data){
        console.log(data);
        $("#navBar").show();
        $("#wrapper").show();
        $("#footer").show();
    });

    $("#logOut").on("click", function(){
        let rq=inviaRichiesta("POST","server/logout.php");
        rq.fail(function(jqXHR, test_status, str_error) {
            if(jqXHR.status==403)
            {
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });

        rq.done(function(data){
            window.location.href="login.html";
        });
    });

    $("#errorPw").children("button").on("click", function(){
		$("#errorPw").hide();
    });

    $("#error").children("button").on("click", function(){
		$("#error").hide();
	});

    $("#txtPassword2").on("change",function(){
        if($("#txtPassword2").val()!=$("#txtPassword1").val())
        {
            $("#errorPw").show();
        }
        else
        {
            $("#errorPw").hide();
        }
    });

    $("#btnInvia").on("click", function(){
        if($("#txtPassword2").val()==$("#txtPassword1").val())
        {
            if($("#txtPassword2").val().length>7)
            {
                let pwdMd5=CryptoJS.MD5($("#txtPassword2").val()).toString();
                let req=inviaRichiesta("POST","server/cambiaPassword.php",{"password":pwdMd5});
                req.fail(function(jqXHR, test_status, str_error) {
                    if(jqXHR.status==403)
                    {
                        window.location.href="login.html";
                    }
                    else
                    {
                        error(jqXHR, test_status, str_error);
                    }
                    $("#error").show();
                });

                req.done(function(data){
                    console.log("data");
                    let rq=inviaRichiesta("POST","server/logout.php");
                    rq.fail(function(jqXHR, test_status, str_error) {
                        if(jqXHR.status==403)
                        {
                            window.location.href="login.html";
                        }
                        else
                        {
                            error(jqXHR, test_status, str_error);
                        }
                    });

                    rq.done(function(data){
                        window.location.href="login.html";
                    });
                });
            }
            else
            {
                $("#errorPw").show();
            }
        }
        else
        {
            $("#errorPw").show();
        }
    });
});