import { test, expect } from "vitest";
import { getMeetupMapLink } from "./utils";
import type { MeetupItem } from "../types/types";

// 1. meetup which has visible location
// 2. meetup which has visible location - but no map link given
// 3. meetup where backend redacts the event location
// 4. meetup where lat/lng not set and no maps link

const visibleLocation: Partial<MeetupItem> = {
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

const visibleLocationWithLatLngOnly: Partial<MeetupItem> = {
  ...visibleLocation,
  location: {
    ...(visibleLocation.location as MeetupItem["location"]),
    mapsLink: "",
  },
};

const redactedLocationMeetup: Partial<MeetupItem> = {
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

const visibleMeetupWithoutLinkNorLatLng: Partial<MeetupItem> = {
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

// @todo - do where:
// locationIsHidden: true,
// locationAvailableFrom: new Date("2025-05-18T18:00:00.000Z").getTime() // must be in future

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
