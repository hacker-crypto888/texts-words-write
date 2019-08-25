<?php
$errors = array(); 
if(isset($_POST['submit'])){
    //Submit button has been pressed.
    echo 'Submit button pressed! et voila';


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
      echo '<h1>msg sent!</h1>';
      foreach($errors as $errorMessage){
        echo $errorMessage . '<br>';
      
      }
      $file = './email2.txt';

      chmod($file, 0777);
      // Ouvre un fichier pour lire un contenu existant
      $current = file_get_contents($file);
      // Ajoute une personne
      $current .= "Name: $name\nE-mail: $email\nEctra info: $extraInfo\n";
      // Écrit le résultat dans le fichier
      file_put_contents($file, $current);


    }

}
