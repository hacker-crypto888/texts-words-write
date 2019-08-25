var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
//first arguement must be an regular array. The array can be of any javascript objects. Array can contain array to make it multi dimensional 
//second parameter must be a BlogPropertyBag object containing MIME property
var myBlob = new Blob(["This is my blob content"], {type : "text/plain"});
var myReader = new FileReader();
//handler executed once reading(blob content referenced to a variable) from blob is finished. 
myReader.addEventListener("loadend", function(e){
    document.getElementById("paragraph").innerHTML = e.srcElement.result;//prints a string
});
//start the reading process.
myReader.readAsText(myBlob);
list_words=[];
list_filenames=[];
$.get('./text1.txt',{},function(content){
      let all_lines=content.split('\n');
      var selected_date = "20190101";
      for(let i = 0;i < all_lines.length; i++){
        console.log(all_lines[i]);
        var csvfile_line = all_lines[i].split(',');
        if (csvfile_line.includes(mydate) === true) {
          list_filenames.push(csv_lines[1]);
          list_words.push(csv_lines[0]);
        } 

      //console.log(`"text1.txt" contains ${lines.length} lines`)
      //console.log(`First line : ${lines[0]}`)
      }
});
//react loop over array
//react jquery get file function -> use react and jquery together
var Hello = React.createClass({
    render: function() {
        var names = ['Jake', 'Jon', 'Thruster'];
        var namesList = names.map(function(name){
                        return <li>{name}</li>;
                      })


        //return  <ul>{ namesList }</ul>
    }
});
//concatenate line of code of audio player with audio filename, use concatenate methods for reactjavascript jsx
//loop theough array reactjs = reactjs foreach
//replace nameslist with code from react interactive form in therender area
//cliquer sur un lien ou bouton pour commencer
//le compteur sinitialise a 1
//associer levenement onclick a laffichage du dispositif et enregistrement correspondant et au compteur augmentant de 1  
var text = "world";
{"Hello " + text + " Andrew"}
// src/Counter.jsx

import React from 'react';
 
export default class Counter extends React.Component {
    constructor() {
        super()
        this.state = {
            nb: 0,
        }
    }
 
    increment() {
        this.setState({
            nb: this.state.nb + 1
        })
    }
 
    render() {
        return (
            <div>
                <h1>{ this.state.nb }</h1>
                <button onClick={ ( ) => this.increment() }>
                    click me
                </button>
            </div>
        )
    }
}
