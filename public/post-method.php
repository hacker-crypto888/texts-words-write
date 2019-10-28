<?PHP
// Check if the form is submitted 
if ( isset( $_POST['submit'] ) ) { // retrieve the form data by using the element's name attributes value as key $firstname = $_POST['firstname']; $lastname = $_POST['lastname']; // display the results
echo '<h3>Form POST Method</h3>'; echo 'Your name is ' . $lastname . ' ' . $firstname; exit; } 
?>
