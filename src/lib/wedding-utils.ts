// Wedding-related utility functions
export const formatWeddingTime = (date: Date, locale: string = "vi-VN") => {
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh", 
  });
};

export const calculateTimeRemaining = (targetDate: Date) => {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
  };
};

export const generateGoogleCalendarLink = (event: {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
}): string => {
  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';

  const params = new URLSearchParams({
    text: event.title,
    dates: `${formatDateForGoogle(event.start)}/${formatDateForGoogle(
      event.end
    )}`,
    details: event.description || '',
    location: event.location || '',
  });

  return `${baseUrl}&${params.toString()}`;
};

const formatDateForGoogle = (date: Date): string => {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
};
export const generateMapLink = (
  venueItem: {
    address?: string;
    name?: string;
    placeId?: string;
    mapUrl?: string;
  } | string
): string => {
  if (typeof venueItem === 'string') {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueItem)}`;
  }

  if (venueItem?.mapUrl) {
    return venueItem.mapUrl;
  }

  if (venueItem?.placeId) {
    const query = encodeURIComponent(venueItem.name || venueItem.address || '');
    return `https://www.google.com/maps/search/?api=1&query=${query}&query_place_id=${venueItem.placeId}`;
  }

  const searchQuery = venueItem?.address || venueItem?.name || '';
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(searchQuery)}`;
};
