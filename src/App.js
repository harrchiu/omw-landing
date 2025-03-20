import logo from './logo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="BackgroundBox">
        <div className="HeaderBoxContainer">
          <div className="HeaderBox">
            <img src={logo} className="Logo"/>
            <div className="GetAppButton">
              Get the App
            </div>
          </div>
        </div>
        <div className="ContentBoxContainer">
          <div className="ContentBox">
            <div className="ContentColumn">
              <div className="ContentTitle">
                See what's happening near you.
              </div>
              <div className="ContentSubTitle">
              </div>
              <div className="ContentDescription">
                Check what your friends are up to. See where the fun is. 
              </div>
              <div className="GetAppButton">
                Get the App
              </div>
            </div>
            <div className="ContentImage">

            </div>
          </div>
        </div>
      </div>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
