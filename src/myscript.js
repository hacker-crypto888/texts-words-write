import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery'; 
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
const s = document.createElement("script");
s.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js";
s.onload = function(e){ /* now that its loaded, do something */ }; 
document.head.appendChild(s); 
class BasicForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nb: 0,
      wordinput: '',
      error: null,
      isLoaded: false,
      items: [],
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
      this.validateWordInput();
      this.fieldOnblur();
      //this.loadFile();
      //this.saveUserWordInput();
      //const { currentword } = this.state.nb;
      //const nb = this.state;
      //const list_words = this.state;
      //const currentword = list_words[{nb.value}];
      //this.setState({displaycurrentword: currentword});
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
  //handleSubmit = () => 
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
  //displayCurrentWord = () => {
    //const nb = this.state;
    //const list_words = this.state;
    ///const currentword = list_words[{this.state.nb}];
    //this.setState({ 
      //displaycurrentword:
        //currentword 
    //});
  //}
  increment = () => {
    this.setState({
       nb:
         this.state.nb + 1
    });
  }
  //WordList = props => {
  //  const words = props.words;
  //  const listItems = words.map((word) =>
  //    <li>{word}</li>
  //  );
  //  return (
  //    <ul>{listItems}</ul>
  //  );
  //} 

  //const currentword = list_words[{this.state.nb}];

//ajax request in javascript
  //$.get('./text1.txt',{},function(content){
    const all_lines=content.split('\n');
    const selected_date = "20190101";
    for(let i = 0;i < all_lines.length; i++){
      console.log(all_lines[i]);
      const csvfile_line = all_lines[i].split(',');
      if (csvfile_line.includes(mydate) === true) {
        list_filenames.push(all_lines[1]);
        list_words.push(all_lines[0]);
      }

    }
  });

//ajax request react
  //loadFile = () => {
  //  const request = new XMLHttpRequest();
  //  request.open('POST', './story.txt', true);
   //request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    //const data = this.state;
    //request.send(data);

    //this.setState({
    //  mytextarea:
    //    data
    //})
  //} 
  //componentDidMount() {
  //  fetch("./items.json")
  /*    .then(res => res.json())
      //.then(res => res.text())
      //.then(res => console.log(text))

      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result.items
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }*/
  render() {
    /*const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li key={item.name}>
              {item.name} {item.price}
            </li>
          ))}
        </ul>
      );
    };*/
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
            //onBlur={this.handleWordInput}
            //onBlur={this.fieldOnblur}
          />
          <div className='invalid-feedback'>{this.state.wordinputError}</div>
          <div className='audioplayer'>{this.state.audioplayerToggle}</div>
        </div> 
        <div>
          <h1>{this.state.nb}</h1>
          <button onMouseDown={this.increment} >
            click me
          </button>
        </div>
      </form>
    );
  }
}

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<BasicForm />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
