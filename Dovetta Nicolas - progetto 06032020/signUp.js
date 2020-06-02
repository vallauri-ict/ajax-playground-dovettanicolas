"use strict"

$(document).ready(function() {
    $("#sing").on("click",function(){
        $("#nome").removeClass("is-invalid");
        $("#cognome").removeClass("is-invalid");
        $("#mail").removeClass("is-invalid");
        $("#pass").removeClass("is-invalid");
        $("#num").removeClass("is-invalid");
        $("#via").removeClass("is-invalid");
        $("#comu").removeClass("is-invalid");
        $("#civ").removeClass("is-invalid");
        $("#prov").removeClass("is-invalid");

        if($("#nome").val()=="")
        {
            $("#nome").addClass("is-invalid");
        }
        else
        {
            let nome=$("#nome").val();
            if($("#cognome").val()=="")
            {
                $("#cognome").addClass("is-invalid");
            }
            else
            {
                let cognome=$("#cognome").val();
                if($("#mail").val()=="")
                {
                    $("#mail").addClass("is-invalid");
                }
                else
                {
                    let mail=$("#mail").val();
                    if(mail.length<3)
                    {
                        $("#mail").addClass("is-invalid");
                    }
                    else
                    {
                        if($("#pass").val()=="")
                        {
                            $("#pass").addClass("is-invalid");
                        }
                        else
                        {
                            let pass=$("#pass").val();
                            if(pass.length<7)
                            {
                                $("#pass").addClass("is-invalid");
                            }
                            else
                            {
                                if($("#num").val()=="")
                                {
                                    $("#num").addClass("is-invalid");
                                }
                                else
                                {
                                    let tel=$("#num").val();
                                    if(tel.length!=10)
                                    {
                                        $("#num").addClass("is-invalid");
                                    }
                                    else
                                    {
                                        if($("#via").val()=="")
                                        {
                                            $("#via").addClass("is-invalid");
                                        }
                                        else
                                        {
                                            let via=$("#via").val();
                                            if($("#comu").val()=="")
                                            {
                                                $("#comu").addClass("is-invalid");
                                            }
                                            else
                                            {
                                                let comune =$("#comu").val();
                                                if($("#civ").val()=="")
                                                {
                                                    $("#civ").addClass("is-invalid");
                                                }
                                                else
                                                {
                                                    let civ=$("#civ").val();
                                                    if(civ.length>2)
                                                    {
                                                        $("#civ").addClass("is-invalid");
                                                    }
                                                    else
                                                    {
                                                        if($("#prov").val()=="")
                                                        {
                                                            $("#prov").addClass("is-invalid");
                                                        }
                                                        else
                                                        {
                                                            let prov=$("#prov").val();
                                                            if(prov.length>2)
                                                            {
                                                                $("#prov").addClass("is-invalid");
                                                            }
                                                            else
                                                            {
                                                                let aus=CryptoJS.MD5(pass).toString();
                                                                let indirizzo=via+" "+civ+", "+comune+" ("+prov+")";
                                                                let request=inviaRichiesta("POST","server/iscrizione.php",{"nome":nome,
                                                                    "cognome":cognome,
                                                                    "mail":mail,
                                                                    "password":aus,
                                                                    "numero":tel,
                                                                    "indirizzo":indirizzo});

                                                                request.fail(function(jqXHR, test_status, str_error) {
                                                                    error(jqXHR, test_status, str_error);
                                                                });

                                                                request.done(function(data){
                                                                    alert("Iscrizione avvenuta correttamente.\nStai per essere reindirizzato alla pagina di login.");
                                                                    window.location.href="login.html";
                                                                });
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    $("#deny").on("click", function(){
        window.location.href="login.html";
    });
});