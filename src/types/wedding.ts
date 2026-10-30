export interface WeddingVenuePoint {
  name: string;
  address: string;
  time: string;
  mapUrl: string;
  placeId?: string;
}

export interface WeddingConfigType {
  date: Date;
  bride: {
    name: string;
    fullName: string;
    photo: string;
  };
  groom: {
    name: string;
    fullName: string;
    photo: string;
  };
  venue: {
    ceremony: WeddingVenuePoint;
    reception: WeddingVenuePoint;
  };
  showRsvp?: boolean;
  defaultLanguage?: string;
}
