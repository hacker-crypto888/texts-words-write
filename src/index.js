import React from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css';
import axios from 'axios';
import DatePicker from 'react-date-picker';
const s = document.createElement("script");
s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js";
s.onload = function(e){ /* now that its loaded, do something */ }; 
document.head.appendChild(s); 
class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue:'',
      checkInput:'',
      wordtest:'',
      checkTarget:'',
      targetValue: '',
      variableErrors:'',
      mountElements:[],
      controls:true,
      items: [],
      wordinputError: '',
      name: '',
      email: '',
      nameError:'',
      emailError:'',
      user: '',
      audioplayerToggle:"",
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
    this.btn.removeAttribute("disabled");
    const targetValue = this.state;
    console.log({targetValue});
  }
  
  fieldOnblur = () => {
    this.setState({
      audioplayerToggle:
        null,
      wordinputError:
        null
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
  handleSubmit = (event) => {
    event.preventDefault();
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
    return(
      <form onSubmit={this.handleSubmit}>
           <div className={`form-group`}> 
             <label htmlFor={`wordinput`}>My App To Spell And Write Words</label>
             <li>Fill in a simple form and start using the app</li>
             <li>Registration Forms with Upload File Fields</li>
             <li>Load your own text and browse your own user history of spelling and writing sessions</li>
             <input
               //name={`wordinput`}
               className={`form-control ${this.state.wordinputError ? 'is-invalid' : ''}`}
               id={`wordinput`}
               placeholder='Enter word'
               //key={1} // this.state.Key 
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
          <p>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#mysettings" aria-expanded="false" aria-controls="collapseExample">
              {`\u2699`} Settings
            </button>
          </p>
          <div class="collapse" id="mysettings">
            <div class="card card-body">
              <div>
                <RegistrationForm />
              </div>
              <div id={`myFillInTheDateForm`}>
                <FillInTheDateForm />
              </div>
            </div>
          </div>
          </form>
    );
  }
}

class FillInTheDateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      selectedDate:'',
      database:[],
      data:null,
      json:null,
      shortArray:'',
      text:null,
      url:null,
      valueArray:null,
      response:null,
      myBlob:null,
      myDatabase:null,
      myBlub:null,
      today:null,
      daysDate:new Date(),
      downloadLink:null,
      mynewDb:null,
      res:null,
      element:null,
      myNewBlob:null,
      jsonString:null,
      myItems:null,
      myItemsByDate:null,
      allItemsByDate:null,
      jsonContent:"",
      listContents:null,
      mydatepicker:null,
      content:"",
      addLink:'',
      outputJson:null,
      outputLink:null,
      saveFile:null
    }
  }
  componentDidMount() {
    const date = new Date();
    this.setState({date});
  }
  onChange = (date) => {
    this.setState({ date });
  }
  loadJson = (event) => {
    if (!document.getElementById('jsonString')) {
      const downloadAll = document.getElementById("inputJson");
      const jsonString = document.createElement('input');
      const downloadLink = document.createElement('input');
      downloadLink.className += '.obj';
      downloadLink.innerHTML = 'load by date JSON';
      downloadLink.download = "database.json";
      jsonString.id = "jsonString";
      jsonString.value = this.state.jsonContent;
      jsonString.hidden = true; 
      jsonString.onChange = this.handleJsonString;
      downloadAll.appendChild(jsonString);
    }
    const selectedDate = (this.state.date.getMonth()+1)+'/'+this.state.date.getDate()+'/'+this.state.date.getFullYear();
    console.log(this.state.date); 
    console.log(selectedDate); 
    fetch(`./database.json`)
      .then(function(response) {
        return response.json()
      })
      .then(function(myBlob) {
        const myBlub = [...Object.values(myBlob.items)];
        document.getElementById("jsonString").value = JSON.stringify(myBlub);
        const content = document.getElementById('jsonString').value;
        console.log(content);
        //======re-display download link for database.json (once)=====//
        if (!document.getElementById('database_file')) { 
          const downloadAll = document.getElementById("inputJson");
          const addLink = document.createElement('a');
          addLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": JSON.parse(content)},null,2)], {type: 'application/json'}));
          addLink.innerHTML = 'download full database JSON file';
          addLink.download = 'database.json';
          addLink.id = 'database_file';
          downloadAll.appendChild(addLink);
          const saveFile = document.createElement('p');
          saveFile.textContent = "Don't forget to save your database JSON file under the public/ directory of your app";
        }
        //sort items by date and append to array
        const myItems = JSON.parse(content);
        console.log(myItems);
        const myItemsByDate = new Set();
        console.log(selectedDate); 
        myItems.forEach(function(item, index, object) {
          if(myItems[index].dates.includes(selectedDate)){
            myItemsByDate.add(item); 
            
          }
        })
        const outputJson = document.getElementById("outputJson");
        const outputLink = document.createElement('a');
        console.log(myItemsByDate);
        outputLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": [...myItemsByDate]},null,2)], {type: 'application/json'}));
        outputLink.innerHTML = "download JSON file (date of data entry:"+selectedDate+ ")";
        outputLink.download = 'items.json';
        outputLink.id = 'items_by_date';
        outputJson.appendChild(outputLink);
        alert('Your JSON file with items sorted by date is ready. save it under public/ directory of your app, reload page and start playing!');
      })
  }
  handleJsonString = (event) => {
  }

  handleSubmittedDate = (event) => {
    if (window.confirm('If you saved your database in the public/ directory of your app, you can press ok and have the form load the right file. Else, press cancel and repeat the steps above.')) {
      this.loadJson();
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmittedDate}>
      <label>Load words by date</label>
      <div>
        <DatePicker
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
      <div>
        <input type="submit" value="Submit selected date" className='btn btn-success btn-block' />  
      </div>
      <div id={`inputJson`}></div>
      <div id={`outputJson`}></div>
      </form>
    );
  }  
}

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
      text:'',
      importText:'',
      itemList:[],
      date:new Date(),
      blobData:[],
      textError:'',
      database:[],
      j:null,
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
      wordList:[],
      datesFromDatabase:[],
      loadedText:[],
      m: null,
      n: null,
      map:null,
      items:null,
      duplicate:null,
      arrays:[],
      wordsIdMap:new Map(),
      jsonItemsMap:new Map(),
      newItem:null,
      testdatabase:[],
      wordIdKVPairs:new Set(),
      result:[],
      x:[],
      a:null,
      emailError: '',
      dt:null,
      file:null,
      preview:null,
      img:null,
      myBlub:null,
      myBlob:null,
      myImage:null,
      noFileType:null,
      fileName:null,
      noDatabaseFile:false,
      daysDate:new Date(),
      jsonSecondConfirm:false,
      databaseIsLoaded:false,
      droppedFiles:null,
      mapJson:null,
      compilationOfWordsFromText:null,
      compilationOfWordsFromDatabase:null,
      wordsFromDatabase:null,
      wordsFromText:null,
      allMyItems:null,
      downloadAll:null,
      downloadLink:null,
      databaseJson:null
    };
    this.handleSubmittedText = this.handleSubmittedText.bind(this);
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
    const importText = this.state.value;
    const x = (list) => list.filter((v,i) => list.indexOf(v) === i);
    const wordList = x(importText.split(/[\s.?:;!,]+/)).map(function(y){ return y.replace(/[\W_]+/g," ") }).map(function(x){ return x.toLowerCase() }).filter(function( element ) {
      return element !== null;
    });
    //create the file to make th eapp work now
    const wordIdKVPairs = new Set();
    for (var i=0; i < wordList.length; i++) {
      if (wordList[i] !== "") {
        wordIdKVPairs.add({word: wordList[i], id: wordIdKVPairs.size});
        console.log(wordIdKVPairs);
      }
    }
    const compilationOfWordsFromText = new Set();
    for (var i=0; i < wordList.length; i++) {
      if (wordList[i] !== "") {
        compilationOfWordsFromText.add(wordList[i]);
        console.log(compilationOfWordsFromText);
      }
    }
    const jsonItemsMap = new Map();
    jsonItemsMap.set('items', [...wordIdKVPairs]);
    if (this.state.value === null) {
      alert("you entered no text")
    } else {
  
      if(!document.getElementById('download_items').href) {
        alert(`The text you \n
             entered: \n` + this.state.value);
      }
    }
    const result = {};
    this.setState({
      result:
        [...wordIdKVPairs]
    });
    console.log(this.state.result);
    if (this.state.value !== null) {
      this.a.setAttribute("href","items.json");
      this.a.textContent = "Download your JSON file with words from the text";
    }
    const wordsFromText = Array.from(compilationOfWordsFromText);
    const databaseJson = [];
    wordsFromText.forEach(function(item,index,object) {
      const daysDate = new Date();
      const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      const newItem = {};
      newItem.word = item;
      newItem.id = databaseJson.length;
      newItem.dates = [today];
      databaseJson.push(newItem);
      console.log(databaseJson.length);
    }); 
    if(document.getElementById('noDatabaseFile').checked) {
      const downloadAll = document.getElementById('download_all_items');
      const downloadLink = document.createElement('a');
      downloadLink.className += '.obj';
      downloadLink.textContent = 'Download all new items as a new JSON database';
      downloadLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": databaseJson},null,2)], {type: 'application/json'}));
      downloadLink.download = "database.json";
      downloadAll.appendChild(downloadLink);
      this.databasejson();
    }
    //==== updatethedate field of each item in thedatabase=========//
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
      const mapJson = new Map(Object.entries(this.state.myItems)); 
      console.log(compilationOfWordsFromText);
      const compilationOfWordsFromDatabase = new Set();
      for (let line of mapJson.values()) {
        //...
        compilationOfWordsFromDatabase.add(line.word);
      }
      console.log(compilationOfWordsFromDatabase.values());
      console.log(compilationOfWordsFromDatabase);
      for (let line of mapJson.values()) {
        const daysDate = new Date();
        const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      }
      //restOfWords
      const wordsFromText = Array.from(compilationOfWordsFromText);
      for (let line of compilationOfWordsFromDatabase) {
        if (Array.from(compilationOfWordsFromText).includes(line)) {
          this.state.myItems.forEach(function(element) {
            const daysDate = new Date();
            const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
            if (element.word === line && !element.dates.includes(today)) {
              element.dates.push(today);
              wordsFromText.forEach(function(item, index, object) {
                if (item === line) {
                  object.splice(index, 1); //the item is removed
                  console.log(wordsFromText.length);
                }
              });
            }
          }); 
        }
      }
      //add the new elements 
      console.log(this.state.myItems);
      const allMyItems = Array.from(this.state.myItems);
      wordsFromText.forEach(function(item,index,object) {
        const daysDate = new Date();
        const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
        
        const newItem = {};
        newItem.word = item;
        newItem.id = allMyItems.length;
        newItem.dates = [today];
        allMyItems.push(newItem);
        console.log(allMyItems.length);
      }); 
      const downloadAll = document.getElementById("download_all_items");

      //===FILE PREVIEW AFTER DROP==//
      this.setState({allMyItems});
      const downloadLink = document.createElement('a');
      downloadLink.className += '.obj';
      downloadLink.textContent = 'Download all items as JSON';
      downloadLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": allMyItems},null,2)], {type: 'application/json'}));
      downloadLink.download = "database.json";
      downloadAll.appendChild(downloadLink);
    }
  } 

  handleSubmittedText = event => {
    event.preventDefault();
    this.handleText();
  }

  handleDateChange = date => this.setState({date});
  databasejson = (event) => { 
    alert('save your file under the public/ directory of your app');
  }
  downloadItems = (event) => {
    console.log(this.state.result);
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
    const fd = new FormData();
    fd.append('myFile', file);
    fetch(URL.createObjectURL(file))
      .then(function(response) {
        return response.json();
      })
      .then(function(myBlub) {
        console.log(myBlub); //database.json
        const myBlob = [...Object.values(myBlub.items)];
        console.log(myBlob); //database.json
        console.log(file.name);
        return myBlob;
      })
      .then(thirdres => {
        const myItems = thirdres.map(obj => obj);
        this.setState({myItems});
        console.log(myItems);
        document.getElementById('noDatabaseFile').removeAttribute('checked');
        this.setState({
          databaseIsLoaded:
            true
        });
      })
    console.log(this.state.myBlob);
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


  checkBox = (event) => {
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
      
      if (this.state.databaseIsLoaded === true && window.confirm("the database is to be removed. To remove the database anyway, press ok. Press cancel to keep your database loaded in the dropzone.")) {
        this.setState({
          databaseIsLoaded:
            false
        });
        this.setState({
          myItems:
            []
        });
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
      if (this.state.jsonSecondConfirm === true) {
        this.setState({
          jsonSecondConfirm:
            false
        });

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
    }
  }
  alertNoDatabaseFile = (event) => {
    if (document.getElementById('noDatabaseFile').checked === false && window.confirm("You dropped no file. Ok to continue and generate a new database or Cancel and upload a file.")) {
      document.getElementById('noDatabaseFile').checked = true;
      this.setState({
        jsonSecondConfirm:
          true
      });
      console.log("alert");
      document.getElementById('dropzone').hidden = true;
      this.handleText();
    } else {
      document.getElementById('noDatabaseFile').removeAttribute('checked');   
    }
  }
  render() {
    return (
      <form enctype={`multipart/form-data`} onSubmit={this.handleSubmittedText}>
        <div>
          <input type="checkbox" id={`noDatabaseFile`} value={this.state.noDatabaseFile} onChange={this.checkBox} />
          <label for="subscribeNews">I have no database.json</label>
        </div>
  	<div id={`dropzone`} multiple onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragOver={this.onDragOver}></div>
        <div id={`preview`}></div>

        <label id={`labelText`}>
          Your Text:
          <br /><textarea onChange={this.handleTextChange} placeholder="Enter a text" value={this.state.value} /> 
        </label>

        <input type={`submit`} value={`Submit entered text`} className={`btn btn-success btn-block`} />  
        <a id={`download_items`} ref={a => {this.a = a}} onClick={this.downloadItems} download={`items.json`} href={``} ></a>
        <div id={`download_all_items`}></div> 
        <div id={`download_zone`}></div> 

 
      </form>
    );
  }
}

ReactDOM.render(<BasicForm />, document.getElementById('root'));
