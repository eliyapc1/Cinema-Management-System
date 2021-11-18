import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class STO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      warnTime: 1000 * 60 * 10,
      logoutTime: 1000 * 60 * 15,
      warnAlert: "You are about to be logged-out because of no activity.",
      logoutAlert: "Login out...",
    };
  }

  setSTO = () => {
    this.warnTimeout = setTimeout(
      () => console.log(this.state.warnAlert),
      10000
    );
    this.logoutTimeout = setTimeout(() => {
      alert(this.state.logoutAlert);
      sessionStorage.clear();
      this.props.history.push("/");
    }, 20000);
  };

  resetTimeout = () => {
    clearTimeout(this.warnTimeout);
    clearTimeout(this.logoutTimeout);
    this.setSTO();
  };

  componentDidMount() {
    const events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];
    for (const event of events)
      window.addEventListener(event, this.resetTimeout);
    this.setSTO();
  }

  render() {
    return (
      <div>
        <h2>STO</h2>
      </div>
    );
  }
}

export default withRouter(STO);
