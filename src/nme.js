import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class FetchDemo extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    axios.get(`items.json`)
      .then(res => {
        const items = res.data.data.children.map(obj => obj.data);
        this.setState({ items });
      });
  }

  render() {
    return (
      <div>
        <h1>{`/r/`}</h1>
        <ul>
          {this.state.items.map(item =>
            <li key={item.id}>{item.name}>{item.price}>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(
  <FetchDemo/>,
  document.getElementById('root')
);
