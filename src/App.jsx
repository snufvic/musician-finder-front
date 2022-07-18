import React, { Component } from "react";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import About from "./components/about";
import Footer from "./components/footer";
import Home from "./components/home";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./components/signin";
import musicianService from "./services/musicianService";
import LogOut from "./components/logout";
import UpdateCard from "./components/updateCard";
import PasswordReset from "./components/passwordReset";
import ConfirmCode from "./components/confirmCode";
import ProtectedRoute from "./components/common/protectedRoute";
import CardsList from "./components/cardsList";
import AdminView from "./components/admin";
import ProtectedAdmin from "./components/common/ProtectedAdmin";

const icon = "bi bi-file-music";

class App extends Component {
  state = {};

  componentDidMount() {
    document.title = "Musician Finder";
    this.setState({ user: musicianService.getMusician() });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="app d-flex flex-column min-vh-100">
        <ToastContainer />
        <header>
          <Navbar icon={icon} user={user} />
        </header>
        <main className="container flex-fill">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About user={user} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />

            <Route
              path="/card"
              element={
                <ProtectedRoute>
                  <UpdateCard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cards_list"
              element={
                <ProtectedRoute>
                  <CardsList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedAdmin>
                  <AdminView />
                </ProtectedAdmin>
              }
            />

            <Route path="/logout" element={<LogOut />} />
            <Route path="/reset_password" element={<PasswordReset />} />
            <Route path="/confirm_code" element={<ConfirmCode />} />
          </Routes>
        </main>

        <Footer icon={icon} />
      </div>
    );
  }
}

export default App;
