import React, { Component } from "react";
import logo from "./logo.svg";
import "./Appcss.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "", apiResponse2: "" };
    }

    callAPI() {
        //fetch("http://localhost:9000/testAPI")
        //    .then(res => res.text())
        //    .then(res => this.setState({ apiResponse: res }))
        //    .catch(err => err);
        fetch('http://localhost:9000/testAPI', {
          method: 'POST',
          body: JSON.stringify({"items":this.props.jsonData}),
          headers: {"Content-Type":"application/json"},

        })
        .then(res => res.text())
        .then(res => this.setState({apiResponse2: res}))

    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <p className="App-intro">{this.state.apiResponse2}</p>
            </div>
        );
    }
}

export default App;
