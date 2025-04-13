import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '../constants';
import { IEvent } from '../types';
import {
  currentEventStatus,
  displayDate,
  renderTextWithMentions,
  resizeCloudinaryUrl,
} from '../utils';
import { CHARCOAL, DARK_MINT, GREY_BORDER, LOCATION_RED, MINT } from 'styles';
import { formatDistanceToNow } from 'date-fns';
import numeral from 'numeral';
import { PhotoDisplay } from './PhotoDisplay';
import {
  CalendarIcon,
  ChatBubbleOvalLeftIcon,
  HeartIcon,
  ShareIcon,
} from '@heroicons/react/24/outline';
import {
  MapPinIcon,
  PaperAirplaneIcon,
  EllipsisVerticalIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/24/solid';
import { Row } from 'Components/Row';
import { Col } from 'Components/Col';

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // For small screens (mobile-first):
    minHeight: '100vh',
    padding: '32px 8px',
    fontFamily: 'Inter',
  },
  scrollView: {
    // for scrolling area
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 60px)', // or something similar
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profilePhoto: {
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    objectFit: 'cover',
    // In RN: borderWidth, borderColor
  },
  commentSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    marginTop: 20,
  },
};
///////////////////////////////////////////////////////////

const openGoogleCalendar = async (event: IEvent) => {
  const fallbackUrl = 'https://calendar.google.com/'; // Web fallback
  // open in google calendar
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const startDateString = startDate.toISOString().replace(/-|:|\.\d+/g, '');
  const endDateString = endDate.toISOString().replace(/-|:|\.\d+/g, '');

  const titleText = event.organizer?.displayName
    ? `${event.organizer.displayName}'s omw! Event`
    : `omw! Event`;

  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    titleText
  )}&description=${encodeURIComponent(
    event.title
  )}&dates=${startDateString}/${endDateString}&location=${encodeURIComponent(
    event.location?.address || ''
  )}`;

  window.open(gcalUrl, '_blank');
};

const openInMapsUrl = (event) => {
  if (event?.location?.address && event?.location?.latitude && event?.location?.longitude) {
    return `https://www.google.com/maps/search/${event.location.address}/@${event.location.latitude},${event.location.longitude}`;
  }
  return null;
};

const openInOmwApp = () => {
  window.open('https://getomw.app', '_blank');
};

const PublicEventPage = () => {
  const { shortCode: shortWebUrlCode } = useParams();

  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [focusedImageIndex, setFocusedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.post(`${BACKEND_URL}/events/get-web-event`, { shortWebUrlCode });
        setEvent(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load event.');
      } finally {
        setLoading(false);
      }
    };
    if (shortWebUrlCode) fetchEvent();
    else setError('Missing event code.');
  }, [shortWebUrlCode]);

  if (loading) return <div style={{ padding: '2rem' }}>Loading event...</div>;
  if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>;

  if (!event) return <div style={{ padding: '2rem' }}>Event not found.</div>;
  // Example: parse the date.
  const formattedDate = new Date(event.startDate).toLocaleString();

  //////////////////////////////////////////////////

  const eventStatus = currentEventStatus(event); // your own function
  const authInfo = {
    _id: '',
  };

  return (
    <div style={styles.container}>
      {/* Scrollable content area */}
      <div
        style={styles.scrollView}
        onScrollCapture={(e) => {
          // Similar logic to native: e.target.scrollTop, etc.
          // No direct "Keyboard.dismiss" on web
        }}
      >
        <div style={{ padding: '0 16px' }}>
          {/* Organizer row */}
          <div style={styles.headerRow}>
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <img
                alt='organizer'
                src={resizeCloudinaryUrl(event.organizer.profilePhoto, 'MEDIUM')}
                style={{
                  ...styles.profilePhoto,
                  border: eventStatus === 'LIVE' ? `2px solid ${MINT}` : 'none',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  openInOmwApp();
                }}
              />
              <Col style={{ marginLeft: '16px' }}>
                <div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: CHARCOAL,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      openInOmwApp();
                    }}
                  >
                    {event.organizer.username}
                    {eventStatus === 'LIVE' && (
                      <span style={{ fontWeight: 'normal', color: DARK_MINT }}> is live</span>
                    )}
                  </div>
                  {event.lastEditedDate ? (
                    <div style={{ color: 'grey', fontSize: '12px', margin: 0 }}>
                      Edited {formatDistanceToNow(event.lastEditedDate, { addSuffix: true })}
                    </div>
                  ) : (
                    <div style={{ color: 'grey', fontSize: '12px', margin: 0 }}>
                      Posted {formatDistanceToNow(event.datePosted, { addSuffix: true })}
                    </div>
                  )}
                </div>
              </Col>
            </Row>
            <div
              style={{ display: 'flex', gap: '12px', cursor: 'pointer' }}
              onClick={() => {
                const shareUrl = `https://getomw.app/${event.shortWebUrlCode}`;
                // simplest approach on web:
                navigator.clipboard.writeText(shareUrl).then(() => {
                  window.alert(`Event link copied to clipboard!`);
                });
              }}
            >
              <ShareIcon
                style={{
                  height: 24,
                  width: 24,
                  color: CHARCOAL,
                }}
              />
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'Inter',
                  cursor: 'pointer',
                }}
              >
                Share
              </button>
            </div>
          </div>

          {/* Title text */}
          <p
            style={{
              margin: '12px 0',
              fontSize: '16px',
              userSelect: 'text', // <-- ensures it's selectable
            }}
          >
            {event.title}
          </p>

          {/* Media images row */}
          {event.mediaUrls?.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '8px',
                marginBottom: '12px',
                // overflow: 'hidden',
              }}
            >
              {event.mediaUrls.map((url, index) => (
                <div
                  key={`event_image_${index}`}
                  onClick={() => setFocusedImageIndex(index)}
                  style={{
                    flexShrink: 1,
                    maxHeight: '90px',
                    width: '90px',
                    cursor: 'pointer',
                  }}
                >
                  <img
                    alt={`Event media ${index}`}
                    src={resizeCloudinaryUrl(url, 'EVENT_MEDIUM')}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: `1px solid ${GREY_BORDER}`,
                      backgroundColor: '#F0F0F0',
                    }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Date, location, etc. */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <div onClick={() => openGoogleCalendar(event)} style={{ cursor: 'pointer' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}
                >
                  <CalendarIcon
                    style={{
                      height: 16,
                      width: 16,
                      color: eventStatus === 'LIVE' ? DARK_MINT : 'grey',
                    }}
                  />
                  <span style={{ color: eventStatus === 'LIVE' ? DARK_MINT : 'grey' }}>
                    {displayDate(true, event.startDate, event.endDate)}
                  </span>
                </div>
              </div>
              {openInMapsUrl && event.location?.address && (
                <Row
                  onClick={() => window.open(openInMapsUrl(event), '_blank')}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '4px',
                    marginBottom: '8px',
                    cursor: 'pointer',
                  }}
                >
                  <MapPinIcon
                    style={{
                      height: 16,
                      width: 16,
                      color: LOCATION_RED,
                    }}
                  />
                  <a style={{ color: 'grey', textDecoration: 'underline' }}>
                    {event.location.address}
                  </a>
                </Row>
              )}
            </div>
          </div>

          {/* Map, if you have a custom <DetailsMapView> that you can adapt for web */}
          {/* <DetailsMapView
            lat={event.location?.latitude}
            lng={event.location?.longitude}
            openInMapsUrl={openInMapsUrl}
          /> */}

          {/* Like, comment, RSVP row */}
          <div
            style={{
              margin: '12px 0',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', gap: '14px' }}>
              {/* Like */}
              <button
                onClick={async () => {
                  openInOmwApp();
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <HeartIcon style={{ height: 24, width: 24, color: GREY_BORDER }} />
                  <span style={{ color: 'grey', fontSize: 16 }}>{event.likesLength ?? 0}</span>
                </div>
              </button>

              {/* Comment */}
              <button
                onClick={async () => {
                  openInOmwApp();
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ChatBubbleOvalLeftIcon style={{ height: 24, width: 24, color: GREY_BORDER }} />
                  <span style={{ color: 'grey', fontSize: 16 }}>{event.comments?.length}</span>
                </div>
              </button>
              {/* RSVP & attendees */}
              {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={async () => {openInOmwApp()}}
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  RSVP
                </button>
              </div> */}
            </div>

            <div
              style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
              onClick={() => {
                openInOmwApp();
              }}
            >
              <PhotoDisplay attendees={event.attendees} maxPfpsToShow={5} />
              <span style={{ color: 'grey', fontStyle: 'italic', textDecoration: 'underline' }}>
                {event.attendees?.length} RSVP'd
              </span>
            </div>
          </div>

          {/* Comments section */}
          <div style={styles.commentSection}>
            {event.comments?.length > 0 ? (
              event.comments.map((comment, index) => {
                const numLikes = comment.likes?.length || 0;
                const isCommentLiked = false;

                return (
                  <div
                    key={`comment_${index}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 8,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      onClick={() => {
                        openInOmwApp();
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        alt={`comment by ${comment.username}`}
                        src={resizeCloudinaryUrl(comment.profilePhoto, 'MEDIUM')}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'baseline',
                          gap: '6px',
                          flexWrap: 'wrap',
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                            margin: 0,
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            openInOmwApp();
                          }}
                        >
                          {comment.username}
                        </p>
                        <p style={{ color: 'grey', fontSize: '12px', margin: 0 }}>
                          {formatDistanceToNow(comment.datePosted, { addSuffix: true })}
                        </p>
                      </div>
                      <div style={{ marginTop: 4, fontSize: 14 }}>
                        {renderTextWithMentions(comment.text)}
                      </div>
                      <button
                        onClick={() => {
                          openInOmwApp();
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'grey',
                          fontSize: 12,
                          cursor: 'pointer',
                          paddingLeft: '0',
                        }}
                      >
                        Reply
                      </button>
                    </div>
                    <div
                      style={{
                        width: '50px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <button
                        onClick={async () => {
                          openInOmwApp();
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <HeartIcon style={{ height: 18, width: 18, color: GREY_BORDER }} />
                      </button>
                      <span style={{ color: 'grey', fontSize: '12px' }}>
                        {numeral(numLikes).format('0.[0]a')}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', margin: '20px' }}>
                {/* <ChatBubbleLeftRightIcon size={30} color='grey' /> */}
                <p style={{ color: 'grey' }}>Download omw! to start the conversation!</p>
              </div>
            )}
          </div>

          {/* Extra spacer */}
          <div style={{ height: '80px' }} />
        </div>
      </div>

      {/* Comment input pinned at bottom */}

      {/* Simple “modal” for the focused image (lightbox) */}
      {focusedImageIndex !== null && event.mediaUrls && (
        <div
          onClick={() => setFocusedImageIndex(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
          }}
        >
          <img
            alt='Focused event media'
            src={event.mediaUrls[focusedImageIndex]}
            style={{
              maxWidth: '80vw',
              maxHeight: '80vh',
              objectFit: 'contain',
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              // If you had a “save image” or other action:
              const confirmSave = window.confirm('Save image?');
              if (confirmSave && event.mediaUrls) {
                // On the web, there's not a built-in save flow
                // but you can create an <a download> or do something
                // For a quick approach:
                window.open(event.mediaUrls[focusedImageIndex], '_blank');
              }
            }}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              backgroundColor: 'white',
              padding: '6px 8px',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              color: CHARCOAL,
              fontSize: '12px',
            }}
          >
            Open in new tab
          </button>
        </div>
      )}
    </div>
  );
};

export default PublicEventPage;
