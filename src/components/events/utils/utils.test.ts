import { test, expect, describe } from "vitest";
import {
  DEFAULT_MAX_MEETUP_SPACES_LEFT,
  eventPriceIsFree,
  eventPriceIsTBC,
  eventRSVPStatus,
  getEventFromToDate,
  getFeaturedMediaItem,
  getLocationInfo,
  getMeetupMapLink,
  getMonthName,
  getPaymentSchemeReadout,
  meetupLocationIsDisclosedYet,
} from "./utils";
import type { GenericMediaItem, MeetupItem } from "../types/types";
import {
  meetupPublishedTest,
  meetupRsvpComingMainGuest,
  redactedLocationMeetup,
  visibleLocation,
  visibleLocationWithLatLngOnly,
  visibleMeetupWithoutLinkNorLatLng,
} from "../fixtures/meetup.fixture";

describe("Should handle maps logic", () => {
  // 1. meetup which has visible location
  // 2. meetup which has visible location - but no map link given
  // 3. meetup where backend redacts the event location
  // 4. meetup where lat/lng not set and no maps link

  test("Should return custom google maps link", () => {
    const link = getMeetupMapLink(visibleLocation as MeetupItem);
    expect(link).toBe(visibleLocation.location?.mapsLink);
  });

  test("Should return constructed maps link from lat/lng", () => {
    const link = getMeetupMapLink(visibleLocationWithLatLngOnly as MeetupItem);
    expect(link).toBe(
      "https://www.google.com/maps/search/?api=1&query=41.123456,-2.345678"
    );
  });

  test("Should return no google maps link due to redacted information", () => {
    const link = getMeetupMapLink(redactedLocationMeetup as MeetupItem);
    expect(link).toBe("");
  });

  test("Should return no google maps link due to no data", () => {
    const link = getMeetupMapLink(
      visibleMeetupWithoutLinkNorLatLng as MeetupItem
    );
    expect(link).toBe("");
  });

  test("Should return no link when lat/lng not set", () => {
    const link = getMeetupMapLink({
      ...visibleLocation,
      location: {
        ...visibleLocation.location,
        lat: -1,
        lng: -1,
      },
    } as MeetupItem);
    expect(link).toBe("");
  });
  
  test("Should return no link when lat/lng not set", () => {
    const link = getMeetupMapLink({
      ...visibleLocation,
      location: {
        ...visibleLocation.location,
        lat: 0,
        lng: 0,
      },
    } as MeetupItem);
    expect(link).toBe("");
  });
});

describe("Should handle date logic", () => {
  test("Should get month name by index", () => {
    const monthName = getMonthName(0);
    expect(monthName).toBe("Jan");
  });

  test("Should get month name by index - full", () => {
    const monthName = getMonthName(0, true);
    expect(monthName).toBe("January");
  });

  test("Should get month name by index - no month", () => {
    const monthName = getMonthName(12);
    expect(monthName).toBeUndefined();
  });

  test("Should get event from and to date/s", () => {
    const dates = getEventFromToDate(meetupPublishedTest);
    expect(dates).toBe("1 Jan 2025");
  });

  test("Should get event from and to date/s", () => {
    const dates = getEventFromToDate(meetupPublishedTest, false);
    expect(dates).toBe("1/1/2025");
  });

  // todo - getDateParts
});

test("Should get featured item", () => {
  const item: GenericMediaItem = {
    id: "123",
    url: "url/to/file",
    alt: "",
    createdTime: new Date(),
    mediaType: "IMAGE",
    featured: true,
  };
  const items = [
    {
      ...item,
      featured: false,
      id: "123",
    },
    {
      ...item,
      featured: true,
      id: "456",
    },
  ];
  const found = getFeaturedMediaItem(items);
  expect(found).toEqual(items[1]);
});

test("Should get meetup location string", () => {
  const locationInfo = getLocationInfo(meetupPublishedTest);
  expect(locationInfo).toBe("Street, Area, 08000, Barcelona");
});

test("Should get event from and to date/s - multiple days", () => {
  const meetupSpanningADay: MeetupItem = {
    ...meetupPublishedTest,
    startTime: new Date("2025-01-01T09:00:00.000Z"),
    endTime: new Date("2025-01-02T09:00:00.000Z"),
  };
  const dates = getEventFromToDate(meetupSpanningADay);
  expect(dates).toBe("1 Jan 2025 - 2 Jan 2025");

  const dates2 = getEventFromToDate(meetupSpanningADay, false);
  expect(dates2).toBe("1/1/2025 - 2/1/2025");
});

describe("Should handle location logic", () => {
  test("Should report location as being disclosed already", () => {
    const disclosed = meetupLocationIsDisclosedYet(meetupPublishedTest);
    expect(disclosed).toBe(true);
  });

  test("Should report location as undisclosed/hidden", () => {
    const disclosed = meetupLocationIsDisclosedYet({
      ...meetupPublishedTest,
      location: {
        ...meetupPublishedTest.location,
        locationIsHidden: true,
      },
    });
    expect(disclosed).toBe(false);
  });

  test("Should report location as undisclosed/hidden", () => {
    const disclosed = meetupLocationIsDisclosedYet({
      ...meetupPublishedTest,
      locationDisclosureAt: new Date("2099-01-01T09:00:00.000Z"),
    });
    expect(disclosed).toBe(false);
  });
});

describe("Should report meetup payment logic", () => {
  test("Should report meetup as free", () => {
    const isFree = eventPriceIsFree(meetupPublishedTest);
    expect(isFree).toBe(true);
  });

  test("Should report meetup as having price TBC", () => {
    const isTbc = eventPriceIsTBC({
      ...meetupPublishedTest,
      price: {
        ...meetupPublishedTest.price,
        priceCents: -1,
      },
    });
    expect(isTbc).toBe(true);
  });

  test("Should show payment on RSVP", () => {
    const paymentScheme = getPaymentSchemeReadout({
      ...meetupPublishedTest,
      price: {
        ...meetupPublishedTest.price,
        paymentScheme: "ON_RSVP",
      },
    });
    expect(paymentScheme).toBe("Payment required on RSVP");
  });

  test("Should show payment on arrival", () => {
    const paymentScheme = getPaymentSchemeReadout({
      ...meetupPublishedTest,
      price: {
        ...meetupPublishedTest.price,
        paymentScheme: "ON_ARRIVAL",
      },
    });
    expect(paymentScheme).toBe("Payment required on arrival");
  });

  test("Should show payment after the event", () => {
    const paymentScheme = getPaymentSchemeReadout({
      ...meetupPublishedTest,
      price: {
        ...meetupPublishedTest.price,
        paymentScheme: "AFTER_EVENT",
      },
    });
    expect(paymentScheme).toBe("Payment required after the event");
  });

  test("Should show payment as none", () => {
    const paymentScheme = getPaymentSchemeReadout({
      ...meetupPublishedTest,
      price: {
        ...meetupPublishedTest.price,
        paymentScheme: "NONE",
      },
    });
    expect(paymentScheme).toBe("No payment required");
  });
});

describe("Should handle RSVP logic", () => {
  test("Should report event RSVP status", () => {
    const rsvpStatus = eventRSVPStatus({
      ...meetupPublishedTest,
      eventConfig: {
        ...meetupPublishedTest.eventConfig,
        maxAttendees: 0,
      },
    });

    const expected: ReturnType<typeof eventRSVPStatus> = {
      isAcceptingRSVPs: true,
      spacesLeft: DEFAULT_MAX_MEETUP_SPACES_LEFT,
    };
    expect(rsvpStatus).toEqual(expected);
  });

  test("Should report event RSVP status when max attendees set", () => {
    const rsvpStatus = eventRSVPStatus({
      ...meetupPublishedTest,
      eventConfig: {
        ...meetupPublishedTest.eventConfig,
        maxAttendees: 10,
      },
      rsvps: [],
    });

    const expected: ReturnType<typeof eventRSVPStatus> = {
      isAcceptingRSVPs: true,
      spacesLeft: 10,
    };
    expect(rsvpStatus).toEqual(expected);
  });

  test("Should report event RSVP status when max attendees set + guests RSVP'd", () => {
    const rsvpStatus = eventRSVPStatus({
      ...meetupPublishedTest,
      eventConfig: {
        ...meetupPublishedTest.eventConfig,
        maxAttendees: 10,
      },
      rsvps: [
        meetupRsvpComingMainGuest,
        meetupRsvpComingMainGuest,
        meetupRsvpComingMainGuest,
        meetupRsvpComingMainGuest,
      ],
    });

    const expected: ReturnType<typeof eventRSVPStatus> = {
      isAcceptingRSVPs: true,
      spacesLeft: 6,
    };
    expect(rsvpStatus).toEqual(expected);
  });

  test("Should report event RSVP status as full", () => {
    const rsvpStatus = eventRSVPStatus({
      ...meetupPublishedTest,
      eventConfig: {
        ...meetupPublishedTest.eventConfig,
        maxAttendees: 4,
      },
      rsvps: [
        meetupRsvpComingMainGuest,
        meetupRsvpComingMainGuest,
        meetupRsvpComingMainGuest,
        meetupRsvpComingMainGuest,
      ],
    });

    const expected: ReturnType<typeof eventRSVPStatus> = {
      isAcceptingRSVPs: false,
      spacesLeft: 0,
    };
    expect(rsvpStatus).toEqual(expected);
  });
});
