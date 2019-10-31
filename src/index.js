import React from 'react'; 
import setState from 'react'; 
import ReactDOM from 'react-dom'; 
import './index.css';
import DatePicker from 'react-date-picker';
import './App.js';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom';
import App from './App';
//import valueExport from './import';
import { withRouter } from "react-router-dom";
import * as fs from 'fs';
import registerServiceWorker from './registerServiceWorker';
//const fetch = require("node-fetch");
const $ = window.$;
//import saferw from 'safe-read-write';
//const writeFile = require('write-file');
//const rp = require('fs.realpath');
//process.version = '8.16.0';
//process.versions.node = '8.16.0';
//console.log(`Version: ${process.versions.node}`);
//rp.monkeypatch(); 
//import { fs } from 'memfs';

//const fs=require('bro-fs');
//fs.writeFile("filename.txt", "content");
const bcrypt = require("bcryptjs");
//const fs = require('fs-extra');
//const writeData = require('write-data');
//const salt = bcrypt.genSaltSync(10);
const PDFJS = window['pdfjs-dist/build/pdf'];
//const path=require('path');
//const jsonfile =require('jsonfile');
//const write = require('write');
//const thenWriteJson = require('then-write-json');
//const writeJson = require('write-json'); 
PDFJS.workerSrc = 'pdf.worker.js';
PDFJS.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
const mammoth = require("mammoth");
//const fsxu = require('fsxu');
//const saferw = require('safe-read-write');
//const fs =require('graceful-fs');

class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlEl:null,
      htmlBody:null,
      inputValue:'',
      req:null,
      contactForm:null,
      request:null,
      subject:null,
      
      display:null,
      email:null,
      
      xmlhttp:null,
      http:null,
      checkInput:'',
      wordtest:'',
      checkTarget:'',
      params:null,
      numberid:Number(''),
      targetValue: '',
      variableErrors:'',
      mountElements:[],
      formData:null,
      dataString:null,
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
      btn:null,
      wordInputField:null,
      itemsImportMode:null,
      myAudioNode:null,
      previewMyItems:null,
      audioItems:null,
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
      //password:'',
      hash:null,
      //passwordlist:null,
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
      allitems:[],
      selectDate:null,
      date:null,  
      allusers:[],
      texts:null,
      alltexts:[],
      number:Number(''),
      otherUsersItems:Number(''),
      nbCurrent:Number(''),
      //passwords:[],
      showWordItems:false,
      history:null,
    };

  }
  componentDidMount() {

    //window.history.push('/');
    const valueword = '';
    this.setState({valueword:this.state.valueword});

    //const allusers = [];
    const value = '';
    this.setState({value:this.state.value});

    const preloadOrAutoplay = 'preload';
    this.setState({preloadOrAutoplay});
    const username = "thirdusername";
    const textId = createNewTextId();
    const today = daysDate();
    this.setState({texts: JSON.stringify([])});
    this.setState({username});
    const alltexts = [];
    this.setState({alltexts});
    const wordsToDisplay=[];
    this.setState({wordsToDisplay});
    const nbCurrent = 0;
    //const passwords = [];
    //this.setState({passwords});

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

    function formEncode(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
    }
    //var url = '';
    //const formData = new FormData();
    //formData.append('x', 'hello'); 
    //fetch('hello.php', {
    //  method: 'POST',
    //  headers: { "Content-type": "application/x-www-form-urlencoded"},
    //  body: formData
    //}).then(res => {
    //  return res.text();
    //}).then(body => {
    //  console.log(body);
    //});
//IMPORT ITEMS
    fetch('http://localhost:9000/exportItems')
      .then(res=>res.json())
      .then(res2=>res2.items)
      .then(allitems => {
    //  const allitems= [...Object.values(JSON.parse(valueExport).items)];
        if (allitems === (null||undefined)) {return;}
        //const passwords = this.state.passwords;
        //passwords.push(allitems.map(obj => obj)[allitems.length -1]);
        allitems.map(obj => obj).pop();

        function allusersItems(textvar) {
          return textvar.some(x => x[0] === "users" && !x[1].includes(username));
        }
        function usersItem(textvar) {
          return textvar.some(x => x[0] === "users" && x[1].includes(username)); 
        }
        const allusers = allitems.map(x=>x).filter(allusersItems);
        this.setState({allusers});
        this.setState({otherUsersItems:allusers.length});
        const alltexts = allitems.filter(usersItem);

        if(alltexts === (null||undefined) || alltexts instanceof Array && alltexts.length === 0) {return;} 

        alltexts.forEach(textitem => {
          this.textAdd(textitem);  
        });
      })
    const allAudioElements = document.getElementsByTagName('audio'); 
    window.addEventListener('dragover',this.windowdragover);
    window.addEventListener('drop',this.windowdrop);
    const date = new Date();
    this.setState({date});

    
  }
  fetchItems = () => {
    const username = this.state.username;
    fetch('http://localhost:9000/exportItems')
      .then(res=>res.json())
      .then(res2=>res2.items)
      .then(allitems => {
    //  const allitems= [...Object.values(JSON.parse(valueExport).items)];
        if (allitems === (null||undefined)) {return;}
        //const passwords = this.state.passwords;
        //passwords.push(allitems.map(obj => obj)[allitems.length -1]);
        allitems.map(obj => obj).pop();

        function allusersItems(textvar) {
          return textvar.some(x => x[0] === "users" && !x[1].includes(username));
        }
        function usersItem(textvar) {
          return textvar.some(x => x[0] === "users" && x[1].includes(username)); 
        }
        const allusers = allitems.map(x=>x).filter(allusersItems);
        this.setState({allusers});
        this.setState({otherUsersItems:allusers.length});
        const alltexts = allitems.filter(usersItem);

        if(alltexts === (null||undefined) || alltexts instanceof Array && alltexts.length === 0) {return;} 

        alltexts.forEach(textitem => {
          this.textAdd(textitem);  
        });
      })
  }
  fieldOnblur = (event) => {
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
    function selectText(textitem){
      return textitem.some(x=>x[0] === "session_of_texts" && x[1]==="current");
    }
    const alltexts = this.state.alltexts.filter(selectText);
    if(alltexts.length === 0) {return;}
    const audioItems = [];
    alltexts.forEach(function(text) {
      text.forEach(prop => {
        if(prop[0] === "mycontent") {
          prop[1].forEach(myworditem => {
            if(!audioItems.includes(myworditem)) {
              audioItems.push(myworditem);
            }
          });
        }
      });
    });
    const myNode = document.getElementById('myAudioFiles');
    while(myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    const myAudioFiles = [];

    console.log('test');
    fetch("https://raw.githubusercontent.com/nathanielove/English-words-pronunciation-mp3-audio-download/master/ultimate.json")
      .then(function(response){
        return response.json();
      })
      .then(function(mp3WordList){
        console.log('fetch');
        audioItems.forEach(myworditem => {
          if(document.getElementById(myworditem.trim()+'-audio')) {return;}
          const itemlist = document.getElementsByTagName('audio');
          const audioFilePreview = document.createElement('audio'); 
          audioFilePreview.className=myworditem;
          if (itemlist.length === 0) { 
            audioFilePreview.key=Number('');
          } else {
            audioFilePreview.key=Number(itemlist[itemlist.length-1].key +1);
          }

          audioFilePreview.id=myworditem.trim()+'-audio';
          audioFilePreview.controls=true;
          audioFilePreview.onpause = (event) => {
            event.currentTarget.currentTime = 0;
          }
          //if (document.getElementById('playAllTheWords').checked) {
          //  audioFilePreview.onended = (event) => {
          //    const allAudioElements = document.getElementsByTagName('audio');
          //    if (allAudioElements && allAudioElements.length && allAudioElements.length >= 2) {
          //      const myAudioItems = document.getElementById('myAudioFiles');

          //      const indexAudioElement = Array.prototype.indexOf.call(myAudioItems.children, event.currentTarget) + 1;
          //      myAudioItems.childNodes[indexAudioElement].play();

          //    }
          //  };
          //}
          audioFilePreview.onplay = (event) => { 
            const btn = document.getElementById('audio-btn');
            btn.dataset.targetValue = audioFilePreview.id.substring(0,audioFilePreview.id.length-6).trim();

          };
          [...Object.entries(mp3WordList)].forEach(function(mp3, indexmp3, objectmp3) {
            if(mp3[0] === myworditem.trim() && mp3[1].length){
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
          

        });
        const previewMyAudioFiles = document.getElementById('myAudioFiles');
        myAudioFiles.forEach(function(item, index, object) {
          previewMyAudioFiles.appendChild(item); 
        });
        
      })
  }

  //handleUsernameChange = (event) => {
  //  this.setState({
  //    username:
  //      event.target.username,
  //    password:
  //      event.target.password,
  //    signupUsername:
  //      event.target.signupUsername,
  //    signupPassword:
  //      event.target.signupPassword
  //  });
  //}
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
  //loginUser = (event) => {
  //  const username = this.state.username;
  //  //const password = this.state.password;
  //  //const passwords = this.state.passwords;
  //  console.log(username, password, passwords);
  //  
  //  if(typeof username === 'string') {
  //    if(!passwords.some(x=> bcrypt.compareSync(password, x.password) && username === x.username)) {
  //      document.getElementById('username').classList.add('error-signin');
  //      document.getElementById('password').classList.add('error-signin');
  //      return;
  //    }
  //    

  //    this.checkStringLength(username);
  //    document.getElementById('loginbtn').innerHTML = 'sign out';
  //    document.getElementById('username').hidden = true;
  //    document.getElementById('password').hidden = true;
  //    document.getElementById('username').className= '' 
  //    document.getElementById('password').className = '';
  //    document.getElementById('welcome').innerHTML = "Hello, "+username;

  //    

  //  } else if(document.getElementById('loginbtn').innerHTML === 'sign out') {
  //    this.state.username = '';
  //    document.getElementById('loginbtn').innerHTML = 'sign in';

  //    document.getElementById('welcome').innerHTML = "";
  //    this.state.password = "";
  //    const importedTexts = document.getElementById('preview');
  //    while (importedTexts.firstChild) {
  //      importedTexts.removeChild(importedTexts.firstChild);
  //    }


  //  }
  //  
  //}
  //signupUser = (event) => {
  //  const saltRounds = 10;
  //  const plainTextUsername1 = this.state.signupUsername;
  //  const plainTextPassword1 = this.state.signupPassword;
  //  const passwords = this.state.passwords;
  //  
  //  bcrypt.genSalt(10, function(err, salt) {
  //      bcrypt.hash(plainTextPassword1, salt, function(err, hash) {
  //        passwords.push({username: plainTextUsername1, password: hash});
  //          // Store hash in your password DB.
  //      });
  //  });
  //}

  editEntries = (event) => {
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

    testAddDate(output);
    testAddUser(output);
    sessionExport(output);
    //testAddSession(output); 
    function testAddUser(importText){
      if (this.state.username.length > 0) {
        importText.forEach(function(myTextItem, index, jsonfile) {
          if(myTextItem.some(x=>x[0] === "session_of_texts" && x[1]==="current")){
            myTextItem.forEach(function(info) {
              if(info[0] === "users") {
                if(info[1] instanceof Array && info[1].length > 0) {
                  info[1].push(this.state.username); //array
                  console.log(info);
                } else {
                  info.length = 0;
        
                  info= ["users", [this.state.username]]; //array
                  console.log(info);
                }
              } 
            });
          }
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
    //const blobData = new Blob([JSON.stringify({"items": [...[...output, JSON.parse(this.state.allusers)], JSON.parse(this.state.passwords)]},null,2)], {type: 'application/json'});
    //const url = window.URL.createObjectURL(blobData);
    //document.getElementById('export_all_items_link').href = url;
    //document.getElementById('export_all_items_link').click();
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
      })
    };
    reader.readAsArrayBuffer(file);

  }

  sendPdfFile = (file) => { 
    const textId = createNewTextId();
    const username = this.state.username;
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
      list = [["textId",textId], ["session_of_texts", "current"],["users",[username]], ["dates", [today]], ["lastModified", file.lastModified], ["name", file.name], ["webkitRelativePath", file.webkitRelativePath], ["size", file.size], ["type", file.type]];
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
            element[1] = element[1].split(/[\s.?:;!,]+/).map(function(y){ return y.replace(/[\W_]+/g," ") }).map(function(x){ return x.toLowerCase() }).map(x=>x.trim()).filter(function( element ) {
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
    if(this.state.alltexts.includes(text)) {return;}
    alltexts.push(text);
    this.setState({nbCurrent:alltexts.length});
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
    valueword.length = null;

  }

  useTextInputField = (event) => {
    const username = this.state.username;
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
      list = [["textId",textId],["users",[username]],["session_of_texts","current"], ["dates", [today]], ["lastModified", ''], ["name", ''], ["webkitRelativePath", ''], ["size", ''], ["type", '']];
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
    addContent(newText, JSON.stringify(this.state.value).trim());
    textInputField(newText);
    this.textAdd(newText);
    this.state.value = "";
  }
  onChange = (date) => {
    this.setState({ date });
    const idx=document.getElementById('msg-date-picker');
    idx.innerHTML = '';
    if(this.state.date=== null) {return;}
    const selectDate = (date.getMonth()+1)+'/'+date.getDate()+'/'+date.getFullYear();
    
    this.setState({ selectDate });
    if(!this.state.alltexts.some(x=>x.some(x=>x[0]==="dates" && x[1].includes(selectDate)))){
      idx.innerHTML = 'no items found';
    }

  }
  btnSortByDate = (event) => {
    const alltexts = this.state.alltexts;
    const date = this.state.date;
    const selectDate = this.state.selectDate;
    if(!this.state.alltexts.some(x=>x.some(x=>x[0]==="dates" && x[1].includes(selectDate)))){
      return;
    }
    if(date === null) {
      return;
    };
    this.state.alltexts.forEach(textitem => {
      if(!textitem.some(prop => prop[0] === "dates" && prop[1].includes(selectDate))){
        textitem.forEach(prop => {
          if(prop[0] === "session_of_texts"){
            prop[1] = "";
          }
        });
      } else {
        textitem.forEach(prop => {
          if(prop[0] === "session_of_texts"){
            prop[1] = "current";
          }
        });
      }
    });
  };
  displayItem = (event) => {
    console.log(event.target.parentNode.firstChild.dataset.textid);
  } 
  exportItems = (event) =>{
    //alert(JSON.stringify(this.state.alltexts));
    if(this.state.alltexts.length === 0) {
      alert('no items');
      return;
    }
    this.state.alltexts.map(text=>{
      text.map(prop=>{
        if(prop[0] === "session_of_texts"){
          prop.splice(1.1);
          prop.push('previous');
        }
      });
    });
    const allusers = this.state.allusers;
    console.log(allusers);
    this.state.allusers.map(text => {
      this.state.alltexts.push(text);
    });
    //if (!this.state.alltexts.includes(this.state.passwords)){
    //  this.state.alltexts.push(this.state.passwords)
    //} else {
    //  this.state.alltexts.splice(this.state.alltexts.indexOf(this.state.passwords),1);
    //  this.state.alltexts.push(this.state.passwords);
    //}
    const data = "var1="+JSON.stringify({"items":this.state.alltexts}, null, 2);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost/file.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");                  
    xhr.send(data);
    document.getElementById("export_items_route").click();
  }                
  ecrireDiv=(event)=>{
    //const display = document.getElementById("test-div");

    //display.innerHTML = "<form class=\"circleForm\" id=\"registerForm\">\n     Imię: <input type=\"text\" id=\"user_name\" value=\"my user name\"><br>\n     Nazwisko: <input type=\"text\" id=\"user_lastname\" value=\"my last name\">\n    <br>\n<input class=\"btnCircle\" type=\"button\" id=\"submit\" value=\"Przejdź dalej\" />                    \n </form>";



    


        //event.preventDefault();
        //$.post(
        //   'connexion.php', // Un script PHP que l'on va créer juste après
        //   {
        //       username : $("#username").val(),  // Nous récupérons la valeur de nos input que l'on fait passer à connexion.php
        //       password : $("#password").val()
        //   },
 
        //   function(data){
 
        //       if(data == 'Success'){
        //            // Le membre est connecté. Ajoutons lui un message dans la page HTML.
 
        //            $("#resultat").html("<p>Vous avez été connecté avec succès !</p>");
        //       }
        //       else{
        //            // Le membre n'a pas été connecté. (data vaut ici "failed")
 
        //            $("#resultat").html("<p>Erreur lors de la connexion...</p>");
        //       }
        //
        //   },
        //   'text'
        //);
    //}

    //document.getElementById('confirm').click();
  }
  headingSearch = (event) => {
    event.preventDefault();
    const display = document.getElementById("test-div");
    console.log(event.target.form.title.value);
    $.ajax({
      type: "POST",
      url: "edit.php",
      data: {title:event.target.form.title.value} ,
      
      success: function(data) {
        //$('.center').html(data); 
        display.innerHTML += data;
      }
    });
  }
  refreshData = (event) => {
    event.preventDefault();
    const display = document.getElementById("test-div");
    $.ajax({
    	type: 'POST',
    	url: 'sessions.php',
    	data: $('#saveuser').serialize(),
    
    	success: function (msg) {
    		msg = $.trim(msg);
    		if (msg == 'Success') {
           //Do Whatever					
           //jQuery("#thanks_message").show('slow');
                  alert('ok');
    		}
    	}
    });
  }
  reloadEditRoute = (event) => {
    document.getElementById('edit_items_route').click();
  }
  updateInputValue = (event) => {
    this.setState({
      inputValue:
        event.target.inputValue,
    });
    const inputValue = document.getElementById('wordinput').value;
    const btn = document.getElementById('audio-btn');
    console.log('input value=', inputValue, 'targetValue', btn.dataset.targetValue);
    btn.hidden = true;
    document.getElementById('replace-btn').hidden=false;
    if(!btn.dataset.targetValue){return;}
    if((btn.dataset.targetValue.trim()!=='')&&(inputValue.trim()!=='') &&(btn.dataset.targetValue.trim() === inputValue.trim())){
      //alert('===');
      btn.hidden = false;
      document.getElementById('replace-btn').hidden=true;
    }
  }
  reinitInputValue = (event) => {
    this.setState({
      inputValue:
        ''
    });
  }
  render() { 

    const itemsloaded = this.state.itemsloaded;
    const nbCurrent = this.state.nbCurrent;
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
            <SidebarItem>
              <Link to={`export`}>
                Export all
              </Link>
            </SidebarItem>
            <SidebarItem>
              <Link to={`exportedItems`}>
                Exported items
              </Link>
            </SidebarItem>
          </SideBar>
          <Main>
            
            <form onSubmit={this.handleSubmit}>
              <Route path="/exportedItems" exact render={() => ( 
                <div>
                  <App jsonData={this.state.alltexts}/>
                 {this.fetchItems}
                </div>
              )} />

              <Route path="/upload" exact render={() => ( 
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
              <Route path="/sort" exact render={() => ( 
                <div>
                  <div id="sort-items-by-date"><label>Load words by date</label></div>
                  <div>
                    <DatePicker
                      id="myDatePicker"
                      onChange={this.onChange}
                      value={this.state.date}
                    />
                  </div><div id="msg-date-picker"></div>
                  <button type="button" onClick={this.btnSortByDate} id="btn-sort-by-date">sort items by date</button>
                </div>
              )} />



              <Route exact={true} path="/" render={() => (
                <div>


                  <div id="login-form-body" className={`login-form`}/> 
                  <br /><div id="welcome"></div>


                </div>
              )} />
              <Route path="/export" exact render={() => (
                <div>

                  <div id="div1"></div>
                  <div class="the-return">

                  </div>
                  <input type="button" onClick={this.exportItems}/>
                  <ClickButton/>
                  <div id="test-div">
                  </div>
                </div>

              )} />
              <Route path="/import" exact render={() => (
                <div>
                  <div class="display-items" >
                    {this.state.alltexts.filter(x=>x.some(x=> x[0] === "session_of_texts" && x[1] === "current")).length} texts are selected
                  </div>
                  <div class="display-items">
                    {this.state.alltexts.filter(x=>x.some(x=> x[0] === "session_of_texts" && x[1] === "previous")).length} texts were saved since the latest changes 
                  </div>
                  <div class="display-items">
                    There are {this.state.otherUsersItems} texts from other users that are leftin the database
                  </div>
                </div>
              )} />

              <Route path="/edit" exact render={() => (
                <div>


                  {this.state.alltexts.length > 0 ? (
                    <div>
                    {this.state.alltexts.filter(text=>text.some(prop=>prop[1] === "current")).map(text => (
                      <div>

                        <button onClick={(event) => {this.state.alltexts.splice(this.state.alltexts.indexOf(text), 1);((this.state.alltexts.filter(text=>text.some(prop=>prop[1] === "current")).length === 0)?event.target.parentNode.parentNode.remove():event.target.parentNode.remove());}}>
                          {'remove all items from this text'}
                        </button>
                        <div>
                          {text.filter(x=>x[0]==="mycontent")[0][1].map(word => (
                            <div>
                              {word}
                              <button onClick={(event) => {text.map(prop=>((prop[1] instanceof Array && prop[1].includes(word))?prop[1].splice(prop[1].indexOf(word),1):null));(event.target.parentNode.parentNode.childNodes.length === 1 ?event.target.parentNode.parentNode.parentNode.firstChild.click():event.target.parentNode.remove());}}>
                                {'remove one item'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {this.state.alltexts.some(text => text.some(prop => prop[1] !== "current"))?(
                      <div>
                        <ShowPrevSessions/>
                        <button onClick={(event) => {this.state.alltexts.map(text=>text.map(prop=>((prop[0] === "session_of_texts")? prop[1]="current":null)));this.reloadEditRoute();event.target.hidden=true;}}>
                          texts from previous sessions of texts

                        </button>
                      </div>
                    ) : null}

                    </div>

                  ) : (
                    <div>Load new texts...</div>
                  )}

                </div>
              )} />

              


              <Route path="/play" exact render={() => (
                <div>
                  <div>
                    <input type="checkbox" id="playAllTheWords" value={this.state.preloadOrAutoplay} onChange={this.checkBox} name="playAllTheWords"/>
                    <label for="playAllTheWords">Play all the words</label>
                  </div>
                  <div id="all-input-fields">
                    <div className={`play`}> 
                      <label htmlFor={`wordinput`}></label>
                      <input
                        id={`wordinput`}
                        placeholder='Enter word'
                        value={this.state.inputValue}
                        onChange={this.updateInputValue}
                      />

                      <button hidden={true} ref={btn => { this.btn = btn; }} id="audio-btn" onClick={(event) => {document.getElementById(event.target.dataset.targetValue+'-audio').pause();document.getElementById(event.target.dataset.targetValue+'-audio').hidden = true;this.setState({inputValue:''});}} >
                        click me
                      </button>
                      <button hidden={false} id='replace-btn'>click me</button>
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
const ClickButton = withRouter(({ history }) => (
  <button
    hidden={true}
    id="export_items_route"
    type="button"
    onClick={(event) => { history.push('/exportedItems'); }}
  >
     save as json 
  </button>
))
const ShowPrevSessions = withRouter(({ history }) => (
  <button
    hidden={true}
    id="edit_items_route"
    type="button"
    onClick={(event) => { history.push('/edit'); }}
  >
     save as json 
  </button>
))
const DisplayItem = (props) => (
  <div {...props}/>

)
const RemoveItem = (props) => (
  <button {...props}/>
)
ReactDOM.render(<BasicForm/>, document.getElementById('root'));
                        //(text.some(x=>x[0] === "session_of_texts"&&x[1]==="previous"))?return:null
                  //<input onChange={this.handleUsernameChange} placeholder="Username" id="username" value={this.state.username} />
                  //<br /><input onChange={this.handleUsernameChange} placeholder="Password" id="password" value={this.state.password} />

                  //<br /><button id="loginbtn" onClick={this.loginUser} className={`btn btn-success`}>  
                  //  sign in 
                  //</button>

                  //<br /><input onChange={this.handleUsernameChange} placeholder="Username" id="signup-username" value={this.state.signupUsername} /> 
                  //<br /><input onChange={this.handleUsernameChange} placeholder="Password" id="signup-password" value={this.state.signupPassword} /> 
                  //<br /><button id="btn-signup" onClick={this.signupUser} className={`btn btn-success`}> 
                  //  Sign up 
                  //</button>
                  //</div>
                  //{this.state.alltexts.filter(x=>x.some(x=> x[0] === "session_of_texts" && x[1] === "current")).length > 0?(

                  //):(
                  //  null
                  //)}
                        //<button onClick={(event) => {event.target.parentNode.pa	rentNode.childNodes.hidden = false;this.state.alltexts.map(x=>x.filter(prop => prop[0]==="session_of_texts")).map(x=>x[0].splice(1,1).push('current'));}}>
                        //  edit texts from previous sessions
registerServiceWorker();
