<?php

header('Content-type: application/html');
echo file_get_contents("https://reservations.frontdeskanywhere.net/F120322D/oboe2/ajax_get_booking_list.php?json=true&arrival_date=2014-05-07&departure_date=2014-05-09");

?>