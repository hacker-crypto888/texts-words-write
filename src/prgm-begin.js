import React from 'react';
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
      error: null,
      isLoaded: false,
      items: [],
      items_name:[],
      wordinputError: '',
      audioplayerToggle:"",
      list_filenames:[],
      mydate: "20190101",
      displayPlayer: '',
      onblur:''
    };
  }
  handleWordInput = event => {
    const displayPlayer = (<audio controls> <source src='example.mp3' type='audio/mpeg'></source></audio>);

    this.setState({ wordinput: event.target.value }, () => {
      const { wordinput } = this.state;
    //  const { items } = items;
      const items = this.state.items.map(obj => obj);
      this.validateWordInput();
      this.fieldOnblur();
      this.setState({wordinputError: wordinput === "currentword" ? "well done" : "enter the right word"});
      this.setState({audioplayerToggle: wordinput === "currentword" ? null : displayPlayer});

    });
  }
  validateWordInput = () => {
    const { wordinput } = this.state;
    this.setState({
      wordinputError:
        wordinput.length > 3 ? null : ''
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const { wordinput } = this.state;

    //alert(`Your state values: \n 
      //wordinput: ${wordinput}`);
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
    //const items = this.state;
    //const items = this.state.items.map(obj => obj);
    //const count = this.state.nb;
    //const count2 = count;
    //console.log(count2);
    //console.log(items.find((o) => o.id === 2).name);
    //const tmpItem = items_name;
    //const returnCounter = this.state;
    this.setState({

       nb:
         this.state.nb + 1
       //itemsdisplay:
         //{items.find((o) => o.id === this.state.nb).name
         //this.state.nb*2
       //itemsdisplay:
         //returnCounter()
       //itemsdisplay: 
         //tmpItem[this.state.nb]
       //console.log(items.find((o) => o.id === 2))
    //this.setState({this.state.items.map(item =>
    //this.state.items.map(item =>
       //this.setState({
         //itemsdisplay:
           //<li key={item.id}>{item.title}</li>
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
  render() { 
    return(
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
