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
    //this.focusTextInput.current.focus();
    //this.setState({ inputValue: event.target.value }, () => {
      //const item2 = this.state;
      //const item = this.state;

      //const { wordinput } = this.state;

      //const items = this.state.items.map(obj => obj);
      //const displayPlayer = (<audio controls> <source src={`${item.name}${item.id}.mp3`} type='audio/mpeg'></source></audio>);
      //this.validateWordInput();
     // this.fieldOnblur();

      //this.setState({audioplayerToggle: wordinput === item.name ? null : displayPlayer});

    //});
  
  validateWordInput = () => {
    const { wordinput } = this.state;
    this.setState({
      //wordinputError:
        //wordinput.length > 3 ? null : ''
    });
  }
//  renderfunction = () => {
    //const itemname = this.state;

      //controlsValue: 
        //audioRef
      //controls:
        //this.audioRef.current.controls
      //controls:
        //inputValue === targetValue ? "" : true,
      //audioframe:
        //this.renderfunction 

    //});
    //this.audioRef.setAttribute({
  //}
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
    //);
    

    //console.log(items.find((o) => o.id === this.state.nb));
    //console.log(items.find((o) => o.id === this.state.nb));
  }
  componentDidMount() {
    //this.focusAudioSource();
    //this.audioSource.current.focusAudioSource();
    axios.get(`./items.json`)
      .then(res => {
        const items = res.data.items.map(obj => obj);
        this.setState({ items });
        console.log(items.find((o) => o.id === 2).name);
        console.log("mesg");
        //this.setState({itemsdisplay: items.find((o) => o.id === 2).name});
        //{this.state.items.map(item => (
        //  {itemsdisplay: {item}}
        //))}
      });
  }
  onSelect(event) {
    const selectedIndex = event.target.options.selectedIndex;
    //console.log(event.target.options[selectedIndex].getAttribute('data-key'));
  }

  userInputValues = () => {
    const inputValue = this.state;
//this.setState({ inputValue: e.target.value })A
   
    //console.log(inputValue); 
  //this.setState({inputValue: ''}); 
  //console.log(inputValue);
  }
  //controlsFalse = (audioRef) => {
     
  //  this.audioRef.current.setAttribute("controls","false");
  //}
  handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = this.state;
    const targetValue = this.state;
    //this.setState({
      //wordtest:
        //inputValue === targetValue ? `Values: \n ${inputValue}/${targetValue} ok` : `Values: \n ${inputValue}/${targetValue} not ok`  
      //targetValue:
        //this.audioRef.id,
      //inputValue:
        //this.state.inputValue
    //});
    //});
  }
  //onClickUploadFile = () => {
  disableButton = (event) => {
    event.preventDefault();
    const { targetValue, inputValue } = this.state;
    //this.setState({item : items}, () => console.log("ITEMS : ", this.state.item) );
    this.btn.setAttribute("disabled", "disabled");

    console.log({targetValue});
    console.log({inputValue});
    this.setState({
      wordtest:
        inputValue === targetValue ? this.removeAudioPlayer() : null//`Values: \n ${inputValue} / ${targetValue} not ok`,
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
              //
serviceWorker.unregister();
