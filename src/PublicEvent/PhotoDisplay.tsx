import { Row } from 'Components/Row';
import React from 'react';
import { GREY_BORDER } from 'styles';
import { IAttendee } from 'types';
import { resizeCloudinaryUrl } from 'utils';

type IPhotoDisplay = {
  attendees: IAttendee[];
  maxPfpsToShow?: number;
};

export const PhotoDisplay = ({ attendees, maxPfpsToShow = 3 }: IPhotoDisplay) => {
  const extra = (attendees?.length ?? 0) - maxPfpsToShow;
  if (!attendees || attendees.length === 0) {
    return null;
  }
  const reverseAttendees = [...attendees].reverse();

  return (
    <Row>
      {reverseAttendees?.slice(0, maxPfpsToShow).map((attendee, index) => {
        return (
          <img
            style={{
              marginLeft: index === 0 ? 0 : -10,
              width: 25,
              height: 25,
              borderRadius: 15,
              borderWidth: 0.4,
              borderColor: GREY_BORDER,
            }}
            src={resizeCloudinaryUrl(attendee?.profilePhoto, 'SMALL')}
            key={`photo-display-${index}`}
          />
        );
      })}
      {extra > 0 && (
        <Row
          style={{
            width: 25,
            height: 25,
            borderRadius: 12.5,
            marginLeft: -10,
            backgroundColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: extra < 10 ? 12 : 10,
              fontWeight: 700,
              fontFamily: 'Inter',
              color: 'white',
              textAlign: 'center',
            }}
          >
            +{extra}
          </span>
        </Row>
      )}
    </Row>
  );
};
