var fs = require('fs');
console.log('test');
var data = JSON.stringify({newdata:true}, null, 2);
console.log(JSON.stringify(data));
fs.writeFile("participants.json", data, (err) => { 
if(err) {return console.log(err)};/* handle error */ 
console.log('file saved');
});
  
//var json = JSON.parse(data);
//    json.name = ["name1", "name2", "name3"];
//    fs.writeFile("results.json", JSON.stringify(json))
//})
//
