<?php
    //Include required phpMailer files.
    require ("includes/PHPMailer.php");
    require ("includes/SMTP.php");
    require ("includes/Exception.php");

    //Define name spaces.
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    if($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if(!isset($_REQUEST["pass"]))
        {
            http_response_code(400);
            die("Parametro mancante password.");
        }

        if(!isset($_REQUEST["mail"]))
        {
            http_response_code(400);
            die("Parametro mancante email.");
        }

        $pass=real_escape_string($_REQUEST["pass"]);
        $email=real_escape_string($_REQUEST["mail"]);

        //Create instance of phpMailer.
        $mail=new PHPMailer();

        //Set mailer to use smtp.
        $mail->isSmtp();

        //Define smtp host.
        $mail->Host="smtp.gmail.com";

        //Enable smtp authentication.
        $mail->SMTPAuth="true";

        //Set type of encryption (ssl/tls).
        $mail->SMTPSecure="tls";

        //Set Port to connect smtp.
        $mail->Port="587";

        //Set gmail username.
        $mail->Username="prjMenu.noreply@gmail.com";

        //Set gmail username.
        $mail->Password="T1Prego_";

        //Set email subject.
        $mail->Subject="New password request";

        //Set sender email.
        $mail->setFrom("prjMenu.noreply@gmail.com");

        //Email body.
        $mail->Body="La nuova password è: $pass.";

        //Add recipient.
        $mail->addAddress($mail);

        //Send email.
        if($mail->Send())
        {
            echo(json_encode(array("sendStatus"=>"ok")));
        }
        else
        {
            echo(json_encode(array("sendStatus"=>"notOk")));
        }

        //Closing smtp connection.
        $mail->smtpClose();

    }
?>