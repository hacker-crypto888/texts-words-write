
<?php
$myarray = &$_POST;
// Ouvre un fichier pour lire un contenu existant
$file='data.json';
$current = file_get_contents($file);
// Ajoute une personne
$current .= $myarray["var1"];
// Écrit le résultat dans le fichier
file_put_contents($file, $current);
?>

