export const IOS_URL = 'https://apps.apple.com/app/omw/id6743134330';
// export const ANDROID_URL = 'https://play.google.com/store/';

// internal testing URL
export const ANDROID_URL = 'https://play.google.com/apps/testing/com.toasterteam.toasterteamapp';

function getMobileOS() {
  // @ts-ignore
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from iPhone, iPad, or iPod
  // @ts-ignore
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  return 'unknown';
}

export const getDownloadUrl = () => {
  // this shit doesn't work!!
  return IOS_URL;

  const os = getMobileOS();

  if (os === 'Android') {
    return ANDROID_URL;
  } else {
    return IOS_URL;
  }
};

export const BACKEND_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://toasterteamapp.onrender.com'
    : 'http://localhost:3000';

export const HOME_URL = 'https://getomw.app';
