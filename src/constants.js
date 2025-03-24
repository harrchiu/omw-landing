export const IOS_URL = 'https://apps.apple.com/app/omw/id6743134330';
// export const ANDROID_URL = 'https://play.google.com/store/';

// internal testing URL
export const ANDROID_URL = 'https://play.google.com/apps/internaltest/4701321979979557757';

function getMobileOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  console.log('hi', userAgent);

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  // iOS detection from iPhone, iPad, or iPod
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
