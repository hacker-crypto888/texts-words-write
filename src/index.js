import React, {setState} from 'react'; 
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
      someData:null
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
            console.log(item);
            //const myAudioFiles = document.getElementById('myAudioFiles');
            const audioFilePreview = document.createElement('audio'); 
            audioFilePreview.className=item.word;
            audioFilePreview.key=item.id;
            audioFilePreview.id=item.word;
            audioFilePreview.controls=true;
            if (document.getElementById('preloadOrAutoplay').value === "autoplay") {
            audioFilePreview.onended = (event) => {
              const allAudioElements = document.getElementsByTagName('audio');
              console.log(event.currentTarget);
              allAudioElements[0].remove(); 
              if (allAudioElements[0]) {
                allAudioElements[0].play();
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
            console.log(item.word);
            [...Object.entries(mp3WordList)].forEach(function(mp3, indexmp3, objectmp3) {
              if(mp3[0] === item.word && mp3[1].length){
                mp3[1].forEach(function(mp3link, indexmp3link, objectmp3link) {
                  const theFirstChild = audioFilePreview.firstChild;
                  const sourceFile = document.createElement('source');
                  sourceFile.src = mp3link; 
                  console.log(mp3link);
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
    console.log({targetValue});
    const mountElements = document.getElementById(targetValue);
    console.log({mountElements});
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
        console.log(myItemsByDate);
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
			const preview = document.getElementById("previewSortByDate");
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
        //document.getElementById('submit-date-btn').hidden = false;
        console.log(myItems);

        this.setState({
          databaseIsLoaded:
            true
        });
      })
    console.log(this.state.myBlob);
  }
  setImportMode = (event) => {
    this.setState({
      importMode:
        event.target.value
    });
    if(this.state.importMode === "drop") {
      document.getElementById('dropzoneSortByDate').hidden = true;
      //const myNode = document.getElementById('outputJsonFile');
      //while(myNode.firstChild) {
      //  myNode.removeChild(myNode.firstChild);
      //}
      const myInputNode = document.getElementById('inputJsonFile');
      while(myInputNode.firstChild) {
        myInputNode.removeChild(myInputNode.firstChild);
      }
      const myPreviewNode = document.getElementById('previewSortByDate');
      while(myPreviewNode.firstChild) {
        myPreviewNode.removeChild(myPreviewNode.firstChild);
      }
    } else {    
      document.getElementById('dropzoneSortByDate').hidden = false;
      //const myNode = document.getElementById('outputJsonFile');
      //while(myNode.firstChild) {
      //  myNode.removeChild(myNode.firstChild);
      //}
      const myInputNode = document.getElementById('inputJsonFile');
      while(myInputNode.firstChild) {
        myInputNode.removeChild(myInputNode.firstChild);
      }
    }           
  }             
  itemsByDateLoadForm = (event) => {
    //alert('test');
    if (document.getElementById('items_by_date') && document.getElementById('items_by_date').dataset.databaseJson) {
      if(document.getElementById("items_by_date")) {
        document.getElementById("items_by_date").remove();
      }
      event.target.removeEventListener('mouseover', this.itemsByDateLoadForm); 
      console.log(event.target.clientHeight);

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
      preloadOrAutoplay:null
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


    //YOU HAVE NO DATABASE.JSON AND YOU HAVE NO ITEMS
    if (document.getElementById('noDatabaseFile').checked === true && this.state.myItems === ([]||undefined)) {
    }

    //ALERT BOXES (TEXT IN TEXTAREA)
    //if (/*this.state.value.replace(/[!?:;.,]+/g, "").replace(/(\r\n|\n|\r)/gm,"") === ""*/) {
    //YOU IMPORT THE TEXT YOU ENTERED INTO THE VARIABLE WORDLIST
    const importText = this.state.value;
    const x = (list) => list.filter((v,i) => list.indexOf(v) === i);
    const wordList = x(importText.split(/[\s.?:;!,]+/)).map(function(y){ return y.replace(/[\W_]+/g," ") }).map(function(x){ return x.toLowerCase() }).filter(function( element ) {
      return element !== null;
    });

    //INITIALISATION of WORDS FROM THE TEXT
    //ARRAY(SET WITH UNIQUE KEY VALUE PAIRS) OF EACH WORD FROM THE TEXT AND ITS ID
    const wordIdKVPairs = new Set();
    for (var i=0; i < wordList.length; i++) {
      if (wordList[i] !== "") {
        wordIdKVPairs.add({word: wordList[i], id: wordIdKVPairs.size});
        console.log(wordIdKVPairs);
      }
    }

    //ARRAY OF WORDS FROM THE TEXT (ONLY THE WORDS)
    const compilationOfWordsFromText = new Set();
    for (var i=0; i < wordList.length; i++) {
      if (wordList[i] !== "") {
        compilationOfWordsFromText.add(wordList[i]);
        console.log(compilationOfWordsFromText);
      }
    }


    //JSON ITEMS IN A "MAP" ARRAY
    const jsonItemsMap = new Map();
    jsonItemsMap.set('items', [...wordIdKVPairs]);


    //THE LIST OF WORDS FROM THE TEXT AND THEIR IDS
    const wordIdItems = {};
    this.setState({
      wordIdItems:
        [...wordIdKVPairs]
    });

    console.log(this.state.wordIdItems); 

    //SIMPLE LIST OF WORDS FROM THE TEXT
    const wordsFromText = Array.from(compilationOfWordsFromText);





    //CHECKING WHETHER YOU ARE GOING TO DROP A FILE T0 SEND THE FORM OR NOT AND ACTS ACCORDINGLY ("MY ITEMS" SHOULD CONTENT THE ITEMS YOU DROPPED AS A DATABASE) (YOU ARE INSIDE OF THE FETCH FUNCTION)
    if (document.getElementById('noDatabaseFile').checked === false) {
      this.alertNoDatabaseFile();
    }

    //VERY FIRST DATABASE JSON FOR THE START OF THE USE OF MY APP CONTAINING THE WORDS FROM THE TEXT AND THEIR IDS
    const databaseJson = [];
    wordsFromText.forEach(function(item,index,object) {
      const daysDate = new Date();
      const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      const newItem = {};
      newItem.word = item;
      newItem.id = databaseJson.length;
      newItem.dates = [today];
      databaseJson.push(newItem);
      //console.log(databaseJson.length);
    }); 

    //YOU HAVE NO DATABASE.JSON AND YOU ENTERED A TEXT
    if(document.getElementById('noDatabaseFile').checked && this.state.value !== "") {
      //ACTIVATION OF ONE DOWNLOAD LINK
      this.a.setAttribute("href","items.json");
      this.a.textContent = "Download new items";
      document.getElementById('download_items').dataset.databaseJson = JSON.stringify({"items": databaseJson});
      const aNewElement = document.createElement('p');
      aNewElement.id = 'items_by_date';
      const aNewHtmlElement = document.getElementById('preview');
      aNewHtmlElement.appendChild(aNewElement);
      
      document.getElementById('items_by_date').dataset.databaseJson = JSON.stringify({"items": databaseJson});
      document.getElementById('download_items').href = window.URL.createObjectURL(new Blob([JSON.stringify({"items": databaseJson},null,2)], {type: 'application/json'}));

      this.setState({
        textAtFileCreation:
          this.state.value
      });

      //UPDATES DAY'S DATE
      const daysDate = new Date();
      const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      //}

      //SIMPLE ARRAY OF WORDS FROM THE TEXT
      const wordsFromText = Array.from(compilationOfWordsFromText);
    }


    

    if(document.getElementById('download_items').dataset.databaseJson === JSON.stringify({"items": databaseJson})) {
      const outputJson = document.getElementById("outputJsonFile");
      const outputLink = document.createElement('a');
      outputLink.id = 'items_by_date';

      outputLink.hidden = true;
      outputJson.hidden = true;
      outputLink.dataset.databaseJson = JSON.stringify({"items": databaseJson});
      outputJson.appendChild(outputLink);
    } else {
      document.getElementById('download_items').dataset.itemsJson = JSON.stringify({"items" : allMyItems});
      document.getElementById('download_items').dataset.databaseJson = JSON.stringify({"items": allMyItems});
      
    };
    //use the data attributes


    const myItemsFromText = document.createElement('a');
    myItemsFromText.href = "";
    myItemsFromText.id = "myItemsFromText";
    myItemsFromText.dataset.myItems = JSON.stringify({"items":databaseJson});
    document.getElementById('preview').appendChild(myItemsFromText);
    const allMyItems = JSON.parse(document.getElementById('myItemsFromText').dataset.myItems).items;


    if(document.getElementById('items_dy_date')) {
      document.getElementById('items_dy_date').remove();
    }
    const downloadAll = document.getElementById('download_all_items');
    const downloadLink = document.createElement('a');
    downloadLink.className += '.obj';
    downloadLink.textContent = 'Items from your database + items from your text';
    downloadLink.id = "items_by_date";
    downloadLink.dataset.databaseJson = JSON.stringify({"items":allMyItems});
    downloadLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": allMyItems},null,2)], {type: 'application/json'}));
    downloadLink.download = "database.json";
    downloadAll.appendChild(downloadLink);


    wordsFromText.forEach(function(item,index,object) {
      const daysDate = new Date();
      const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      
      const newItem = {};
      newItem.word = item;
      newItem.id = JSON.parse(document.getElementById('myItemsFromText').dataset.myItems).items.length;
      newItem.dates = [today];
      JSON.parse(document.getElementById('myItemsFromText').dataset.myItems).items.push(newItem);
      console.log(allMyItems.length);
    }); 

    while(downloadAll.firstChild) {
      downloadAll.removeChild(downloadAll.firstChild);
    }
    //THIS PART SHOULD ONLY EXECUTE IF YOU DROPPED A FILE
    //======DATABASE IS LOADED (FETCH DATABASE JSON IN DROPZONE) ----> ADD NEW WORDS TO DATABASE========//

    //MAKE THE LIST OF VALUES CONTAINED IN "MY ITEMS" IN ""

    //SIMPLE "SET" OF WORDS CONTAINED IN THE DROPPED DATABASE.JSON

    //NO FETCH OCCURS, "MY ITEMS" IS DEFINED IN THE SEND FILE FUNCTION

    //console.log(this.state.wordIdItems);

    //console.log("database and text loadded");
    const mapJson = new Map(Object.entries(document.getElementById('myItemsFromText').dataset.myItems)); 
    console.log(compilationOfWordsFromText);
    let compilationOfWordsFromDatabase = new Set();
    for (let line of mapJson.values()) {
      //...
      compilationOfWordsFromDatabase.add(line.word); 
    }
    

    // EDIT THE "MY ITEMS" ARRAY 
    for (let line of compilationOfWordsFromDatabase) {
      console.log(line);
      console.log(compilationOfWordsFromText);
      //IF A WORD FROM THE TEXT EXISTS IN THE WORD LIST
      if (compilationOfWordsFromText.has(line)) {
        console.log(line);

        this.state.myItems.forEach(function(element) {

          const daysDate = new Date();
          const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
          if (element.word === line && !element.dates.includes(today)) {
            element.dates.push(today); //THE DATE IS ADDED in "MY ITEMS"
            wordsFromText.forEach(function(item, index, object) {
              if (item === line) {
                //object.splice(index, 1); //the item is removed FROM "WORDSFROMTEXT"
                object.splice(index); //the item is removed FROM "WORDSFROMTEXT"
                console.log(wordsFromText.length);
              }
            });
          }
        }); 
      }
    }


    //===FILE PREVIEW AFTER DROP==//
    //if a database.json is loaded, only this will output
    this.setState({allMyItems});
    
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
      }
      //===END JSON UPLOAD===//
    }
  }
  sendTextFile = (file) => {
    const fd = new FormData();
    fd.append('myFile', file);
    fetch(URL.createObjectURL(file))
      .then(function(response) {
        const value = response;
        //this.handleText();    
      })
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
                        //if (fileName && this.state.value.replace(/[!?:;.,]+/g, "").replace(/(\r\n|\n|\r)/gm,"") === "" && file.type === "application/json" && document.getElementById('myItemsForUpload')) {
                        //  if (document.getElementById('items_by_date')) {
                        //    document.getElementById('items_by_date').remove();
                        //  }
                        //  fileName.id = 'items_by_date';
			//  fileName.dataset.databaseJson = JSON.stringify({"items":document.getElementById('myItemsForUpload').dataset.databaseJson});
                        //}
                        //  if (document.getElementById('myItemsForUpload')) {

                        //  }
                        //}
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
    if (!event.target.checked) {
      this.setState({
        noDatabaseFile:
          false,
        preloadOrAutoplay:
          "preload"
      });
    } 

    if (event.target.checked) {
      this.setState({
        noDatabaseFile:
          true,
        preloadOrAutoplay:
          "autoplay"
      });

    

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
    //if (event.target.checked && 
    if(!event.target.checked) {
      this.setState({
        noDatabaseFile:
          false 
      });
      if (document.getElementById('noDatabaseFile').value === false) {
        document.getElementById('dropzone').hidden = false;
      }
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
      if (document.getElementById('noDatabaseFile').checked === (false||undefined)) {
        document.getElementById('dropzone').hidden = false;
      }
    }
    if (event.target.checked === true && event.target.id === "noDatabaseFile") {
      document.getElementById('dropzone').hidden = true;
    }
  }
  alertNoDatabaseFile = (event) => {
    if (/*this.state.value.replace(/[!?:;.,]+/g, "").replace(/(\r\n|\n|\r)/gm,"") !== "" &&*/ document.getElementById('noDatabaseFile').checked === false && window.confirm("You dropped no file. Ok to continue and generate a new database or Cancel and upload a file.")) {
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
  autoplay = (event) => {
    //const allAudioElements = this.state;
    const myElements = document.getElementsByTagName('audio');
    //if(myElements[0]) {
    //  myElements[0].play();
    //}
    //function defineonended(myElements, element) {
    //  if (myElements.indexOf(event.target) === -1) {
    //    myElements[myElements.length - 1].onended = (event) => {
    //    };
    //    //console.log('Le nouveau tableau est : ' + tabLégumes);
    //  } else if (myElements.indexOf() > -1) {
    //    myElements[myElements.indexOf(event.target)].onended = (event) => {
    //      myElements[myElements.indexOf(event.target) + 1].play(); 
    //    }

    if (myElements && myElements.length) {
      myElements[0].play();
    }

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

        <label id={`labelText`}>
          Your Text:

          <br /><textarea onChange={this.handleTextChange} placeholder="Enter a text" value={this.state.value} /> 
          {this.state.textareaIsEmpty}
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
        //<div id={`dropzoneJson`} multiple onDragEnter={this.onDragEnter} onDrop={this.onDrop} onDragOver={this.onDragOver}></div>
        //<div id={`previewMyDatabase`}></div>
