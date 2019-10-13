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
      username:'',
      username_modal:'',
      input:null,
      itemlist:null,
      textlist:null,
      myitems:null,
      myitems1:null,
      mynewitems:null,
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
    this.setState({
      username:
        '' 
    });
    document.getElementById('loginbtn').innerHTML = 'log in';
    document.getElementById('export_all_items').hidden = true;
    document.getElementById('modallogin-hidden-btn').hidden = true;

    document.getElementById('loginModal').onshow = (event) => {
      document.getElementById('loginModal').focus();
      window.addEventListener("keydown", function(event) {
        document.getElementById('username_modal').focus();
      });
    };
    this.logout();
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
    const itemlist = [];
    document.getElementById('import_texts_words').click();
    const importedTexts = document.getElementById("preview");
    const importText = JSON.parse(importedTexts.dataset.texts); 
    const thisIsMyTextList = [];
    const myitems = [];
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

      mytext.forEach(function(f) {
        if (f[0] === "mycontent" && f[1] instanceof Array && f[1].length > 0) {
          myitems.push(f[1]);
          myitems.flat();
        }
      });
      
    });
    if (thisIsMyTextList instanceof Array && thisIsMyTextList.length === 0) {return;}
    console.log(thisIsMyTextList);

    if(myitems instanceof Array && myitems.length === 0) {return;};
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

        //const importText = JSON.parse(importedTexts.dataset.texts);
        //importText.forEach(function(item, index, object) {
        //  const textObject = {};
        //  item.forEach(function(textitem) {
        //    textObject[textitem[0]]=textitem[1];
        //  });
        console.log(myitems);
        const myitems1 = myitems.filter((v,i,a) => a.indexOf(v) === i)[0];
        console.log(myitems1);
        myitems1.forEach(function(myworditem, index, wordlist) {
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
  handleUsernameChange = (event) => {
    this.setState({
      username:
        event.target.username
    });
    this.setState({
      username_modal:
        event.target.username_modal
    });
  }
  checkStringLength = (string) => {
    if(!(typeof string === 'string' && string.length > 0)) {return;};
  }
  rmItemFromList = (list, item) => {
    const idx = list.indexOf(item);
    if (idx !== -1) {
      list.splice(idx, 1);
    }
  }
  enablePreviousSessions = () => {
      document.getElementById('labelTextsPreviousSessions').classList.remove("text-muted");
      document.getElementById('textsPreviousSessions').removeAttribute('disabled');
  }
  preventPreviousSessions = () => {
      document.getElementById('labelTextsPreviousSessions').classList.add("text-muted");
      document.getElementById('textsPreviousSessions').disabled = true;
  }
  showDropzone = () => {
    document.getElementById('dropzone').hidden = false;
  }
  hideDropzone = () => {
    document.getElementById('dropzone').hidden = false;
  }
  loginUser = (event) => {
    const importedTexts = document.getElementById("preview");
    const username = document.getElementById('username').value;
    const username_modal = document.getElementById('username_modal').value;

    if(event.target.id === "loginbtnmodal"||document.getElementById('loginbtn').innerHTML === 'log in') {
      document.getElementById('loadbydate').removeAttribute('disabled');
      
      if (event.target.id === "loginbtnmodal") {
        document.body.focus();
        document.getElementById('loginModal').hidden = true;
        document.getElementById('login-form-body').focus();
      }

      this.showDropzone();
      this.checkStringLength(username);
      document.getElementById('loginbtn').innerHTML = 'log out';
      document.getElementById('username').hidden = true;
      document.getElementById('welcome').innerHTML = "Hello, "+username;
      importedTexts.dataset.username = username; 
      if (event.target.id === "loginbtnmodal") {
        this.checkStringLength(username_modal);

        document.getElementById('welcome').innerHTML = "Hello, "+username_modal;
        importedTexts.dataset.username = username_modal; 
      }

      

    } else if(document.getElementById('loginbtn').innerHTML === 'log out') {
      importedTexts.dataset.username = ''; 
      document.getElementById('loginbtn').innerHTML = 'log in';
      document.getElementById('username').hidden = false;
      document.getElementById('export_all_items').hidden = true;
      document.getElementById('export_all_items').disabled = true;
      document.getElementById('welcome').innerHTML = "";
      document.getElementById('username').value = "";
      this.logout();
      this.hideDropzone(); 

    }
    
  }

  logout = (event) => {
    const importedTexts = document.getElementById('preview');
    document.getElementById('items_by_date').focus();
    document.getElementById('loadbydate').disabled = true;
    document.getElementById('editor').focus();


  }
  render() { 
    
    return(
      <form onSubmit={this.handleSubmit}>
       <div id="login-form-body" className={`login-form`}> 
         <div id="welcome"></div>
         <input onChange={this.handleUsernameChange} placeholder="Username" id="username" value={this.state.username} /> 
         <br/><button id="loginbtn" onClick={this.loginUser} className={`btn btn-success`}>  
            
         </button>

         <button type="button" data-backdrop="false" data-toggle="modal" id="modallogin-hidden-btn" class="btn btn-primary" data-target="#loginModal">
           Launch demo modal
         </button>
         <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
           <div class="modal-dialog" role="document">
             <div class="modal-content">
               <div class="modal-header">
                 <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                 <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                   <span aria-hidden="true">&times;</span>
                 </button>
               </div>
               <div class="modal-body">
                 <div className={`login-form-modal`}> 
                   <input onChange={this.handleUsernameChange} placeholder="Username" id="username_modal" value={this.state.username_modal} /> 
                   <br/><button id="loginbtnmodal" onClick={this.loginUser} className={`btn btn-success`}>  
                     Log in 
                   </button>
                 </div>
               </div>
               <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
               </div>
             </div>
           </div>
         </div>
       </div>
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
       <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#RegistrationForm">
         Launch demo modal
       </button>
       
       <div class="modal fade" id="RegistrationForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

         <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body">
               <RegistrationForm />
             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
               <button type="button" class="btn btn-primary">Save changes</button>
             </div>
           </div>
         </div>
       </div>
       <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#FillInTheDateForm">
         Fill in the date 
       </button>
       
       <div class="modal fade" id="FillInTheDateForm" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

         <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div class="modal-body">
               <div id={`myFillInTheDateForm`}>
                 <FillInTheDateForm />
               </div>

             </div>
             <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
               <button type="button" class="btn btn-primary">Save changes</button>
             </div>
           </div>
         </div>
       </div>
       <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#EditEntries">
         Edit Entries 
       </button>
       
       <div class="modal fade" id="EditEntries" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog" role="document">
           <div class="modal-content">
             <div class="modal-header">
               <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
               <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                 <span aria-hidden="true">&times;</span>
               </button>
             </div>
             <div id="body-edit-entries" class="modal-body">
               <EditEntries/>
             </div>
             <div id="footer-edit-entries" class="modal-footer">
               <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
               <button type="button" class="btn btn-primary" id="edit-entries-save-changes">Save changes</button>
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
      thirdres:null,
      databaseIsLoaded:null,
      noFileType:null,
      importMode:null,    
      saveFile:null,
      downloadAll:null,
      myNode:null,
      myInputNode:null,
      myOutputNode:null,
      myPreviewNode:null,
      myDatabaseJson:null,
      someData:null,
      dataOutput:null,
      importedTexts:null,
      importText:null,
      thisIsMyTextList:null,
      textObject:null,
      modalbody:null,
      exportText:null,
      textdiv:null,
      idx:null,
      displayText:null,
      removeText:null,
      displayWord:null,
      removeWord:null, 
      textelements:null,
    }
  }
  componentDidMount() {
    const date = new Date();
    this.setState({date});
    document.getElementById('loadbydate').disabled = true;
  }
  onChange = (date) => {
    this.setState({ date });
  }
  handleSubmittedDate = (event) => {

    const modalbody = document.getElementById('modal-bodyloadbydate');
    modalbody.innerHTML = 'no items found'; 
    this.loadByDate();
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
        <button type="submit" /*onClick={this.loadByDate}*/ id="loadbydate" class="btn btn-primary" data-toggle="modal" data-target="#exampleLoadbydate">
          Load by date 
        </button>
        
        <div class="modal fade" id="exampleLoadbydate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Load by date</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div id="modal-body-loadbydate" class="modal-body">
                 
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
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
      textContent:null,
      textId:null,
      mytextvar:null,
      mainFunction:null,
      asynchronousFunction:null,
      result:null,
      callback:null,
      addedTexts:null,
      newlist:null,
      textLength:null,
      wordsToDisplay:null,
      textInfo:null,
      displayWord:null,
      displayText:null,
      removeText:null,
      removeWord:null,
      modalbody:null,
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
      jsonobj:null,
      daysDate:null,
      today:null,
      msTime:null,
      textype:null,
      username:'',
      wordsToDisplay:null,
      checkPrev:null,
      checkCurrent:null,
      wordsDiv:null,
      textDiv:null,
      idx3:null,
      info:null,
      displayDiv:null,
      mydisplayoptions:null,
      blobData:null, 
      url:null,
      textitemlist:null,
      
    };

  }

  componentDidMount() {
    window.addEventListener('dragover',this.windowdragover);
    window.addEventListener('drop',this.windowdrop);
    this.a.removeAttribute("href");
    document.getElementById('dropzone').hidden = true;
    const importedTexts = document.getElementById('preview');
    importedTexts.dataset.textValue = '';
    const wordList = [];
    const allMyWords = [];
    const thisIsMyWordList = [];
    const thisIsMyTextList = [];
    const allMyTexts = []; 
    document.getElementById('export_all_items_link').hidden = true;
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

  json = (list) => {
    list = JSON.parse(JSON.stringify(list));
  }
  handleDateChange = date => {
    this.setState({date});
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

  createNewTextId = (string) => {
    string += Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY
  }
  returnDaysDate = (string) => {
    const daysDate = new Date();
    string = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
    const msTime = Date.now();
  }

  inputNewText  = (text) => {
    const input = document.getElementById('add-new-text-current-session');
    input.dataset.newtext =text;
    input.value +='h';
    input.click();
  }

  checkNullUndefinedList = (list) => {
    if (list === (null||undefined)) { list = [];}
  }
  appendNewText = (text, list) => {
    list.push(text); 
  }

  displaySettingsModal = (event) => {
    document.getElementById('editor-display').click();
      
  }

  sendFile = (file) => {
    const textId = '';
    createNewTextId(textId);
    const today = '';
    daysDate(today);

    function createNewTextId(string) {
      string += Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY
      return string;
    }

    function daysDate(string) {
      const daysDate = new Date();
      string += (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      const msTime = Date.now();
      return string;
    }
      
    function createFileList(list) {
      list = [["textId",textId], ["dates", [today]], ["lastModified", file.lastModified], ["name", file.name], ["webkitRelativePath", file.webkitRelativePath], ["size", file.size], ["type", file.type]];
      return list;
    }

    function addContent(fileinfo, textstring) {
      fileinfo.push(["mycontent", textstring]);
    }
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
        const thisIsMyTextList = thirdres.map(obj => obj);
        this.setState({myItems});

        this.checkConnectedUser();
        this.textsFromOtherUsers(thisIsMyTextList);


      })
  }

  sendTextFile = (file) => {
    const textId = createNewTextId();
    const today = daysDate();

    function createNewTextId(string) {
      string = Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY
      return string;
    }

    function daysDate(string) {
      const daysDate = new Date();
      string = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      const msTime = Date.now();
      return string;
    }
      
    function createFileList(list) {
      list = [["textId",textId], ["dates", [today]], ["lastModified", file.lastModified], ["name", file.name], ["webkitRelativePath", file.webkitRelativePath], ["size", file.size], ["type", file.type]];
      return list;
    }

    function addContent(fileinfo, textstring) {
      fileinfo.push(["mycontent", textstring]);
    }
 
    function createTextList(text) {
    }
    const fd = new FormData();
    fd.append('myFile', file);

    const asynchronousFunction = callback => {
      return fetch(URL.createObjectURL(file))
      .then(function(response) {
        return response.text();
      })
      .then(function(textContent) {
        const textInfo = createFileList(); // USE FUNCTION
        console.log(textInfo);
        addContent(textInfo, textContent);  // USE FUNCTION
        console.log(textInfo);
        return textInfo;
      })
      .then(function(response) {
        callback(response)
      })
    }
    const callbackFunction = result => {
      console.log(result);
      const importedTexts = document.getElementById('preview');
      importedTexts.dataset.texts = JSON.stringify(result);
      
      document.getElementById('text-add').click();
    }

    const mainFunction = callback => {
      asynchronousFunction(callback)
    }
    
    //call the code

    mainFunction(callbackFunction);


    console.log(mainFunction);
  }

  sendDocxFile = (file) => {
    const textId = '';
    createNewTextId(textId);
    const today = '';
    daysDate(today);

    function createNewTextId(string) {
      string += Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY
      return string;
    }

    function daysDate(string) {
      const daysDate = new Date();
      string += (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      const msTime = Date.now();
      return string;
    }
      
    function createFileList(list) {
      list = [["textId",textId], ["dates", [today]], ["lastModified", file.lastModified], ["name", file.name], ["webkitRelativePath", file.webkitRelativePath], ["size", file.size], ["type", file.type]];
      return list;
    }

    function addContent(fileinfo, textstring) {
      fileinfo.push(["mycontent", textstring]);
    }
 
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
        const newText = createFileList();

        const importedTexts = document.getElementById('preview');
        addContent(newText, resultObject.value);
        importedTexts.dataset.texts = JSON.stringify(newText);
        document.getElementById('text-add').click();
      })
    };
    reader.readAsArrayBuffer(file);

  }

  sendPdfFile = (file) => { 
    const textId = createNewTextId();
    const today = daysDate();

    function createNewTextId(string) {
      string = Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY
      return string;
    }

    function daysDate(string) {
      const daysDate = new Date();
      string = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      const msTime = Date.now();
      return string;
    }
      
    function createFileList(list) {
      list = [["textId",textId], ["dates", [today]], ["lastModified", file.lastModified], ["name", file.name], ["webkitRelativePath", file.webkitRelativePath], ["size", file.size], ["type", file.type]];
      console.log(list);
      return list;
    }

    function addContent(fileinfo, textstring) {
      fileinfo.push(["mycontent", textstring]);
    }
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
          const newText = createFileList();


          addContent(newText, pagesText.join(' '));
          
          importedTexts.dataset.texts = JSON.stringify(newText);
          console.log(JSON.parse(importedTexts.dataset.texts));
          document.getElementById('text-add').click();
          

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
  textAdd = (event) => {
    const addedTexts = document.getElementById('preview');
    function handleText(mytext) {
      mytext.forEach(element => {  
        if (element[0] === "mycontent") {
          if(typeof element[1] === 'string' && element[1].length > 0) {
            element[1] = element[1].split(/[\s.?:;!,]+/).map(function(y){ return y.replace(/[\W_]+/g," ") }).map(function(x){ return x.toLowerCase() }).filter(function( element ) {
              return (element !== (null||undefined||""));
            });
          }
        }
      });
    } 
     

    function fileIsDropped(list) {
      list.push(['input','dropzone']);
    }
    function isDroppedFile(list){
      list.forEach(item => {
        if (item[0] === 'type' && item[1].length > 0) {
          fileIsDropped(list);
        }
      });
    }

    function pushItem(item) {
      if(addedTexts.dataset.alltexts === undefined) {
        addedTexts.dataset.alltexts = JSON.stringify([]);
      }
      addedTexts.dataset.alltexts = JSON.stringify([...JSON.parse(addedTexts.dataset.alltexts), item]);
    }

    const newlist = JSON.parse(addedTexts.dataset.texts);
    isDroppedFile(newlist);
    function addTextSize(size, text) {
      //const VAR_NAME = 
      text.forEach(item => {
        if(item[0] === "size" && item[1].length === 0) {
          item.splice(1,1);
          item.push(size);
        }
      });
    }
    function getTextSize(callback) {
      newlist.forEach(item => {
        if(item[0] === "mycontent" && item[1].length > 0) {
          callback(item[1].length, newlist);
        }
      });
    }
    getTextSize(addTextSize);
    handleText(newlist); 
    pushItem(newlist);
    this.displayNewEntries(JSON.parse(addedTexts.dataset.alltexts));
    
  }
  displayNewEntries = (textsToDisplay) => { 
    const idx = this.state;
    const modalbody = document.getElementById('editor');

    while (modalbody.firstChild) {
      modalbody.removeChild(modalbody.firstChild);
    }
    //this.dispWord('mot');
    //this.displayRemoveWordBtn('mot', 0, 7, textsToDisplay);
    const wordsToDisplay = [];
    if (!(textsToDisplay instanceof Array)) {
      textsToDisplay = [];
    }
    textsToDisplay.forEach(function(textItem) {
      textItem.forEach(function(infoItem) {

        if (infoItem[0] === 'textId') { //1794
          wordsToDisplay.push(infoItem[1]); 
        } 

        if (infoItem[0] === 'mycontent') {
          const idx = textItem.indexOf(infoItem);
          const idx1 = textsToDisplay.indexOf(textItem);
          textItem[idx][1].forEach(function(word) {
            wordsToDisplay.push([word, idx,idx1]); //textsToDisplay[word[2]][word[1]][1]
          }) // 
        }
      });
    });
    this.displayWordsBtnsToRmWords(wordsToDisplay, textsToDisplay);
  }

  displayWordsBtnsToRmWords = (words, texts) => {


    const importedTexts = document.getElementById('preview');
    function ifUserConnected() {

      if (!(typeof importedTexts.dataset.username === 'string' && importedTexts.dataset.username.length > 0)) {return false;} else {
        return true;
      }
    }
    const modalbody = document.getElementById('editor');
    if(words instanceof Array && words.length === 0) {return};
    
    words.forEach(function(item, rangeitem, allwords){
      if(typeof item === 'string') { return; }

      const displayDiv = document.createElement('div');

      displayDiv.classList.add('display-div');
      const displayWord = document.createElement('div');
      displayWord.textContent = item[0];
      displayWord.classList.add('label-word');
      displayDiv.appendChild(displayWord);
      const removeWord = document.createElement('div');

      displayDiv.appendChild(removeWord);
      const importedTexts = document.getElementById('preview');
      if (ifUserConnected() && typeof words[rangeitem-1] === 'string' && item instanceof Array) {
        const textDiv = document.createElement('div');
        textDiv.classList.add('display-text');
        textDiv.id = words[rangeitem-1];
        importedTexts.dataset.textId = words[rangeitem-1];
        console.log(importedTexts.dataset.textId);
        modalbody.appendChild(textDiv);
        textDiv.appendChild(displayDiv);
        //modalbody.removeChild(modalbody.firstChild);
      } else if (ifUserConnected() && words[rangeitem-1] instanceof Array && item instanceof Array) {
        document.getElementById(importedTexts.dataset.textId).appendChild(displayDiv);
      } else {
        modalbody.appendChild(displayDiv); //1855
      }


 
      removeWord.classList.add("btn");
      removeWord.classList.add("btn-secondary");
      removeWord.classList.add("btn-word");
      removeWord.type = "button";
      removeWord.textContent = "Remove this word";
      removeWord.onclick = (event) => {
        const importedTexts = document.getElementById('preview');

        if(removeWord.parentElement) {
          //console.log(texts);

          const idx = Array.prototype.indexOf.call(removeWord.parentNode.parentNode.childNodes, removeWord.parentNode);
          if (idx !== -1) {
            function removeText(idx1, texts, text) {
              texts.splice(idx1, 1);
              console.log(texts);
              importedTexts.dataset.alltexts = JSON.stringify([...texts]);
              alert('rm text');
            }

            function removeItem(idx1, texts, text) {
              alert('rm item'+(idx+1));
              text.forEach(item => {
                if(item[0] === "mycontent"){
                  texts[idx1][text.indexOf(item)][1].splice(idx, 1);
                  console.log(texts[idx1][text.indexOf(item)][1]);
                  importedTexts.dataset.alltexts = JSON.stringify([...texts]);
                }
              });
            } 

            function findRange(callback) {
              const textvar = [...JSON.parse(importedTexts.dataset.alltexts)];
              //console.log(textvar);
              textvar.forEach(textitem => {
                textitem.forEach(item => {
                  if(item[0] === "textId"){
                    if (item[1] === importedTexts.dataset.textId) {
                      const idx2 = textvar.indexOf(textitem);
                      if (idx2 !== -1) {
                        callback(idx2, textvar, textitem);
                      }
                    }
                  }
                });
              });
            }





            if (removeWord.parentNode.parentNode.childNodes.length === 1 && removeWord.parentNode.parentNode.classList.contains("display-text")) {
              importedTexts.dataset.textId = removeWord.parentNode.parentNode.id; 
              removeWord.parentNode.parentNode.remove();

              findRange(removeText);

            } else {
              importedTexts.dataset.textId = removeWord.parentNode.parentNode.id; 
              removeWord.parentNode.parentNode.childNodes[idx].remove();


              findRange(removeItem);

            }
          }
        }
        function testAddUser(importText){
          const importedTexts = document.getElementById('preview'); 
          if (typeof importedTexts.dataset.username === "string" && importedTexts.dataset.username.length > 0) {
            importText.forEach(function(myTextItem, index, jsonfile) {
              if (!myTextItem.some(x => x[0] === "users")) {
                myTextItem.push(["users",[importedTexts.dataset.username]]);
                return jsonfile;
              } else if(myTextItem.some(x => x[0] === "users")) { 
                myTextItem.forEach(function(info) {
                  if(info[0] === "users") {
                    if (!info[1].includes(importedTexts.dataset.username)) {
                      info[1].push(importedTexts.dataset.username);
                      return jsonfile;
                    }
                  } 
                });
              }
            });
          }
        }
        function testAddSession(importText){
          const importedTexts = document.getElementById('preview'); 
          importText.forEach(function(myTextItem, index, jsonfile) {
            if (!myTextItem.some(x => x[0] === "session_of_texts")) {
              myTextItem.push(["session_of_texts","previous"]);
              return jsonfile;
            } else if(myTextItem.some(x => x[0] === "session_of_texts")) { 
              myTextItem.forEach(function(info) {
                if(info[0] === "session_of_texts") {
                  if (!info[1] === "previous") {
                    info[1] = "previous";
                    return jsonfile;
                  }
                } 
              });
            }
          });
        }
        function testAddDate(importText) {
          const daysDate = new Date();
          const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
          const msTime = Date.now();
          const importedTexts = document.getElementById('preview'); 
          importText.forEach(function(myTextItem, index, jsonfile) {
            if (!myTextItem.some(x => x[0] === "dates")) {
              myTextItem.push(["dates",[today]]);
              return jsonfile;
            } else if(myTextItem.some(x => x[0] === "dates")) { 
              myTextItem.forEach(function(info) {
                if(info[0] === "dates") {
                  if (!info[1].includes(today)) {
                    info[1].push(today);
                    return jsonfile;
                  }
                } 
              });
            }
          });
        }
        document.getElementById('edit-entries-save-changes').onclick = (event) => {
          document.getElementById('footer-edit-entries').focus();
          const importedTexts = document.getElementById('preview');
          testAddUser(JSON.parse(importedTexts.dataset.alltexts));
          testAddSession(JSON.parse(importedTexts.dataset.alltexts));
          testAddDate(JSON.parse(importedTexts.dataset.alltexts));
          console.log(JSON.parse(importedTexts.dataset.alltexts));
          //const textitemlist = JSON.parse(importedTexts.dataset.alltexts);
          const blobData = new Blob([JSON.stringify({"items": JSON.parse(importedTexts.dataset.alltexts)},null,2)], {type: 'application/json'});
          const url = window.URL.createObjectURL(blobData);
          document.getElementById('export_all_items_link').href = url;
          document.getElementById('export_all_items_link').click();
          
        }


      }
    });
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
  handleWordItem = (event) => {
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

  }
  autoplay = (event) => {
    //const allAudioElements = this.state;
    const myElements = document.getElementsByTagName('audio');

    if (myElements && myElements.length) {
      myElements[0].play();
    }

  }
  useWordItemInputField = (event) => {
    const textId = createNewTextId();
    const today = daysDate();

    function createNewTextId(string) {
      string += Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY
      return string;
    }

    function wordItemInputField(list) {
      list.push(['input','word item']);
    }

    function daysDate(string) {
      const daysDate = new Date();
      string += (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      const msTime = Date.now();
      return string;
    }
      
    function createList(list) {
      list = [["textId",textId], ["dates", [today]], ["lastModified", ''], ["name", ''], ["webkitRelativePath", ''], ["size", ''], ["type", '']];
      return list;
    }

    function addContent(fileinfo, textstring) {
      fileinfo.push(["mycontent", textstring]);
    }
    const valueword = document.getElementById('valueword').value;
    if (valueword === "") {return;};
    
    const importedTexts = document.getElementById('preview');
    const newText = createList();
    wordItemInputField(newText);
    addContent(newText, valueword);
    importedTexts.dataset.texts = JSON.stringify(newText);
    document.getElementById('text-add').click();

  }

  useTextInputField = (event) => {
    const textId = createNewTextId();
    const today = daysDate();

    function createNewTextId(string) {
      string = Math.random().toString(16).substring(7); //myTextIf IS A STRING THAT WAS GENERATED RANDOMLY BY THE PROGRAM AS A TEXT ID TO RECOGNIZE WHICH WORD BELONGS TO WHICH TEXT AND CONVERSELY
      return string;
    }
    function textInputField(list) {
      list.push(['input','text input field']);
    }

    function daysDate(string) {
      const daysDate = new Date();
      string = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      const msTime = Date.now();
      return string;
    }
      
    function createList(list) {
      list = [["textId",textId], ["dates", [today]], ["lastModified", ''], ["name", ''], ["webkitRelativePath", ''], ["size", ''], ["type", '']];
      return list;
    }

    function addContent(fileinfo, textstring) {
      fileinfo.push(["mycontent", textstring]);
    }
    this.setState({
      value:
        this.state.value
    });
    const importedTexts = document.getElementById('preview');
    if (this.state.value === "") {return;}
    const newText = createList();
    addContent(newText, this.state.value);
    textInputField(newText);
    importedTexts.dataset.texts = JSON.stringify(newText);
    document.getElementById('text-add').click();
  }

  enableEditor = () => {
    document.getElementById('editentries').removeAttribute('disabled');
  }
  enableExport = () => {
    document.getElementById('export_all_items').removeAttribute('disabled');
  }

  checkConnectedUser = () => {
    const importedTexts = document.getElementById('preview');
    if(!(typeof importedTexts.dataset.username === 'string' && importedTexts.dataset.username.length > 0)) {
      
      document.getElementById('modallogin-hidden-btn').click(); //displays a modal window with bootstrap
      
    }
  }

  render() {


    const itemsloaded = this.state.itemsloaded;

    return (

      <form enctype={`multipart/form-data`}>
        <div>
          <input type="checkbox" id="playAllTheWords" value={this.state.preloadOrAutoplay} onChange={this.checkBox} name="playAllTheWords"/>
          <label for="playAllTheWords">Play all the words</label>
        </div>

  	<div id={`dropzone`} multiple onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragOver={this.onDragOver}></div>
        <div id={`preview`}></div>
        <input type={`submit`} value={`Import all texts and words`} id={`import_texts_words`} className={`btn btn-success`} />  
        <label id={`labelText`}>
          Your Text:

          <br /><textarea onChange={this.handleTextChange} placeholder="Enter a text" value={this.state.value} /> 
        </label>
        <button id="add-new-text-btn" onClick={this.useTextInputField} className={`btn btn-success`}>  
          Add a new text
        </button>
        <label id={`labelWord`}>
          Your Word:


        </label>
        <br /><input type="text" onChange={this.handleWordItem} placeholder="Enter a word" id="valueword" value={this.state.valueword} /> 
        <button onClick={this.useWordItemInputField} className={`btn btn-success`}>  
          Add a new word 
        </button>


        <a id={`download_items`} ref={a => {this.a = a}} onClick={this.downloadItems} download={`items.json`} href={``} ></a>
        <a href={``} id={`export_all_items_link`} download={`database.json`} ref={a => {this.a = a}}></a>
        <br/>
        <div id={`download_all_items`}></div> 
        <div id={`download_zone`}></div> 
        <input type="button" onClick={this.textAdd} hidden value="" id="text-add"/>

 
      </form>
    );
  }
}
class EditEntries extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount = () => {
    document.getElementById('export_all_items').disabled = true;

    document.getElementById('textsCurrentSession').checked = true;

  }

  checkTextContent = (thisIsMyTextList, importText) => {
    importText.forEach(function(mytext) {
      const textObject = {};

      mytext.forEach(function(myinfo) {
        if (myinfo[0] === "mycontent" && myinfo[1] instanceof Array === false) {return;}
        textObject[myinfo[0]] = myinfo[1];
      });
      if(textObject === {}) {return;};
      if(!textObject.mycontent) {return;};
      console.log(textObject.content); 
      thisIsMyTextList.push(textObject);
      
    });
    if (thisIsMyTextList instanceof Array && thisIsMyTextList.length === 0) {return;}
    console.log(thisIsMyTextList);
  }



  dispWords = (words) => {
    const modalbody = document.getElementById('modal-body');
    words.forEach(function(item){
      const displayWord = document.createElement('div');
      displayWord.textContent = item[0];
      modalbody.appendChild(displayWord);
    });
  }


  dispWord = (wordItem) => {
    const modalbody = document.getElementById('modal-body');
    const displayWord = document.createElement('div');
    displayWord.textContent = wordItem;
    modalbody.appendChild(displayWord);
  }
  displayRemoveWordBtn = (wordItem) => {
    const modalbody = document.getElementById('modal-body');

    const removeWord = document.createElement('div');
    modalbody.appendChild(removeWord);
    removeWord.classList.add("btn");
    removeWord.classList.add("btn-secondary");
    removeWord.type = "button";
    removeWord.textContent = "Remove this word";
    removeWord.onclick = (event) => {
      const importedTexts = document.getElementById('preview');
      importedTexts.dataset.texts = "";

      //textsToDisplay[rangeText][rangeInfo].forEach(function(element) {
      //  if(element[0] === "mycontent") {
      //    const idx = element[1].indexOf(wordItem);
      //    if (idx !== -1) {
      //      element[1].splice(idx, 1);
      //    }
      //  }
      //});
      if(removeWord.parentElement) {
        //const idx = //removeWord.parentNode.childNodes.indexOf(removeWord);
        const idx = Array.prototype.indexOf.call(removeWord.parentNode.childNodes, removeWord);
        if (idx !== -1) {
          modalbody.childNodes[idx].remove();
          modalbody.childNodes[idx-1].remove();
        }
      }
      removeWord.remove();
      //importedTexts.dataset.texts = [JSON.stringify(textsToDisplay.map(Object.values))];
    }
      //console.log("imported Textsremove word on click",JSON.parse(importedTexts.dataset.texts));

  }



  //}

  checkStringLength = (string) => {
    if(!(typeof string === 'string' && string.length > 0)) {return;} else {
      //alert("length string ok");
    };
  }

  checkConnectedUser = () => {
    const importedTexts = document.getElementById('preview');
    if(!(typeof importedTexts.dataset.username === 'string' && importedTexts.dataset.username.length > 0)) {
      
      //document.getElementById('modallogin').click(); //displays a modal window with bootstrap
      document.getElementById('modallogin-hidden-btn').click();
      
    }
    if (!(typeof importedTexts.dataset.username === 'string' && importedTexts.dataset.username.length > 0)) {return;}
  }




  displayRemoveTextBtn = (text, textId, texttype, exportText, importedTexts) => {
    //the checkConnectedUser function is already in the displayNewEntries function
    const displayWord = document.createElement('div');
    const importText = JSON.parse(importedTexts.dataset.texts); 
    const modalbody = document.getElementById('modal-body');
    const removeText = document.createElement('button');
    removeText.classList.add("btn");
    removeText.classList.add("btn-secondary");
    removeText.type = "button";
    removeText.textContent = "Remove this text";
    removeText.onclick = (event) => {
      const importedTexts = document.getElementById('preview');
      importedTexts.dataset.texts = "";
      console.log("onclick");
      removeText.remove();
      const textelements = document.getElementsByClassName(textId);
      while (textelements[0].firstChild) {
        textelements[0].removeChild(textelements[0].firstChild);
      }

      const idx = exportText.indexOf(text);
      if (idx !== -1) {
        modalbody.children.splice(idx, 1);
      }
      importedTexts.dataset.texts = [JSON.stringify(exportText.map(Object.values))];
      console.log("importTexts texts on click remove text", JSON.parse(importedTexts.dataset.texts));
      
    };

    modalbody.appendChild(removeText);
  }


  exportItems = (event) => {
    const exportMyItems = [];
    const wordsFromText = [];
    const importedTexts = document.getElementById('preview'); 
    //const importText = JSON.parse(importedTexts.dataset.alltexts); 
    const importText = this.state;
    if(importText instanceof Array === false) {return;}
    /**/
    this.addDate(importText);
    this.addInfoUser(importText);
    //const jsonobj = [];
    //importText.forEach(function(key){
    //  jsonobj.push(Object.keys(key).map(k => ({ [key[k][0]]: key[k][1] })));
    //});
    const blobData = new Blob([JSON.stringify({"items": importText},null,2)], {type: 'application/json'});
    const url = window.URL.createObjectURL(blobData);
    document.getElementById('export_all_items_link').href = url;
    document.getElementById('export_all_items_link').click();
  }






  render() {
    return (
      <div id="editor">
        <div class="display-sessions" >
          <input type="checkbox"  value="current" id="textsCurrentSession" name="sessionsTexts"/>
          <label for="textsCurrentSession" id="labelTextsCurrentSession">Texts for current session</label>
        </div>
        <div class="display-sessions">
          <input type="checkbox" value="previous" id="textsPreviousSessions" name="sessionsTexts" disabled /> 
          <label for="textsPreviousSessions" class="text-muted" id="labelTextsPreviousSessions">Texts from previous sessions</label>
        </div>

        <button type="button" class="btn btn-primary" id="export_all_items" onClick={this.exportItems}>
          Export my items
        </button>

      </div>
    )
  }
}
ReactDOM.render(<BasicForm/>, document.getElementById('root'));
