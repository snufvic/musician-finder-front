import PageHeader from "./common/pageHeader";
import config from "../config.json";
import { NavLink } from "react-router-dom";

function About({ user }) {
  return (
    <>
      <PageHeader Header="About" />
      <hr />
      <div className="container">
        <div className="row">
          <p className="p-2 m-2 col-sm">
            Welcome again to the Musician Finder app. <br /> My name is Amit
            Wicnudel, and as a bass player I always wanted to be able to connect
            easily with other musicians in my area, or find a drummer that would
            want to practice with me. This is the main idea of this app. <br />
            It allows people to join this network by creating a profile and a
            musician card. <br />
            Only registered accounts can search other musician cards. <br />
            After{" "}
            {user ? (
              "registering "
            ) : (
              <span>
                <NavLink to="/signup">registering</NavLink>
              </span>
            )}{" "}
            and{" "}
            {user ? (
              "signing in "
            ) : (
              <span>
                <NavLink to="/signin">signing in</NavLink>
              </span>
            )}
            , the{" "}
            {user ? (
              <span>
                <NavLink to="/cards_list">search tab</NavLink>
              </span>
            ) : (
              "search tab"
            )}{" "}
            will be visible.
            <br /> In the search tab you can find all the musicians who created
            cards, mark them as your favorite, and use the search box to find
            specific musicians. <br />
            You could also{" "}
            {user ? (
              <span>
                <NavLink to="/card">create your own musician card</NavLink>
              </span>
            ) : (
              "create your own musician card"
            )}{" "}
            to have your card in the app so that other musicians can find you in
            their search.
            <br />
            If you are an Admin, you could go to the Admin tab, where you could
            add instruments and districts, or remove other musicians,
            instruments and districts. You could also promote other musicians to
            be admins, or demote other admins from their admin title.
          </p>
          <img
            className="col-sm"
            src={config.apiUrl + "/about_img.jpg"}
            alt="about_img"
          />
        </div>
      </div>
    </>
  );
}

export default About;
