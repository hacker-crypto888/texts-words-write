import React, { Component } from "react";
import logo from "./logo.svg";
import "./Appcss.css";

class ImportItems extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "", apiResponse2: "" };
    }

    callAPI() {
      fetch('http://localhost:9000/exportItems')
        .then(res => res.text())
        .then(res => this.setState({apiResponse2: res}))
        .then(res => this.props.jsonData2 = res)
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="App">
                <p id="App-intro" className="App-intro">{this.state.apiResponse2}</p>
            </div>
        );
    }
}
export default valueExport;
