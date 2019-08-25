import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    axios.get(`./items.json`)
      .then(res => {
        //.const items = this.state.items.map(obj => obj);
        const items = res.data.items.map(obj => obj);
        //const items = this.state.items.map(obj => obj.items);
     //this.state.posts or res.data.data.children
        //;//.items.map(obj => obj.items);
        //console.log(res.data.items[3].original_title); 
        this.setState({ items });
      });
  }

  render() {
    return (
      <div>
        <h1>{`/r/${this.props.subreddit}`}</h1>
        <ul>
          {this.state.items.map(item =>
            <li key={item.id}>{item.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo subreddit="reactjs"/>,
  document.getElementById('root')
);
