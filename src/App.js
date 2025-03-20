import react, {useState, useEffect} from 'react';
import logo from './logo.png';
import mainImage1 from './Onboarding1.png'
import mainImage2 from './Onboarding2.png'
import mainImage3 from './Onboarding3.png'
import downloadAppStore from "./DownloadAppStore.webp"
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 768) { // You can adjust the value for mobile breakpoints
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  })

  const gotoIOSDownload = () => {
    // Add link to ios store
  }

  const GoToIOSButton = () => {
    return (
      <div className="GetAppButton" onClick={gotoIOSDownload}>
        Get the App
      </div>
    )
  }

  const ContentBox = () => {
    if(isMobile) return (
      <div className="ContentBoxContainer">
        <div className="ContentBox">
          <div className="ContentColumn">
            <div className="ContentTitle">
              See what's happening near you.
            </div>
            <div className="ImageHolder">
              <img src={mainImage3}  className="ContentImage"/>
            </div>
            <div className="ContentDescription">
              Check where your friends are. <br/>
              Join the excitement. <br/>
            </div>
            <GoToIOSButton/>
          </div>
        </div>
      </div>
    )
    return (
      <div className="ContentBoxContainer">
        <div className="ContentBox">
          <div className="ContentColumn">
            <div className="ContentTitle">
              See what's happening near you.
            </div>
            <div className="ContentDescription">
              Check where your friends are. <br/>
              Join the excitement. <br/>
            </div>
            <GoToIOSButton/>
          </div>
          <div className="ImageHolder">
            <img src={mainImage3}  className="ContentImage"/>
          </div>

        </div>
      </div>
    )
  }


  return (
    <div className="App">
      <div className="BackgroundBox">
        <div className="HeaderBoxContainer">
          <div className="HeaderBox">
            <img src={logo} className="Logo"/>
            <GoToIOSButton/>
          </div>
        </div>
        <ContentBox/>
        <footer className="Footer">
          <div className="FooterContent">
            <p>&copy; 2025 OnMyWay. All rights reserved.</p>
            {/* <ul className="FooterLinks">
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul> */}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
