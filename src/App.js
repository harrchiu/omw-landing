import react, {useState, useEffect} from 'react';
import logo from './images/logo.png';
import phoneImage from './images/phone.png'
import profile1 from './images/profile1.jpeg'
import profile2 from './images/profile2.jpeg'
import profile3  from './images/profile3.jpeg'
import downloadAppStore from "./images/DownloadAppStore.webp"
import downloadGPStore from "./images/DownloadGPStore.png"

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

  const PhoneImage = () => {
    return (
      <div className="ImageHolder">
        <div className="InsideImageHolder">
          <img src={phoneImage}  className="ContentImage"/>
          <img src={profile1} className="FloatingProfilePictureImage" 
                style={{
                  right: '57%',
                  top: '42%',
                  height: '11%',
                  animationDelay: '1s',
                  }}
          />
          <img src={profile2} className="FloatingProfilePictureImage"
              style={{
                right: '18%',
                top: '58%',
                height: '9%',
                animationDelay: '0.6s',
                }}
          />
          <img src={profile3} className="FloatingProfilePictureImage"
              style={{
                right: '18%',
                top: '22%',
                height: '15%',
                animationDelay: '0.3s',
                }}
          />
        </div>
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
            <PhoneImage/>
            <div className="ContentDescription">
              Check what your friends are up to. <br/>
              Join the excitement. <br/>
            </div>
              <img src={downloadAppStore} className="DownloadFromButton"/>
              <img src={downloadGPStore} className="DownloadFromButton"/>
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
              Check what your friends are up to. <br/>
              Join the excitement. <br/>
            </div>
            <div className="DownloadFromHolder">
              <img src={downloadAppStore} className="DownloadFromButton"/>
              <img src={downloadGPStore} className="DownloadFromButton"/>
            </div>
          </div>
          <PhoneImage/>
        </div>
      </div>
    )
  }


  return (
    <div className="App">
      <div className="BackgroundBox">
        <div className="ScreenContainer">
          <div className="HeaderBoxContainer">
            <div className="HeaderBox">
              <img src={logo} className="Logo"/>
              <div className="HeaderRightSection">
                <GoToIOSButton/>
              </div>
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
    </div>
  );
}

export default App;
