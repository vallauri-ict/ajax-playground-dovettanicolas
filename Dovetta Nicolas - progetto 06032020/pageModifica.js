"use strict"

$(document).ready(function(){
    $("#navBar").hide();
    $("#wrapper").hide();
    $("#footer").hide();
    $("#alrtN").hide();
    $("#alrtS").hide();
    $("#modifica").hide();
    $("#modif").prop("disabled",true);
    $("#delete").prop("disabled",true);
    let tipo;
    let _days=$("#daysWrapper");
    _days.hide();
    let dayId;

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
        $("#type").prop("selectedIndex",-1);
    });

    $("#alrtN").children("button").on("click", function(){
		$("#alrtN").hide();
    });

    $("#alrtS").children("button").on("click", function(){
		$("#alrtS").hide();
    });

    $("#aP").on("click",function(){
        window.location.href="index.html";
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

    $("#type").on("change", function(){
        $("#modifica").hide();
        console.log($("#type").prop("value"));
        tipo=$("#type").prop("value").toString();
        let request=inviaRichiesta("POST","server/takeDayType.php",{"type":tipo});
        request.fail(function(jqXHR, test_status, str_error) {
            if(jqXHR.status==403)
            {
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });

        request.done(function(data){
            console.log(data);
            $(".removable").remove();
            if(data[0].length!=0)
            {
                for(let record of data[0])
                {
                    $("<option>", {
                        text: record["Giorno"],
                        value: record["Giorno"],
                        class: "removable"
                    }).css("class","removable").appendTo($("#days"));
                }
                $("#days").prop("selectedIndex",-1);
                _days.show();
            }
            else
            {
                _days.hide();
                alert("Non ci sono dati da modificare.");
            }
        });
    });

    $("#days").on("change", function(){
        let giorno=$("#days").prop("value").toString();
        let request=inviaRichiesta("POST","server/getDayByType.php",{"type":tipo,"day":giorno});
        request.fail(function(jqXHR, test_status, str_error) {
            if(jqXHR.status==403)
            {
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });

        request.done(function(data){
            console.log(data);
            if(data.length!=0)
            {
                $("#modif").prop("disabled",false);
                $("#delete").prop("disabled",false);
                $("#modifica").show();
                $("#ant").val(data[0][0]["Antipasto"]);
                $("#prm").val(data[0][0]["Primo"]);
                $("#sec").val(data[0][0]["Secondo"]);
                $("#dlc").val(data[0][0]["Dolce"]);
                dayId=data[0][0]["DayId"];
            }
            else
            {
                $("#modifica").hide();
                alert("Non ci sono dati da modificare.");
            }
        });
    });

    $("#modif").on("click", function(){
        let ant=$("#ant").val();
        let prim=$("#prm").val();
        let sec=$("#sec").val();
        let dolc=$("#dlc").val();
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
        let request = inviaRichiesta("POST", "server/updateDay.php",{"id":dayId,"ant":ant, "prim":prim, "sec":sec, "dolc":dolc});
        request.fail(function(jqXHR, test_status, str_error) {
            if(jqXHR.status==403)
            {
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });

        request.done(function(data){
            $("#alrtS").show();
        });
    });

    $("#delete").on("click", function(){
        let request = inviaRichiesta("POST", "server/deleteDayId.php",{"id":dayId});
        request.fail(function(jqXHR, test_status, str_error) {
            if(jqXHR.status==403)
            {
                window.location.href="login.html";
            }
            else
            {
                error(jqXHR, test_status, str_error);
            }
        });

        request.done(function(data){
            $("#alrtN").show();
            $("#modif").prop("disabled",true);
            $("#delete").prop("disabled",true);
            $("#modifica").hide();
            _days.hide();
            $("#type").prop("selectedIndex",-1);
        });
    });
});