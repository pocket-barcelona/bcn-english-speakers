import {
  type GenericMediaItem,
  type MeetupItem,
  RsvpButtonCtaDefault,
  MeetupRsvpAttendanceStatusEnum,
  type MeetupRsvpCertainty,
  type MeetupRsvpModel,
  type TicketTypeEnum,
} from "../types/types";

export const DEFAULT_LOCALE = "es-ES";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const MONTHS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const PLACEHOLDER_HERO: GenericMediaItem = {
  id: "generic-item",
  url: "https://cdn.pocketbarcelona.com/app/places/images/avif/placeholder_large.avif",
  alt: "Hero",
  mediaType: "IMAGE",
  createdTime: new Date(),
};

export const getMonthName = (monthIndex: number, full = false): string => {
  if (full) return MONTHS_FULL[monthIndex];
  return MONTHS[monthIndex];
};

export const getFeaturedMediaItem = (
  mediaItems: GenericMediaItem[]
): GenericMediaItem | undefined => {
  return mediaItems.find((i) => i.featured);
};

export function getLocationInfo(event: MeetupItem): string {
  const { location, locationDisclosureAt } = event;

  // make sure can show location yet
  if (locationDisclosureAt && locationDisclosureAt.getTime() < Date.now()) {
    return "Location revealed closer to the time";
  }
  const fullLocation = [
    location.address1,
    location.address2,
    location.postcode,
    location.town,
  ];

  switch (location.locationPrecision) {
    case 1:
      return fullLocation.filter((i) => i).join(", ");
    case 2:
      return fullLocation.filter((i) => i).join(", "); // todo
    case 3:
      return location.town;
    case 4:
      return "Location hidden";
    default:
      return "Location unknown";
  }
}

export function getEventFromToDate(
  event: MeetupItem,
  monthAsName = true
): string {
  const eventDate: string[] = [];

  if (event.startTime) {
    const newDateFrom = new Date(event.startTime);
    if (monthAsName) {
      const date1Parts = getDateParts(newDateFrom);
      eventDate.push(
        [date1Parts.day, date1Parts.month, date1Parts.year].join(" ")
      );
    } else {
      eventDate.push(
        newDateFrom.toLocaleDateString("es-ES", { timeZone: "Europe/Madrid" })
      );
    }
  }

  if (event.endTime) {
    const newDateTo = new Date(event.endTime);
    if (monthAsName) {
      const date2Parts = getDateParts(newDateTo);
      eventDate.push(
        [date2Parts.day, date2Parts.month, date2Parts.year].join(" ")
      );
    } else {
      eventDate.push(
        newDateTo.toLocaleDateString("es-ES", { timeZone: "Europe/Madrid" })
      );
    }
  }

  // if the event is on the same day, do not return "a" - "a", instead return just "a"
  if (eventDate.length === 2 && eventDate[0] === eventDate[1]) {
    return eventDate[0];
  }

  return eventDate.join(" - ");
}

function getDateParts(theDate: Date): {
  day: string;
  month: string;
  year: string;
} {
  const day = theDate.getDate().toString();
  const monthZeroIndex = theDate.getMonth(); // jan = 0
  const transKey = MONTHS[monthZeroIndex];
  const month = transKey;
  const year = theDate.getFullYear().toString();
  return {
    day,
    month,
    year,
  };
}

export const meetupLocationIsDisclosedYet = ({
  locationDisclosureAt,
}: MeetupItem): boolean => {
  let locationIsDisclosed = true;

  if (locationDisclosureAt) {
    const disclosedDate = new Date(locationDisclosureAt);
    locationIsDisclosed = disclosedDate.getTime() < Date.now();
  }
  return locationIsDisclosed;
};

export const getRsvpButtonLabel = ({ eventConfig }: MeetupItem): string => {
  const ctaType = eventConfig?.rsvpButtonCtaType ?? RsvpButtonCtaDefault;
  // @todo - if we need a special label for the type, do a switch here...
  return ctaType.replace("_", " ");
};

export const eventPriceIsFree = ({ price }: MeetupItem) => {
  return price.priceCents === 0;
};

export const eventPriceIsTBC = ({ price }: MeetupItem) => {
  return price.priceCents === -1;
};

export const getPaymentSchemeReadout = ({
  price: { paymentScheme },
}: MeetupItem): string => {
  if (paymentScheme === "ON_RSVP") {
    return "Payment required on RSVP";
  }
  if (paymentScheme === "ON_ARRIVAL") {
    return "Payment required on arrival";
  }
  if (paymentScheme === "AFTER_EVENT") {
    return "Payment required after the event";
  }
  if (paymentScheme === "NONE") {
    return "No payment required";
  }
  return "Unknown";
};

export const eventRSVPStatus = ({
  eventConfig = {} as MeetupItem["eventConfig"],
  rsvps = [],
}: MeetupItem): {
  isAcceptingRSVPs: boolean;
  spacesLeft: number;
} => {
  if (!eventConfig.maxAttendees || eventConfig.maxAttendees === 0) {
    return {
      isAcceptingRSVPs: true,
      spacesLeft: Number.MAX_SAFE_INTEGER,
    };
  }

  // filter out No's!
  const confirmedRSVPs = rsvps.filter(
    (r) => r.response !== MeetupRsvpAttendanceStatusEnum.Cannot
  );

  // make sure there's space for 1 more
  if (
    eventConfig.maxAttendees &&
    confirmedRSVPs.length - 1 >= eventConfig.maxAttendees
  ) {
    return {
      isAcceptingRSVPs: false,
      spacesLeft: 0,
    };
  }

  return {
    isAcceptingRSVPs: true,
    spacesLeft: eventConfig.maxAttendees - confirmedRSVPs.length,
  };
};

/**
 * Calculate the maximum number of attendees available for this user
 * Need to check max attendees value but also if there are spaces available
 * */
export const getEventAttendeesCriteria = ({
  eventConfig = {} as MeetupItem["eventConfig"],
  rsvps = [],
}: MeetupItem): {
  min: number;
  max: number;
} => {
  // @TODO...
  return {
    min: eventConfig.minAttendees ?? 0,
    max: eventConfig.maxAttendees ?? 0,
  };
};

export const getRSVPOptionsByCertainty = (
  type: MeetupRsvpCertainty
): MeetupRsvpAttendanceStatusEnum[] => {
  if (type === "INDEFINITE") {
    return [
      MeetupRsvpAttendanceStatusEnum.Coming,
      MeetupRsvpAttendanceStatusEnum.Maybe,
      MeetupRsvpAttendanceStatusEnum.Cannot,
    ];
  }
  return [
    MeetupRsvpAttendanceStatusEnum.Coming,
    MeetupRsvpAttendanceStatusEnum.Cannot,
  ];
};

export const getRsvpOptionLabel = (
  option: MeetupRsvpAttendanceStatusEnum
): string => {
  switch (option) {
    case MeetupRsvpAttendanceStatusEnum.Coming:
      return "I will be there 😃 ";
    case MeetupRsvpAttendanceStatusEnum.Maybe:
      return "I might be there 🤔 ";
    case MeetupRsvpAttendanceStatusEnum.Cannot:
      return "I cannot make it 😢 ";
    default:
      return "Unknown";
  }
};

export const getRsvpEmojiList = (): string[] => {
  return [
    "👤",
    "🧔‍♂️",
    "👩‍🦳",
    "👩‍🎤",
    "👩‍🌾",
    "👷‍♀️",
    "🧕",
    "🕵️‍♂️",
    "👩‍🍳",
    "👨‍💻",
    "🧑‍🎨",
    "🫅",
    "🦹",
    "🧟‍♀️",
    "🧙‍♀️",
    "🧛‍♀️",
    "🧚‍♀️",
    "🙋‍♂️",
    "🧖",
    "💃",
    "🕺",
    "💇‍♂️",
    "🧜",
    "🥷",
    "🧑‍🚀",
    "🧑‍🚒",
    "🧑‍✈️",
    "🧑‍🎓",
    "👩",
  ];
};

export function getGuestList(
  guests: MeetupRsvpModel[],
  guestType: MeetupRsvpAttendanceStatusEnum,
  ticket?: TicketTypeEnum
) {
  // if (ticket) {
  //   return guests.filter((guest) => guest.rsvpStatus === guestType && guest.ticketType === ticket);
  // }
  return guests.filter((guest) => guest.response === guestType);
}

/** Return a event date string like: date: Tuesday, October 22, time: 2:00 PM - 5:00 PM */
export const getEventDateReadout = (
  dateStart: Date,
  dateEnd: Date,
  full = false,
  locale = "en-GB"
): {
  date: string;
  time: string;
} => {
  const month = getMonthName(dateStart.getMonth(), full);
  const day = dateStart.getDate();
  const weekday = dateStart.toLocaleString(locale || DEFAULT_LOCALE, {
    weekday: "long",
  });
  const dateStr = `${weekday}, ${month}, ${day}`;

  // format a time like: 2:00 PM - 5:00 PM
  const timeStrStart = dateStart.toLocaleString(locale || DEFAULT_LOCALE, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const timeStrEnd = dateEnd.toLocaleString(locale || DEFAULT_LOCALE, {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return {
    date: dateStr,
    time: `${timeStrStart.toUpperCase()} - ${timeStrEnd.toUpperCase()}`,
  };
};

export const getMeetupMapLink = (event: MeetupItem) => {
  const { location } = event;
  if (location.mapsLink) {
    return location.mapsLink;
  }
  if (!location.lat || !location.lng) {
    return "";
  }
  return `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
};
