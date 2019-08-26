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
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      nb: 0,
      wordinput: '',
      inputValue:'',
      targetValue: '',
      error: null,
      isLoaded: false,
      item: [],
      item2: [],
      items: [],
      items_name:[],
      wordinputError: '',
      user: '',
      audioplayerToggle:"",
      list_filenames:[],
      mydate: "20190101",
      displayPlayer: '',
      onblur:''
    };
  }
  handleWordInput = event => {

    //const inputValue = this.state;
    this.btn.removeAttribute("disabled");
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
  }
  validateWordInput = () => {
    const { wordinput } = this.state;
    this.setState({
      //wordinputError:
        //wordinput.length > 3 ? null : ''
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { targetValue } = this.state;
    const { inputValue } = this.state;
    this.setState({
      valuestest:
        inputValue === targetValue ? `Your state values: \n Values: ${inputValue}/${targetValue}ok` : `Your state values: \n Values: ${inputValue}/${targetValue}not ok`
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
    //);
    

    //console.log(items.find((o) => o.id === this.state.nb));
    //console.log(items.find((o) => o.id === this.state.nb));
  }
  componentDidMount() {
    axios.get(`./items.json`)
      .then(res => {
        const items = res.data.items.map(obj => obj);
        this.setState({ items });
        console.log(items.find((o) => o.id === 2).name);
        //this.setState({itemsdisplay: items.find((o) => o.id === 2).name});
        //{this.state.items.map(item => (
        //  {itemsdisplay: {item}}
        //))}
      });
  }
  onSelect(event) {
    const selectedIndex = event.target.options.selectedIndex;
    console.log(event.target.options[selectedIndex].getAttribute('data-key'));
  }

  userInputValues = () => {
    const inputValue = this.state;
//this.setState({ inputValue: e.target.value })
    console.log(inputValue);
    //this.setState({inputValue: ''});
    //console.log(inputValue);
  }
  onClickUploadFile = () => {
    const items = this.state;
    //this.setState({item : items}, () => console.log("ITEMS : ", this.state.item) );

    //this.refs.btn.setAttribute("disabled", "disabled");
    //  ref={btn => { this.btn = btn; }}  
    this.btn.setAttribute("disabled", "disabled");
    //this.btn.setAttribute("disabled", "disabled");
    //this.btn.removeAttribute("disabled");
  }
  render() { 
    const { wordinput } = this.state;
    const item = this.state;
    const item2 = this.state.item;
    const displayPlayer = (<audio controls> <source src={`${item.name}${item.id}.mp3`} type='audio/mpeg'></source></audio>);

    /*return(
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'> 

          <label htmlFor='wordinput'>Word</label>
          <input
            name='wordinput'
            className={`form-control ${this.state.wordinputError ? 'is-invalid' : ''}`}
            id='wordinput'
            placeholder='Enter word'
            value={this.state.wordinput}
            onChange={this.handleWordInput} 

            onBlur={this.validateWordInput}
            onFocus={this.handleWordInput}
            onBlur={this.handleWordInput}
            onBlur={this.fieldOnblur}
          />
          <div className='invalid-feedback'>{this.state.wordinputError}</div>
          <div className='audioplayer'>{this.state.audioplayerToggle}</div>
          </div> 
          <div>
          <h1>{this.state.nb}{this.state.itemsdisplay}</h1>
          <button onMouseDown={this.increment} > 
            click me
          </button>
          </div>
          <div>
          <select onChange = {this.onSelect}>
            <option key="1" data-key="1">One</option> 
            <option key="2" data-key="2">Two</option>
          </select> 
          </div>
          <div>
          <h1>{`/r/${this.props.subreddit}`}</h1>
          <ul>
            {this.state.items.map(item =>
              <li key={item.id}>{item.name} {item.price}</li>
            )}
          </ul>
          </div>
        </form>
      );*/
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
                onFocus={this.handleWordInput}
                onChange={e => this.setState({ inputValue: e.target.value }) }
                //onBlur={this.fieldOnblur}
//this.setState({ inputValue: e.target.value })
              />
              <button ref={btn => { this.btn = btn; }}  onMouseDown={this.userInputValues} onClick={this.onClickUploadFile} > 
                click me
              </button>
              <div>{this.state.valuestest}</div>
              <div>{this.state.items.map(item =>
                <audio onPlay={e => this.setState({ targetValue: e.target.id })} id={item.name} controls> <source src={`${item.name}.mp3`}  type='audio/mpeg'></source></audio>)}<br />
              </div>
            </div>
          </form>

    );
  }
}

ReactDOM.render(<BasicForm />, document.getElementById('root'));
//how to do things so that the id of theitem is that of the counter???
//so? how to do that????
//is it possible to integrate the code with setStates inside of the items.map loop?

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
