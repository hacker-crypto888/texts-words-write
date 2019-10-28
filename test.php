// Dans un fichier test.php
// Je déclare un tableau
<?php
$array = ["foo", "bar"];
// J'indique au navigateur que je retourne du JSON
header('Content-type: application/json');
// Je transforme mon tableau en JSON et je l'imprime dans le body de ma réponse
echo json_encode($array);
?>
