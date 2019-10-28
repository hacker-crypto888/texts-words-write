<?php 

$hidden_count = $_GET["hidden_count"];

$hidden_count = $hidden_count + 1;
include 'connect_to_mysql.php';

echo json_encode(array("total_hidden" => $hidden_count ));

?>
