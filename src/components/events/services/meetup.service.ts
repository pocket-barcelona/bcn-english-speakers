import type { ApiFetchInfo } from "../state/state";
import type { MeetupGroupItem, MeetupItem, MeetupRsvpAttendanceStatusEnum, MeetupRsvpModel } from '../types/types';
import { API_STUB_LOCAL } from '../../../consts';
import type { ApiCall } from './types';

// RSVP FORM STATE
export type GuestItem = {
  isMainGuest: boolean;
  response: MeetupRsvpAttendanceStatusEnum | undefined;
  name: string;
  mobile: string;
  avatar: string;
  lastname?: string;
  email?: string;
  barrio?: number;
  comment?: string;
};

export type AttendFormState = {
  /** Zero-indexed step */
  currentStep: number;
  meetupId: string;
  response: MeetupRsvpAttendanceStatusEnum | undefined;
  guests: GuestItem[];
};

// @todo...
type SubmitRsvpPayload = Pick<AttendFormState, "guests" | "meetupId" | 'response'>;

// export type SubmitRsvpPayloadResponse = SubmitRsvpPayload & {
//   /** The saved RSVP ID */
//   rsvpId: string;
//   /** Whether or not the rsvp was confirmed */
//   responseCode: number;
//   // @todo - do we need the meetup data again?
// };
export type SubmitRsvpPayloadResponse = MeetupRsvpModel;


const BCN_ENG_SPEAKERS_GROUP_ID = "a9989daa-d864-4b3a-82e3-899df9baccc1"; // bcn eng speakers
// const BCN_ENG_SPEAKERS_GROUP_ID = "d47fa82b-ee32-4e54-81bc-057322074186"; // fake corgi club

// export const API_CALL_REFRESH_PERIOD = 60000; // 1 minute
export const API_CALL_REFRESH_PERIOD = 6000000; // local testing


/** @todo - submit new event */
/** @todo - get event by ID */
/** @todo - rsvp to event by ID */



/** Prevent repeat calls */
export function hasUpdatedRecently(lastFetchTime: number) {
  return lastFetchTime + API_CALL_REFRESH_PERIOD > Date.now();
}


/** Fetches BCN-ES events */
export async function getEventsByOrganiserId(): Promise<
  ApiFetchInfo<MeetupItem[]>
> {
  console.debug("Fetching Events List");
  const endpoint = `${API_STUB_LOCAL}/api/meetup/list/${BCN_ENG_SPEAKERS_GROUP_ID}`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  return {
    data: data.data ?? null,
    lastFetched: Date.now(),
  };
}

/** Get organiser info */
export async function getGroupInfo(): Promise<
  ApiFetchInfo<MeetupGroupItem | null>
> {
  console.debug("Fetching Group Info");
  const endpoint = `${API_STUB_LOCAL}/api/meetupGroup/${BCN_ENG_SPEAKERS_GROUP_ID}`;
  const resp = await fetch(endpoint);
  const data = await resp.json();
  return {
    data: data.data ?? null,
    lastFetched: Date.now(),
  };
}



export async function submitRsvp(
  payload: SubmitRsvpPayload
): Promise<SubmitRsvpPayloadResponse> {
  // console.debug("Creating RSVP", {payload});
  const { meetupId } = payload;
  const endpoint = `${API_STUB_LOCAL}/api/meetup/${meetupId}/rsvp`;
  const resp = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await resp.json() as ApiCall<MeetupRsvpModel>;;

  return data.data;

  // return new Promise((resolve, reject) => {
  //   return resolve({
  //     rsvpId: "XXX",
  //     avatar: '👨‍🍳',
  //     changedTimes: 0,
  //     comment: '',
  //     lastname: '',
  //     mobile: '612345678',
  //     name: 'Bonzo',
  //     rsvpTimestampInitial: Date.now(),
  //     rsvpTimestampUpdated: Date.now(),
  //     response: 1 as MeetupRsvpAttendanceStatusEnum,
  //     userId: 'XYZ',
  //   });
    
  // });
}

export function buildRsvpPayload(
  response: MeetupRsvpAttendanceStatusEnum,
  guests: GuestItem[],
  meetupId: string
): SubmitRsvpPayload {
  return {
    response,
    meetupId,
    guests: guests.map((guest, guestIndex) => {
      return {
        ...guest,
        isMainGuest: guestIndex === 0,
      };
    }),
  };
}
