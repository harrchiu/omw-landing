import { IEvent } from 'types';

export const USERNAME_VALID_CHAR_REGEX = 'a-zA-Z0-9._-';
export const ONE_HOUR = 60 * 60 * 1000;

export const resizeCloudinaryUrl = (
  url: string | undefined,
  size: 'ORIGINAL' | 'LARGE' | 'EVENT_MEDIUM' | 'MEDIUM' | 'SMALL'
) => {
  if (!url || size === 'ORIGINAL') return url;

  const newDim =
    size === 'LARGE' ? 150 : size === 'EVENT_MEDIUM' ? 150 : size === 'MEDIUM' ? 80 : 50;

  const parts = url.split('/upload/');
  if (parts.length !== 2) return url; // Not a Cloudinary URL

  const transform = `w_${newDim},q_auto:best,f_auto`;

  return `${parts[0]}/upload/${transform}/${parts[1]}`;
};

export function pluralize(n: number, singular: string, plural: string = singular + 's') {
  return n === 1 ? singular : plural;
}

export function sameDay(d1: Date, d2: Date) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export const displayDate = (
  includeTime: boolean,
  startMillis: number | Date,
  endMillis: number | undefined
) => {
  let startDate;
  if (typeof startMillis === 'number') {
    startDate = new Date(startMillis);
  } else {
    startDate = startMillis;
  }

  const nowMillis = Date.now();
  const nowDate = new Date();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(nowDate.getDate() + 1);
  tomorrowDate.setHours(23, 59, 59, 999);

  // show the date but exclude year if its the same as current year
  const startDateString = sameDay(startDate, nowDate)
    ? 'Today'
    : sameDay(startDate, tomorrowDate)
    ? 'Tomorrow'
    : startDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: startDate.getFullYear() === nowDate.getFullYear() ? undefined : 'numeric',
      });
  const startTimeString = startDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });

  let res = startDateString + (includeTime ? ` @ ${startTimeString}` : '');

  if (endMillis) {
    const endDate = new Date(endMillis);
    res += ' -';

    const endDateString = sameDay(endDate, nowDate)
      ? 'Today'
      : sameDay(endDate, tomorrowDate)
      ? 'Tomorrow'
      : endDate.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: endDate.getFullYear() === nowDate.getFullYear() ? undefined : 'numeric',
        });
    const endTimeString = endDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
    if (endDateString !== startDateString) {
      res += ` ${endDateString} @`;
    }
    res += ` ${endTimeString}`;
  }

  return res;
};

export const renderTextWithMentions = (text: string): React.ReactNode => {
  const mentionRegex = new RegExp(`(^|\\s)(@[${USERNAME_VALID_CHAR_REGEX}]+)(?=\\s|$)`, 'g');
  const parts = text.split(mentionRegex);

  return parts.map((part, index) => {
    if (part.match(/^@\S+$/)) {
      const username = part.slice(1);
      // If this part is a mention, make it bold
      return (
        <span key={index} style={{ fontWeight: 'bold' }}>
          {part}
        </span>
      );
    } else {
      return <span key={index}>{part}</span>;
    }
  });
};

export const currentEventStatus = (event: IEvent): 'LIVE' | 'EXPIRED' | 'FUTURE' => {
  const threeHours = 3 * 60 * 60 * 1000;
  const today = new Date();
  const startDate = new Date(event.startDate); // if null it's fine
  const endDate = new Date(event?.endDate || event.startDate + threeHours); // if null it's fine

  if (today.getTime() < startDate.getTime()) return 'FUTURE';
  if (today.getTime() > endDate.getTime()) return 'EXPIRED';
  return 'LIVE';
};
