import PageHeader from "./common/pageHeader";
import config from "../config.json";
import { NavLink } from "react-router-dom";

// import ReactDOM from 'react-dom'

function Home() {
  return (
    <>
      <PageHeader Header="Home" />
      <hr />
      <div className="container">
        <div className="row">
          <p className="p-2 m-2 col-sm" style={{ "line-height": 30 }}>
            Welcome to the Musician Finder App. This website was built for you,
            the musicians who are seeking bandmates for their band but don't
            even know where to start. <br />
            Here you will find musicians like you, who want to play together.
            You can find musicians according to what instruments they play,
            where they want to play, their age and so on. <br />
            You can even rate musicians and add them to your favorites. <br />
            So, go on and{" "}
            <span>
              <NavLink to="/signup">register</NavLink>
            </span>{" "}
            (it is free) to{" "}
            <span>
              <NavLink to="/card">create a Musician Card</NavLink>
            </span>
            , search, and be searched by others!
          </p>
          <img
            className="col-sm"
            src={config.apiUrl + "/home_img.jpg"}
            alt="home_img"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
