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
      dateObject:null,
      database:[],
      data:null,
      json:null,
      mydatabase:[],
      dataEntry: []
    }
    this.json = {}  
  }

  componentDidMount() {
    //const database = this.state;
    this.loadJson();
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
    const database = this.state; //database is the loaded JSON array
    const dataEntry = this.state;
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
                dataEntry[dataEntry.length] = database.line;
                dataEntry[dataEntry.length]['id'] = dataEntry.length;
                delete(dataEntry[dataEntry.length]['dates']);
              } else if (this.state.dataEntry.length === 0) {
                const database = this.state;
                const dataEntry=this.state;
                this.state.dataEntry[0] = database.line;
                this.state.dataEntry[0]['id'] = 0;
                delete(this.state.dataEntry[0]['dates']);
              }
            } else if (this.state.dataEntry === null) {
              const database = this.state;
              const dataEntry=[];
              this.state.dataEntry[dataEntry.length] = database.line;
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

    //X (export) (dataEntry -> items)
  }
  render() {
    return (
      <form onSubmit={this.handleSubmitDate}>
      <div>
        <DatePicker
          onChange={this.onChange}
          value={this.state.date}
        />
      </div>
      <div>
        <input onClick={this.handleDateChange} type="submit" value="Submit" className='btn btn-success btn-block' />  
        <button onClick={this.saveJson}>SAVE to LocalStorage</button> 
        <button onClick={this.loadJson}>LOAD to LocalStorage</button> 
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
      //date:'',
      date:new Date(),
      wordsFromLoadedText:[],
      textError:'',
      database:[],
      j:null,
      //printTests:'',
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
      listOfWords:[],
      dateOfTheDay:[],
      datesFromDatabase:[],
      concatAll:null,
      displayDate:null,
      updateDates:[],
      duplicate:null,
      arrays:[],
      testdatabase:[],
      seconddatabase:[],
      x:[],
      emailError: ''
      
    };
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmitText = this.handleSubmitText.bind(this);
  }

  componentDidMount() {
    //const that = this;
    //const today = new Date();
    //const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    
    //that.setState({
    //  date:
    //    date
    //});
  }

  handleNameChange = event => {
    this.setState({ name: event.target.value }, () => {
      this.validateName();
    });
  };

  //handleTextChange = event => {
  //  this.setState({ text: event.target.value });
  //};

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
  //validateText = () => {
  //  const { text } = this.state;
  //  this.setState({
  //    textError:
  //      text.length > 3 ? null : 'Email must be longer than 3 characters'
  //  });
  importAllWords = (event) => {
    axios.get(`./database.json`)
      .then(res => {
        const database = res.data.items.map(obj => obj);
        this.setState({ database });
        //console.log(.find((o) => o.id === 2).name);
        //console.log("mesg");
      });
  }

  handleText = (event) => {
    //event.preventDefault();
    alert(`The text you \n
           entered: \n` + this.state.value);
    //======================SUBMIT TEXT FUNCTION ===========================//
    //assign value of entered text to variable
    const importText = this.state.value;
    //=======================	END SUBMIT TEXT FUNCTION =================//
    //==============ADD NEW WORDS TO DATABASE============================//
    //PREG SPLIT NO EMPTY = remove all punctuation signs and spaces and split into array of words
    //const list = this.state;
    const database = [];
    this.importAllWords();
    //X (import) (database)
    //alert('database'+this.state.database);
    //const displayDate = '2019/05/05';
    //const date = new Date.now();
    //alert(this.state.date);
    //const x = this.state;
    //const jsonArrayArray = this.state;
    //const list = 
    // array unique = only keep one item of each value
    const x = (list) => list.filter((v,i) => list.indexOf(v) === i);
    //x(list);
     
    // second verification = remove all additional signs of each word (keep only a-z and A-Z character of the words)
    const listOfWords = x(importText.split(/[\s.?:;!,]+/)).map(function(y){ return y.replace(/[\W_]+/g," ") }).map(function(x){ return x.toLowerCase() }).filter(function( element ) {
      return element !== null;
    });
    //alert(list[0]);
    //alert(list[10]);
    //alert(list[20]);
    // put all the words in lower cases
    //list = list;

    //remove the "null" from the array
    //list = list.filter(function( element ) {
      //return element !== null;
    //});
    // for each word, 

    //make an array containing date, id and word save each array to a bigger array then save this bigger array in a file and keep this array --- that will be needed for what comes next
    //alert(this.state.list.map(item => (
      //<p>{item}</p>
    //)));
    //const i = this.state;
    const wordsFromLoadedText = [];
    const jsonArrayForMerge2=[]; 
    //const jsonArray = [];
    for (var i = 0; i < listOfWords.length; i++) {
      //const i = this.state;
      //const j=i;
      //alert(list[i]);
      const jsonArray = [];
      jsonArray['word'] = listOfWords[i];  
      //alert(jsonArray['word']); 
      jsonArray['id'] = i;
      //const jsonArray = this.setState({
        //word:
          //list[i],
       //id:
          //i,
        //dates:
          //date
      //});
      //const concat = []; 
      //concat.concat(word);
      //alert(concat,'word');
      //this.setState({printTests: i});
    // Runs 5 times, with values of step 0 through 4.

      //const jsonArray = this.state;
      //const jsonArray=this.state;
      //alert(`{list[{i}]}`);
      //alert(list[i]);
      //const jsonArray['word']=list[i];
      //jsonArray.setState({
        //word:
          //list[j],
        //id:
          //j,
      //});
      // //=====================makes a list of the words to be played today when the user chooses the option Play the words of text just loaded===// 
      //const jsonArrayForMerge2 = jsonArray; 
      wordsFromLoadedText[i] = jsonArray; 
      //X (export) (wordsFromLoadedText -> items)
      //soit exporter le fichier comme json et le réouvrir pour faire fonctionner l'application soit utiliser les mots de la base de donnée sauvegardée en mémoire pour exécuter l'application (option la plus rapide)
      //variable contenant une liste d'arrays devant être exportés au format JSON pour être lisibles par l'application il faudra donner des instructions à l'utilisateur pour sauvegarder le fichier dans une fonction 
      //alertwordsFromLoadedText[i);
      jsonArray['dates'] = [this.state.displayDate];
      //alert(jsonArray['dates']);
      //for (var k = 0; k < jsonArray.length; k++) {
        //const l=k;
        //alert(jsonArray[l]); 
      //}
      //=====================end makes a list of the words to be played today when the user chooses the option Play the words of text just loaded===//

      //============ adds the text of today in the big database =====//

          //console.log('Walking east one step');

        //const l =k;
      const duplicate = 0;
      //if (this.state.database && this.state.database.length) {
      //TO DO write the functions corresponding to the clicking of the submit date button
      //DONE set api for date insertions with charts of each month like a calendar
      //TO DO write the upload and export api functions in the corresponding functions
      //if (database.length > 0) { 
      if (this.state.database && this.state.database.length) {
        if (this.state.database.length > 0) {
          for (let k = 0; k < this.state.database.length; k++) { // database is the big database
            if (this.state.database[k]['word'] === jsonArray['word'])  {
              if (this.state.database[k]['dates'].includes(this.state.displayDate)) {
      //==adds the date of today in the line of the duplicate in the big database==/
                const date = new Date();
                //const dateOfTheDay = [this.state.displayDate];
                const dateOfTheDay = [this.state];
                this.state.dateOfTheDay = [(this.state.date.getMonth()+1)+'/'+this.state.date.getDate()+'/'+this.state.date.getFullYear()];

                const datesFromDatabase = this.state.database[k]['dates'];
                const updateDates = dateOfTheDay.concat(datesFromDatabase);
                this.state.database[k]['dates'] = updateDates;
                const duplicate=1;
                //alert('dates');
              }
            }
          }
        }
      //============end adds the date of today in the right line of the duplicate in the big database====/
      } 
        //===========creates a new line in the big database============/
        //jsonArray['dates']= [date]; //date is date of the day, see DidMountComponent 
        //alert(JSON.stringify(jsonArray['dates']));
        //alert(jsonArray['dates'][0]);
        //alert(jsonArray['id']);
        ///const jsonArray = [];
      if (duplicate === 0) {
        //const jsonArray = this.state;


        //const listOfWords = this.state;
        //const i = this.state; 
        if ((this.state.database) || (this.state.database.length)) {
          if (this.state.database.length > 0) {
            //const databaseLength = database.length;
            const database = this.state; 
            //alert('length bigger than 0', database.length);

            database[database.length] = jsonArray;
            database[database.length]['id'] = this.state.database.length; //the id is equal to the length of the array
            //alert(this.state.database.length);
            //database[database.length]['id'] = jsonArray['id'];
            //database[database.length]['dates'] = jsonArray['dates'];
          } else if (this.state.database.length === 0) {
            //const database = this.state; 
            //alert('length smaller than 0');
            const database = this.state;
            //const seconddatabase = [['']];
            //const testdatabase = [['']];
            //const database = [].concat(seconddatabase, testdatabase);
            //database[0] = [];
            this.state.database[0] = jsonArray;
            this.state.database[0]['id'] = 0;
            //alert(this.state.database.length)
            //alert(this.state.database[0]['word']);
            //alert(database[0]['word']);
            //database[0]['word'] = jsonArray['word'];
            //database[0]['id'] = jsonArray['id'];
            //alert(jsonArray['id']);
            //database[0]['dates'] = jsonArray['dates'];
          }
        } else if (this.state.database === null) {
        
          //alert('null array');
          const database = this.state; //big database 
          //database[0] = [];
          this.state.database[0] = jsonArray;
          this.state.database[0]['id'] = 0;
        }

        //alert(database[0]['word']);
        
        //jsonArray['word'] = listOfWords[i];  
        //jsonArray['id'] = i;
        //jsonArray['dates'] = [this.state.date];

        //const bigDatabase = this.state.database;
        //const concatAll = [].concat(bigDatabase, concatArray);
        //alert(jsonArray['word']);
        //const database = concatAll;
        //alert(database);
        //jsonData[k] = jsonArray;
        //jsonArrayArray = [{jsonArray}];
        //database.concat(jsonArray);
        //the variable database contains all the arrays when the button exported is clicked it good be ok to make a download of the file available to the user
        //===========end creates a new line in the big database============/
        //============end adds the text of today in the big database =====//
          
        
      }
    } 
    //====:::::::::ENCODE BIG DATABASE AND EXPORT TO JSON:::::://
    //X (export) (database)
    // that's all -- make the same array without the date field----and export that file. It is ready for use by our application.
    //see above

    //if this word and date already existed in the file only add the date to the word that already exists 
    //not done yet
    // the user can upload and download the database JSON file with ajax and apis....
    //create two buttons as in my first html page in php
    //first button you can download big database and file for the app
    //second button you can download words selected by date
    //====:::::::::END ENCODE BIG DATABASE AND EXPORT TO JSON:::::://
    //==============END ADD NEW WORDS TO DATABASE============================//
    //==============DATABASE WITH DATA ENTRY DATES======================//
    //import the big database and keep only the items with the data entry date the user specified in the submission form
    //prerequisites: to have saved the big database as a file on the computer beforehand
    //- integrate the function containing the actions taken to loaded the audio files as an integrated component in another component (so that our variables remain accessible by our application)
    //and to have reloaded it on the server
    //importedJsonDatabase 
    //for each line it dates columns includes data entry date
    // save the line to an other array 
    //this new array serves as audio player displayer for the app
    
    //npm i react-datepicker
    //check if the database array is readable from the new function created linked with the click of the button to find words from the database by date
    //second install react date picker and check the validity of the format of the date with the format of the date in the big database array
    //lastly, if everything works fine, bind the picking of the date with the selection of the right words (most by the use of an iterative array)
    //==============END DATABASE WITH DATA ENTRY DATES======================//


  } 
  //}


  handleSubmitText = event => {

    const { name, email } = this.state;
    //alert(`Your state values: \n 
    //        name: ${name} \n 
    //const date = this.state;
    //this.setState({
    //  printTests:
    //    date
    //});
//        email: ${email} \n` + this.state.value);
    event.preventDefault();
    this.handleText();
    //event.preventDefault();
  }
  //handleChange = (event) => {
    //this.setState({value: event.target.value});
  //}
  handleDateChange = date => this.setState({date});
  
  render() {
    return (
      <form onSubmit={this.handleSubmitText}>
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
          <textarea placeholder="Enter a text" value={this.state.value} /> //onChange={this.handleChange} /> //value=this.state.value
        </label>
        <input type="submit" value="Submit" className='btn btn-success btn-block' />  
         
      </form>
    );
  }
}

//button type'submit' className'btn btn-success btn-block'
          //Submit
        //button
ReactDOM.render(<BasicForm />, document.getElementById('root'));
