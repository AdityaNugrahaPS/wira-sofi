// Wedding invitation data types

export interface WeddingCouple {
  groomFirstName: string;
  groomLastName: string;
  groomFullName: string;
  groomParentNames: string;
  groomPhoto: string;
  brideFirstName: string;
  brideLastName: string;
  brideFullName: string;
  brideParentNames: string;
  bridePhoto: string;
}

export interface BrideGroomPageSettings {
  brideSettings: {
    headerTitle: string;
    headerSubtitle: string;
    label: string;
    parentLabel: string;
    fatherName: string;
    motherName: string;
    quote: string;
    photo: string;
  };
  groomSettings: {
    headerTitle: string;
    headerSubtitle: string;
    label: string;
    parentLabel: string;
    fatherName: string;
    motherName: string;
    quote: string;
    photo: string;
  };
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  date: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  isActive: boolean;
}

export interface StoryPageSettings {
  headerTitle: string;
  headerSubtitle: string;
  timelineItems: TimelineItem[];
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  type: 'landscape' | 'square';
  isActive: boolean;
}

export interface GalleryPageSettings {
  headerTitle: string;
  headerSubtitle: string;
  bottomQuote: string;
  images: GalleryImage[];
}

export interface WeddingEvent {
  eventName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
}

export interface WeddingInvitation {
  id: string;
  couple: WeddingCouple;
  events: WeddingEvent[];
  guestName: string;
  welcomeMessage: string;
  createdAt: string;
  updatedAt: string;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  isActive: boolean;
}

export interface QuotesSettings {
  quotes: Quote[];
  headerTitle: string;
  headerSubtitle: string;
  bottomMessage: string;
  quotesImage: string;
}

export interface GroomSettings {
  headerTitle: string;
  headerSubtitle: string;
  groomPhoto: string;
  groomDescription: string;
  fatherName: string;
  motherName: string;
  bottomQuote: string;
}

export interface RsvpResponse {
  id: string;
  name: string;
  email: string;
  phone: string;
  attendance: 'yes' | 'no';
  guestCount: string;
  dietaryRestrictions: string;
  message: string;
  ceremony: boolean;
  reception: boolean;
  submittedAt: string;
  status: 'pending' | 'confirmed' | 'declined';
}

export interface RsvpSettings {
  headerTitle: string;
  headerSubtitle: string;
  description: string;
  deadlineDate: string;
  contactPhone: string;
  contactEmail: string;
  ceremonyTime: string;
  receptionTime: string;
  isEnabled: boolean;
  responses: RsvpResponse[];
}

export interface ThanksSettings {
  headerTitle: string;
  headerSubtitle: string;
  mainMessage: string;
  subMessage: string;
  coupleNames: string;
  blessingQuoteArabic: string;
  blessingQuoteTranslation: string;
  backgroundImage: string;
  showSocialMedia: boolean;
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  isEnabled: boolean;
}

export interface InvitedSettings {
  headerTitle: string;
  headerSubtitle: string;
  eventTitle: string;
  eventName: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  venueAddress: string;
  googleMapsUrl: string;
  saveTheDateTitle: string;
  saveTheDateMessage: string;
  isEnabled: boolean;
}

export interface WeddingSettings {
  couple: WeddingCouple;
  events: WeddingEvent[];
  defaultGuestName: string;
  welcomeMessage: string;
  quotesSettings: QuotesSettings;
  brideGroomSettings: BrideGroomPageSettings;
  storySettings: StoryPageSettings;
  gallerySettings: GalleryPageSettings;
  rsvpSettings: RsvpSettings;
  thanksSettings: ThanksSettings;
  invitedSettings: InvitedSettings;
}
