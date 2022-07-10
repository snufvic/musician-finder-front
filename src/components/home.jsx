import PageHeader from "./common/pageHeader";
import config from "../config.json";

// import ReactDOM from 'react-dom'

function Home() {
  return (
    <>
      <PageHeader Header="Home" />
      <hr />
      <div className="row">
        <div className="col-12">
          <p>
            Welcome to the Musician Finder App. This website was built for you,
            the musicians who are seeking bandmates for their band but don't
            even know where to start.{" "}
          </p>
          <p>
            Here you will find musicians like you, who want to play together.
            You can find musicians according to what instruments they play,
            where they want to play, their age and so on. You can even rate
            musicians and add them to your favorites. So, go on and create a
            Musician Card to search and be searched and help us to help you
            start a band!
          </p>
          <img src={config.apiUrl + "/home_img.jpg"} alt="home_img" />
        </div>
      </div>
    </>
  );
}

export default Home;
