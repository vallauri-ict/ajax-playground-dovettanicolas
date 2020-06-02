"use strict"

$(document).ready(function(){
    $("#navBar").hide();
    $("#wrapper").hide();
    $("#footer").hide();
    $("#alrtP").hide();
    $("#alrtC").hide();

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

    $("#alrtP").children("button").on("click", function(){
		$("#alrtP").hide();
    });

    $("#alrtC").children("button").on("click", function(){
		$("#alrtC").hide();
	});

    $("#aP").on("click",function(){
        window.location.href="index.html";
    });

    $("#aC").on("click",function(){
        window.location.href="index.html";
    });

    $("#addPranzo").on("click",function(){
        let ant, prim, sec, dolc;

        //Lunedì
        ant=$("#aLunP").val();
        prim=$("#pLunP").val();
        sec=$("#sLunP").val();
        dolc=$("#dLunP").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        let _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Lunedì", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Pranzo"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Lunedì pranzo aggiunto.");
        });

        //Martedì
        ant=$("#aMarP").val();
        prim=$("#pMarP").val();
        sec=$("#sMarP").val();
        dolc=$("#dMarP").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Martedì", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Pranzo"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Martedì pranzo aggiunto.");
        });

        //Mercoledì
        ant=$("#aMerP").val();
        prim=$("#pMerP").val();
        sec=$("#sMerP").val();
        dolc=$("#dMerP").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Mercoledì", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Pranzo"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Mercoledì pranzo aggiunto.");
        });

        //Giovedì
        ant=$("#aGioP").val();
        prim=$("#pGioP").val();
        sec=$("#sGioP").val();
        dolc=$("#dGioP").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Giovedì", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Pranzo"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Giovedì pranzo aggiunto.");
        });

        //Venerdì
        ant=$("#aVenP").val();
        prim=$("#pVenP").val();
        sec=$("#sVenP").val();
        dolc=$("#dVenP").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Venerdì", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Pranzo"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Venerdì pranzo aggiunto.");
        });

        //Sabato
        ant=$("#aSabP").val();
        prim=$("#pSabP").val();
        sec=$("#sSabP").val();
        dolc=$("#dSabP").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Sabato", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Pranzo"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Sabato pranzo aggiunto.");
        });

        //Domenica
        ant=$("#aDomP").val();
        prim=$("#pDomP").val();
        sec=$("#sDomP").val();
        dolc=$("#dDomP").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Domenica", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Pranzo"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Domenica pranzo aggiunto.");
        });

        $("#alrtP").show();
    });

    $("#addCena").on("click",function(){
        let ant, prim, sec, dolc;

        //Lunedì
        ant=$("#aLunC").val();
        prim=$("#pLunC").val();
        sec=$("#sLunC").val();
        dolc=$("#dLunC").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        let _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Lunedì", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Cena"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Lunedì pranzo aggiunto.");
        });

        //Martedì
        ant=$("#aMarC").val();
        prim=$("#pMarC").val();
        sec=$("#sMarC").val();
        dolc=$("#dMerC").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Martedì", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Cena"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Martedì pranzo aggiunto.");
        });

        //Mercoledì
        ant=$("#aMerC").val();
        prim=$("#pMerC").val();
        sec=$("#sMerC").val();
        dolc=$("#dMerC").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Mercoledì", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Cena"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Mercoledì pranzo aggiunto.");
        });

        //Giovedì
        ant=$("#aGioC").val();
        prim=$("#pGioC").val();
        sec=$("#sGioC").val();
        dolc=$("#dGioC").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Giovedì", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Cena"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Giovedì pranzo aggiunto.");
        });

        //Venerdì
        ant=$("#aVenC").val();
        prim=$("#pVenC").val();
        sec=$("#sVenC").val();
        dolc=$("#dVenC").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Venerdì", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Cena"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Venerdì pranzo aggiunto.");
        });

        //Sabato
        ant=$("#aSabC").val();
        prim=$("#pSabC").val();
        sec=$("#sSabC").val();
        dolc=$("#dSabC").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Sabato", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Cena"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Sabato pranzo aggiunto.");
        });

        //Domenica
        ant=$("#aDomC").val();
        prim=$("#pDomC").val();
        sec=$("#sDomC").val();
        dolc=$("#dDomC").val();
        if(ant=="")
        {
            ant="-";
        }
        if(prim=="")
        {
            prim="-";
        }
        if(sec=="")
        {
            sec="-";
        }
        if(dolc=="")
        {
            dolc="-";
        }
        _addDay= inviaRichiesta("POST", "server/addDay.php", {"day":"Domenica", "ant":ant, "prim":prim, "sec":sec, "dolc":dolc, "type":"Cena"} );
        _addDay.fail(function(jqXHR, test_status, str_error) {
            if (jqXHR.status == 403)
            {
                //Unauthorized
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });
        _addDay.done(function(data) {
            console.log("Domenica pranzo aggiunto.");
        });
        $("#alrtC").show();
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
});