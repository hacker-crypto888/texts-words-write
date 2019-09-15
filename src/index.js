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
      audioElements:null
    };
  }
  getInitialState = () => {
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
    document.getElementById('loadingAudioFiles').hidden = true;
    document.getElementById('loadItemsForNewGame').hidden = false;
    document.getElementById('dropItemsForNewGame').hidden = true;
    document.getElementById('dropNewItems').hidden = true;
    document.getElementById('dropSameItems').hidden = true;
    //this.setState({ 
    //  itemsImportMode:
    //    "loadItems"
    //});
    document.getElementById('dropzoneItems').hidden = true;
    this.btn.setAttribute('disabled','disabled'); 

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
    const myAudioFiles = document.getElementById('myAudioFiles');
    document.getElementById('loadingAudioFiles').hidden = false;
    fetch("https://raw.githubusercontent.com/nathanielove/English-words-pronunciation-mp3-audio-download/master/ultimate.json")
      .then(function(response){
        return response.json();
      })
      .then(function(mp3WordList){
        const myBlub = document.getElementById('fhff'); //// replace the fetch in local dir
        const items = [...Object.values(myBlub.items)];
        items.forEach(function(item, index, object) {
          console.log(item);
          const myAudioFiles = document.getElementById('myAudioFiles');
          const audioFilePreview = document.createElement('audio'); 
          audioFilePreview.className=item.word;
          audioFilePreview.key=item.id;
          audioFilePreview.id=item.word;
          audioFilePreview.controls=true;

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
              myAudioFiles.appendChild(audioFilePreview);
            }
          });
          document.getElementById('loadingAudioFiles').hidden = true;
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
			const preview = document.getElementById("previewMyItems");
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

  onDropItems = (event) => {
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
          if (file.name === "items.json") {
          	this.sendItems(file);
          }
      }
      //===END JSON UPLOAD===//
    }
  }

  sendItems = (file) => {
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
        this.setState({
          itemsWereDropped:
            true
        });
        
        if(myItems.length) {

          if (window.confirm('you just loaded a new items.json. press ok to start a new game. cancel to drop a new items.json file.')) {
            document.getElementById('loadingAudioFiles').hidden = false;
            document.getElementById('dropzoneItems').hidden = true;
            fetch("https://raw.githubusercontent.com/nathanielove/English-words-pronunciation-mp3-audio-download/master/ultimate.json")
              .then(function(response){
                return response.json();
              })
              .then(function(mp3WordList){
                const myAudioFiles = document.getElementById('myAudioFiles');
                while(myAudioFiles.firstChild) {
                  myAudioFiles.removeChild(myAudioFiles.firstChild);
                }
                myItems.forEach(function(item, index, object) {
                  console.log(item);

                  const audioFilePreview = document.createElement('audio'); 
                  audioFilePreview.className=item.word;
                  audioFilePreview.key=item.id;
                  audioFilePreview.id=item.word;
                  audioFilePreview.controls=true;

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

                      });
                      myAudioFiles.appendChild(audioFilePreview);
                      document.getElementById('loadingAudioFiles').hidden = true;
                      document.getElementById('dropSameItems').hidden = false;
                      document.getElementById('dropNewItems').hidden = false;
                    }
                  });
                })
              })
          } else {
            document.getElementById('dropItemsForNewGame').hidden = true;  
            const myPreviewNode = document.getElementById('previewMyItems');
            while(myPreviewNode.firstChild) {
              myPreviewNode.removeChild(myPreviewNode.firstChild);
            }
            //clear 
          }
        }
      })
    console.log(this.state.myBlob);
  }
  setItemsImportMode = (event) => {
    this.setState({
      itemsImportMode:
        event.target.value
    });
    if(this.state.itemsImportMode === "dropItems") {
      document.getElementById('dropzoneItems').hidden = true;
      document.getElementById('loadItemsForNewGame').hidden = false;
      document.getElementById('dropItemsForNewGame').hidden = true;
      const myPreviewNode = document.getElementById('previewMyItems');
      while(myPreviewNode.firstChild) {
        myPreviewNode.removeChild(myPreviewNode.firstChild);
      }
      const myAudioNode = document.getElementById('myAudioFiles');
      while(myAudioNode.firstChild) {
        myAudioNode.removeChild(myAudioNode.firstChild);
      }
    } else {    
      document.getElementById('dropzoneItems').hidden = false;
      document.getElementById('loadItemsForNewGame').hidden = true;
      document.getElementById('dropItemsForNewGame').hidden = true;
      const myAudioNode = document.getElementById('myAudioFiles');
      while(myAudioNode.firstChild) {
        myAudioNode.removeChild(myAudioNode.firstChild);
      }
    }           
  }             
  startGameWithDroppedFiles = (event) => {

  }
  dropNewItems = (event) => {
    const myNode = document.getElementById('myAudioFiles');
    document.getElementById('dropzoneItems').hidden = false;
    while(myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    const preview = document.getElementById('previewMyItems');
    while(preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
    document.getElementById('dropNewItems').hidden = true;
    document.getElementById('dropSameItems').hidden = true;

  }
  dropSameItems = (event) => {
    document.getElementById('dropNewItems').hidden = false;
    document.getElementById('dropSameItems').hidden = false;
    const audioElements = document.getElementsByTagName('audio');
    console.log(audioElements);
    for (let file of audioElements) {
      file.controls= true;
      file.pause();
      file.currentTime = 0;
    }
  }
  render() { 
    
    return(
      <form onSubmit={this.handleSubmit}>
           <div id={`setItemsImportMode`} /*onChange={event => this.setItemsImportMode(event)}*/>
             <input type={`radio`} id={`loadItemsByDate`} value={`loadItems`} name={`itemsImportMode`} />
             <label for={`loadItemsByDate`}> I have a database.json file that I have to load items by date from</label>
             <input type={`radio`} id={`dropMyItems`} value={`dropItems`} name={`itemsImportMode`} />
             <label for={`dropMyItems`}> I prefer to drop my own database.json file</label>
           </div>
           <div id={`dropzoneItems`} multiple onDragEnter={this.onDragEnter} onDrop={this.onDropItems} onDragOver={this.onDragOver}></div>
           <div id={`previewMyItems`}></div>
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
             <button id={`dropItemsForNewGame`} onClick={this.startGameWithDroppedFiles}>
               Start a new game
             </button>
             <button id={`dropSameItems`} onClick={this.dropSameItems}>
               Start over 
             </button>
             <button id={`dropNewItems`} onClick={this.dropNewItems}>
               Drop a new file
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
      myPreviewNode:null
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
    //document.getElementById('myDatePicker').hidden = true;
    //document.getElementById('dropzoneSortByDate').addEventListener('onscroll',this.itemsByDate);
    //  importMode:
    //    "drop"
    //});
  }
  onChange = (date) => {
    this.setState({ date });
    const myNode = document.getElementById('outputJsonFile');
    while(myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
    }
    const myInputNode = document.getElementById('inputJsonFile');
    while(myInputNode.firstChild) {
      myInputNode.removeChild(myInputNode.firstChild);
    }
  }
  loadJson = (event) => {
    if (!document.getElementById('jsonString')) {
      const downloadAll = document.getElementById("inputJsonFile");
      const jsonString = document.createElement('input');
      const downloadLink = document.createElement('input');
      downloadLink.className += '.obj';
      downloadLink.innerHTML = 'load by date JSON';
      downloadLink.download = "database.json";
      jsonString.id = "jsonString";
      jsonString.value = this.state.jsonContent;
      jsonString.hidden = true; 
      downloadAll.appendChild(jsonString);
    }
    const selectedDate = (this.state.date.getMonth()+1)+'/'+this.state.date.getDate()+'/'+this.state.date.getFullYear();
    
    console.log(this.state.date); 
    console.log(selectedDate); 
    const myBlob = document.getElementById('jjj'); //take the data attribute of this element, call it my Blob and pick all the items at once
    //replace the fetch in local dir
    const myBlub = [...Object.values(myBlob.items)];
    document.getElementById("jsonString").value = JSON.stringify(myBlub);
    const content = document.getElementById('jsonString').value;
    console.log(content);
    //======re-display download link for database.json (once)=====//
    if (!document.getElementById('database_file')) { 
      const downloadAll = document.getElementById("inputJsonFile");
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
    });
    if (![...myItemsByDate].length){
      document.getElementById('database_file').remove(); 
    }
    if ([...myItemsByDate].length){
      alert('Your JSON file with items sorted by date is ready. save it under public/ directory of your app, reload page and start playing!');
      //}
      const outputJson = document.getElementById("outputJsonFile");
      const outputLink = document.createElement('a');
      console.log(myItemsByDate);
      outputLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": [...myItemsByDate]},null,2)], {type: 'application/json'}));
      outputLink.innerHTML = "download JSON file (date of data entry: "+selectedDate+ ")";
      outputLink.download = 'items.json';
      outputLink.id = 'items_by_date';
      outputJson.appendChild(outputLink);

    } else {
      const outputJson = document.getElementById("outputJsonFile");
      const outputLink = document.createElement('p');
      outputLink.textContent = 'no item corresponds to your request.';
      outputLink.id = 'noitem';
      outputJson.appendChild(outputLink);
    }
  }

  handleSubmittedDate = (event) => {


    if(this.state.importMode === "load" && window.confirm('Are you sure that you saved your database in the public/ directory of your app? Press ok to continue. Else, press cancel to choose an other processing mode.')) {
      const myNode = document.getElementById('outputJsonFile');
      while(myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
      const myInputNode = document.getElementById('inputJsonFile');
      while(myInputNode.firstChild) {
        myInputNode.removeChild(myInputNode.firstChild);
      }

      this.loadJson();
    } else {
    }
      //you click. how to determine if the database is already loaded and act in function of that. Example: the database is loaded in "my Items" (in the function sendFile (file), so you will just do stuff (like below with what's in "my Items".
      // other possibility: the database is not loaded, so you will just cancel these operations.

      // drop the json files
      //generate my Items by date using my Items
    if (this.state.importMode === "drop") {
      const myItems = this.state;
      if (this.state.myItems === null) {
        alert("The program could not proceed. There must be an error with the file you loaded in the dropzone. Drop a new file and try again.");
      } else {
        const selectedDate = (this.state.date.getMonth()+1)+'/'+this.state.date.getDate()+'/'+this.state.date.getFullYear();
        //console.log(myItems);
        const myItemsByDate = new Set();
        console.log(selectedDate); 
        if (this.state.myItems.length > 0 && this.state.myItems !== undefined) {
          this.state.myItems.forEach(function(item, index, object) {
            if(item.dates.includes(selectedDate)){
              myItemsByDate.add(item); 
              
            }
          });
        }
        if ([...myItemsByDate].length){
          const myNode = document.getElementById('outputJsonFile');
          while(myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
          }
          const myInputNode = document.getElementById('inputJsonFile');
          while(myInputNode.firstChild) {
            myInputNode.removeChild(myInputNode.firstChild);
          }
          const outputJson = document.getElementById("outputJsonFile");
          const outputLink = document.createElement('a');
          console.log(myItemsByDate);
          outputLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": [...myItemsByDate]},null,2)], {type: 'application/json'}));
          outputLink.innerHTML = "download JSON file (date of data entry: "+selectedDate+ ")";
          outputLink.download = 'items.json';
          outputLink.id = 'items_by_date';
          outputJson.appendChild(outputLink);
          alert('Your JSON file with items sorted by date is ready. save it under public/ directory of your app, reload page and start playing!');
        } else {
          const myNode = document.getElementById('outputJsonFile');
          while(myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
          }
          const myInputNode = document.getElementById('inputJsonFile');
          while(myInputNode.firstChild) {
            myInputNode.removeChild(myInputNode.firstChild);
          }
          const outputJson = document.getElementById("outputJsonFile");
          const outputLink = document.createElement('p');
          outputLink.textContent = 'no item corresponds to your request.';
          outputLink.id = 'noitem';
          outputJson.appendChild(outputLink);
        }
        
      } 
      
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
			reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img); //if the file is an image, insert the content of the imageas the image in the dropbox
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
      const myNode = document.getElementById('outputJsonFile');
      while(myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
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
      const myNode = document.getElementById('outputJsonFile');
      while(myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
      }
      const myInputNode = document.getElementById('inputJsonFile');
      while(myInputNode.firstChild) {
        myInputNode.removeChild(myInputNode.firstChild);
      }
    }           
  }             
  itemsByDate = (event) => {
    alert('test');
    if (document.getElementById('download_items').dataset.databaseJson) {
      console.log(event.target.clientHeight);
      document.getElementById('dropMyJson').removeAttribute('hidden');
      document.getElementById('labelDropMyJson').removeAttribute('hidden');

      document.getElementById('jsonInPublicDir').removeAttribute('hidden');
      document.getElementById('dropzoneSortByDate').hidden = true;
      document.getElementById('jsonInPublicDir').checked = true;
      document.getElementById('labelJsonInPublicDir').removeAttribute('hidden');
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
          onMouseOver={this.itemsByDate}
          value={this.state.date}
        />
      </div>
      <div>
        <input type="submit" value="Submit selected date" className='btn btn-success btn-block' />  
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
      databaseJson:null,
      textAtFileCreation:null,
      textareaIsEmpty:null,
      itemsWereDropped:null

    };
    this.handleSubmittedText = this.handleSubmittedText.bind(this);

  }

  componentDidMount() {
    //if(document.getElementById('download_items').dataset.itemsJson.length) {
      //alert('items json file is ready');
    //}
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
    //create the file to make the app work now
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
    if (this.state.value.replace(/[!?:;.,]+/g, "").replace(/(\r\n|\n|\r)/gm,"") === "") {
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
    //YOU HAVE NO DATABASE.JSON AND YOU ENTERED A TEXT
    if(document.getElementById('noDatabaseFile').checked && this.state.value !== "") {
      this.a.setAttribute("href","items.json");
      this.a.textContent = "Download your JSON file with words from the text";
      document.getElementById('download_items').href = window.URL.createObjectURL(new Blob([JSON.stringify({"items": databaseJson},null,2)], {type: 'application/json'}));
      const downloadAll = document.getElementById('download_all_items');
      const downloadLink = document.createElement('a');
      downloadLink.className += '.obj';
      downloadLink.id = "databaseAfterNewText"; //database after new text
      downloadLink.textContent = 'Download all new items as a new JSON database';
      downloadLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": databaseJson},null,2)], {type: 'application/json'}));
      downloadLink.download = "database.json";
      downloadAll.appendChild(downloadLink);
      this.databasejson();
      this.setState({
        textAtFileCreation:
          this.state.value
      });
    }
    //==== update the date field of each item in the database=========//
    console.log(this.state.noDatabaseFile);
    if (this.state.myItems !== undefined) { 
      console.log(this.state.myItems.length);
      console.log(this.state.myItems[6]['word']);
    } else if (this.state.myItems === undefined && document.getElementById('noDatabaseFile').checked === false) {
      this.alertNoDatabaseFile();
    }
    //YOU HAVE NO DATABASE.JSON AND YOU HAVE NO ITEMS
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
        compilationOfWordsFromDatabase.add(line.word); //LA LISTE DES VALEURS CONTENUES DANS "MY ITEMS"
      }
      console.log(compilationOfWordsFromDatabase.values());
      console.log(compilationOfWordsFromDatabase);
      for (let line of mapJson.values()) {
        const daysDate = new Date();
        const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
      }
      //restOfWords
      const wordsFromText = Array.from(compilationOfWordsFromText);
      // WORD LIST
      for (let line of compilationOfWordsFromDatabase) {
        //IF A WORD FROM THE TEXT EXISTS IN THE WORD LIST
        if (Array.from(compilationOfWordsFromText).includes(line)) {
          this.state.myItems.forEach(function(element) {
            const daysDate = new Date();
            const today = (daysDate.getMonth()+1)+'/'+daysDate.getDate()+'/'+daysDate.getFullYear();
            if (element.word === line && !element.dates.includes(today)) {
              element.dates.push(today); //THE DATE IS ADDED in "MY ITEMS"
              wordsFromText.forEach(function(item, index, object) {
                if (item === line) {
                  object.splice(index, 1); //the item is removed FROM "WORDSFROMTEXT"
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
      while(downloadAll.firstChild) {
        downloadAll.removeChild(downloadAll.firstChild);
      }

      //===FILE PREVIEW AFTER DROP==//
      //if a database.json is loaded, only this will output
      this.setState({allMyItems});
      this.a.dataset.itemsJson = databaseJson;
      this.a.dataset.databaseJson = databaseJson;
      const downloadLink = document.createElement('a');
      downloadLink.className += '.obj';
      downloadLink.textContent = 'Items from your database + items from your text';
      //perhaps i can "send" this file to the date picker
      //"send" this new file to the same form but in the input of database.json file
      //generate the audio files with the text at hand
      // do all those things
      //but you cannot drop a text file
      //chose among a selection of texts
      //import docs pdf...
      //perhaps i can do all of this with the dataattributes which can store arrays
      //perhaps i can totally "reverse" or do the opposite of what my interface does by removing the fetch in local directories options
      //use the data attributes
      downloadLink.href = URL.createObjectURL(new Blob([JSON.stringify({"items": allMyItems},null,2)], {type: 'application/json'}));
      downloadLink.download = "database.json";
      downloadAll.appendChild(downloadLink);
    }
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
    if (this.state.value.replace(/[!?:;.,]+/g, "").replace(/(\r\n|\n|\r)/gm,"") !== "" && document.getElementById('noDatabaseFile').checked === false && window.confirm("You dropped no file. Ok to continue and generate a new database or Cancel and upload a file.")) {
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
