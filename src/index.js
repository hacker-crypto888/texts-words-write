import React, {setState} from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css';
import axios from 'axios';
import DatePicker from 'react-date-picker';
const pdfjsLib = require('pdfjs-dist');
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
const path = require('path');
const fs = require('fs');
//const pdfjsWorker = require('pdfjs-dist/build/pdf.worker.min');
//const PDFExtract = require('pdf.js-extract').PDFExtract;
//const pdfjsWorkerBlob = new Blob([pdfjsWorker]);
//const pdfjsWorkerBlobURL = URL.createObjectURL(pdfjsWorkerBlob);
//pdfjsLib.workerSrc = pdfjsWorkerBlobURL;
//const pdfText = require('pdf-text');
//const PdfReader = require("pdfreader").PdfReader;
//const pdf = require('pdf-parse');
//const docx = require('./docx')
//const word2html = require('word2html');
//const getDocumentProperties = require('office-document-properties');
//const unoconv = require('unoconv');
//const converter = require('office-converter')();
//const WordExtractor = require("word-extractor");
//const docxParser = require('docx-parser');
//const office2html = require('office2html'),
//  generateHtml = office2html.generateHtml;
//const docxParser = require('docx-parser');
//const anyFileParser = require('anyfileparser');
//const dxe = require('docx-extractor');
//const officeParser = require('officeparser');
//const textract = require('textract');
const mammoth = require("mammoth");
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
      firstAudio:null
    };
  }
  componentDidMount() {
    document.getElementById('loadingAudioFiles').hidden = true;
    this.btn.setAttribute('disabled','disabled'); 
    const allAudioElements = document.getElementsByTagName('audio'); 
    const dataOutput = document.getElementById("outputJsonFile");
    const someData = document.createElement('a');
    someData.id = 'some-data';
    dataOutput.appendChild(someData);
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
        if(document.getElementById('items_by_date') && document.getElementById('items_by_date').dataset.databaseJson) {

          document.getElementById('loadingAudioFiles').hidden = false;
          const myBlub = JSON.parse(document.getElementById('items_by_date').dataset.databaseJson);
          const items = myBlub.items;
          items.forEach(function(item, index, object) {
            //console.log(item);
            //const myAudioFiles = document.getElementById('myAudioFiles');
            const audioFilePreview = document.createElement('audio'); 
            audioFilePreview.className=item.word;
            audioFilePreview.key=item.id;
            audioFilePreview.id=item.word;
            audioFilePreview.controls=true;
            audioFilePreview.onpause = (event) => {
              event.currentTarget.currentTime = 0;
            }
            if (document.getElementById('playAllTheWords').checked) {
              audioFilePreview.onended = (event) => {
                const allAudioElements = document.getElementsByTagName('audio');
                //console.log(event.currentTarget);
                //allAudioElements[0].remove(); 
                //if (allAudioElements[1]) {
                if (allAudioElements && allAudioElements.length && allAudioElements.length >= 2) {
                  //const allAudioElements = document.getElementsByTagName('audio');
                  //const firstAudio = allAudioElements[0];


                  //allAudioElements[0].remove(); 
                  //const myAudioItems = document.getElementById('myAudioFiles');       
                  //myAudioItems.appendChild(firstAudio);
                  //oItems.firstChild.play();
                  //allAudioElements[0].remove(); 
                  //allAudioElements[0].play();
                  //const allAudioElements = document.getElementsByTagName('audio');
                  const myAudioItems = document.getElementById('myAudioFiles');
                  //const firstAudio = allAudioElements[0];

                  const indexAudioElement = Array.prototype.indexOf.call(myAudioItems.children, event.currentTarget) + 1;
                  //event.currentTarget.remove();
                  myAudioItems.childNodes[indexAudioElement].play();
                  //myAudioItems.insertBefore(event.currentTarget, myAudioItems.children[indexAudioElement]);

                }
              };
            }
              //const indexes = [];
              ////const mylist = ['a', 'b', 'a', 'c', 'a', 'd'];
              //const mylist = allAudioElements;
              //const element = event.currentTarget;
              //const idx = mylist.indexOf(element);
              //while (idx != -1) {
              //  indexes.push(idx);
              //  idx = mylist.indexOf(element, idx + 1);
              //}
              //console.log(indexes);
              

            

            audioFilePreview.onplay = (event) => { 
              const wordInputField = document.getElementById('wordinput');
              wordInputField.dataset.targetValue = audioFilePreview.id;
            };
            //console.log(item.word);
            [...Object.entries(mp3WordList)].forEach(function(mp3, indexmp3, objectmp3) {
              if(mp3[0] === item.word && mp3[1].length){
                mp3[1].forEach(function(mp3link, indexmp3link, objectmp3link) {
                  const theFirstChild = audioFilePreview.firstChild;
                  const sourceFile = document.createElement('source');
                  sourceFile.src = mp3link; 
                  //console.log(mp3link);
                  sourceFile.className = item.word; 
                  sourceFile.type = 'audio/mpeg'; 
                  audioFilePreview.insertBefore(sourceFile, theFirstChild);

                })
                //myAudioFiles.appendChild(audioFilePreview);
                myAudioFiles.push(audioFilePreview);
                
              }
            });
            
            document.getElementById('loadingAudioFiles').hidden = true;

          });
        }
        const previewMyAudioFiles = document.getElementById('myAudioFiles');
        myAudioFiles.forEach(function(item, index, object) {
          previewMyAudioFiles.appendChild(item); 
        });
      })
 
    //display AUDIO FILES THAT ARE IN AN ARRAY ONE BY ONE 

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
    document.getElementById('dropzoneSortByDate').hidden = false;
    document.getElementById('dropMyJson').hidden = true;
    document.getElementById('labelDropMyJson').hidden = true;
    document.getElementById('jsonInPublicDir').hidden = true;
    document.getElementById('labelJsonInPublicDir').hidden = true;
    document.getElementById('submit-date-btn').hidden = true;
    document.getElementById('dropzoneSortByDate').hidden = true;
    const dataOutput = document.getElementById("outputJsonFile");
    const someData = document.createElement('a');
    someData.id = 'some-data';
    dataOutput.appendChild(someData);
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
        
        if(document.getElementById("items_by_date")) {
          document.getElementById("items_by_date").remove();
        }
        const outputLink = document.createElement('a');
        //console.log(myItemsByDate);
        //BLOB TYPE: JSON, \\\\\\NO MORE NEEDED (THE APP CAN DIRECTLY LOAD THE WORDS THAT WERE DROPPED IN THE DROPZONE//////
        outputLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": [...myItemsByDate]},null,2)], {type: 'application/json'})); //OBJECT TYPE: ARRAY
        //ORIGIN: DATASET 
        //COLUMNS: WORD, ID, DATES OF CONSULTATION
        //IT WAS NOT PRECISED WHETHER DATA CAME FROM A FILE WITH SOME TYPE OR JUST THE TEXT TYPED IN THE TEXT AREA
        //DATE OF EACH WORD (SEVERAL DATES FOR SEVERAL DAYS OF OCCURRENCE)

        //\\THE DATASET WAS ASSIGNED TO ITS HTML ELEMENT ELSEWHERE IN THE CODE
        outputLink.innerHTML = "download JSON file (date of data entry: "+selectedDate+ ")";
        outputLink.download = 'items.json';
        outputLink.id = 'items_by_date';
        outputLink.hidden = false;

        outputJson.hidden = false;
        //alert('Your JSON file with items sorted by date is ready. save it under public/ directory of your app, reload page and start playing!');
        //DATASET TYPE: JSON

        //////////////------------------------------------------/
        //BLOB TYPE
        //DATASET TYPES
        //ARRAY TYPES / OBJECTS TYPES
        //ARRAYS / OBJECTS FIELDS (EX: NAME, WORD, ID, DATE, TITLE
        //FILE TYPES (FETCH) 
        //////////////------------------------------------------/
        //STORE IN: 1) JSON
        //2)DATASET 
        //////////////------------------------------------------/
        //DATA INPUT(FOR THE AUDIO DISPLAYER)/OUTPUT(FOR THE FORM FIELDS) TO DISPLAY AUDIO IS A DATASET
        //////////////------------------------------------------/
        //BOOTSTRAP\\\\\\ CAN ONLY BE POSSIBLE IF ALL THE INFO FROM FETCH (FROM THE DROPPED FILES) AND THE BLOBS (DATABASES THAT ARE MADE WITH THE FORMDATA) IS COMPLETE
        //////////////------------------------------------------/
        //EVENT LISTENERS CAN ONLY BE WORKED OUT IF THE JSON IS CORRECTLY WORKED OUT AS WELL
        //////////////------------------------------------------/
        //WHERE THE DATABASES (IN CONSTANTS) ARE LOADED / ASSIGNED: LOOK FOR ITS LINES AND COLUMNS IN THE CODE ABOVE IT (USING THE PROPS)
        outputLink.dataset.databaseJson = JSON.stringify({"items": myItemsByDate}); //LINES: UNKNOWN
        //COLUMNS: WORD, ID, ARRAY OF DATES (PROGRAM JAVASCRIPT)
        outputJson.appendChild(outputLink);

      } else {
        //INITIALIZE DOWNLOAD LINKS AREA//
        //const myOutputNode = document.getElementById('outputJsonFile');
        //while(myOutputNode.firstChild) {
        //  myOutputNode.removeChild(myOutputNode.firstChild);
        //}
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
  itemsByDateLoadForm = (event) => {
    //alert('test');
    if (document.getElementById('items_by_date') && document.getElementById('items_by_date').dataset.databaseJson) {
      if(document.getElementById("items_by_date")) {
        document.getElementById("items_by_date").remove();
      }
      event.target.removeEventListener('mouseover', this.itemsByDateLoadForm); 
      //console.log(event.target.clientHeight);

      document.getElementById('dropMyJson').removeAttribute('hidden');
      document.getElementById('labelDropMyJson').removeAttribute('hidden');

      document.getElementById('jsonInPublicDir').removeAttribute('hidden');
      document.getElementById('dropzoneSortByDate').hidden = true;
      document.getElementById('jsonInPublicDir').checked = true;
      document.getElementById('labelJsonInPublicDir').removeAttribute('hidden');
      document.getElementById('submit-date-btn').removeAttribute('hidden');
      //document.getElementById('dropzoneSortByDate').removeAttribute('hidden');

      
    } 
  }
  render() {    
    return (    
      <form onSubmit={this.handleSubmittedDate}>
      <label>Load words by date</label>
      <div id={`setImportMode`} onChange={event => this.setImportMode(event)}>
        <input type={`radio`} id={`jsonInPublicDir`} value={`load`} name={`importMode`} />
        <label id={`labelJsonInPublicDir`} for={`jsonInPublicDir`}>Sort items by date</label>
        <input type={`radio`} id={`dropMyJson`} value={`drop`} name={`importMode`} />
        <label id={`labelDropMyJson`} for={`dropMyJson`}> Rather load my own database.json file</label>
      </div>
      
      <div id={`dropzoneSortByDate`} multiple onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragOver={this.onDragOver}></div>
      <div id={`previewSortByDate`}></div>
      <div>
        <DatePicker
          id="myDatePicker"
          onChange={this.onChange}
          onMouseOver={this.itemsByDateLoadForm}
          value={this.state.date}
        />
      </div>
      <div>
        <input type="submit" id="submit-date-btn" value="Submit selected date" className='btn btn-success btn-block' />  
      </div>
      <div id={`inputJsonFile`}></div>
      <div id={`outputJsonFile`}></div>
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
      myTextInfo:null,
      finalArray:null,
      output:null,
      myTextContent:null,
      allWordsFromTexts:null,
      myWordInfo:null,
      newText:null,
      mySuperWordList:null,
      myBiggestWordList:null,
      result:null,
      allMyTexts:null,
      c:null,
      myResult:null,
      myTextList:null,
      myTextId:null,
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
      pdfAsArray:null
      
    };

    this.handleSubmittedText = this.handleSubmittedText.bind(this);

  }

  componentDidMount() {
    window.addEventListener('dragover',this.windowdragover);
    window.addEventListener('drop',this.windowdrop);
    this.a.removeAttribute("href");
    document.getElementById('noDatabaseFile').addEventListener('checked', this.checkBox);
    const dataOutput = document.getElementById("outputJsonFile");
    const someData = document.createElement('a');
    someData.id = 'some-data';
    dataOutput.appendChild(someData);
    //const allTheImportedTexts = document.getElementById('preview').dataset.textImport;
    const importedTexts = document.getElementById('preview');
    importedTexts.dataset.textValue = '';
    const wordList = [];
    const allMyWords = [];
    const thisIsMyWordList = [];
    const thisIsMyTextList = [];
    const allMyTexts = []; 
    //allTheImportedTexts = {};




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
    //axios.get(`./database.json`)
    //  .then(res => {
    //    const database = res.data.items.map(obj => obj);
    //    this.setState({ database });
    //  });
  }
  splitContent = () => {
    const importedTexts = document.getElementById('preview');
    //const importText = importedTexts.dataset.splitContent;


    
  }

  handleText = (event) => {
    //const wordList = [];
    //YOU HAVE NO DATABASE.JSON AND YOU HAVE NO ITEMS
    //if (this.state.value === (null||undefined)) {
    //  this.state.value = document.getElementById('preview').dataset.textValue;
    //}
    const importedTexts = document.getElementById('preview');
    //if (importedTexts.dataset.textValue === undefined) {
    //  importedTexts.dataset.textValue = "";
    //}
    //importedTexts.dataset.textValue += this.state.value;
    console.log(importedTexts.dataset.textValue);
    //if (document.getElementById('noDatabaseFile').checked === true && this.state.myItems === ([]||undefined)) {
    //}

    //ALERT BOXES (TEXT IN TEXTAREA)
    //if (/*this.state.value.replace(/[!?:;.,]+/g, "").replace(/(\r\n|\n|\r)/gm,"") === ""*/) {
    //YOU IMPORT THE TEXT YOU ENTERED INTO THE VARIABLE WORDLIST
    const daysDate = new Date();
    const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
    const msTime = Date.now();

    const newText = {"lastModified": this.state.msTime, "lastModifiedDate":this.state.today, "name": "", "webkitRelativePath": "", "size": "", "type": "", "mycontent":importedTexts.dataset.textValue};
    const mySuperList = this.state;
    //TO HAVE IMPORTED TEXTS
    if (importedTexts.dataset.texts && importedTexts.dataset.texts.length && importedTexts.dataset.textValue !== "") {
      const myTextInfo = [];
      myTextInfo.push(newText);
      importedTexts.dataset.texts=JSON.stringify([...JSON.parse(importedTexts.dataset.texts), myTextInfo.map(Object.entries)[0]]);
      //importedTexts.dataset.textValue = "";
      //console.log(JSON.parse(importedTexts.dataset.texts));
    } else if (importedTexts.dataset.texts === (null||undefined) && importedTexts.dataset.textValue !== "") {
      
      const myTextInfo = [];
      myTextInfo.push(newText);
      //console.log(myTextInfo);
      //importedTexts.dataset.texts = [JSON.stringify(myTextInfo.map(Object.entries))];
      importedTexts.dataset.texts = [JSON.stringify(myTextInfo.map(Object.entries))];
      //importedTexts.dataset.textValue = "";
      //console.log(importedTexts.dataset.texts);
      //console.log(JSON.parse(importedTexts.dataset.texts));
    }
    //if(importedTexts.dataset.texts && importedTexts.dataset.texts.length) {
    //  console.log(importedTexts.dataset.texts);
    //  //importedTexts.dataset.texts.push(newText);
    //}

    //const indataset = Object.entries(allTheImportedTexts).map(([k,v]) => [k,v]);
    //indataset.push(Object.entries(newText).map(([k,v]) => [k,v]));
    //const allTheImportedTexts = this.state;

    //console.log(this.state.allTheImportedTexts);
    
    //console.log(allTheImportedTexts);
    //const importText = '';
    //const databaseJson = [];
    ///////////////////////////////////////////////////
    //if you only imported JSON
    //else if you imported JSON and texts OR if you imported texts and did not import JSON(add JSON import at the end of else loop)
    ///////////////////////////////////////////////////
    //- import PDF, DOC, 
    // - 
    // - export JSON
    //////////////////////////////////////////////////
    //const wordList = [];
    //TO HAVE DROPPED FILES
    if(importedTexts.dataset.texts && JSON.parse(importedTexts.dataset.texts).length) {
      const myTextList = [];
      const thisIsMyWordList = [];
      const thisIsMyTextList = [];
      const allMyTexts = JSON.parse(importedTexts.dataset.texts); //allMyTexts is a JSON ARRAY THAT CONTAINS ALL THE TEXTS HAVING BEEN INSERTED, DROPPED OR ADDED TO BE HANDLED BY THE PROGRAM
      allMyTexts.forEach(function(mytext) { //mytext IS A JSON ARRAY THAT CONTAINS INFO ABOUT A TEXT
        const myTextId = Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY





        //if(importedTexts.dataset.words === (undefined||null)) {
        //  importedTexts.dataset.words = []; 
        //}
        //json word by word 
        if (mytext && mytext.length === 7){ //mytext IS AN OBJECT THAT CONTAINS INFO ABOUT THE TEXT OF THE FILE
          //console.log(mytext[6][1]);
          importedTexts.dataset.splitContent = mytext[6][1]; //importedTexts.dataset.splitContent IS A STRING THAT CONTAINS THE TEXTUAL CONTENT OF THE FILE
          //console.log(importedTexts.dataset.splitContent); //String in Array
          //console.log(mytext);
          mytext.pop();
        }

        //if (importedTexts.dataset.words === (undefined||null)) {
        //  importedTexts.dataset.words = [];
        //}
        //const wordList = this.state;
        const x = (list) => list.filter((v,i) => list.indexOf(v) === i);
        if(importedTexts.dataset.splitContent !== (null||undefined)) {
          importedTexts.dataset.words = x(importedTexts.dataset.splitContent.split(/[\s.?:;!,]+/)).map(function(y){ return y.replace(/[\W_]+/g," ") }).map(function(x){ return x.toLowerCase() }).filter(function( element ) {
            return (element !== (null||undefined));
            //importedTexts.dataset.words.push(element);
            //console.log(importedTexts.dataset.words);
          });
          //importedTexts.dataset.mywords = importedTexts.dataset.words.split(',');
          //console.log(importedTexts.dataset.mywords);
          //console.log(importedTexts.dataset.mywords.type);

          importedTexts.dataset.words.split(',').forEach(function(word) { //importedTexts.dataset.words IS AN ARRAY OF STRINGS THAT ARE THE WORDS OF THE TEXT THAT HAS BEEN SPLITTED INTO STRINGS OF WORDS
            //console.log(word); 
            //console.log(mytext); 
            if (word === "") { return; } 

            const output = {}; 
            mytext.forEach(function(data){ //mytext IS A JSON ARRAY THAT CONTAINS ALL THE INFORMATION ABOUT THE TEXT THAT WAS DROPPED OR CREATED
              output[data[0]]=data[1]
            });
            output["word"]=word; // output is AN OBJECT THAT CONTAINS THE PRINCIPAL INFO ABOUT THE WORD AND ITS TEXT
            output['myTextId']=myTextId;
            //console.log(output);
            const myWordInfo = []; //myWordInfo IS AN ARRAY OF OBJECTS
            myWordInfo.push(output);
            //console.log(myWordInfo);
            //console.log(importedTexts.dataset.wordList);

            if (myWordInfo !== (null||undefined) && importedTexts.dataset.wordList !== (null||undefined)) {
              importedTexts.dataset.wordList = JSON.stringify([...JSON.parse(importedTexts.dataset.wordList), myWordInfo.map(Object.entries)[0]]); //importedTexts.dataset.wordList IS A JSON STRING THAT CONTAINS THE WORD LIST OF THE FORM THAT WAS JUST SUBMITTED

              //console.log(JSON.parse(importedTexts.dataset.wordList));
              //console.log(importedTexts.dataset.wordList);
              //console.log(JSON.parse(importedTexts.dataset.wordList));
            } else if (myWordInfo !== (null||undefined) && importedTexts.dataset.wordList === (null||undefined)) {
              importedTexts.dataset.wordList = [JSON.stringify(myWordInfo.map(Object.entries))];

            //  console.log(JSON.parse(importedTexts.dataset.wordList));
            }
            

          });  
        }

      });
      console.log(JSON.parse(importedTexts.dataset.wordList));
      //Text import
      //const myBiggestWordList = [];
      const output = [];
      const result = JSON.parse(importedTexts.dataset.wordList);
      //const result = []; 
      //const wordList = this.state;
      //const mySuperWordList = JSON.parse(importedTexts.dataset.wordList).forEach(function(output) {
      //  const a = {}; 
      //  output.forEach(function(data){
      //    a[data[0]]=data[1]
      //  });
      //  myBiggestWordList.push(a);
      // 
      //});
      //console.log(myBiggestWordList);
      const myResult = [];
      console.log(result);
      result.forEach(function(b) { //result is a JSON OBJECT THAT CONTAINS WORD AND INFO
        //console.log()
        const a = {}; 
        b.forEach(function(data){
          a[data[0]]=data[1]
        });
        myResult.push(a);
        console.log(b);
        console.log(a);
      });
      //  console.log(b);
      //  console.log(b.lastModified);
      //  if (b.word === "") { return; } 

      //  const newText = {"lastModified": b.lastModified, "lastModifiedDate": b.lastModifiedDate, "name": b.name, "webkitRelativePath": b.webkitRelativePath, "size":b.size, "type":b.type};
      //  const myTextInfo = [];
      //  myTextInfo.push(newText);
      console.log(myResult); //OBJECT CONTAINS LIST OF WORDS AND THEIR INFO
      myResult.forEach(function(f) {
        //const myTextList = this.state;
        importedTexts.dataset.wordInfo = f;
        if (!this[f.word]) {
          this[f.word] = { "word": f.word, "textsId": [] };

          output.push(this[f.word]);
        }
        //textId
        const myTextId = this.state;
        this[f.word].textsId.push(f.myTextId);
        const myTextInfo = f;
        delete myTextInfo["word"];
        //delete myTextInfo[f.myTextId];
        //myTextInfo["myTextId"] = f.myTextId;
        const myTest = myTextList.some(v => v.myTextId === myTextInfo.myTextId);
        console.log(myTextList.myTextId);
        console.log(myTextInfo.myTextId);
        console.log(myTest);
        console.log(myTextList.length);
        if (myTest === false) {
       
          myTextList.push(myTextInfo); 
        }
      }, Object.create(null));
      //const myTextList = this.state;
      console.log(output);
      //importedTexts.dataset.addedWords = JSON.stringify(output.map(Object.entries));
      output.forEach(function(f) {
        if (!this[f.myTextId]) {
          this[f.myTextId] = JSON.stringify(output.map(Object.entries));

          thisIsMyWordList.push(this[f.myTextId]);
        }
      }, Object.create(null));
      //importedTexts.dataset.bigWordList = JSON.stringify(output.map(Object.entries));
      //console.log(JSON.parse(importedTexts.dataset.addedWords));
      //importedTexts.dataset.bigWordList = '';
      //--------------------------------------------------------
      //importedTexts.dataset.addedTexts = JSON.stringify(myTextList.map(Object.entries));
      myTextList.forEach(function(f) {
        if (!this[f.myTextId]) {
          this[f.myTextId] = JSON.stringify(myTextList.map(Object.entries));

          thisIsMyTextList.push(this[f.myTextId]);
        }
      }, Object.create(null));
      //importedTexts.dataset.bigTextList = JSON.stringify(myTextList.map(Object.entries));
      //console.log(JSON.parse(importedTexts.dataset.addedTexts));
      //--------------------------------------------------------

    
          //if (importedTexts.dataset.result !== (null||undefined) && importedTexts.dataset.result && importedTexts.dataset.result.length && importedTexts.dataset.result.length > 0) { 
            //importedTexts.dataset.result = [...importedTexts.dataset.result, this[b.word]];
          //} else if (importedTexts.dataset.result === (null||undefined)) {
          //  importedTexts.dataset.result = [];
          //importedTexts.dataset.result = [Object.entries(this[b.word])];
          //}


        //}
        //if(this[a.word].texts && this[a.word].length === 0) {
        //
        //  this[a.word].texts = [JSON.stringify(myTextInfo.map(Object.entries))];
        //} else if(this[a.word].texts && this[a.word].length > 0){

        //this[b.word].texts = JSON.stringify([...JSON.parse(this[b.word].texts), myTextInfo.map(Object.entries)[0]]);
        //console.log(this[b.word].texts);
        //console.log(this[b.word].texts);
        //console.log(myTextInfo.map(Object.entries)[0]);
        //if(!this[b.word].texts.includes(myTextInfo.map(Object.entries)[0])) {
        //  this[b.word].texts.push(myTextInfo.map(Object.entries)[0]);
        //}
        //for (var i=0; i<this[b.word].texts.length ; i++) {
        //} 
        //const myTest = this[b.word].texts.some(v => v === myTextInfo.map(Object.entries)[0]);  
        //console.log(myTest);
        //{
          //if(text === myTextInfo.map(Object.entries)[0]) {
          //  return;
          //} 
        //});

        //this[b.word].texts.push(myTextInfo.map(Object.entries)[0]);

          
        //console.log(this[b.word].texts);
        //} 
      //}, Object.create(null));


      //console.log(result);
      //importedTexts.dataset.result = JSON.stringify(result);

    };
    const result = this.state;
    result.length = 0;
    if (document.getElementById('noDatabaseFile').checked === false) {
      this.alertNoDatabaseFile();
    }


    //YOU HAVE NO DATABASE.JSON AND YOU ENTERED A TEXT
    //if(document.getElementById('noDatabaseFile').checked && this.state.value !== "") {
      //ACTIVATION OF ONE DOWNLOAD LINK
    //this.a.setAttribute("href","items.json");

    this.setState({
      textAtFileCreation:
        this.state.value
    });

    //UPDATES DAY'S DATE
    //const daysDate = new Date();
    //const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
    //}

      //importedTexts.dataset.result.push(this[a.word]);

      

        //importedTexts.dataset.result.push(this[a.word]);
        //console.log(this[a.word]);
      
      //remove duplicate array: no duplicate text
      //button to add several texts
      


    //console.log(importedTexts.dataset.result);
    //console.log(importedTexts.dataset.result.length);
    

  } 

  handleSubmittedText = event => {


    event.preventDefault();
    if(this.state.textAtFileCreation !== null) {
      if(document.getElementById('databaseAfterNewText')) {
        document.getElementById('databaseAfterNewText').remove();
      }
      this.a.removeAttribute('href');
      this.a.textContent = "";
    }
    if(this.state.value !== null) { 
      this.handleText();
    } else {
      this.setState({
        textareaIsEmpty:
          "The text input field is empty. You cannot proceed."
      });
    }
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
        

         
        //this.handleText(value);
        //this.handleText();    
        //text FILE
        //array of arrays containing columns: text imported, file type, file name, text content,
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
        const myDatabaseForUpload = document.createElement('a');
        
        myDatabaseForUpload.id = "items_by_date";
        myDatabaseForUpload.href = "";
        myDatabaseForUpload.dataset.databaseJson = JSON.stringify({"items":[...Object.entries(myItems).map(([k, v]) => [k,v])]});
        document.getElementById('preview').appendChild(myDatabaseForUpload);
        document.getElementById('noDatabaseFile').removeAttribute('checked');
        this.setState({
          databaseIsLoaded:
            true
        });
      })
    console.log(this.state.myBlob);
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
        console.log(resultObject.value)
      })
      console.timeEnd();

      mammoth.extractRawText({arrayBuffer: arrayBuffer}).then(function (resultObject) {
        result2.innerHTML = resultObject.value
        //console.log(resultObject.value)
        const importedTexts = document.getElementById('preview');
        const newText = {"lastModified": file.lastModified, "lastModifiedDate":file.lastModifiedDate, "name": file.name, "webkitRelativePath": file.webkitRelativePath, "size": file.size, "type": file.type, "mycontent":resultObject.value};
        console.log(newText);
        const myTextInfo = [];
        myTextInfo.push(newText);
        if (importedTexts.dataset.texts !== (null||undefined)) {
          importedTexts.dataset.texts=JSON.stringify([...JSON.parse(importedTexts.dataset.texts), myTextInfo.map(Object.entries)[0]]);
        } else if (importedTexts.dataset.texts === (null||undefined)) {
          importedTexts.dataset.texts = [JSON.stringify(myTextInfo.map(Object.entries))];
        }
      })
    };
    reader.readAsArrayBuffer(file);

  }

  sendOdsFile = (file) => {

  }
  sendPdfFile = (file) => { //https://github.com/brianc/node-pdf-text
    'use strict';
    const input = document.getElementById('input');

    function fixBinary (bin) {
      const length = bin.length;
      const buf = new ArrayBuffer(length);
      const arr = new Uint8Array(buf);
      for (var i = 0; i < length; i++) {
        arr[i] = bin.charCodeAt(i);
      }
      return buf;
    }
    const display = document.getElementById('display');
    display.innerHTML = (display.innerHTML || '');
    function log(text) {
      display.innerHTML += "\n" + text;
    }  

    const reader = new FileReader();
    reader.onloadend = (event) => {
      //console.log(reader.result);
      //const buf = new Uint8Array(reader.result);
      //function ab2str(buffer) {
      //  return String.fromCharCode.apply(null, new Uint8Array(buffer));
      //}
      
      //const base64 = JSON.stringify(ab2str(reader.result));
      //const base64 = JSON.stringify(reader.result.split('base64,')[1]);
      const pdfAsDataUri = reader.result;
      console.log(pdfAsDataUri);
    }
    reader.readAsDataURL(file);
    //const base64 = this.state;
    //console.log(base64);
    //console.log(atob(base64));
    const BASE64_MARKER = ';base64,';
    
    function convertDataURIToBinary(dataURI) {
      const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
      const base64 = dataURI.substring(base64Index);
      const raw = window.atob(base64);
      const rawLength = raw.length;
      const array = new Uint8Array(new ArrayBuffer(rawLength));
    
      for(var i = 0; i < rawLength; i++) {
        array[i] = raw.charCodeAt(i);
      }
      return array;
    }
    const pdfAsDataUri = this.state; // shortened
    const pdfAsArray = convertDataURIToBinary(pdfAsDataUri); 
    //const binary = fixBinary(atob(base64)); 

    const processor = document.getElementById("processor");
    const outputpdf = document.getElementById("outputpdf");
    const blob = new Blob([pdfAsDataUri], {type: 'application/pdf'});
    const url = URL.createObjectURL(blob);
    log('Created a png blob of size: ' + blob.size);
    log('Inserting an img...');
    log('Blob URL is: ' + url);
    log('Fetching with ajax...');
    if ('srcObject' in input) {
      input.srcObject = url;
    } else {
      input.src = url;
      //URL.createObjectURL(file);
      //input.addEventListener('load', () => URL.revokeObjectURL(URL.createObjectURL(file)), {once: true});
    }
    window.addEventListener("message", function(event){
      //window.onload = (event) => {
        if (event.source !== processor.contentWindow) return;
    
        switch (event.data){
          // "ready" = the processor is ready, so fetch the PDF file
          case "ready":
            const xhr = new XMLHttpRequest;

            xhr.open('GET', url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = (event) => {
              processor.contentWindow.postMessage(this.response, "*");
              //console.log(processor.contentWindow.postMessage(this.response, "*"));
              //console.log(JSON.stringify(this.response));
            };
            xhr.send();

          break;
    
          // anything else = the processor has returned the text of the PDF
          default:
            outputpdf.textContent = event.data.replace(/\s+/g, " ");

            console.log(event.data);
            //String.prototype.cleanup = function() {
            //   return this.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-").split('-');
            //}
            //console.log(event.data.cleanup());
          break;
        }
      //};
    }, true);



      //console.log(JSON.stringify(btoa(atob(buf.split('base64,')[1]))));
      //console.log(JSON.stringify(btoa(buf.split('base64,')[1])));
      //buf.onload = () => {

      //pdfjsLib.getDocument(arr).then(function(pdf) {
      //  console.log(pdf);
      //});
      //pdf().then(function(data) {
      //  console.log(data.text);
      //})
      //const pdfExtract = new PDFExtract();
      //const options = {};
      //pdfExtract.extract(arr, options, (err,data) => {
      //  if (err) return console.log(err);
      //  console.log(data);
      //});
      //}
      //console.log(buf.toString('utf-8'));

    //function str2ab(str) {
      //var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    //  var bufView = new Uint16Array(buf);
    //  for (var i=0, strLen=str.length; i < strLen; i++) {
    //    bufView[i] = str.charCodeAt(i);
    //  }
    //  return buf;
    //}

      //console.log(ab2str(buf));
      //const enc = new TextDecoder();
      //const enc = new FileReader();
      //console.log(new Buffer(ab2str(buf), 'binary'));
      //console.log(ab2str(buf));
      //console.log(file.path);
      //this.pdfToText = function(buf) {

      //    pdfjsLib.workerSrc = 'js/vendor/pdf.worker.js';
      //    pdfjsLib.cMapUrl = 'js/vendor/pdfjs/cmaps/';
      //    pdfjsLib.cMapPacked = true;

      //    return PDFJS.getDocument(buf).then(function(pdf) {
      //        var pages = [];
      //        for (var i = 0; i < pdf.numPages; i++) {
      //            pages.push(i);
      //        }
      //        return Promise.all(pages.map(function(pageNumber) {
      //            return pdf.getPage(pageNumber + 1).then(function(page) {
      //                return page.getTextContent().then(function(textContent) {
      //                    return textContent.items.map(function(item) {
      //                        return item.str;
      //                    }).join(' ');
      //                });
      //            });
      //        })).then(function(pages) {
      //            return pages.join("\r\n");
      //            console.log(pages);
      //        });
      //    });
      //}

      //console.log(enc.readAsBinaryString(new Blob([new Uint8Array(buf)])));
      // reader.result contient le contenu du
      // blob sous la forme d'un tableau typé
      //pdfText(reader.result, function(err, chunks) {
      //  console.log(chunks.join(' ')); 
      //});
    //});
    //reader.readAsArrayBuffer(file);

    //reader.readAsArrayBuffer(file);
    //reader.readAsBinaryString(file);
    //URL.createObjectURL 
    //const reader = new FileReader();
    //new PdfReader().parseFileItems(
    //console.log(file);
    //const pdffile1 = new FileReader();
    //console.log(pdffile1.readAsBinaryString(file).result);
    //const pdffile2 = new FileReader();
    //console.log(pdffile2.readAsArrayBuffer(file).result);
    //const pdffile3 = new FileReader();
    //console.log(pdffile3.readAsText(file).result);
    //, function(err, item){
    //  if(item && item.text)
    //    console.log(item.text);
    //});
    //const reader = new FileReader();
    //const result1 = document.getElementById('result1');
    //const result2 = document.getElementById('result2');
    //const result3 = document.getElementById('result3');
    //const pdfBuffer = URL.createObjectURL(file); 
    //pdfBuffer.readAsArrayBuffer(file);
    //fs.readFile(pdfBuffer.name, (err, pdfBuffer) => {
      // pdfBuffer contains the file content
      //new PdfReader().parseBuffer(pdfBuffer, function(err, item) {
        //if (err) callback(err);
        //else if (!item) callback();
        //if (item.text) console.log(item.text);
      //});
    //});
    //const rows = {};
    //function printRows() {
    //  Object.keys(rows) // => array of y-positions (type: float)
    //    .sort((y1, y2) => parseFloat(y1) - parseFloat(y2)) // sort float positions
    //    .forEach(y => console.log((rows[y] || []).join("")));
    //}
    //
    //new pdfreader.PdfReader().parseFileItems(file, function(
    //  err,
    //  item
    //) {
    //  if (!item || item.page) {
    //    // end of file, or page
    //    printRows();
    //    console.log("PAGE:", item.page);
    //    rows = {}; // clear rows for next page
    //  } else if (item.text) {
    //    // accumulate text items into rows object, per line
    //    (rows[item.y] = rows[item.y] || []).push(item.text);
    //  }
    //});

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
    this.setState({
      textareaIsEmpty:
        ''
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
          //allAudioElements[0].remove(); 
          if (allAudioElements && allAudioElements.length && allAudioElements.length >= 2) {
            const myAudioItems = document.getElementById('myAudioFiles');
            const indexAudioElement = Array.prototype.indexOf.call(myAudioItems.children, event.currentTarget) + 1;
            myAudioItems.childNodes[this.state.indexAudioElement].play();
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
  alertNoDatabaseFile = (event) => {
    if (/*this.state.value.replace(/[!?:;.,]+/g, "").replace(/(\r\n|\n|\r)/gm,"") !== "" &&*/ document.getElementById('noDatabaseFile').checked === false && document.getElementById('preview').innerHTML === "" && window.confirm("You dropped no file. Ok to continue and generate a new database or Cancel and upload a file.")) {
      document.getElementById('noDatabaseFile').checked = true;
      this.setState({
        jsonSecondConfirm:
          true
      });
      console.log("alert");
      document.getElementById('dropzone').hidden = true;
      //this.handleText();
    } else {
      document.getElementById('noDatabaseFile').removeAttribute('checked');   
    }
  }
  autoplay = (event) => {
    //const allAudioElements = this.state;
    const myElements = document.getElementsByTagName('audio');

    if (myElements && myElements.length) {
      myElements[0].play();
    }

  }
  addNewText = (event) => {
    this.setState({
      value:
        event.target.value
    });
    const importedTexts = document.getElementById('preview');
    if(importedTexts.dataset.textValue ===(null||undefined||false)) {
      importedTexts.dataset.textValue = "";
    }
    importedTexts.dataset.textValue += this.state.value;
    console.log(document.getElementById('wordinput').value);
    console.log(importedTexts.dataset.textValue); 
    console.log(this.state.value); 
    console.log(event.currentTarget.value); 
  }
  render() {

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
        <p id={`result1`}></p>
        <p id={`result2`}></p>
        <p id={`result3`}></p>
        <embed id={`input`} type={`application/pdf`} />
        <iframe id={`processor`} src="http://hubgit.github.com/2011/11/pdftotext/"></iframe>
        
        <div id={`outputpdf`}></div>
        <pre id={`display`}></pre>

        <label id={`labelText`}>
          Your Text:

          <br /><textarea onChange={this.handleTextChange} placeholder="Enter a text" value={this.state.value} /> 
          {this.state.textareaIsEmpty}
        </label>
        <button onClick={this.addNewText} className={`btn btn-success btn-block`}>  
          Add a new text
        </button>

        <input type={`submit`} value={`Submit entered text`} className={`btn btn-success btn-block`} />  
        <a id={`download_items`} ref={a => {this.a = a}} onClick={this.downloadItems} download={`items.json`} href={``} ></a>
        <div id={`download_all_items`}></div> 
        <div id={`download_zone`}></div> 

 
      </form>
    );
  }
}

ReactDOM.render(<BasicForm />, document.getElementById('root'));
