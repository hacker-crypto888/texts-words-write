<form method="post" action="this-page.php">
    <label>Name<input type="text" name="name"></label><br>
    <label>Email<input type="text" name="email"></label><br>
    <label>Extra Info<br><textarea name="extra_info"></textarea></label><br>
    <input type="submit" name="submit" value="Submit">
</form>

<?php
$errors = array(); 
if(isset($_POST['submit'])){
    //Submit button has been pressed.
    echo 'Submit button pressed!yoohoo!';


    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $extraInfo = isset($_POST['extra_info']) ? $_POST['extra_info'] : null;
    //Check the name and make sure that it isn't a blank/empty string.
    if(strlen(trim($name)) === 0){
        //Blank string, add error to $errors array.
        $errors[] = "You must enter your name!";
    }
    //Make sure that the email address is valid.
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        //$email is not a valid email. Add error to $errors array.
        $errors[] = "That is not a valid email address!";
    }

    //If our $errors array is empty, we can assume that everything went fine.
    if(empty($errors)){
        //Send email or insert data into database.
      echo '<h1>Error(s)!</h1>';
      foreach($errors as $errorMessage){
        echo $errorMessage . '<br>';
      }

    }

}
