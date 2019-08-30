<?php
$errors = array(); 
if(isset($_POST['submit_text'])){
    //Submit button has been pressed.
    shell_exec('sudo chmod 777 .');
    shell_exec('sudo rm items.json');
    shell_exec('sudo rm database.json');
    shell_exec('sudo rm new_text.txt');
    print_r('Submit button pressed! et voila');
    $name = isset($_POST['name']) ? $_POST['name'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $loadedText = isset($_POST['loaded_text']) ? $_POST['loaded_text'] : null;
    print_r($loadedText);
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
      print_r('msg sent!');
      foreach($errors as $errorMessage){
        print_r($errorMessage . '<br>');
      
      }
      shell_exec('sudo chmod 777 .');
      $file = './name.txt';

      // Ouvre un fichier pour lire un contenu existant
      $current = file_get_contents($file, FILE_USE_INCLUDE_PATH | FILE_APPEND);
      chmod($current, 0777);
      print_r('current');
      print_r($current);
      // Ajoute une personne
      $current .= "Name: $name\nE-mail: $email\n";
      // Writes name and email in a file
      file_put_contents($file, $current);
      
      //shell_exec('sudo chmod 777 .');
      //$current = file_get_contents($file);
      //chmod($current, 0777);
      //print_r('file empty?');
      //print_r($current);

      $file = './new_text.txt';
      shell_exec('sudo chmod 777 .');
      $current = file_get_contents($file, FILE_USE_INCLUDE_PATH);
      chmod($current, 0777);
      print_r('current');
      print_r($current);
      // Ajoute une personne
      $current .= "$loadedText";
      // assign )text to a variable
      shell_exec('sudo chmod 777 .');
      //writes text into file 
      file_put_contents($file, $current);
       
    }
    header("Location: welcome.html");
}
$errors = array(); 
if(isset($_POST['submit_date'])){
    //Submit button has been pressed.
    print_r('Date submitted! et voila');
    $date = isset($_POST['date']) ? $_POST['date'] : null;
    print_r($date);
    //Check the name and make sure that it isn't a blank/empty string.
    if(strlen(trim($date)) === 0){
        //Blank string, add error to $errors array.
        $errors[] = "You must enter a date!";
    }
    if(empty($errors)){
        //Send email or insert data into database.
      print_r('<h1>msg sent!</h1>');
      foreach($errors as $errorMessage){
        print_r($errorMessage . '<br>');

      }
      shell_exec('sudo chmod 777 .');
      $file = './date_for_data_entry.txt';

      // Ouvre un fichier pour lire un contenu existant
      $current = file_get_contents($file);
      chmod($current, 0777);
      // Ajoute une personne
      $current = "$date";
      // Écrit le résultat dans le fichier
      file_put_contents($file, $current);
    }
    header("Location: welcome.html");
}
if(isset($_POST['add_new_words'])){
   
      shell_exec('sudo chmod 777 .');
      shell_exec('rm items.json');
      shell_exec('rm database.json');
      $file = './new_text.txt';

      // Ouvre un fichier pour lire un contenu existant
      $current = file_get_contents($file);
      chmod($current, 0777);
      // Ajoute une personne
      print_r('this is the text you loaded');
      //print_r($current);
      $parts = preg_split('/,.;:|\s/', $current, null, PREG_SPLIT_NO_EMPTY);
      //remove duplicate
      $wordsWoDuplicate = array_unique($parts);

      foreach ($words_wo_duplicate as &$value) {
        $value=preg_replace('/[^a-zA-Z0-9_ %\[\]\(\)%&-]/s', '', $value);
        $value=strtolower($value);
      }
      $wordsWoDuplicate = array_filter($wordsWoDuplicate, null);
       
      //=========READ THE FILE===========================//
      shell_exec('sudo chmod 777 .');
      $json = file_get_contents('./database.json');
      chmod($json, 0777);
      //$jsonData = json_decode($json, true);
      //print_r('content of database.json\n');
      //print_r($jsonData);
      //===============END READ THE FILE==========================//
      //$dataArray = array();
      
      //=====ADD ARRAY TO JSON DATA ARRAY =================//
      //if ($jsonData === null) {
        //$jsonData = array();
        //$items = array();
        //print_r($items);
        //$forMerge[] = $items;
        //array_push($jsonData, "items");
        //print_r($forMerge);
        //$jsonData = array_merge($forMerge, $jsonData);
        //$jsonData['items'] = [];
        //print_r($jsonData);
        
        //shell_exec('sudo chmod 777 .');
        //file_put_contents('database.json',json_encode($jsonData));
      //}
      //===END ADD ARRAY TO JSON DATA ARRAY=====//
      header('Content-type: text/plain');
      //print_r("thisisatest");
      //print_r($wordsWoDuplicate);
      for ($i = 0; $i <= count($wordsWoDuplicate); $i++) {
        $duplicate = 0;
        //print_r($i);
        //print_r('length words');
        //print_r(count($wordsWoDuplicate));
        //print_r($jsonData['items']);
        //print_r($i);
        $dataArray=array();
        $word = $wordsWoDuplicate[$i];
        //===========ASSIGNS DATE OF THE DAY TO VARIABLE ==============//
        date_default_timezone_set('UTC'); 
        $today = date("Ymd");                             // 20010310 
        //============ASSIGNS END DATE OF THE DAY TO VARIABLE==========/
        print_r("\r\n");
        print_r($word);
        print_r("\r\n");
//add the date for the duplicate elements
        if (count($jsonData['items']) > 0) { 
          //if $jsonData[
          for ($j = 0; $j <= count($jsonData['items']); $j++) {
            //print_r("thisline");
            if ($jsonData['items'][$j]['word'] === $word) {
              if(in_array($dateOfTheDay, $jsonData['items'][$j]['dates']) === false) {
                //print_r('duplicate and the date has to be added in the database that already exists');
                //$date = [$dateOfTheDay];
                array_push($jsonData["items"][$j]['dates'], $dateOfTheDay);
                //print_r($jsonData['items']);
                $duplicate = 1;
              } 
            } 
          }
        }
        
        if (duplicate == 0) {
          //print_r("pas de duplicate");
          //array_push($dataArray,JSON.stringify("word")); 
          $dataArray["word"] = $word;
          //array_push($dataArray,JSON.stringify("id")); 
          $dataArray["id"] = $i;
          //array_push($dataArray,"dates")); 
          //$dateOfTheDay = '20190828';
          $dates = [$dateOfTheDay];
          $dataArray["dates"] = $dates; 
          //array_merge($dataArray["dates"], $dates);
          //$forMerge[] = $dataArray;
          if (count($dataArray === 3)) {
            print_r("data array has three elements\r\n");
          }
          $jsonData["items"][$i] = $dataArray;
           //
          // array_merge($jsonData["items"], $forMerge);
          //print_r($jsonData['items'][$i]);
          //print_r("teststring\n");
          //array_push($jsonData['items'], $dataArray);
        }
      }
      //print_r($jsonData['items'][6]);
      //print_r($jsonData);
      //print_r($jsonData);
      //===========WRITES IN BIG DATABASE================================//
      shell_exec('sudo chmod 777 .');
      $json = './database.json';
      $current = file_get_contents($json);
      chmod($current, 0777);
      $current .= json_encode($jsonData, JSON_PRETTY_PRINT); 

      file_put_contents($json, $current);
      //==================================================================// 

      //same process, but exporting the file to be used by the app instead 
      shell_exec('sudo chmod 777 .');
      $json = file_get_contents('./items.json');
      chmod($json, 0777);
      $jsonData = json_decode($json);

      //if ($jsonData === null) {
        //$items = array();
        //$forMerge[] = $items;
        //$jsonData = array_merge($forMerge, $jsonData);
        //$jsonData['items']=[];
        //print_r("create items array");
      //}
      header('Content-type: text/plain');
      for ($i = 0; $i <= count($wordsWoDuplicate); $i++) {
          $dataArray = array();
          $word = $wordsWoDuplicate[$i];
          $dataArray['word'] = $word;
          $dataArray['id'] = $i;
          $jsonData['items'][$i] = $dataArray;
          print_r("here");
      }

      //===============WRITES JSON FILE FOR THE APP=============//
      //print_r($jsonData);
      shell_exec('sudo chmod 777 .');
      //prepares to write in the file
      //$jsonData = json_encode($jsonData);
      //print_r("jsonData");
      //print_r($jsonData);
      $file = "items.json";
      $current = file_get_contents($file);
      chmod($current, 0777);
      $current .= json_encode($jsonData, JSON_PRETTY_PRINT);

      file_put_contents($file, $current);
      //===============END WRITE JSON FILE FOR THE APP==========/
      shell_exec('sudo cp -r items.json public/src.json');
      shell_exec('npm run start');

}
      
if(isset($_POST['database_with_date'])){

      //===OPEN AND READS THE FILE CONTAINING THE DATA ENTRY DATE====//
      shell_exec('sudo chmod 777 .');
      shell_exec('sudo rm items.json');
      $file = './date_for_data_entry.txt';

      $dateForDataEntry = file_get_contents($file);
      chmod($dateForDataEntry, 0777);
      //===END OPEN AND READS THE FILE CONTAINING THE DATA ENTRY DATE====//
      
      //======OPENS AND READS THE BIG DATABASE FILE====//      
        
      shell_exec('sudo chmod 777 .');
      $json = file_get_contents('./database.json');
      chmod($json, 0777);
      
      $jsonData = json_decode($json,true);

      shell_exec('sudo chmod 777 .');
      $json = "./items.json";
      $jsonContent = file_get_contents($json);
      chmod($jsonContent, 0777);
      $jsonDataEntry = json_decode($jsonContent, true);
      //==========END OPENS AND READS THE BIG DATABASE FILE====//
      //======ADDS ITEMS ARRAY TO JSON DATA ARRAY=====//

      //if ($jsonData === null) {
        //$jsonData = array();
        //$items = array();
        //$forMerge[] = $items;
        //$jsonData = array_merge($forMerge, $jsonData);
        //array_push($jsonData, $items);
      //}
      //======= END ADDS ITEMS ARRAY TO JSON DATA ARRAY===//
      header('Content-type: text/plain');
      //print_r($jsonData['items']);
      //$jsonDataEntry = [];
      for ($i = 0; $i <= count($jsonData['items']); $i++) {
        //for ($j = 0; $j <= count($jsonData["items"]); $j++) {
        //print_r($jsonData['items'][$i]['dates']);
        //print_r($dateForDataEntry);
        
        for ($j = 0; $j <= count($jsonData['items'][$i]['dates']); $j++) {
          if ($dateForDataEntry === $jsonData['items'][$i]["dates"][$j]) {
            $dataArray = array();
            $word = $dataArray['items'][$i]['word'];
            //array_push($dataArray,JSON.stringify('word')); 
            $dataArray["word"] = $word;
            //array_push($dataArray,JSON.stringify('id')); 
            $dataArray['id'] = $i;
            //$forMerge[] = $dataArray;
            //$jsonData.$items = array_merge($jsonData[JSON.stringify('items')], $forMerge);
            $jsonDataEntry['items'][$i] = $dataArray;
          }
        }
      }
      //=============WRITES THE WORDS WITH THE RIGHT DATA ENTRY DATES INTO THE FILE==============//
      //print_r($jsonData);
      //$jsonData = json_encode($jsonData, JSON_FORCE_OBJECT);
      //print_r($jsonData);
      shell_exec('sudo chmod 777 .');
      shell_exec('sudo rm items.json');
      $json = "./items.json";
      $current = file_get_contents($json);
      chmod($current, 0777);
      $current .= json_encode($jsonDataEntry, JSON_PRETTY_PRINT);
      //print_r($current);
      file_put_contents($json, $current);
      //=============END WRITES THE WORDS WITH THE RIGHT DATA ENTRY DATES INTO THE FILE==============//
      shell_exec('npm run start');

}
/*
//displays list of words
//print_r($words_wo_duplicate); 
//creation of the  "words" column
//end of creation of "mp3" column
//print_r($mp3);
//create array containing mp3 file names
//installation of a time zone  
//date_default_timezone_set('UTC');
// date of the day 
//$date_of_today_s_practice = array();
//$today = date("Ymd");
//print the date of today
//print_r($today);
//$ids = array(1,2,3);
//$result = array();
//foreach ($words_wo_duplicate as $id => $key) {
//    $result[$key] = array(
//        'word'  => $words_wo_duplicate[$id],
//        'mp3 filename' => "$words_wo_duplicate[$id].mp3",
        //'date of today'    => $today,
//        'date of today'    => '20190101', 
//    );
    //$csv.="$words_wo_duplicate[$id],$words_wo_duplicate[$id].mp3,$today\n";
//    $csv.="$words_wo_duplicate[$id],$words_wo_duplicate[$id].mp3,20190501\n";
//}
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
//print_r($result);
//print_r($csv);
//file_put_contents("2.txt", $csv);
/////// dedoublonner deux BDDS en fusionnant leurs collonnes des dates
//$input1 = file_get_contents( '1.txt' ); // get the contents,
//$input2 = file_get_contents( '2.txt' ); // get the contents,
//separation of the characters string  gives list of words 
//$file1_line_by_line = preg_split('/\s/', $input1, null, PREG_SPLIT_NO_EMPTY);
//$file1_line_by_line = preg_split("/[\n]+/", $input1);
//$file2_line_by_line = preg_split("/[\n]+/", $input2);
//$file2_line_by_line = preg_split('/\s/', $input2, null, PREG_SPLIT_NO_EMPTY);
//liste de mots du premier texte
//$list_of_words_1=array();
//liste de mots du deuxieme texte
//$list_of_words_2=array();
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
file_put_contents("final.txt", $csv);*/
?>
