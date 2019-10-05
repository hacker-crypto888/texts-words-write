import React, {setState} from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css';
import DatePicker from 'react-date-picker';
const PDFJS = window['pdfjs-dist/build/pdf'];
PDFJS.workerSrc = 'pdf.worker.js';
PDFJS.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
const mammoth = require("mammoth");
//handle dates ----> do like for "remove text function " (import and export texts in imported Texts field and remove the items not matching the selected date (on click)

//dates output in the array. before being able to "sort by date"
//    const daysDate = new Date();
//    const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
//    const msTime = Date.now();
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
      mp3WordList:null,
      audioId:null,
      myAudio:null,
      audioFilePreview:null,
      sourceTag:null,
      theFirstChild:null,
      sourceFile:null,
      myBlob:null,
      myBlub:null,
      myAudioFiles:null,
      wordInputField:null,
      itemsImportMode:null,
      myAudioNode:null,
      previewMyItems:null,
      preview:null,
      audioElements:null,
      previewAudioFiles:null,
      indexes:[],
      myarray:null,
      element:null,
      idx:null,
      allAudioElements:null,
      dataLists:null,
      dataOutput:null,
      someData:null,
      myAudioItems:null,
      firstAudio:null,
      importedTexts:null,
      importText:null,
      textObject:null,
      thisIsMyTextList:null,
      thisIsMyText:null,
      itemsloaded:null,
    };
  }
  componentDidMount() {
    document.getElementById('loadingAudioFiles').hidden = true;
    this.btn.setAttribute('disabled','disabled'); 
    const allAudioElements = document.getElementsByTagName('audio'); 
    this.setState({
      itemsloaded:
        'no items loaded'
    });
  }

  fieldOnblur = () => {
    this.setState({
      audioplayerToggle:
        null,
      wordinputError:
        null
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }
  handleWordInput = (event) => {
    event.preventDefault();
    this.btn.removeAttribute("disabled");
  }
  
  disableButton = (event) => {
    event.preventDefault();
    if(document.getElementById('myAudioFiles').hasChildNodes) {
      const targetValue = document.getElementById('wordinput').dataset.targetValue;
      const { inputValue } = this.state;
      this.btn.setAttribute("disabled", "disabled");
      //console.log({targetValue});
      //console.log({inputValue});
      this.setState({
        wordtest:
          inputValue === targetValue ? this.removeAudioPlayer() : null,      
        checkInput:
          inputValue === '' ? 'enter a word' : null,
        checkTarget:
          targetValue === '' ? 'play a word' : null
      });
    }
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
    const importedTexts = document.getElementById("preview");
    const importText = JSON.parse(importedTexts.dataset.texts); 
    const thisIsMyTextList = [];
    importText.forEach(function(mytext) {
      const textObject = {};

      mytext.forEach(function(myinfo) {
        if (myinfo[0] === "mycontent" && myinfo[1] instanceof Array === false) {return;};
        textObject[myinfo[0]] = myinfo[1];
      });
      if(textObject === {}) {return;};
      if(!textObject.mycontent) {return;};
      console.log(textObject.content); 
      thisIsMyTextList.push(textObject);
      
    });
    if (thisIsMyTextList instanceof Array && thisIsMyTextList.length === 0) {return;}
    console.log(thisIsMyTextList);

    const myNode = document.getElementById('myAudioFiles');
    while(myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    const myAudioFiles = [];

    fetch("https://raw.githubusercontent.com/nathanielove/English-words-pronunciation-mp3-audio-download/master/ultimate.json")
      .then(function(response){
        return response.json();
      })
      .then(function(mp3WordList){
        document.getElementById('loadingAudioFiles').hidden = false;

        const importText = JSON.parse(importedTexts.dataset.texts);
        importText.forEach(function(item, index, object) {
          const textObject = {};
          item.forEach(function(textitem) {
            textObject[textitem[0]]=textitem[1];
          });
          console.log(textObject, textObject.mycontent);
          textObject.mycontent.forEach(function(myworditem) {
            const audioFilePreview = document.createElement('audio'); 
            audioFilePreview.className=myworditem;
            audioFilePreview.key=index;
            audioFilePreview.id=myworditem;
            audioFilePreview.controls=true;
            audioFilePreview.onpause = (event) => {
              event.currentTarget.currentTime = 0;
            }
            if (document.getElementById('playAllTheWords').checked) {
              audioFilePreview.onended = (event) => {
                const allAudioElements = document.getElementsByTagName('audio');
                if (allAudioElements && allAudioElements.length && allAudioElements.length >= 2) {
                  const myAudioItems = document.getElementById('myAudioFiles');

                  const indexAudioElement = Array.prototype.indexOf.call(myAudioItems.children, event.currentTarget) + 1;
                  myAudioItems.childNodes[indexAudioElement].play();

                }
              };
            }
            audioFilePreview.onplay = (event) => { 
              const wordInputField = document.getElementById('wordinput');
              wordInputField.dataset.targetValue = audioFilePreview.id;
            };
            [...Object.entries(mp3WordList)].forEach(function(mp3, indexmp3, objectmp3) {
              if(mp3[0] === myworditem && mp3[1].length){
                mp3[1].forEach(function(mp3link, indexmp3link, objectmp3link) {
                  const theFirstChild = audioFilePreview.firstChild;
                  const sourceFile = document.createElement('source');
                  sourceFile.src = mp3link; 
                  sourceFile.className = myworditem; 
                  sourceFile.type = 'audio/mpeg'; 
                  audioFilePreview.insertBefore(sourceFile, theFirstChild);

                })
                myAudioFiles.push(audioFilePreview);
                
              }
            });
            
            document.getElementById('loadingAudioFiles').hidden = true;

          });
          const previewMyAudioFiles = document.getElementById('myAudioFiles');
          myAudioFiles.forEach(function(item, index, object) {
            previewMyAudioFiles.appendChild(item); 
          });
        })
      })
  }
  removeAudioPlayer = (props) => {
    const targetValue = document.getElementById('wordinput').dataset.targetValue;
    const { inputValue } = this.state;
    this.setState({
      wordtest:
        `Values: \n ${inputValue} / ${targetValue} ok`   
    });
    //console.log({targetValue});
    const mountElements = document.getElementById(targetValue);
    //console.log({mountElements});
    this.setState({
      variableErrors:
        mountElements === undefined ? "Please choose and listen to a word first" : null
    });
    if (mountElements !== undefined) {
      mountElements.pause();
      mountElements.currentTime = 0;
      mountElements.removeAttribute('controls');
    }
    this.setState({
      inputValue:
        ''
    });
  }
  
  render() { 
    
    return(
      <form onSubmit={this.handleSubmit}>
       <div>
       <div className={`form-group`}> 


        <div className="spinner-border" id={`loadingAudioFiles`} role="status">
         <span className="sr-only">Loading...</span>
        </div>
        <label htmlFor={`wordinput`}></label>
        <input
         className={`form-control ${this.state.wordinputError ? 'is-invalid' : ''}`}
         id={`wordinput`}
         placeholder='Enter word'
         value={this.state.inputValue}
         //onMouseOver={this.displayAudio}
         onClick={this.handleWordInput}
         onFocus={this.handleWordInput}
         onChange={e => this.setState({ inputValue: e.target.value }) }
               
        />
        <button ref={btn => { this.btn = btn; }} onClick={this.disableButton} >
         click me
        </button>

       </div>

       <button id={`loadItemsForNewGame`} onClick={this.displayAudio}>

        Start a new game 
       </button>
       <br />

       <div>{this.state.wordtest}</div>
       <div>{this.state.checkInput}</div>
       <div>{this.state.checkTarget}</div>
       <div>{this.state.variableErrors}</div>
       <div id={`myAudioFiles`}></div>
       <div>
        <p>
         <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#mysettings" aria-expanded="false" aria-controls="collapseExample">
                 {`\u2699`} Settings
         </button>
        </p>

        <div className="collapse" id="mysettings">
         <div className="card card-body">
           <div>
             <RegistrationForm />
           </div>
           <div id={`myFillInTheDateForm`}>
             <FillInTheDateForm />
           </div>
           <div>
             <EditEntries />
           </div>  
         </div>
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
      files:null,
      file:null, 
      img:null,
      myImage:null,
      preview:null,
      fileName:null,
      reader:null,
      dt:null,
      i:null,
      j:null,
      k:null,
      fd:null,
      response:null,
      thirdres:null,
      myBlob:null,
      myBlub:null,
      databaseIsLoaded:null,
      myItems:null,    
      noFileType:null,
      importMode:null,    
      saveFile:null,
      jsonString:null,
      downloadAll:null,
      downloadLink:null,
      myNode:null,
      myInputNode:null,
      myOutputNode:null,
      myPreviewNode:null,
      myDatabaseJson:null,
      someData:null,
      dataOutput:null
    }
  }
  componentDidMount() {
    const date = new Date();
    this.setState({date});
  }
  onChange = (date) => {
    this.setState({ date });
    //const myNode = document.getElementById('outputJsonFile');
    //while(myNode.firstChild) {
    //  myNode.removeChild(myNode.firstChild);
    //}
    const myInputNode = document.getElementById('inputJsonFile');
    while(myInputNode.firstChild) {
      myInputNode.removeChild(myInputNode.firstChild);
    }
  }
  handleSubmittedDate = (event) => {

    if(document.getElementById("download_items").dataset.databaseJson.length) {
      const myItems = JSON.parse(document.getElementById("download_items").dataset.databaseJson);
 
       
        //MY DATE PICKER 
      const selectedDate = (this.state.date.getMonth()+1)+'/'+this.state.date.getDate()+'/'+this.state.date.getFullYear();
      //console.log(myItems);
      const myItemsByDate = [];
      console.log(myItems); 
      myItems.items.forEach(function(item, index, object) {
        if(item.dates.includes(selectedDate)){
          myItemsByDate.push(item); 
          
        }
      });
    
      //  //FROM THERE, THE ARRAY "MY ITEMS BY DATE" IS USED TO OUTPUT THE DOWNLOAD LINk

      if ([...myItemsByDate].length){
        //INITIALIZE DOWNLOAD LINKS AREA//
        const myInputNode = document.getElementById('inputJsonFile');
        while(myInputNode.firstChild) {
          myInputNode.removeChild(myInputNode.firstChild);
        }

        //CREATES OUTPUT JSON FILE DOWNLOAD LINK 

        const outputJson = document.getElementById("outputJsonFile");
        
        //if(document.getElementById("items_by_date")) {
        //  document.getElementById("items_by_date").remove();
        //}
        const outputLink = document.createElement('a');
        //console.log(myItemsByDate);
        //BLOB TYPE: JSON, \\\\\\NO MORE NEEDED (THE APP CAN DIRECTLY LOAD THE WORDS THAT WERE DROPPED IN THE DROPZONE//////
        outputLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": [...myItemsByDate]},null,2)], {type: 'application/json'})); //OBJECT TYPE: ARRAY
        outputLink.innerHTML = "download JSON file (date of data entry: "+selectedDate+ ")";
        outputLink.download = 'items.json';
        outputLink.id = 'items_link';
        outputLink.hidden = false;

        outputJson.hidden = false;
        outputLink.dataset.databaseJson = JSON.stringify({"items": myItemsByDate}); //LINES: UNKNOWN
        outputJson.appendChild(outputLink);

      } else {
        const myInputNode = document.getElementById('inputJsonFile');
        while(myInputNode.firstChild) {
          myInputNode.removeChild(myInputNode.firstChild);
        }

        //OUTPUTS TEXT FOR NO VALID ITEM
        const outputJson = document.getElementById("outputJsonFile");
        const someData = document.createElement('a');
        const outputLink = document.createElement('p');
        outputLink.textContent = 'no item corresponds to your request.';
        outputLink.id = 'noitem';
        outputJson.appendChild(outputLink);
        outputLink.hidden = false;
        outputJson.hidden = false;
      }
        //=====/=/=/=/=/=/=/=/=/=/=/=/=/
        //=====/=/=/=/=/=/=/=/=/=/=/=/=/
      
    }

  }
  render() {    
    return (    
      <form onSubmit={this.handleSubmittedDate}>
      <div id="items_by_date"><label>Load words by date</label></div>
      <div>
        <DatePicker
          id="myDatePicker"
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
      <div>
        <input type="submit" id="submit-date-btn" value="Submit selected date" className='btn btn-success btn-block' />  
      </div>
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
      value: '',/*`Truly, for mine own part, I would little or nothing
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
my two mistresses: what a beast am I to slack it!`,*/
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
      wordIdItems:[],
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
      previewMyDatabase:null,
      compilationOfWordsFromDatabase:null,
      wordsFromDatabase:null,
      wordsFromText:null,
      allMyItems:null,
      downloadAll:null,
      downloadLink:null,
      databaseJson:null,
      textAtFileCreation:null,
      textareaIsEmpty:null,
      itemsWereDropped:null,
      myDatabaseForUpload:null,
      items:null,
      myItemsFromText:null,
      aNewElement:null,
      aNewHtmlElement:null,
      myElements:null,
      allElementsButOne:null,
      indexCurrentAudio:null,
      dataOutput:null,
      someData:null,
      preloadOrAutoplay:null,
      audioTagName:null,
      firstAudio:null,
      indexAudioElement:null,
      daysDate:null,
      allTheImportedTexts:null,
      infoAboutThisText:null,
      contentOfThisText:null,
      allTheImportedTexts:null,
      msTime:Date.now(),
      jsonParse:null,
      newText:null,
      indataset:null,
      mySuperList:null,
      myDivForNewData:null,
      newTexts: null,
      importedTexts:null,
      finalArray:null,
      output:null,
      myTextContent:null,
      allWordsFromTexts:null,
      myTextInfo:null,
      myWordInfo:null,
      newText:null,
      mySuperWordList:null,
      myBiggestWordList:null,
      result:null,
      allMyTexts:null,
      c:null,
      myResult:null,
      myTextList:null,
      newTextId:null,
      allMyWords:null,
      allMyTexts:null,
      thisIsMyTextList:null,
      thisIsMyWordList:null,
      html:null,
      messages:null,
      fs:null,
      path:null,
      absPath:null,
      loadFile:null,
      xhr:null,
      reader:null,
      arrayBuffer:null,
      pdfUtil:null,
      pdf_path:null,
      myFile:null,
      pdfBuffer:null,
      rows:null,
      pdffile1:null,
      pdffile2:null,
      pdffile3:null,
      buf:null,
      bufView:null,
      enc:null,
      arr:null,
      pdfExtract:null,
      options:null,
      input:null,
      processor:null,
      outputpdf:null,
      dataurl:null,
      m:null,
      blob:null,
      bloburl:null,
      length:null,
      arr:null,
      display:null,
      text:null,
      base64:null,
      binary:null,
      img:null,
      returnedBlob:null,
      returnedBase64:null,
      BASE64_MARKER:null,
      base64Index:null,
      base64:null,
      raw:null,
      rawLength:null,
      pdfAsDataUri:null,
      pdfAsArray:null,
      littleWordList:null,
      PDF_URL:null,
      totalPages:null,
      pageNumber:null,
      pdfDocument:null,
      pagesPromises:null,
      loadingTask:null,
      fileContent:null,
      JSON2AUDIO:null,
      texts:null,
      words:null,
      exportText:null,
      wordsWithThisTextId:null,
      textInfo:null,
      textObject:null,
      idx:null,
      wordsWithTextId:null,
      valueword:'',
      displaytype:null,
      textloadedtypes:'',
    };

    this.handleSubmittedText = this.handleSubmittedText.bind(this);
  }

  componentDidMount() {
    window.addEventListener('dragover',this.windowdragover);
    window.addEventListener('drop',this.windowdrop);
    this.a.removeAttribute("href");
    document.getElementById('noDatabaseFile').addEventListener('checked', this.checkBox);
    const importedTexts = document.getElementById('preview');
    importedTexts.dataset.textValue = '';
    const wordList = [];
    const allMyWords = [];
    const thisIsMyWordList = [];
    const thisIsMyTextList = [];
    const allMyTexts = []; 
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
  splitContent = () => {
    const importedTexts = document.getElementById('preview');
    //const importText = importedTexts.dataset.splitContent;


    
  }

  handleText = (event) => {
    const importedTexts = document.getElementById('preview');
      
    if(importedTexts.dataset.texts && JSON.parse(importedTexts.dataset.texts).length) {
      const littleWordList = [];
      const myTextList = [];
      //const thisIsMyWordList = [];
      const thisIsMyTextList = [];
      const allMyTexts = JSON.parse(importedTexts.dataset.texts); //allMyTexts is a JSON ARRAY THAT CONTAINS ALL THE TEXTS HAVING BEEN INSERTED, DROPPED OR ADDED TO BE HANDLED BY THE PROGRAM
      console.log("allMyTexts",allMyTexts);
      allMyTexts.forEach(function(mytext) { //mytext IS A JSON ARRAY THAT CONTAINS INFO ABOUT A TEXT
        const textObject = {};
        mytext.forEach(function(info) {
          textObject[info[0]] = info[1];
        });
        if (!textObject.textId) {
          const newTextId = Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY
          textObject.textId = newTextId; 
        }
//handle dates ----> do like for "remove text function " (import and export texts in imported Texts field and remove the items not matching the selected date (on click)
        const daysDate = new Date();
        const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
        const msTime = Date.now();
        if (textObject.dates === (null||undefined||[])) { //addNEw TExt function adds date already /*if this is a json you should add date of today*/
          textObject.dates = [today];
        } 
        ///*but not if you want to sort by date the items you loaded before*/
        ///*the load by date option is only reserved for the json */
        ///*export the json file before you load it by date */

        //1-/*export json*/
        //start from importedTexts.dataset.texts that contains all texts
        //turn into arra of objects
        //export word by word without text info

        //2-/*sort by date*/
        //import json 
        //remove whole texts with date

        console.log(textObject.mycontent);
        const x = (list) => list.filter((v,i) => list.indexOf(v) === i);
        if (textObject.mycontent === "") {return;};
        if (typeof textObject.mycontent[0] === 'string' && textObject.mycontent.length === 1) {
          textObject.mycontent = [textObject.mycontent[0]];
        };
        if(typeof textObject.mycontent === 'string') {
          const thisIsMyWordList = x(textObject.mycontent.split(/[\s.?:;!,]+/)).map(function(y){ return y.replace(/[\W_]+/g," ") }).map(function(x){ return x.toLowerCase() }).filter(function( element ) {
            return (element !== (null||undefined||""));
          });
          textObject.mycontent = thisIsMyWordList;
        }
        thisIsMyTextList.push(textObject);
      });
      importedTexts.dataset.texts = "";
      importedTexts.dataset.texts = [JSON.stringify(thisIsMyTextList.map(Object.entries))];
      console.log('handle text function -> allMyTexts importedTexts texts', JSON.parse(importedTexts.dataset.texts));
    };
  } 
  handleSubmittedText = event => { //handle submitted texts including that in the text input field
    event.preventDefault();
    this.handleText();

  }

  handleDateChange = date => {
    this.setState({date});
  }

  downloadItems = (event) => {
    console.log(this.state.wordIdItems);
    const blobData = new Blob([JSON.stringify({"items": this.state.wordIdItems},null,2)], {type: 'application/json'});
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
          if (file.name.slice(-4) === ".txt") { 
            this.sendTextFile(file);
          }
          if (file.name.slice(-5) === ".docx") { 
            this.sendDocxFile(file);
          }
          if (file.name.slice(-4) === ".ods") { 
            this.sendOdsFile(file);
          }
          if (file.name.slice(-4) === ".pdf") { 
            this.sendPdfFile(file);
            
          }
      }
      //===END JSON UPLOAD===//
    }
  }
  sendTextFile = (file) => {
    const importedTexts = document.getElementById('preview');
    const fd = new FormData();
    fd.append('myFile', file);
    fetch(URL.createObjectURL(file))
      .then(function(response) {
        return response.text();
      })
      .then(function(valueText) {
        console.log(valueText);
        const importedTexts = document.getElementById('preview');
        const newText = {"lastModified": file.lastModified, "lastModifiedDate":file.lastModifiedDate, "name": file.name, "webkitRelativePath": file.webkitRelativePath, "size": file.size, "type": file.type, "mycontent":valueText};
        console.log(newText);
        const myTextInfo = [];
        myTextInfo.push(newText);
        if (importedTexts.dataset.texts !== (null||undefined)) {
          importedTexts.dataset.texts=JSON.stringify([...JSON.parse(importedTexts.dataset.texts), myTextInfo.map(Object.entries)[0]]);
        } else if (importedTexts.dataset.texts === (null||undefined)) {
          importedTexts.dataset.texts = [JSON.stringify(myTextInfo.map(Object.entries))];
        }
      })
  }

  sendFile = (file) => {
    const importedTexts = document.getElementById('preview');
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
        const importedTexts = document.getElementById('preview');
        const littleWordList = [];
        const thisIsMyWordList = [];
        const thisIsMyTextList = [];

        console.log("MY ITEMS", myItems);
        myItems.forEach(function(f) {
          if (!this[f.textId]) {
            this[f.textId] = { "textId": f.textId, "dates":f.dates, "lastModified": f.lastModified, "lastModifiedDate": f.lastModifiedDate, "name": f.name, "size": f.size, "type": f.type, "webkitRelativePath": f.webkitRelativePath, "mycontent":[] }
            thisIsMyTextList.push(this[f.textId]);
          }
          const daysDate = new Date();
          const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
          const msTime = Date.now();
          if(this[f.textId].dates instanceof Array && this[f.textId].dates.length === 0) {
            this[f.textId].dates = [today];
          }
          this[f.textId].mycontent.push(f.word);
        }, Object.create(null));
        console.log("MY TEXT LIST", thisIsMyTextList);
        if (importedTexts.dataset.texts !== (null||undefined)) {
          importedTexts.dataset.texts=JSON.stringify([...JSON.parse(importedTexts.dataset.texts), thisIsMyTextList.map(Object.entries)[0]]);
        } else if (importedTexts.dataset.texts === (null||undefined)) {
          importedTexts.dataset.texts = [JSON.stringify(thisIsMyTextList.map(Object.entries))];
        }
        console.log(JSON.parse(importedTexts.dataset.texts));
      })
  }
  sendDocxFile = (file) => {
    console.time();
    const reader = new FileReader();
    reader.onloadend = function(event) {
      const arrayBuffer = reader.result;
      // debugger
      const result1 = document.getElementById('result1');
      const result2 = document.getElementById('result2');
      const result3 = document.getElementById('result3');
      mammoth.convertToHtml({arrayBuffer: arrayBuffer}).then(function (resultObject) {
        result1.innerHTML = resultObject.value
        console.log("resultObject.value",resultObject.value)
      })
      console.timeEnd();

      mammoth.extractRawText({arrayBuffer: arrayBuffer}).then(function (resultObject) {
        result2.innerHTML = resultObject.value
        const importedTexts = document.getElementById('preview');
        const newText = {"lastModified": file.lastModified, "lastModifiedDate":file.lastModifiedDate, "name": file.name, "webkitRelativePath": file.webkitRelativePath, "size": file.size, "type": file.type, "mycontent":resultObject.value};
        console.log("newText",newText);
        const myTextInfo = [];
        myTextInfo.push(newText);
        if (importedTexts.dataset.texts !== (null||undefined)) {
          importedTexts.dataset.texts=JSON.stringify([...JSON.parse(importedTexts.dataset.texts), myTextInfo.map(Object.entries)[0]]);
          newText.length = 0;
        } else if (importedTexts.dataset.texts === (null||undefined)) {
          importedTexts.dataset.texts = [JSON.stringify(myTextInfo.map(Object.entries))];
          newText.length = 0;
        }
        //console.log(resultObject.value)
        //const importedTexts = document.getElementById('preview');
        //const newText = {"lastModified": file.lastModified, "lastModifiedDate":file.lastModifiedDate, "name": file.name, "webkitRelativePath": file.webkitRelativePath, "size": file.size, "type": file.type, "mycontent":resultObject.value};
        //console.log(newText);
        //const myTextInfo = [];
        //myTextInfo.push(newText);
        //if (importedTexts.dataset.texts !== (null||undefined)) {
        //  importedTexts.dataset.texts=JSON.stringify([...JSON.parse(importedTexts.dataset.texts), myTextInfo.map(Object.entries)[0]]);
        //  newText.length = 0;
        //} else if (importedTexts.dataset.texts === (null||undefined)) {
        //  importedTexts.dataset.texts = [JSON.stringify(myTextInfo.map(Object.entries))];
        //  newText.length = 0;
        //}
      })
    };
    reader.readAsArrayBuffer(file);
    const importedTexts = document.getElementById('preview');

  }

  sendOdsFile = (file) => {

  }
  sendPdfFile = (file) => { 
    const reader = new FileReader();
    reader.onload = () => {
      function convertDataURIToBinary(dataURI) {
        const BASE64_MARKER = ';base64,';
        const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
        console.log(base64Index);
        const base64 = dataURI.substring(base64Index);
        console.log(base64 instanceof ArrayBuffer);
        const raw = window.atob(base64);
        console.log(raw instanceof ArrayBuffer);
        //const rawLength = raw.length;
        //const array = new Uint8Array(new ArrayBuffer(rawLength));
      
        //for(var i = 0; i < rawLength; i++) {
        //  array[i] = raw.charCodeAt(i);
        //}
        //console.log(array instanceof Uint8Array);
        //return array;
        return raw;
      }
      console.log(reader.result);
      const PDF_URL = convertDataURIToBinary(reader.result);
      const loadingTask = PDFJS.getDocument({data: PDF_URL});
      loadingTask.promise.then(function (pdf) {
        console.log('pdf loaded'); 
        pdf.getPage(1).then(function (page) {
          console.log('page 1 loaded');
        });
        getPageText(1, pdf).then(function(textPage) {
          console.log(textPage); 
        });
        const pdfDocument = pdf;
        // Create an array that will contain our promises 
        const pagesPromises = [];

        for (var i = 0; i < pdf.numPages; i++) {
            // Required to prevent that i is always the total of pages
            (function (pageNumber) {
                // Store the promise of getPageText that returns the text of a page
                pagesPromises.push(getPageText(pageNumber, pdfDocument));
            })(i + 1);
        }

        //Execute all the promises
        Promise.all(pagesPromises).then(function (pagesText) {
        //document.getElementById("loading-info").remove();

        // Display text of all the pages in the console
        // e.g ["Text content page 1", "Text content page 2", "Text content page 3" ... ]
          console.log(pagesText);
          const importedTexts = document.getElementById('preview');
          const newText = {"lastModified": file.lastModified, "lastModifiedDate":file.lastModifiedDate, "name": file.name, "webkitRelativePath": file.webkitRelativePath, "size": file.size, "type": file.type, "mycontent":pagesText.join(' ')};
          console.log(newText);
          const myTextInfo = [];
          myTextInfo.push(newText);
          if (importedTexts.dataset.texts !== (null||undefined)) {
            importedTexts.dataset.texts=JSON.stringify([...JSON.parse(importedTexts.dataset.texts), myTextInfo.map(Object.entries)[0]]);
            newText.length = 0;
          } else if (importedTexts.dataset.texts === (null||undefined)) {
            importedTexts.dataset.texts = [JSON.stringify(myTextInfo.map(Object.entries))];
            newText.length = 0;
          }
        //for(var i = 0;i < pagesText.length;i++){
        //	document.getElementById("pdf-text").append("<div><h3>Page "+ (i + 1) +"</h3><p>"+pagesText[i]+"</p><br></div>");
        //}

        });

          

        /**
         * Retrieves the text of a specif page within a PDF Document obtained through pdf.js 
         * 
         * @param {Integer} pageNum Specifies the number of the page 
         * @param {PDFDocument} PDFDocumentInstance The PDF document obtained 
         **/
        function getPageText(pageNum, PDFDocumentInstance) {
            // Return a Promise that is solved once the text of the page is retrieven
            return new Promise(function (resolve, reject) {
                PDFDocumentInstance.getPage(pageNum).then(function (pdfPage) {
                    // The main trick to obtain the text of the PDF page, use the getTextContent method
                    pdfPage.getTextContent().then(function (textContent) {
                        var textItems = textContent.items;
                        var finalString = "";
        
                        // Concatenate the string of the item to the final string
                        for (var i = 0; i < textItems.length; i++) {
                            var item = textItems[i];
        
                            finalString += item.str + " ";
                        }
        
                        // Solve promise with the text retrieven from the page
                        resolve(finalString);
                    });
                });
            });
        }
      }, function (reason) {
        // PDF loading error
        console.error(reason);
      });
    }
    //
    reader.readAsDataURL(file); 
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
			reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.wordIdItems; }; })(img); //if the file is an image, insert the content of the imageas the image in the dropbox
			reader.readAsDataURL(file);

		}
  }

  previewFile = (file) => {
    
  }

  handleTextChange = (event) => {
    console.log(this.state.value);
    this.setState({
      value:
        event.target.value
    });
  }
  handleWordChange = (event) => {
    this.setState({
      valueword:
        event.target.valueword
    });
  }


  checkBox = (event) => {
    this.setState({
      noDatabaseFile:
        event.target.value
    });
    const audioTagName = document.getElementsByTagName('audio');
    if (document.getElementById('playAllTheWords').checked && audioTagName && audioTagName.length && !Object.keys(audioTagName)[0].onended) {
      for (let el of audioTagName) {
        el.onended = (event) => {
          const allAudioElements = audioTagName;
          console.log(event.currentTarget);
          console.log(allAudioElements);
          //allAudioElements[0].remove(); 
          if (allAudioElements && allAudioElements.length && allAudioElements.length >= 2) {

            const myAudioItems = document.getElementById('myAudioFiles');
            console.log(myAudioItems.children);
            const indexAudioElement = Array.prototype.indexOf.call(myAudioItems.children, event.currentTarget) + 1;
            if (indexAudioElement < allAudioElements.length) {
              myAudioItems.childNodes[indexAudioElement].play();
            }
          }
        };
      }
    
    }
    if (!document.getElementById('playAllTheWords').checked && audioTagName && audioTagName.length && Object.keys(audioTagName)[0].onended !== (null||undefined||false)) {
      for (let el of audioTagName) {
        el.onended = (event) => {
          el.pause();
          el.currentTime = 0;
        }
      }
    }

    if (document.getElementById('noDatabaseFile').checked) {
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

    if (!document.getElementById('noDatabaseFile').checked && this.state.jsonSecondConfirm === true) {
      this.setState({
        jsonSecondConfirm: 
          false
      });
      document.getElementById('dropzone').hidden = false;
    } else if (document.getElementById('noDatabaseFile').checked) {
      this.setState({
        jsonSecondConfirm: 
          true 
      });
      document.getElementById('dropzone').hidden = true;
      //document.getElementById('noDatabaseFile').checked = true;
    } 
  }
  autoplay = (event) => {
    //const allAudioElements = this.state;
    const myElements = document.getElementsByTagName('audio');

    if (myElements && myElements.length) {
      myElements[0].play();
    }

  }
  addNewWord = (event) => {
    const newTextId = Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY
    this.setState({
      valueword:
        event.target.valueword
    });
    const valueword = document.getElementById("valueword").value;
    const importedTexts = document.getElementById('preview');
    if (valueword === "") {return;};
    importedTexts.dataset.textValue = "";
    importedTexts.dataset.textValue += valueword;

    const daysDate = new Date();
    const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
    const msTime = Date.now();
    const newText = {"textId":newTextId, "dates":[today], "lastModified": this.state.msTime, "lastModifiedDate":this.state.today, "name": "", "webkitRelativePath": "", "size": "", "type": ""};
    newText.mycontent = [valueword];
    if (importedTexts.dataset.texts && importedTexts.dataset.texts.length > 0) {
      const myTextInfo = [];
      myTextInfo.push(newText);
      importedTexts.dataset.texts=JSON.stringify([...JSON.parse(importedTexts.dataset.texts), myTextInfo.map(Object.entries)[0]]);
    } else if (importedTexts.dataset.texts === (null||undefined) || importedTexts.dataset.texts.length === 0) {
      const myTextInfo = [];
      myTextInfo.push(newText);
      importedTexts.dataset.texts = [JSON.stringify(myTextInfo.map(Object.entries))];
    }
  }
  addNewText = (event) => {
    const newTextId = Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY
    this.setState({
      value:
        event.target.value
    });
    const importedTexts = document.getElementById('preview');
    if (this.state.value === "") {return;};
    importedTexts.dataset.textValue = "";
    importedTexts.dataset.textValue += this.state.value;
    const daysDate = new Date();
    const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
    const msTime = Date.now();
    const newText = {"textId":newTextId, "dates":[today], "lastModified": this.state.msTime, "lastModifiedDate":this.state.today, "name": "", "webkitRelativePath": "", "size": "", "type": "", "mycontent":importedTexts.dataset.textValue};
    if (importedTexts.dataset.texts && importedTexts.dataset.texts.length > 0) {
      const myTextInfo = [];
      myTextInfo.push(newText);
      importedTexts.dataset.texts=JSON.stringify([...JSON.parse(importedTexts.dataset.texts), myTextInfo.map(Object.entries)[0]]);
    } else if (importedTexts.dataset.texts === (null||undefined) || importedTexts.dataset.texts.length === 0) {
      const myTextInfo = [];
      myTextInfo.push(newText);
      importedTexts.dataset.texts = [JSON.stringify(myTextInfo.map(Object.entries))];
    }
   

  }
  render() {


    const itemsloaded = this.state.itemsloaded;

    return (

      <form enctype={`multipart/form-data`} onSubmit={this.handleSubmittedText}>
        <div>
          <input type="checkbox" id="playAllTheWords" value={this.state.preloadOrAutoplay} onChange={this.checkBox} name="playAllTheWords"/>
          <label for="playAllTheWords">Play all the words</label>
        </div>
        <div>
          <input type="checkbox" id={`noDatabaseFile`} value={this.state.noDatabaseFile} onChange={this.checkBox} />
          <label for="subscribeNews">I have no database.json</label>
        </div>

  	<div id={`dropzone`} multiple onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragOver={this.onDragOver}></div>
        <div id={`preview`}></div>
        <iframe id={`input`} type={`application/pdf`} />
        <input type={`submit`} value={`Import all texts and words`} id={`import_texts_words`} className={`btn btn-success btn-block`} />  
        <label id={`labelText`}>
          Your Text:

          <br /><textarea onChange={this.handleTextChange} placeholder="Enter a text" value={this.state.value} /> 
        </label>
        <button onClick={this.addNewText} className={`btn btn-success btn-block`}>  
          Add a new text
        </button>
        <label id={`labelWord`}>
          Your Word:


        </label>
        <br /><input onChange={this.handleWordChange} placeholder="Enter a word" id="valueword" value={this.state.valueword} /> 
        <button onClick={this.addNewWord} className={`btn btn-success btn-block`}>  
          Add a new word 
        </button>


        <a id={`download_items`} ref={a => {this.a = a}} onClick={this.downloadItems} download={`items.json`} href={``} ></a>
        <div id={`download_all_items`}></div> 
        <div id={`download_zone`}></div> 

 
      </form>
    );
  }
}
class EditEntries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      texts:null,
      words:null,
      wordsWithThisTextId:null,
      textExport:null,
      textInfo:null,
      displayWord:null,
      i:null,
      displayText:null,
      removeText:null,
      removeWord:null,
      modalbody:null,
      mytextid:null,
      textelement:null,
      buttons:null,
      idx:null,
      textdiv:null,
      output:null,
      thisIsMyWordList:null,
      thisIsMyTextList:null,
      myTextList:null,
      myItems:null,
      importedTexts:null,
      textAfterEdit:null,
      newText:null,
      myTextInfo:null,
      allTheTexts:null,
      value:null,
      textObject:null,
      importText:null,
      exportMyTexts:null,
      myWord:null,
      blobData:null,
      url:null,
      wordsFromText:null,
      myTextList:null,
      idx:null,
      exportMyItems:null,
      mycontent:null,
      myTextInfo:null,
      idx1:null,
      idx2:null,
      testWord:null,
      textInfoNew:null,
    }
  }
  componentDidMount = () => {
  }
  editEntries = (event) => {
    const importedTexts = document.getElementById('preview'); 
    const importText = JSON.parse(importedTexts.dataset.texts); 
    const thisIsMyTextList = [];
    importText.forEach(function(mytext) {
      const textObject = {};

      mytext.forEach(function(myinfo) {
        if (myinfo[0] === "mycontent" && myinfo[1] instanceof Array === false) {return;};
        textObject[myinfo[0]] = myinfo[1];
      });
      if(textObject === {}) {return;};
      if(!textObject.mycontent) {return;};
      console.log(textObject.content); 
      thisIsMyTextList.push(textObject);
      
    });
    if (thisIsMyTextList instanceof Array && thisIsMyTextList.length === 0) {return;}
    console.log(thisIsMyTextList);
    const modalbody = document.getElementById('modal-body');
    const exportText = JSON.parse(importedTexts.dataset.texts);
    exportText.forEach(function(text) {
      const textdiv = document.createElement('div'); 
      console.log('text array of edit entries', text);
      textdiv.className = text[0][1];
      modalbody.appendChild(textdiv);
      const displayText = document.createElement('div');
      text.forEach(function(info, rangeInfo, ObjectInfo) {
        if (info[0] === 'mycontent') {
          info[1].forEach(function(wordItem) {
            //if (wordItem === "mycontent") {return;}
            const displayWord = document.createElement('div');
            displayWord.textContent = wordItem;
            textdiv.appendChild(displayWord);
            const removeWord = document.createElement('button');
            removeWord.classList.add("btn");
            removeWord.classList.add("btn-secondary");
            removeWord.type = "button";
            removeWord.textContent = "Remove this word";
            removeWord.onclick = (event) => {

              const importedTexts = document.getElementById('preview');
              importedTexts.dataset.texts = "";


              const idx = info.indexOf(wordItem);
              if (idx !== -1) {
                info.splice(idx, 1);
              }
              console.log("INFO SLICE 1",info); 
              console.log(exportText);
              displayWord.remove();
              removeWord.remove();
              importedTexts.dataset.texts = [JSON.stringify(exportText.map(Object.values))];
              console.log("imported Textsremove word on click",JSON.parse(importedTexts.dataset.texts));
            }
            textdiv.appendChild(removeWord);
          });
          //info.unshift("mycontent");
          console.log("INFO", info);
        } else if (info[0] !== 'mycontent') {
          displayText.textContent += info[0] + ' ' + info[1] + '\r\n';
        }
        textdiv.appendChild(displayText);
      });

      const removeText = document.createElement('button');
      removeText.classList.add("btn");
      removeText.classList.add("btn-secondary");
      removeText.type = "button";
      removeText.textContent = "Remove this text";
      removeText.onclick = (event) => {

        const importedTexts = document.getElementById('preview');
        importedTexts.dataset.texts = "";

        const idx = exportText.indexOf(text);
        if (idx !== -1) {
          exportText.splice(idx, 1);
        }
        console.log("onclick");
        removeText.remove();
        //if (modalbody.hasChildNodes()) {
        const textelements = document.getElementsByClassName(text[0][1]);//modalbody.childNodes;
        while (textelements[0].firstChild) {
          textelements[0].removeChild(textelements[0].firstChild);
        }

        //exportText.forEach(function(textItem) {
        //  if (importedTexts.dataset.texts !== (null||undefined)) {
        //    importedTexts.dataset.texts=JSON.stringify([...JSON.parse(importedTexts.dataset.texts), textItem.map(Object.entries)[0]]);
        //  } else if (importedTexts.dataset.texts === (null||undefined)) {
        importedTexts.dataset.texts = [JSON.stringify(exportText.map(Object.values))];
        //  }
        //});
        console.log("importTexts texts on click remove text", JSON.parse(importedTexts.dataset.texts));
        
      };

      modalbody.appendChild(removeText);
    });
  }
  exportItems = (event) => {
    const exportMyItems = [];
    const wordsFromText = [];
    const importedTexts = document.getElementById('preview'); 
    const importText = JSON.parse(importedTexts.dataset.texts); 
    /**/
    importText.forEach(function(textInfo){
      textInfo.forEach(function(info){
        if(info[0] === "mycontent") {
          //console.log(info[1] instanceof Array);
          //console.log(typeof info[1][0] === 'string' && typeof info[1][1] === 'string');
          info[1].forEach(function(myitem){ 
            console.log("my item is a string",typeof myitem === 'string');
            const testWord = textInfo.some(x => x[0] === "word");
            console.log("there is a word or several in the list", testWord); 
            if (testWord === false) {
              textInfo.push(["word",myitem]);
              exportMyItems.push(textInfo);
            } else if (testWord === true) {
              const textInfoNew = textInfo.filter(x => x[0] !== "word"); 
              textInfoNew.push(["word",myitem]);
              exportMyItems.push(textInfoNew);
            } 
          });
        }
      }); 
    });
    /**/
    const blobData = new Blob([JSON.stringify({"items": exportMyItems},null,2)], {type: 'application/json'});
    const url = window.URL.createObjectURL(blobData);
    document.getElementById('export_all_items').href = url;
  }
  render() {
    return (
      <div>
        <a id={`export_all_items`} ref={a => {this.a = a}} onClick={this.exportItems} download={`database.json`} href={``} >Export my items</a>
        <button type="button" onClick={this.editEntries} id="editentries" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalLong">
          Edit entries 
        </button>
        
        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div id="modal-body" class="modal-body">
                 
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
ReactDOM.render(<BasicForm/>, document.getElementById('root'));
