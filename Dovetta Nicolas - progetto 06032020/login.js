"use strict"

$(document).ready(function() {
	let _email = $("#mail");
	let _password = $("#pwd");
	let _lblErrore = $("#lblError");

	//All'avvio apriamo subito il jumbotron
	$(".jumbotron").trigger("click");
    _lblErrore.hide();
	$("#btnLogin").on("click", controllaLogin);

	//Il submit deve partire anche senza click
	//Ma con il solo tasto INVIO
	$(document).on('keydown', function(event) {
		if (event.keyCode == 13)
		{
			controllaLogin();
		}
	});

	_lblErrore.children("button").on("click", function(){
		_lblErrore.hide();
	});

	$("#sing").on("click",function(){
		window.location.href="signUp.html";
	});

	$("#remake").on("click",function(){
		_email.removeClass("is-invalid");
		_email.prev().removeClass("icona-rossa");
		if (_email.val() == "")
		{
            _email.addClass("is-invalid");//Bordo rosso textbox
			_email.prev().addClass("icona-rossa");//Colore icona
			alert("Per reimostare la password inserire un'email.");
		}
		else
		{
			let email=_email.val();
			let pass=CryptoJS.MD5("password").toString();
			let req=inviaRichiesta("POST","server/reimpPassword.php",{"mail":email,"password":pass});
			req.fail(function(jqXHR, test_status, str_error) {
				error(jqXHR, test_status, str_error);
			});

			req.done(function(data){
				alert("La password per l'account: \""+ email +"\" è stata reimpostata a \"password\".\n Si consiglia di cambiarla al primo login.");
			});
		}
	});

	function controllaLogin(){
        _email.removeClass("is-invalid");//Bordo rosso textbox
		_email.prev().removeClass("icona-rossa");//Colore icona
        _password.removeClass("is-invalid");
		_password.prev().removeClass("icona-rossa");
		_lblErrore.hide();
		if (_email.val() == "")
		{
            _email.addClass("is-invalid");//Bordo rosso textbox
			_email.prev().addClass("icona-rossa");//Colore icona
        }
		else if (_password.val() == "")
		{
            _password.addClass("is-invalid");//Bordo rosso textbox
			_password.prev().addClass("icona-rossa");//Colore icona
        }
		else
		{
			let email=_email.val();
			console.log(email);
			//La codifica md5 restituisce una word esadecimale, quindi è obbligatorio .toString()
			let pass=CryptoJS.MD5(_password.val()).toString();
			let _richiestaLogin= inviaRichiesta("POST", "server/login.php", { "email":email, "password":pass } );
			_richiestaLogin.fail(function(jqXHR, test_status, str_error) {
				if (jqXHR.status == 401)
				{
					//Unauthorized
					_lblErrore.show();
				}
				else
				{
					error(jqXHR, test_status, str_error);
				}
			});

			_richiestaLogin.done(function(data) {
				if(data.ris=="ok")
				{
					//Test inutile
					window.location.href = "index.html";
				}
			});
		}
	}
});