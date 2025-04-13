// link foreign keys by id

export type IComment = {
  _id: string;
  commenterId: string;
  username: string;
  profilePhoto: string;
  text: string;
  likes: { _id: string }[];
  datePosted: number;
};

export type IAttendee = {
  _id: string;
  username: string;
  profilePhoto: string;
};

export type IEvent = {
  _id: string;
  title: string;
  organizer: {
    _id: string;
    username: string;
    profilePhoto: string;
    displayName?: string;
  };
  includeTime: boolean;
  datePosted: number;
  startDate: number;
  likes: { _id: string }[];
  comments: {
    _id: string;
    commenterId: string;
    username: string;
    profilePhoto: string;
    text: string;
    likes: { _id: string }[];
    datePosted: number;
  }[];
  endDate?: number;
  location?: { latitude: number; longitude: number; address: string };
  mediaUrls?: string[];
  minCapacity?: number;
  maxCapacity?: number;
  attendees?: IAttendee[];
  tags?: string[];
  isSilentMode?: boolean;
  canMutualsSee?: boolean; // undefined || true mean mutuals can see (false means no)
  lastEditedDate?: number;

  //publishing
  shortWebUrlCode?: string; // for url
  canSeeEventOnPublicUrl?: boolean;
  canSeeRsvpsOnPublicUrl?: boolean;
  canSeeLocationOnPublicUrl?: boolean;
  canSeeCommentsOnPublicUrl?: boolean;
  canSeeMediaOnPublicUrl?: boolean;

  // just for web (here)
  likesLength?: number;
};

export type IReport = {
  _id: string;
  reason: string;
};

export type ILocation = {
  longitude: number;
  latitude: number;
  address?: string;
};

export type IGlobalAppConfig = {
  latestVersion?: string;
  latestUpdateCutoff?: string;
  updateMessage?: string;

  iosUpdateUrl?: string;
  androidUpdateUrl?: string;

  clientInactiveMinsBeforeRefetch?: number;

  clientImageCompression: number;
  offsetHomeFeeds: boolean;
  omwPublicEventFrontUrl: string;
  showShareLink?: boolean;
};
