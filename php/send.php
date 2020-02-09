<?php
	
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	$headers .= 'From: Stroy Visota <webmaster@site.ru>' . "\r\n" .
		        'X-Mailer: PHP/' . phpversion();
	
	$mailto = 'victorpavloff@gmail.com';
	
	$name = trim($_POST['name']);
	$phone = trim($_POST['phone']);
	
	$subject = 'Новая заявка';
	
	$message = '';
	
	if (isset($name) and !empty($name)) {
		$message .= 'Имя: '.$name."<br>";
	}
	
	if (isset($phone) and !empty($phone)) {
		$message .= 'Телефон: '.$phone."<br>";
	}
	
	mail($mailto, $subject, $message, $headers);
	
?>