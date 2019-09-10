import React, {useState} from 'react'; 
import ReactDOM from 'react-dom'; 
import $ from 'jquery'; 
import './index.css';
import axios from 'axios';
import DatePicker from 'react-date-picker';
//import App from './App';
import * as serviceWorker from './serviceWorker';
const s = document.createElement("script");
s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js";
s.onload = function(e){ /* now that its loaded, do something */ }; 
document.head.appendChild(s); 
const LOCALSTORAGE_KEY = 'items';
class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nb: 0,
      wordinput: '',
      audioCode:'',
      inputValue:'',
      checkInput:'',
      wordtest:'',
      checkTarget:'',
      targetValue: '',
      variableErrors:'',
      mountElements:[],
      valuestest:'',
      //controlsValue:'',
      controls:true,
      error: null,
      isLoaded: false,
      item: [],
      item2: [],
      items: [],
      items_name:[],
      wordinputError: '',
      name: '',
      email: '',
      nameError:'',
      emailError:'',
      user: '',
      itemname:'',
      audioplayerToggle:"",
      list_filenames:[],
      mydate: "20190101",
      displayPlayer: '',
      onblur:''
    };
  }
  getInitialState = () => {
    return {
      controls:
        true,
      targetValue:
        ''
    }
  }
  handleWordInput = (event) => {
    event.preventDefault();
    //const inputValue = this.state;
    this.btn.removeAttribute("disabled");
    const targetValue = this.state;
    console.log({targetValue});
  }
  
  validateWordInput = () => {
    const { wordinput } = this.state;
    this.setState({
      //wordinputError:
        //wordinput.length > 3 ? null : ''
    });
  }
  fieldOnblur = () => {
    const { wordinput } = this.state;
    this.setState({
      audioplayerToggle:
        null,
      wordinputError:
        null
    });
  }
  returnCounter = (props) => {
    this.setState({
      itemsdisplay:
        this.state.nb
    })
  }
  increment = (props) => {
    this.setState({

       nb:
         this.state.nb + 1
    });
  }
  componentDidMount() {
    axios.get(`./items.json`)
      .then(res => {
        const items = res.data.items.map(obj => obj);
        this.setState({ items });
        console.log(items.find((o) => o.id === 2).name);
        console.log("mesg");
      });
  }
  onSelect(event) {
    const selectedIndex = event.target.options.selectedIndex;
  }

  userInputValues = () => {
    const inputValue = this.state;
  }
     
  handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = this.state;
    const targetValue = this.state;
  }
  disableButton = (event) => {
    event.preventDefault();
    const { targetValue, inputValue } = this.state;
    this.btn.setAttribute("disabled", "disabled");

    console.log({targetValue});
    console.log({inputValue});
    this.setState({
      wordtest:
        inputValue === targetValue ? this.removeAudioPlayer() : null,      
      checkInput:
        inputValue === '' ? 'enter a word' : null,
      checkTarget:
        targetValue === '' ? 'play a word' : null
    });

  }
  disableFormButton = () => {
    this.setState({
      controls: 
        '' 
    });
  }
  handleNameChange = event => {
    this.setState({ name: event.target.value }, () => {
      this.validateName();
    });
  };
  displayAudio = event => {
    const audioElements = document.getElementsByTagName('audio');

    for (var i = 0; i < audioElements.length; i++) {
      audioElements[i].removeAttribute('controls');
      audioElements[i].setAttribute('controls','');
      audioElements[i].pause();
      audioElements[i].currentTime = 0;
    };
    const inputValue = this.state;
    this.setState({
      inputValue:
        '',
      targetValue:
        ''
    });
    console.log(audioElements);

  }
  removeAudioPlayer = (props) => {
    const { targetValue, inputValue } = this.state;
    this.setState({
      wordtest:
        `Values: \n ${inputValue} / ${targetValue} ok`   
    });
    console.log({targetValue});

    const mountElements = document.getElementsByClassName(`${targetValue}`);
    console.log({mountElements});
    this.setState({
      variableErrors:
        mountElements[0] === undefined ? "Please choose and listen to a word first" : null
    });
    if (mountElements[0] !== undefined) {
      mountElements[0].pause();
      mountElements[0].currentTime = 0;

      mountElements[0].removeAttribute('controls');
    }
    
    this.setState({
      inputValue:
        '',
      targetValue:
        ''
    });
  }
  render() { 
    const item = this.state;
    const item2 = this.state.item;
    const displayPlayer = (<audio controls> <source src={`${item.name}${item.id}.mp3`} type='audio/mpeg'></source></audio>);

    const inputValue = this.state;
    return(

      <form onSubmit={this.handleSubmit}>
           <div>
             <RegistrationForm />
           </div>
           <div>
             <DateForm />
           </div>
           <div className={`form-group${item.id}`}> 
             <label htmlFor={`wordinput${item.id}`}>Word</label>
             <li key={item.id}>{item.name} {item.price}</li>

             <input
               name={item.name}
               className={`form-control ${this.state.wordinputError ? 'is-invalid' : ''}`}
               id={`wordinput${item.id}`}
               placeholder='Enter word'
               key={item.id}
               value={this.state.inputValue}
               onClick={this.handleWordInput}
               onFocus={this.handleWordInput}
               onChange={e => this.setState({ inputValue: e.target.value }) }
               
             />
             <button ref={btn => { this.btn = btn; }} onClick={this.disableButton} >
               click me
             </button>
             <button onClick={this.displayAudio}>
               start over
             </button>
           </div>
             <div>{this.state.wordtest}</div>
             <div>{this.state.checkInput}</div>
             <div>{this.state.checkTarget}</div>
             <div>{this.state.variableErrors}</div>
             <div>
               {this.state.items.map(item =>
                 <audio className={item.name} key={item.id} ref={e => this.audioSource = e} onPlay={e => this.setState({ targetValue: e.target.id, controls: e.target.controls })} id={item.name} controls={this.state.controls}> 
                   <source src={`${item.name}.mp3`} className={item.name}  type='audio/mpeg'></source>
                 </audio>
               )}<br />
             </div>

          </form>
    );
  }
}

//ReactDOM.render(<BasicForm />, document.getElementById('root'));
class DateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      selectedDate:'',
      dataArray:null,
      dateObject:null,
      database:[],
      data:null,
      json:null,
      obj: [],
      data:'', 
      shortArray:'',
      text:null,
      url:null,
      mydatabase:[],
      dataEntry: []
    }
    //const obj = {a: 123, b: "4 5 6"};
    //const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    this.json = {};
  }

  componentDidMount() {
    //const database = this.state;
    //this.loadJson();
    //const text = "some text i want to export";
    //const data = new Blob([this.state.text], {type: 'text/plain'});
    //const url = URL.createObjectURL(data);
    //window.URL.revokeObjectURL(url);
    //document.getElementById('download_link').href = this.state.url;
    //const obj = {a: 123, b: "4 5 6"};
    //const shortArray = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state.obj)); 
    
    axios.get(`./database.json`)
      .then(res => {
        const database = res.data.items.map(obj => obj);
        this.setState({ database });
        //alert(this.state.database[5]['dates']);
        //console.log(items.find((o) => o.id === 2).name);
        //console.log("mesg");
      });
    //axios.get(`./database.json`)
    //fetch(`./database.json`)
      //.then(response => response.json())
      //.then(json => this.setState({ json }));
      //{
        //const database = res.data.data.children.map(obj => obj.data);
        //this.setState({ database });
      //});

  }
  validateJson = (json) => {
    const validJson = this.state;

    try{
      const validJson = JSON.stringify(this.state.json, null, 2);
    } catch(e) {
      throw e
    }
   
    return validJson;

  }

  loadJson = () => {
    const database = this.state;
    const json = window.localStorage.getItem(LOCALSTORAGE_KEY) || JSON.stringify(database, null,2);
    this.setState({ json });
  }

  saveJson = () => {
    const validJson = this.validateJson(this.state.json);

    if (!validJson) return;

    window.localStorage.setItem(
      LOCALSTORAGE_KEY,
      validJson
    )
  }

  handleJsonChange = e => this.setState({
    json: this.state.database 
  })
  onChange = date => {
    const database = this.state;
    this.setState({ date });

  }
  importDatabase = event => {
    axios.get(`./database.json`)
      .then(res => {
        const database = res.data.items.map(obj => obj);
        this.setState({ database });
        console.log(database[0]);
        //alert(this.state.database[5]['dates']);
        //console.log(items.find((o) => o.id === 2).name);
        //console.log("mesg");
      });
  }
  handleSubmitDate = date => {
    //this.handleDateChange();
    //const database = this.state;
    this.setState({json: this.state.database});
 
    //this.onChange();
    this.importDatabase();
    //X (import) (database)
    //this.setState({date});
    const database = this.state.database; //database is the loaded JSON array
    const dataEntry = this.state.dataEntry;
    //const date = this.state;
    //alert(this.state.date.getDate());
    //const date = this.state;
    //const dateObject = this.state.date;
    this.state.selectedDate = (this.state.date.getMonth()+1)+'/'+this.state.date.getDate()+'/'+this.state.date.getFullYear();
    
    //alert(this.state.selectedDate);
    if (this.state.database && this.state.database.length) {
      if (this.state.database.length > 0) {
        for (let k = 0; k < this.state.database.length; k++) { // database is the big database
        //this.state.database.map(line => {
        //if (this.state.database.length > 6) {
          //alert(this.state.database[49]['word']);
          if (this.state.database[k]['dates'].includes(this.state.selectedDate)) {
            if (this.state.dataEntry && this.state.dataEntry.length) {
              if (this.state.dataEntry.length > 0) {
                const database = this.state;
                const dataEntry=this.state;
                this.state.dataEntry[this.state.dataEntry.length] = this.state.database[k];
                this.state.dataEntry[this.state.dataEntry.length]['id'] = this.state.dataEntry.length;
                delete(this.state.dataEntry[this.state.dataEntry.length]['dates']);
              } else if (this.state.dataEntry.length === 0) {
                const database = this.state;
                const dataEntry=this.state;
                this.state.dataEntry[0] = this.state.database[k]; //i assume the line of the database array has three columns for a word
                this.state.dataEntry[0]['id'] = 0;
                delete(this.state.dataEntry[0]['dates']);
              }
            } else if (this.state.dataEntry === null) {
              const database = this.state.database;
              const dataEntry=[];
              this.state.dataEntry[dataEntry.length] = database[k];
              this.state.dataEntry[0]['id'] = 0;
              delete(this.state.dataEntry[0]['dates']);
            }
            //alert(this.state.database); 

            //same conditions as those for database, but verifying the length of dataEntry array before appending items, and before exporting them as a json file
            //this.state.dataEntrythis.state.database[k] = ;
                          
          }
        }
      }
    }
    //$('<a href="data:' + data + '" download="data.json">download JSON</a>').appendTo('#container');

 }
  download = (event) => {
    const obj = {a: 123, b: "4 5 6"};
    const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
    this.setState({data: data});
    
  }
  downloadLink = () => {
    //const text="Some Data I export";
    //const 

    const dataEntry = this.state.dataEntry;
    const dataArray=new Blob([JSON.stringify(dataEntry, null, 2)], {type: 'application/json'});
    //const data=new Blob([text], {type: 'text/plain'});

    const url = window.URL.createObjectURL(dataArray);
    //window.URL.revokeObjectURL(url);

    document.getElementById('download_link').href = url;
    //event.preventDefault();
  }
    //X (export) (dataEntry -> items)
  jsjQuery = (event) => {
    event.preventDefault();
    const obj = {a: 123, b: "4 5 6"};
    const data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));
  }
  render() {
    return (
      <form onSubmit={this.handleSubmitDate}>
      <label>Load words by date</label>
      <div>
        <DatePicker
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
      <div>
        <input onClick={this.handleDateChange} type="submit" value="Submit" className='btn btn-success btn-block' />  
      </div>
      </form>
    );
  }  
}
//<button onClick={this.saveJson}>SAVE to LocalStorage</button> 
//<button onClick={this.loadJson}>LOAD to LocalStorage</button> 
//<button download={`data.json`} onClick={this.jsjQuery} href={this.state.data}>LOAD to LocalStorage</button> 
//<button download={`my_exported_file.txt`} onClick={this.downloadLink} href={``}>LOAD to LocalStorage</button> 


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      value: `Truly, for mine own part, I would little or nothing
with you. Your father and my uncle hath made
motions: if it be my luck, so; if not, happy man be
his dole! They can tell you how things go better
than I can: you may ask your father; here he comes.
Good Mistress Page, for that I love your daughter
In such a righteous fashion as I do,
Perforce, against all cheques, rebukes and manners,
I must advance the colours of my love
And not retire: let me have your good will.
Come, trouble not yourself. Good Master Fenton,
I will not be your friend nor enemy:
My daughter will I question how she loves you,
And as I find her, so am I affected.
Till then farewell, sir: she must needs go in;
Her father will be angry.
A kind heart he hath: a woman would run through
fire and water for such a kind heart. But yet I
would my master had Mistress Anne; or I would
Master Slender had her; or, in sooth, I would Master
Fenton had her; I will do what I can for them all
three; for so I have promised, and I'll be as good
as my word; but speciously for Master Fenton. Well,
I must of another errand to Sir John Falstaff from
my two mistresses: what a beast am I to slack it!`,
      i:null,
      jsonArray:null,
      text:'',
      importText:'',
      jsonArrayArray:[],
      jsonArrayForMerge2:[],
      listItems:[],
      date:new Date(),
      wordsFromLoadedText:null,
      blobData:[],
      textError:'',
      database:[],
      j:null,
      jsonData:[],
      today:'',
      word:{},
      concat:[],
      k:null,
      l:null,
      databaseLength:null,
      itemlist:"",
      bigDatabase:[],
      nameError: '',
      concatArray:null,
      downloadArray:[],
      listOfWords:[],
      dateOfTheDay:[],
      datesFromDatabase:[],
      loadedText:[],
      m: null,
      n: null,
      concatAll:null,
      displayDate:null,
      updateDates:[],
      concatData:null,
      jsonDataItems:[],
      jsonData:[],
      updateDates:[],
      Words:[],
      map:null,
      items:null,
      duplicate:null,
      arrays:[],
      wordsIdMap:new Map(),
      jsonItemsMap:new Map(),
      newItem:null,
      testdatabase:[],
      seconddatabase:[],
      arrayToJson:null,
      jsonArray:{},
      convertToJson:null,
      setWordId:new Set(),
      result:[],
      replacer:null,
      concatOldItems:[],
      concatNewItem:[],
      x:[],
      a:null,
      emailError: '',
      dt:null,
      file:null,
      preview:null,
      img:null,
      img_src:null,
      myBlub:null,
      objectURL:null,
      myBlob:null,
      myImage:null,
      noFileType:null,
      fileName:null,
      fileDownload:null,
      fileUpload:null,
      noDatabaseFile:false,
      currentDate:new Date(),
      bigDatabase:null,
      uniqueArray:null,
      lineOfArray:null,
      currentText:null,
      jsonSecondConfirm:false,
      databaseIsLoaded:false,
      droppedFiles:null,
      loadByDateConfirm:2,
      mapJson:null,
      mapText:null,
      newWord:null
    };
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmitText = this.handleSubmitText.bind(this);
  }

  componentDidMount() {
    window.addEventListener('dragover',this.windowdragover);
    window.addEventListener('drop',this.windowdrop);
        this.a.removeAttribute("href");
    document.getElementById('noDatabaseFile').addEventListener('checked', this.checkBox);


  }

  handleNameChange = event => {
    this.setState({ name: event.target.value }, () => {
      this.validateName();
    });
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value }, () => {
      this.validateEmail();
    });
  };

  validateName = () => {
    const { name } = this.state;
    this.setState({
      nameError:
        name.length > 3 ? null : 'Name must be longer than 3 characters'
    });
  }

  validateEmail = () => {
    const { email } = this.state;
    this.setState({
      emailError:
        email.length > 3 ? null : 'Email must be longer than 3 characters' 
      });
  }
  importAllWords = (event) => {
    axios.get(`./database.json`)
      .then(res => {
        const database = res.data.items.map(obj => obj);
        this.setState({ database });
      });
  }

  handleText = (event) => {
    //const myBlob = this.state;

    const importText = this.state.value;
    const database = [];
    //this.importAllWords();
    const x = (list) => list.filter((v,i) => list.indexOf(v) === i);
    const listOfWords = x(importText.split(/[\s.?:;!,]+/)).map(function(y){ return y.replace(/[\W_]+/g," ") }).map(function(x){ return x.toLowerCase() }).filter(function( element ) {
      return element !== null;
    });
    //create the file to make th eapp work now
    const setWordId = new Set();
    for (var i=0; i < listOfWords.length; i++) {
      if (listOfWords[i] !== "") {
        setWordId.add({word: listOfWords[i], id: setWordId.size});
        console.log(setWordId);
      }

    }
    const jsonItemsMap = new Map();
    jsonItemsMap.set('items', [...setWordId]);
    const jsonData = Object.fromEntries(jsonItemsMap.entries());
    if (this.state.value === null) {
      alert("you entered no text")
    } else {
      alert(`The text you \n
             entered: \n` + this.state.value);
      alert([...setWordId]);
    }
    const result = {};
    this.state.result = [...setWordId];
    console.log(this.state.result);
    //const jsonArray = {["items"]: [...setWordId]};
    if (this.state.value !== null) {
      this.a.setAttribute("href","items.json");
    }
    //the database.json file must be uploaded before the textis uploaded to merge the two easily 
    //====updatethedate field of each item in thedatabase=========//
    //====writes the current date=====//
    const currentDate = new Date();
    const today = (currentDate.getMonth()+1)+'/'+currentDate.getDate()+'/'+currentDate.getFullYear();
    //==== end writes the current date=====//
   
    //==== updatethedate field of each item in thedatabase=========//
    //====writes the date of today to the bi database for the words already present===// 
    //const myBlob = this.state;
    console.log(this.state.noDatabaseFile);
    if (this.state.myItems !== undefined) {
      console.log(this.state.myItems.length);
      console.log(this.state.myItems[6]['word']);
    } else if (this.state.myItems === undefined && document.getElementById('noDatabaseFile').checked === false) {
      this.alertNoDatabaseFile();
    }
    if (document.getElementById('noDatabaseFile').checked === true && this.state.myItems === ([]||undefined)) {
    }
    //======ADD NEW WORDS TO DATABASE========//
    console.log(this.state.result);
    if(this.state.myItems !== undefined && this.state.result.length && this.state.myItems.length) {
      console.log("database and text loadded");
      //add texts to new word to the big db
      const result = this.state;
      const myItems = this.state;
      const listOfWords = this.state;
      const mapJson = new Map(Object.entries(this.state.myItems));
      //console.log(this.state.listOfWords);
      const mapText = new Set();
      this.state.listOfWords.forEach(function(word) {
        const newWord = { word: this.state.word };
        mapText.set(newWord);
      });
     
      //const mapText = new Set(Object.entries(this.state.listOfWords));
      console.log(this.state.mapText); 
      //database json line by line
      //for (let line of listOfWords.keys()) {
        //console.log(line)
      //} 
      for (let line of mapJson.values()) {
        //...
      }
      console.log(mapJson);
    }
    

  } 

  handleSubmitText = event => {
    const { name, email, value, myBlob } = this.state;
    //this.setState({value: event.target.value});
    event.preventDefault();
    this.handleText();
  }

  handleDateChange = date => this.setState({date});

  downloadItems = (event) => {
    console.log(this.state.result);
    const result = this.state;
    const jsonArray = this.state;
    const setWordId = this.state;
    const downloadArray = this.state.result;
    const blobData = new Blob([JSON.stringify({"items": this.state.result},null,2)], {type: 'application/json'});
    const url = window.URL.createObjectURL(blobData);
    document.getElementById('download_items').href = url;
  } 

  windowdrop = (event) => {
    event.preventDefault();
  }

  windowdragover = (event) => {
    event.preventDefault();
  }

  onDragEnter = (event) => {
		const dt = event.dataTransfer;
    if(dt.files.length) {
			event.stopPropagation();
			event.preventDefault();
    }
  }

  onDragOver = (event) => {
		const dt = event.dataTransfer;
    if(dt.files.length) {
			event.stopPropagation();
			event.preventDefault();
    }
  }

  onDrop = (event) => {
		event.stopPropagation();
		event.preventDefault();
		const dt = event.dataTransfer;

    if(dt.files.length) {
      const files = dt.files;
      console.log(files[0].type);
      console.log(files[0].name);
      this.dropbox(files);
      //===JSON UPLOAD===//
      for (let i=0; i<files.length; i++) {
          const file = files[i];
          if (file.name === "database.json") {
          	this.sendFile(file);
          }
      }
      //===END JSON UPLOAD===//
    }
  }

  sendFile = (file) => {
    //console.log(file.name);
    //const uri = `index.php`;
    //const xhr = new XMLHttpRequest();
    const fd = new FormData();
    
    //xhr.open("POST", uri, true);
    //xhr.onreadystatechange = function() {
    //    if (xhr.readyState == 4 && xhr.status == 200) {
    //        alert(xhr.responseText); // handle response.
    //    }
    //};
    fd.append('myFile', file);
    // Initiate a multipart/form-data upload
    //xhr.send(fd);
    //console.log(fd.get('myFile'));
    //console.log(xhr[0]);
    const options = {
      method: 'POST',
      body: fd
    };
    fetch(URL.createObjectURL(file))
      .then(function(response) {
        return response.json();
      })
      .then(function(myBlub) {
        console.log(myBlub); //database.json
        //console.log(URL.createObjectURL(myBlob));
        const myBlob = [...Object.values(myBlub.items)];
        ///this.setState({...myBlub.items});
        console.log(myBlob); //database.json
        console.log(file.name);
        return myBlob;
        //console.log(URL.createObjectURL(myBlob));
      })
      .then(thirdres => {
        const myItems = thirdres.map(obj => obj);
        this.setState({myItems});
        console.log(myItems);
        //document.getElementById('noDatabaseFile').setAttribute('checked',false);
        document.getElementById('noDatabaseFile').removeAttribute('checked');
        const databaseIsLoaded = this.state;
        this.state.databaseIsLoaded = true;         
      })
      //this.setState({myBlob});
    console.log(this.state.myBlob);
      //this.incrementDatabase();
  }

  dropbox = (files) => {
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			
			if (!file.type.startsWith('image/') && !file.type.startsWith('application/') && !file.type.startsWith('text/') && !file.type ===('')){ continue }
			const img = document.createElement("img");
			img.classList.add("obj");
			const myImage = new Image(60,60);
			myImage.src = `application.png`;
			const noFileType = new Image(60,60);
			noFileType.src = `notype.png`;

			img.file = file;
			

                        img.height = 60;
                        img.width = 60;


			
			const preview = document.getElementById("preview");
			//const preview = document.getElementById("dropzone");
			if(file.type.startsWith('image/')) { preview.appendChild(img); } // Assuming that "preview" is the div output where the content will be displayed.
			if(file.type.startsWith('application/')) { preview.appendChild(myImage); } // Assuming that "preview" is the div output where the content will be displayed.
			if(file.type.startsWith('text/')) { preview.appendChild(myImage); } // Assuming that "preview" is the div output where the content will be displayed.
			if(file.type===('')) { preview.appendChild(noFileType); } // Assuming that "preview" is the div output where the content will be displayed.
                        //===FILE PREVIEW AFTER DROP==//
			const fileName = document.createElement('a');
                        fileName.className += '.obj';
			fileName.textContent = file.name+ ' (preview)';
			fileName.href = URL.createObjectURL(file);
			fileName.target = "_blank";
			preview.appendChild(fileName);
                        //===END FILE PREVIEW AFTER DROP==//

			//====UPLOAD JSON=====//
			//JSON is uploaded automatically
			//const fileUpload = document.createElement('a');
			//====END UPLOAD JSON=====//
			
			//====DOWNLOAD JSON===//
			//download for bigger database must be only after loading new text
			//const fileDownload = document.createElement('a');
    			//const blobData = new Blob([JSON.stringify({"items": this.state.result},null,2)], {type: 'application/json'}); /* the blob must contains database content */
			//fileDownload.href = window.URL.createObjectURL(blobData);
			//fileDownload.download = file;
			//====END DOWNLOAD JSON===//

			preview.appendChild(document.createElement('br'));
			const reader = new FileReader();
			reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img); //if the file is an image, insert the content of the imageas the image in the dropbox
			reader.readAsDataURL(file);
		}
  }

  previewFile = (file) => {
    
  }

  handleTextChange = (event) => {
    this.setState({
      value:
        event.target.value
    });
  }

  //incrementDatabase = (event) => {
  //  const nbDatabase = this.state;
  //  this.setState({
  //    nbDatabase:
  //      this.nbDatabase + 1
  //  });
  //}

  checkBox = (event) => {
    const noDatabaseFile = this.state; 
    this.setState({
      noDatabaseFile:
        event.target.value
    });




    if (event.target.checked) {
      this.setState({
        noDatabaseFile:
          true
      });
      document.getElementById('dropzone').hidden = true;
      console.log("checkbox");
      //if (this.state.loadByDateConfirm >0 && this.state.databaseIsLoaded === false && window.confirm("text or database was not loaded. ok to load text or database. cancel to load only text.")) {
      
      //}
      if (this.state.databaseIsLoaded === true && window.confirm("the database is to be removed. To remove the database anyway, press ok. Press cancel to keep your database loaded in the dropzone.")) {
        this.state.databaseIsLoaded = false;
        this.state.myItems = [];
        const droppedFiles = document.getElementById('preview');
        while (droppedFiles.hasChildNodes()) {
          droppedFiles.removeChild(droppedFiles.firstChild);  
        }
      }
    }
    if(!event.target.checked) {
      this.setState({
        noDatabaseFile:
          false 
      });
      document.getElementById('dropzone').hidden = false;
      console.log("uncheck box");
      console.log(this.state.jsonSecondConfirm);
      const jsonSecondConfirm = this.state;
      if (this.state.jsonSecondConfirm === true) {
        this.state.jsonSecondConfirm = false;
        if (window.confirm("you confirmed that you had no json to upload. Ok to drop a json from your computer. Cancel to load words from a new text")) {
        } else {
          document.getElementById('dropzone').hidden = true;
          document.getElementById('noDatabaseFile').checked = true;
        } 
      }


    }
    if(event.target.checked === false) {
      document.getElementById('dropzone').removeAttribute('checked');
      
      document.getElementById('dropzone').hidden = false;
      console.log("uncheck box");


  
    }
  }
  alertNoDatabaseFile = (event) => {
    if (document.getElementById('noDatabaseFile').checked = true && window.confirm("You did not upload any database.json file. Ok to continue. Cancel to upload words from previous sessions by date.")) {
      //const noDatabaseFile = this.state; 
      //this.setState({
      //  noDatabaseFile:
      //    true 
      //});
      document.getElementById('noDatabaseFile').checked = true;
      const jsonSecondConfirm = this.state;
      this.state.jsonSecondConfirm = true;
      console.log("alert");
      //const noDatabaseFile = this.state; 
      //this.setState({
      //  noDatabaseFile:
      //    document.getElementById('noDatabaseFile').checked 
      //});
      //document.getElementById('noDatabaseFile').value = document.getElementById('noDatabaseFile').checked;
      document.getElementById('dropzone').hidden = true;
      
    } else {
      document.getElementById('noDatabaseFile').removeAttribute('checked');   
    }
    
  }
  render() {
    return (
      <form enctype={`multipart/form-data`} onSubmit={this.handleSubmitText}>
        <div>
          <input type="checkbox" id={`noDatabaseFile`} value={this.state.noDatabaseFile} onChange={this.checkBox} />
          <label for="subscribeNews">I have no database.json</label>
        </div>
  	<div id={`dropzone`} multiple onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragOver={this.onDragOver}></div>
        <div id={`preview`}></div>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            name='name'
            className={`form-control ${this.state.nameError ? 'is-invalid' : ''}`}
            id='name'
            placeholder='Enter name'
            value={this.state.name}
            onChange={this.handleNameChange}
            onBlur={this.validateName}
          />
          <div className='invalid-feedback'>{this.state.nameError}</div>
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            name='email'
            className={`form-control ${this.state.emailError ? 'is-invalid' : ''}`}
            id='email'
            placeholder='Enter email'
            value={this.state.email}
            onChange={this.handleEmailChange}
            onBlur={this.validateEmail}
          />
          <div className='invalid-feedback'>{this.state.emailError}</div>
        </div>
        <label>
          Essay:
          <textarea onChange={this.handleTextChange} placeholder="Enter a text" value={this.state.value} /> 
        </label>
        <input type="submit" value="Submit" className='btn btn-success btn-block' />  
        <a id="download_items" ref={a => {this.a = a}} onClick={this.downloadItems} download={`items.json`} href={``} >Download Words From The Text Just Loaded</a>

 
      </form>
    );
  }
}

ReactDOM.render(<BasicForm />, document.getElementById('root'));