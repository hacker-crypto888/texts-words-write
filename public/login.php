<?php
session_start();
$logins = array('username1' => 'password1','username2' => 'password2');
if(isset($_POST['username']) && isset($_POST['password'])){
$username = trim($_POST['username']);
$password = trim($_POST['password']);
foreach($logins as $key=>$value){
if(($key == $username) && ($value == $password)){
echo "1";
}else{
echo "0";
}
}

}else{
echo "0";
}

?>
