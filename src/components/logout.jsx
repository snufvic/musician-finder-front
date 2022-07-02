import { Component } from "react";
import musicianService from "../services/musicianService";

class LogOut extends Component {
  state = {};

  componentDidMount() {
    musicianService.logout();
    window.location = "/";
  }
  render() {
    return null;
  }
}

export default LogOut;
