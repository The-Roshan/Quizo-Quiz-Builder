<?php
$question1 = $_POST['stp_1_select_option'];
$question2 = $_POST['stp_2_select_option'];
// $question3 = $_POST['stp_3_select_option'];
// $question4 = $_POST['stp_4_select_option'];

// You can add more items, if you want.............

$to = 'tologi5810@healteas.com'; // change here
$subject = 'Your Question Answere'; // change here
$from = 'test@email.com'; // change here

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Create email headers
$headers .= 'From: '.$from."\r\n".
'Reply-To: '.$from."\r\n" .
'X-Mailer: PHP/' . phpversion();

// Compose a simple HTML email message
$message = '<html><body>';
$message .= '<h2 style="color:#080;font-size:18px;">Your form was submitted successfully! '.$question1.'</h2>';
$message .= '<h4 style="color:#080;font-size:22px;">Here is your details</h4>';
$message .= '</body></html>';

// Sending email
if (mail($to, $message, $subject, $headers)) {
    header('Location: thankyou/index-1.html');
    exit();
} else {
    echo 'Unable to send email. Please try again!.';
}

?>

