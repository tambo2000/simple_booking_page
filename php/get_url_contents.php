<?php

$url = "https://reservations.frontdeskanywhere.net/F120322D/oboe2/ajax_get_booking_list.php?json=true&" . $_GET['url'];
header('Content-type: text/html');
echo file_get_contents($url);

?>