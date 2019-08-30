import React, {useState} from 'react'; 
import ReactDOM from 'react-dom'; 
import $ from 'jquery'; 
import './index.css';
import axios from 'axios';
//import App from './App';
import * as serviceWorker from './serviceWorker';
const s = document.createElement("script");
s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js";
s.onload = function(e){ /* now that its loaded, do something */ }; 
document.head.appendChild(s); 
class BasicForm extends React.Component {
  constructor(props) {
    super(props);
    //this.audioSource = null;
  
    //this.setAudioSourceRef = element => {
      //this.audioSource = element;
    //};
    
    //this.focusAudioSource = () => {
      //if (this.audioSource) this.audioSource.focus();
    //};
    //this.audioSource = React.createRef();

    //this.onSelect = this.onSelect.bind(this);
    //this.audioRef = React.createRef();
    //this.handleAudio = this.handleAudio.bind(this);
    //this.focusTextInput = React.createRef();
    //this.audioRef = this.audioRef.bind(this);
    //this.controlsFalse = this.controlsFalse.bind(this);
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
            </div>
          </form>
    );
  }
}

ReactDOM.render(<BasicForm />, document.getElementById('root'));

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      value: "",
      text:'',
      textError:'',
      nameError: '',
      emailError: ''
      
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
 
  handleText = (event) => {
    event.preventDefault();
    alert(`The text youi \n
           entered: \n` + this.state.value);
    //assign value of text entered to variable

    //PREG SPLIT NO EMPTY = remove all punctuation signs and spaces and split into array of words

    // array unique = only keep one item of each value

    // second verification = remove all additional signs of each word (keep only a-z and A-Z character of the words)

    // put all the words in lower cases

    //remove the "null" from the array
    // for each word, 
    
    //make an array containing date, id and word save each array to a bigger array then save this bigger array in a file and keep this array --- that will be needed for what comes next

    // that's all -- make the same array without the date field----and if this word and date already existed in the file only add the date to the word that already exists 

    // i needed to upload and download the database JSON file and do it with ajax and apis....
  } 
  //}

  handleSubmit = event => {
    const { name, email } = this.state;
    //alert(`Your state values: \n 
    //        name: ${name} \n 
    //        email: ${email} \n` + this.state.value);
    this.handleText();
    event.preventDefault();
  };
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
          <textarea placeholder="Enter a text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" className='btn btn-success btn-block' />  
      </form>
    );
  }
}

//button type'submit' className'btn btn-success btn-block'
          //Submit
        //button
ReactDOM.render(<RegistrationForm />, document.getElementById('root'));
