<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = htmlspecialchars($_POST['fullname']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $zipcode = htmlspecialchars($_POST['zipcode']);
    $message = htmlspecialchars($_POST['message']);

    $to = "epicsteamanddeepcleaning";
    $subject = "New Form Submission";
    $body = "You have received a new message from your website form.\n\n" .
            "Full Name: $fullname\n" .
            "Email: $email\n" .
            "Phone: $phone\n" .
            "Zip Code: $zipcode\n" .
            "Message:\n$message";
    $headers = "From: $email";

    if (mail($to, $subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message. Please try again later.";
    }
}
?>
