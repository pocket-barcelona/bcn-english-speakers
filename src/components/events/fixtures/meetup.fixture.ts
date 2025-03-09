import {
  MeetupRsvpAttendanceStatusEnum,
  MeetupStatusEnum,
  type MeetupItem,
  type MeetupRsvpModel,
} from "../types/types";

export const meetupPublishedTest: MeetupItem = {
  meetupId: "123-456",
  shortId: "123",
  groupId: "",
  eventConfig: {
    minAttendees: 0,
    maxAttendees: 0,
    requiresMobileNumber: undefined,
    requiresIdentityCard: undefined,
    requiresEmailAddress: undefined,
    requiresQRCodeEntry: undefined,
    requiresVerifiedUser: undefined,
    eventLanguage: undefined,
    rsvpButtonCtaType: undefined,
    enableWaitingList: undefined,
    maxWaitingListGuests: undefined,
  },
  status: MeetupStatusEnum.Published,
  privacy: 1,
  rsvpType: "DEFINITE",
  maxTicketsPerPerson: 1,
  title: "My meetup",
  subtitle: "In the park",
  description: "<p>Meetup info</p>",
  directions: "Go to the park",
  category: "MEETUP",
  subcategory: [],
  mode: "IN_PERSON",
  startTime: new Date("2025-01-01T09:00:00.000Z"),
  endTime: new Date("2025-01-01T11:00:00.000Z"),
  location: {
    locationName: "The park",
    address1: "Street",
    address2: "Area",
    postcode: "08000",
    town: "Barcelona",
    province: "Barcelona",
    country: "Spain",
    notes: "Location notes",
    lat: 41.00001,
    lng: -2.00002,
    locationPrecision: 1,
    mapsLink: "https://maps.google.com/abc",
    locationIsHidden: false,
    locationAvailableFrom: 0,
  },
  locationDisclosureAt: new Date("2025-01-01T09:00:00.000Z"),
  price: {
    priceCents: 0,
    currencyCode: "EUR",
    locale: "es-ES",
    paymentScheme: "NONE",
    canUseCredit: false,
  },
  promoCodes: [],
  vouchers: undefined,
  requiresUserCheckin: false,
  rsvps: [],
  tags: ["my-meetup"],
  hosts: [
    {
      userId: "XXX",
      hostRole: "ORGANISER",
      isOrganiser: true,
    },
    {
      userId: "YYY",
      hostRole: "COMMUNITY HELPER",
      isOrganiser: false,
    },
  ],
  photos: [],
};

export const meetupRsvpComingMainGuest: MeetupRsvpModel = {
  rsvpId: "123",
  userId: "abc",
  response: MeetupRsvpAttendanceStatusEnum.Coming,
  rsvpTimestampInitial: new Date("2025-01-01T10:00:00.000Z").getTime(),
  rsvpTimestampUpdated: new Date("2025-01-01T10:00:00.000Z").getTime(),
  changedTimes: 0,
  name: "John",
  lastname: "Doe",
  avatar: "https://example.com/avatar.jpg",
  mobile: "123456789",
  comment: "Comment here",
  isMainGuest: true,
};

export const meetupRsvpComingNormalGuest: MeetupRsvpModel = {
  ...meetupRsvpComingMainGuest,
  isMainGuest: false,
};

export const meetupRsvpNotComingNormalGuest: MeetupRsvpModel = {
  ...meetupRsvpComingMainGuest,
  isMainGuest: false,
  response: MeetupRsvpAttendanceStatusEnum.Cannot,
};

// @todo - do where:
// locationIsHidden: true,
// locationAvailableFrom: new Date("2025-05-18T18:00:00.000Z").getTime() // must be in future
export const visibleLocation: Partial<MeetupItem> = {
  meetupId: "123",
  location: {
    locationName: "Someplace",
    address1: "",
    address2: "",
    postcode: "",
    town: "",
    province: "",
    country: "",
    notes: "",
    lat: 41.123456,
    lng: -2.345678,
    locationPrecision: 1,
    mapsLink: "http://maps.google.com/some/place",
    locationIsHidden: false,
    locationAvailableFrom: new Date("1970-01-18T18:00:00.000Z").getTime(),
  },
};

export const visibleLocationWithLatLngOnly: Partial<MeetupItem> = {
  ...visibleLocation,
  location: {
    ...(visibleLocation.location as MeetupItem["location"]),
    mapsLink: "",
  },
};

export const redactedLocationMeetup: Partial<MeetupItem> = {
  meetupId: "123",
  location: {
    locationName: "Hidden",
    address1: "",
    address2: "",
    postcode: "",
    town: "",
    province: "",
    country: "",
    notes: "",
    lat: -1,
    lng: -1,
    locationPrecision: 1,
    mapsLink: "",
    locationIsHidden: true,
    locationAvailableFrom: new Date("2025-05-18T18:00:00.000Z").getTime(),
  },
};

export const visibleMeetupWithoutLinkNorLatLng: Partial<MeetupItem> = {
  meetupId: "123",
  location: {
    locationName: "Hidden",
    address1: "",
    address2: "",
    postcode: "",
    town: "",
    province: "",
    country: "",
    notes: "",
    lat: -1,
    lng: -1,
    locationPrecision: 1,
    mapsLink: "",
    locationIsHidden: false,
    locationAvailableFrom: new Date("2025-05-18T18:00:00.000Z").getTime(),
  },
};
