export const IOS_URL = 'https://apps.apple.com/app/omw/id6743134330';
export const ANDROID_URL = 'https://play.google.com/store/';

export const getDownloadUrl = () => {
  return IOS_URL;

  const userAgent = window.navigator.userAgent;
  const isIOS = userAgent.includes('iPhone') || userAgent.includes('iPad');
  console.log(userAgent);
  return isIOS ? IOS_URL : ANDROID_URL;
};
