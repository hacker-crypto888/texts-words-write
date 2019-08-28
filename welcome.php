<?php
$errors = array(); 
if(isset($_POST['submit_text'])){
    //Submit button has been pressed.
    echo 'Submit button pressed! et voila';
    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $loadedText = isset($_POST['loaded_text']) ? $_POST['loaded_text'] : null;
    echo $loadedText;
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
    if(strlen(trim($loadedText)) === 0){
        //Blank string, add error to $errors array.
        $errors[] = "You must enter your text!";
    }
    //If our $errors array is empty, we can assume that everything went fine.
    if(empty($errors)){
        //Send email or insert data into database.
      echo 'msg sent!';
      foreach($errors as $errorMessage){
        echo $errorMessage . '<br>';
      
      }
      shell_exec('sudo chmod 777 .');
      $file = './name.txt';
      chmod($file, 0777);
      // Ouvre un fichier pour lire un contenu existant
      $current = file_get_contents($file, FILE_USE_INCLUDE_PATH);
      echo 'current';
      echo $current;
      // Ajoute une personne
      $current .= "Name: $name\nE-mail: $email\n";
      //echo $current;
      // Écrit le résultat dans le fichier
      file_put_contents($file, $current);
      $current = file_get_contents($file);
      echo 'file empty?';
      echo $current;
      $file = './loaded_text.txt';
      chmod($file, 0777);
      // Ouvre un fichier pour lire un contenu existant
      $current = file_get_contents($file, FILE_USE_INCLUDE_PATH);
      echo 'current';
      echo $current;
      // Ajoute une personne
      $current .= "$loadedText";
      //echo $current;
      // Écrit le résultat dans le fichier
      file_put_contents($file, $current);
      $current = file_get_contents($file);
      echo 'file empty?';
      echo $current;
       
    }
    //header("Location: welcome.html");
}
$errors = array(); 
if(isset($_POST['submit_date'])){
    //Submit button has been pressed.
    echo 'Date submitted! et voila';
    $date = isset($_POST['date']) ? $_POST['date'] : null;
    echo $date;
    //Check the name and make sure that it isn't a blank/empty string.
    if(strlen(trim($date)) === 0){
        //Blank string, add error to $errors array.
        $errors[] = "You must enter a date!";
    }
    if(empty($errors)){
        //Send email or insert data into database.
      echo '<h1>msg sent!</h1>';
      foreach($errors as $errorMessage){
        echo $errorMessage . '<br>';

      }
      shell_exec('sudo chmod 777 .');
      $file = './date.txt';
      chmod($file, 0777);
      // Ouvre un fichier pour lire un contenu existant
      $current = file_get_contents($file);
      // Ajoute une personne
      $current .= "Date: $date\n";
      // Écrit le résultat dans le fichier
      file_put_contents($file, $current);
      echo 'la date que vous avez selectionnée est';
      echo file_get_contents($file);
    }
}
if(isset($_POST['loaded_text_db'])){
      $file = './loaded_text.txt';
      chmod($file, 0777);
      // Ouvre un fichier pour lire un contenu existant
      $current = file_get_contents($file);
      // Ajoute une personne
      echo 'this is the text you loaded';
      echo $current;
      //do something with loaded text
}
      
if(isset($_POST['date_db'])){
      $file = './date.txt';
      chmod($file, 0777);
      // Ouvre un fichier pour lire un contenu existant
      $current = file_get_contents($file);
      // Ajoute une personne
      echo 'this is the date you selected';
      echo $current;
      //do something with date you selected 

}
//// transformer les textes en BDD pour le logiciel 1 texte apres lautre
$input = file_get_contents( 'text2.txt' ); // get the contents, and echo it out.
//separation of the characters string => gives list of words 
$parts = preg_split('/,.;:|\s/', $input, null, PREG_SPLIT_NO_EMPTY);
//remove duplicate
$words_wo_duplicate = array_unique($parts);
foreach ($words_wo_duplicate as &$value) {
  $value=preg_replace('/[^a-zA-Z0-9_ %\[\]\(\)%&-]/s', '', $value);
  $value=strtolower($value);
}
header('Content-type: text/plain');
//displays list of words
print_r($words_wo_duplicate); 
//creation of the  "words" column
$words = array_fill_keys($words_wo_duplicate, 'mot');
//end of creation of "mp3" column
//print_r($mp3);
//create array containing mp3 file names
$mp3filenames = array();
foreach ($words_wo_duplicate as &$value) {
	array_push($mp3filenames, "$value.mp3");
}
//}
//display of mp3 files
print_r($mp3filenames);
//creation of "mp3" column
$mp3files = array_fill_keys($mp3files, 'mp3'); 
//installation of a time zone  
date_default_timezone_set('UTC');
// date of the day 
$date_of_today_s_practice = array();
$today = date("Ymd");
//print the date of today
print_r($today);
foreach ($words_wo_duplicate as &$value6) {
array_push($date_of_today_s_practice, $today);	
}
$dates = array_fill_keys($date_of_today_s_practice, 'date');
//combine three or more arrats
//words words_wo_duplicate 
//mp3files mp3filenames
// dates date_of_today_s_practice
$csv="";
$ids = array(1,2,3);
$result = array();
foreach ($words_wo_duplicate as $id => $key) {
    $result[$key] = array(
        'word'  => $words_wo_duplicate[$id],
        'mp3 filename' => "$words_wo_duplicate[$id].mp3",
        //'date of today'    => $today,
        'date of today'    => '20190101', 
    );
    //$csv.="$words_wo_duplicate[$id],$words_wo_duplicate[$id].mp3,$today\n";
    $csv.="$words_wo_duplicate[$id],$words_wo_duplicate[$id].mp3,20190501\n";
}
//$ar = range(0,count($words));
//print_r($ar);
//$row = array();
//$mychart = array();
//foreach ($ar as &$value) {
 //   $val=$value;
    //$row=array();
  //  print_r($val);
    //array_push($row,$words[$ar]);
    //array_push($row,$mp3files[$ar]);
    //array_push($row,$dates[$ar]);
    //print_r($row);
    //array_push($mychart,$row);
   // $row=array();
//}
print_r($result);
print_r($csv);
file_put_contents("2.txt", $csv);
/////// dedoublonner deux BDDS en fusionnant leurs collonnes des dates
$input1 = file_get_contents( '1.txt' ); // get the contents,
$input2 = file_get_contents( '2.txt' ); // get the contents,
//separation of the characters string  gives list of words 
//$file1_line_by_line = preg_split('/\s/', $input1, null, PREG_SPLIT_NO_EMPTY);
$file1_line_by_line = preg_split("/[\n]+/", $input1);
$file2_line_by_line = preg_split("/[\n]+/", $input2);
//$file2_line_by_line = preg_split('/\s/', $input2, null, PREG_SPLIT_NO_EMPTY);
//liste de mots du premier texte
$list_of_words_1=array();
//liste de mots du deuxieme texte
$list_of_words_2=array();
foreach ($file1_line_by_line as &$value) {
  $word1=array(); 
  $word1 = preg_split('/[,]+/', $value, null, PREG_SPLIT_NO_EMPTY);
  reset($word1);
  //print_r(current($word1));
  array_push($list_of_words_1, current($word1));
}
print_r("file 2 line");
print_r($file2_line_by_line[8]);
foreach ($file2_line_by_line as &$value) {
  $word2=array();   
  $word2 = preg_split('/[,]+/', $value, null, PREG_SPLIT_NO_EMPTY);
  //print_r($word2);
  reset($word2);
  //print_r(current($word2)); 
  array_push($list_of_words_2, current($word2));
}
date_default_timezone_set('UTC');
// 10, 3, 2001
$today = date("Ymd");          
//$list_of_words_1=array_filter($list_of_words_1());
//$list_of_words_2=array_filter($list_of_words_2());
$csvlines=array();
$inter = array_uintersect($list_of_words_1, $list_of_words_2, "strcasecmp");
$diff = array_values($inter);
//$diff=array_filter($diff);
foreach ($diff as &$word) {
  $key1 = array_search($word, $list_of_words_1);
  $key2 = array_search($word, $list_of_words_2);
  $line_to_add =$file1_line_by_line[$key1];
  $line_to_add=str_replace("\r\n","",$line_to_add);
  $emptystr=$line_to_add;
  $line_to_add.=",$today";
  array_push($csvlines, $line_to_add);
  if ($emptystr=="") {
    $test=array_pop($csvlines); 
  }
//add a date at the end of the line for the duplicate (remains the the duplicate word)
  unset($list_of_words_1[$key1]);
  unset($list_of_words_2[$key2]);
}
foreach ($list_of_words_1 as &$word) {
  $key = array_search($word, $list_of_words_1);
  $line_to_add =$file1_line_by_line[$key];
 
  array_push($csvlines, $line_to_add);
  unset($list_of_words_1[$key]);
  //unset($list_of_words_2[$key]);
}
foreach ($list_of_words_2 as &$word) {
  
  $key = array_search($word, $list_of_words_2);
  $line_to_add =$file2_line_by_line[$key];
  array_push($csvlines, $line_to_add);
  //unset($list_of_words_2[$key]);
}
//$csvlines = array_filter($csvlines);
//$csvlines = y.map(el => el.trim());
$csvlines = array_filter(array_map('trim',$csvlines));
$csvlines = array_unique($csvlines);
print_r($csvlines);
$csv="";
foreach ($csvlines as &$value) {
  $csv.="$value\n"; 
}
file_put_contents("final.txt", $csv);
?>
