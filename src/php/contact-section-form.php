<?php

    require '../../phpmailer/PHPMailer.php';
    require '../../phpmailer/SMTP.php';
    require '../../phpmailer/Exception.php';

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;

    $mail = new PHPMailer();
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
  
    if (isset($_POST['email']) && $_POST['email'] != '' &&  isset($_POST['submit'])) {
        
        if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){

        $name = $_POST['name'];
        $surname = $_POST['surname'];
        $company =$_POST['company'];
        $subject = "Wiadomość z formularza kontaktowego (kontakt)";
        $mailFrom = $_POST['email'];
        $message = $_POST['message'];
        $phone = $_POST['phone'];

        $mailTo = "test@mkr-soft.pl";
        $headers = "From: ".$mailFrom;

        $txt = "Wiadomosc od: ".$name ." z firmy: ".$company.".\n\n"."adres: ".$mailFrom."\n\n"."telefon: ".$phone."\n\n".$message;

        $mail->isSMTP();
        //$mail->SMTPDebug = 2;
        $mail->Host="smtp.titan.email ";
        $mail->SMTPAuth="true";
        $mail->SMTPSecure="ssl";
        $mail->Port="465";

        //insert your own mail account data here
        $mail->Username="xxxxx@twojadomena.pl";
        $mail->Password="xxxx";
        $mail->setFrom("xxxx@twojadomena.pl");
        $mail->addReplyTo($mailFrom,$name);

        

        
        $mail->Subject= $subject;
        $mail->Body=$txt;

        $mail->addAddress("targetmail@twojadomena.pl");
    
        if($mail->Send()){
            echo "Email Sent..";
        } else {
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        }
        
        $mail->smtpClose();



        }
    
    }

    header("Location :../../kontakt.html");
    
?>