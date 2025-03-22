export const IOS_URL = 'https://itunes.apple.com/us/app/apple-store/id1234567890?mt=8';
export const ANDROID_URL = 'https://play.google.com/store/';

export const getDownloadUrl = () => {
  const userAgent = window.navigator.userAgent;
  const isIOS = userAgent.includes('iPhone') || userAgent.includes('iPad');
  console.log(userAgent);
  return isIOS ? IOS_URL : ANDROID_URL;
};
