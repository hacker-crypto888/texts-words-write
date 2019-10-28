var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
"use strict";   
//console.log("id=", id)
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "test.php", true);
xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 || this.status === 200){ 
        console.log(this.responseText); // echo from php
    }       
};
xmlhttp.send();
