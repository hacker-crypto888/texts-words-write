import React, {setState} from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css';
import DatePicker from 'react-date-picker';
import './App.js';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
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
      signupUsername:null,
      signupPassword:null,
      saltRounds:null,
      plainTextUsername1:null,
      plainTextPassword1:null,
      password:'',
      hash:null,
      passwordlist:null,
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
      mySuperList:null,
      myDivForNewData:null,
      newTexts: null,
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
      previous_sessions:null,
      textRanges:null,
      output:null,
      textlist:null,
      selectText:null,
      selectDate:null,
      date:null, 
      date: new Date(),
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
      selectDate:null,
      date:null,  
      allusers:[],
      texts:null,
      alltexts:[],
      number:null,
      otherUsersItems:Number('-1'),
      nbCurrent:Number(''),
      passwords:[],
      showWordItems:false,
    };
  }
  componentDidMount() {
    const valueword = '';
    this.setState({valueword:this.state.valueword});
    const value = '';
    this.setState({value:this.state.value});
    const otherUsersItems = -1;
    this.setState({otherUsersItems});
    const preloadOrAutoplay = 'preload';
    this.setState({preloadOrAutoplay});
    const username = "username";
    const textId = createNewTextId();
    const today = daysDate();
    this.setState({texts: JSON.stringify([])});
    this.setState({username});
    const alltexts = [];
    this.setState({alltexts});
    const wordsToDisplay=[];
    this.setState({wordsToDisplay});
    const nbCurrent = 0;
    const passwords = [];
    this.setState({passwords});

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
      

    function addContent(fileinfo, textstring) {
      fileinfo.push(["mycontent", textstring]);
    }
    function testAddSession(importText){
      importText.forEach(function(myTextItem, index, jsonfile) {
        if (!myTextItem.some(x => x[0] === "session_of_texts")) {
          myTextItem.push(["session_of_texts","previous"]);
        } else if(myTextItem.some(x => x[0] === "session_of_texts")) { 
          myTextItem.forEach(function(info) {
            if(info[0] === "session_of_texts") {
              if (!info[1] === "previous") {
                info[1] = "previous";
              }
            } 
          });
        }
      });
    }


    fetch('database.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(myBlub) {
        return [...Object.values(myBlub.items)];
      })
      .then(items => {

        if(items === (null||undefined)) {return;}
        console.log(items);
        const passwords = this.state.passwords;
        console.log(passwords);
        passwords.push(items.map(obj => obj)[items.length -1]);
        items.map(obj => obj).pop();

        console.log(passwords);
        function allusersItems(textvar) {
          return !textvar.some(x => x[0] === "users" && x[1].includes(username));
        }
        function usersItem(textvar) {
          return textvar.some(x => x[0] === "users" && x[1].includes(username)); 
        }
        const allusers = items.map(x=>x).filter(allusersItems);
        for (var i=0; i<allusers.length ; i++) {
          this.setState({otherUsersItems: this.state.otherUsersItems + 1});
        }
        return items.map(x => x).filter(usersItem);

      })
      .then(result => {
        console.log(result);
        if(result === (null||undefined) || result instanceof Array && result.length === 0) {return;} 

        result.forEach(textitem => {
          document.getElementById('previous-items').innerHTML = Number(document.getElementById('previous-items').innerHTML) +1;

          this.textAdd(textitem);  
        });
      })
    const allAudioElements = document.getElementsByTagName('audio'); 
    window.addEventListener('dragover',this.windowdragover);
    window.addEventListener('drop',this.windowdrop);
    const date = new Date();
    this.setState({date});

    
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
      const targetValue = this.state;
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
    const number = Number('');
    const alltexts = this.state.alltexts;

    if(alltexts.length === 0) {return;};
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

        alltexts.forEach(function(text) {
          text.forEach(prop => {
            if(prop[0] === "mycontent") {
              prop[1].forEach(myworditem => {
      
                const audioFilePreview = document.createElement('audio'); 
                audioFilePreview.className=myworditem;
                const number = Number(this.state.number) + 1;
                audioFilePreview.key=this.state.number;
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
                  const targetValue = audioFilePreview.id;
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
            }
          });

        });
        const previewMyAudioFiles = document.getElementById('myAudioFiles');
        myAudioFiles.forEach(function(item, index, object) {
          previewMyAudioFiles.appendChild(item); 
        });
        
      })
  }
  removeAudioPlayer = (props) => {
    const targetValue = this.state;
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
        event.target.username,
      password:
        event.target.password,
      signupUsername:
        event.target.signupUsername,
      signupPassword:
        event.target.signupPassword
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

  showDropzone = () => {
    document.getElementById('dropzone').hidden = false;
  }
  hideDropzone = () => {
    document.getElementById('dropzone').hidden = false;
  }
  loginUser = (event) => {
    const username = this.state.username;
    const password = this.state.password;
    const passwords = this.state.passwords;
    console.log(username, password, passwords);
    
    if(typeof username === 'string') {
      if(!passwords.some(x=> bcrypt.compareSync(password, x.password) && username === x.username)) {
        document.getElementById('username').classList.add('error-signin');
        document.getElementById('password').classList.add('error-signin');
        return;
      }
      

      this.checkStringLength(username);
      document.getElementById('loginbtn').innerHTML = 'sign out';
      document.getElementById('username').hidden = true;
      document.getElementById('password').hidden = true;
      document.getElementById('username').className= '' 
      document.getElementById('password').className = '';
      document.getElementById('welcome').innerHTML = "Hello, "+username;

      

    } else if(document.getElementById('loginbtn').innerHTML === 'sign out') {
      document.getElementById('username').value = '';
      document.getElementById('loginbtn').innerHTML = 'sign in';

      document.getElementById('welcome').innerHTML = "";
      document.getElementById('username').value = "";
      document.getElementById('password').value = "";
      const importedTexts = document.getElementById('preview');
      while (importedTexts.firstChild) {
        importedTexts.removeChild(importedTexts.firstChild);
      }


    }
    
  }
  signupUser = (event) => {
    const saltRounds = 10;
    const plainTextUsername1 = this.state.signupUsername;
    const plainTextPassword1 = this.state.signupPassword;
    const passwords = this.state.passwords;
    
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(plainTextPassword1, salt, function(err, hash) {
          passwords.push({username: plainTextUsername1, password: hash});
            // Store hash in your password DB.
        });
    });
  }

  editEntries = (event) => {
    const allusers = this.state;
    const alltexts = this.state.alltexts;
    const output = [...alltexts];
  
    function sessionExport(output) { 
      output.forEach(element => {
        element.forEach(el => {
          if(el[0] === "session_of_texts") {
            //element.splice(element.indexOf(el), 1);
            el.splice(1,1);
            el.push('previous');
          }

        })
      });
    }
    sessionExport(output);
    testAddDate(output);
    testAddUser(output);
    //testAddSession(output); 
    function testAddUser(importText){
      if (document.getElementById('username').value.length > 0) {
        importText.forEach(function(myTextItem, index, jsonfile) {
          myTextItem.forEach(function(info) {
            if(info[0] === "users") {
              if (!info[1].includes(document.getElementById('username').value)) {
                info[1].push(document.getElementById('username').value); //array
              }
            } 
          });
        });
      }
    }
    function testAddDate(importText) {
      const daysDate = new Date();
      const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      const msTime = Date.now();
      importText.forEach(function(myTextItem, index, jsonfile) {
        myTextItem.forEach(function(info) {
          if(info[0] === "dates" && !info[1].includes(today)) {
              info[1].push(today); //array
          } 
        });
      });
    }
   
    //testAddUser(output);
    //testAddSession(output);
    //testAddDate(output);
    const blobData = new Blob([JSON.stringify({"items": [...[...output, JSON.parse(this.state.allusers)], JSON.parse(this.state.passwords)]},null,2)], {type: 'application/json'});
    const url = window.URL.createObjectURL(blobData);
    document.getElementById('export_all_items_link').href = url;
    document.getElementById('export_all_items_link').click();
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
      list = [["textId",textId], ["dates", [today]],["users", [document.getElementById('username')]],["session_of_texts","current"], ["lastModified", file.lastModified], ["name", file.name], ["webkitRelativePath", file.webkitRelativePath], ["size", file.size], ["type", file.type]];
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
      this.textAdd(result); 
      const nbCurrent = this.state.nbCurrent;
      nbCurrent+=1;
    }

    const mainFunction = callback => {
      asynchronousFunction(callback)
    }
    
    //call the code

    mainFunction(callbackFunction);


    console.log(mainFunction);
  }

  sendDocxFile = (file) => {
    const textId = createNewTextId(textId);
    const today = daysDate(today);

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
      list = [["textId",textId], ["dates", [today]],["users", [document.getElementById('username')]],["session_of_texts", "current"], ["lastModified", file.lastModified], ["name", file.name], ["webkitRelativePath", file.webkitRelativePath], ["size", file.size], ["type", file.type]];
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
        addContent(newText, resultObject.value);
        this.textAdd(newText);
        const nbCurrent = this.state.nbCurrent;
        nbCurrent+=1;
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
      list = [["textId",textId], ["session_of_texts", "current"],["users",[document.getElementById('username')]], ["dates", [today]], ["lastModified", file.lastModified], ["name", file.name], ["webkitRelativePath", file.webkitRelativePath], ["size", file.size], ["type", file.type]];
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
          const newText = createFileList();


          addContent(newText, pagesText.join(' '));
          
          this.textAdd(newText);
          const nbCurrent = this.state.nbCurrent;
          nbCurrent+=1;

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
  textAdd = (text) => {
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
      if(list.some(x=>x[0] === 'input')) {return;}
      list.forEach(item => {
        if (item[0] === 'type' && item[1].length > 0) {
          fileIsDropped(list);
        }
      });
    }


    isDroppedFile(text);
    function addTextSize(text) {
      //const VAR_NAME = 
      text.forEach(item => {
        if(item[0] === "size" && item[1].length === 0) {
          item.splice(1,1);
          //item.push(JSON.stringify(text.filter(x=>x[0] === "mycontent")[0][1].length));
          console.log(text.filter(x=>x[0] === "mycontent").length);
          item.push(JSON.stringify(text.filter(x=>x[0] === "mycontent")[0][1].length));
        }
      });
    }
    addTextSize(text);
    handleText(text); 
    const alltexts = this.state.alltexts;

    alltexts.push(text);
    console.log(alltexts, "add a text"); 
    
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
    console.log(this.state.valueword);
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
    const username = this.state.username;
    const valueword = this.state.valueword; 
    this.setState({valueword});
    if (valueword === (null||undefined)) {return;};
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
      list = [["textId",textId],["users", [username]],["session_of_texts", "current"], ["dates", [today]], ["lastModified", ''], ["name", ''], ["webkitRelativePath", ''], ["size", ''], ["type", '']];
      return list;
    }

    function addContent(fileinfo, textstring) {
      fileinfo.push(["mycontent", textstring]);
    }

    

    const newText = createList();
    wordItemInputField(newText);
    addContent(newText, valueword);
    this.textAdd(newText);
    this.setState({nbCurrent: this.state.nbCurrent +1});
    valueword.length = null;

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
      list = [["textId",textId],["users",[document.getElementById('username')]],["session_of_texts","current"], ["dates", [today]], ["lastModified", ''], ["name", ''], ["webkitRelativePath", ''], ["size", ''], ["type", '']];
      return list;
    }

    function addContent(fileinfo, textstring) {
      fileinfo.push(["mycontent", textstring]);
    }
    this.setState({
      value:
        this.state.value
    });

    if (this.state.value === "") {return;}
    const newText = createList();
    addContent(newText, JSON.stringify(this.state.value));
    textInputField(newText);
    this.textAdd(newText);
    this.setState({nbCurrent: this.state.nbCurrent+=1});
    this.state.value = "";
  }
  onChange = (date) => {
    this.setState({ date });
    const selectDate = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();

  }
  btnSortByDate = (event) => {
    const alltexts = this.state.alltexts;
    const date = this.state;
    if(date === null) {
      this.displayNewEntries(alltexts);
      return;
    };

    function loadTextsByDate(text) {
      return text.some(prop => prop[0] === "dates" && prop[1].includes(date));
    }
    this.displayNewEntries(alltexts.filter(loadTextsByDate));
  };
  displayItem = (event) => {
    console.log(event.target.parentNode.firstChild.dataset.textid);
  } 

  render() { 
    const itemsloaded = this.state.itemsloaded;
    return(
      <Router>
        <Root>
          <SideBar>
            <SidebarItem>
              <Link to={`upload`}>
                Load files 
              </Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={`sort`}>
                Load by date
              </Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={`edit`}>
                Edit word lists
              </Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={`play`}>
                Write the words
              </Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={`import`}>
                Import 
              </Link>
            </SidebarItem>
          </SideBar>
          <Main>
            
            <form onSubmit={this.handleSubmit}>
              <Route path="/upload" render={() => ( 
                <div>
  	          <div id={`dropzone`} multiple onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragOver={this.onDragOver} />
                  <div id={`preview`} />
                  <input type={`submit`} value={`Import all texts and words`} id={`import_texts_words`} className={`btn btn-success`} />  
                  <label id={`labelText`}>
                    Your Text:

                    <br /><textarea onChange={this.handleTextChange} placeholder="Enter a text" value={this.state.value} /> 
                  </label>
                  <button id="add-new-text-btn" onClick={this.useTextInputField} className={`btn btn-success`}>  
                    Add a new text
                  </button>


                  <br />

                  <a href={``} id={`export_all_items_link`} download={`database.json`} ref={a => {this.a = a}}></a>
                  <br />
                  <div id={`download_all_items`}></div> 
                </div>
              )} />
              <Route path="/sort" render={() => ( 
                <div>
                  <div id="sort-items-by-date"><label>Load words by date</label></div>
                  <div>
                    <DatePicker
                      id="myDatePicker"
                      onChange={this.onChange}
                      value={this.state.date}
                    />
                  </div>
                  <button type="button" onClick={this.btnSortByDate} id="btn-sort-by-date">sort items by date</button>
                </div>
              )} />

              <Route exact={true} path="/" render={() => (
                <div>
                  <div id="login-form-body" className={`login-form`}> 
                  <h1>Welcome</h1>
                  <br /><div id="welcome"></div>

                  <input onChange={this.handleUsernameChange} placeholder="Username" id="username" value={this.state.username} />
                  <br /><input onChange={this.handleUsernameChange} placeholder="Password" id="password" value={this.state.password} />

                  <br /><button id="loginbtn" onClick={this.loginUser} className={`btn btn-success`}>  
                    sign in 
                  </button>

                  <br /><input onChange={this.handleUsernameChange} placeholder="Username" id="signup-username" value={this.state.signupUsername} /> 
                  <br /><input onChange={this.handleUsernameChange} placeholder="Password" id="signup-password" value={this.state.signupPassword} /> 
                  <br /><button id="btn-signup" onClick={this.signupUser} className={`btn btn-success`}> 
                    Sign up 
                  </button>
                  </div>
                </div>
              )} />
              <Route path="/import" render={() => (
                <div>
                  <div class="display-items" >
                    {this.state.nbCurrent} texts added during this session by the logged in user
                  </div>
                  <div class="display-items">
                    {this.state.nbPrev} texts imported from the user's previous sessions of texts
                  </div>
                  <div class="display-items">
                    {this.state.otherUsersItems} texts from other users that are left in the database
                  </div>
                </div>
              )} />
              <Route path="/edit" render={() => (
                <div>
                  {this.state.alltexts.length > 0 ? (
                    <div>
                    {this.state.alltexts.map(text => (
                      <div>
                        <button onClick={(event) => {this.state.alltexts.splice(this.state.alltexts.indexOf(text), 1);event.target.parentNode.remove();}}>
                          {'remove items from this text'}
                        </button>
                        <div>
                          {text.filter(x=>x[0]==="mycontent")[0][1].map(word => (
                            <div>
                              {word}

                              <button onClick={(event) => {text.map(x=>x[1]).filter(x=>x.includes(word))[0].splice(text.map(x=>x[1]).filter(x=>x.includes(word))[0].indexOf(word),1);(event.target.parentNode.parentNode.childNodes.length === 1 ?event.target.parentNode.parentNode.parentNode.firstChild.click():event.target.parentNode.remove());}}>
                                {'remove items from this text'}
                              </button>
                            </div>
                       
                          ))}
                        </div>

                      </div>
                    ))}
                    </div>
                  ) : (
                    <div>Load new texts...</div>
                  )}
                </div>
              )} />

              


              <Route path="/play" render={() => (
                <div>
                  <div>
                    <input type="checkbox" id="playAllTheWords" value={this.state.preloadOrAutoplay} onChange={this.checkBox} name="playAllTheWords"/>
                    <label for="playAllTheWords">Play all the words</label>
                  </div>
                  <div id="all-input-fields">
                    <div className={`play`}> 


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


                      <button id={`loadItemsForNewGame`} onClick={this.displayAudio}>

                        Start a new game 
                      </button>
                      <br />

                      <div id={`myAudioFiles`}></div>

                    </div>
                  </div>
                </div>
              )} />
            </form>
          </Main>
        </Root>
      </Router>
    );
  }
}

const Root = (props) => (
  <div style={{
    display: 'flex'
  }} {...props}/>
)

const SideBar = (props) => (
  <div style={{
    width: '33vw',
    height: '100vh',
    overflow: 'auto',
    background: '#eee'
  }} {...props} />
)

const SidebarItem = (props) => (
  <div style={{
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    padding: '5px 10px'
  }} {...props}/>
)

const Main = (props) => (
  <div style={{
    flex: 1,
    height: '100vh', 
    overflow: 'auto'
  }}>
    <div style={{ padding: '20px' }} {...props}/>
  </div>
)
const DisplayItem = (props) => (
  <div {...props}/>

)
const RemoveItem = (props) => (
  <button {...props}/>
)
ReactDOM.render(<BasicForm/>, document.getElementById('root'));
