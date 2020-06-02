"use strict"

$(document).ready(function(){
    let _bodyPranzo= $("#tPranzo tbody");
    let _bodyCena= $("#tCena tbody");
    let _wrapper=$("#wrapper");
    let _navBar=$("#navBar");
    let _footer=$("#footer");

    _wrapper.hide();
    _navBar.hide();
    _footer.hide();

    $("#chngPassword").on("click", function(){
        window.location.href="cambiaPassword.html";
    });

    $("#lblErrorCena").children("button").on("click", function(){
		$("#lblErrorCena").hide();
    });

    $("#lblErrorPranzo").children("button").on("click", function(){
		$("#lblErrorPranzo").hide();
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

	let rqFiliali = inviaRichiesta("GET", "server/settimanale.php");
	rqFiliali.fail(function (jqXHR, test_satus, str_error){
		if(jqXHR.status==403)
		{
			window.location.href="login.html";
		}
		else
		{
			error(jqXHR, test_satus, str_error);
		}
    });

    rqFiliali.done(function(data){
        _wrapper.show();
        _navBar.show();
        _footer.show();
        updateTable(data);
    });

    function updateTable(data)
    {
        console.log(data[0].length);
        if(data[0].length>7)
        {
            $("#footer").css("position","relative");
        }
        deleteRows();
        console.log(data);
        for(let record of data[0])
        {
            console.log(record);
            let r=$("<tr class='toDelete'>");
            $("<td>", {"text" : record["Giorno"]}).appendTo(r);
            $("<td>", {"text" : record["Antipasto"]}).appendTo(r);
            $("<td>", {"text" : record["Primo"]}).appendTo(r);
            $("<td>", {"text" : record["Secondo"]}).appendTo(r);
            $("<td>", {"text" : record["Dolce"]}).appendTo(r);
            if(record["Tipo"]=="Pranzo")
            {
                $("#lblErrorPranzo").hide();
                $("#tPranzo").show();
                r.appendTo(_bodyPranzo);
            }
            else
            {
                $("#lblErrorCena").hide();
                $("#tCena").show();
                r.appendTo(_bodyCena);
            }
        }
    }

    function deleteRows()
    {
        $("#tCena").hide();
        $("#tPranzo").hide();
        $("#lblErrorCena").show();
        $("#lblErrorPranzo").show();
        $(".toDelete").remove();
    }
});