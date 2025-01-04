import { API_CALL_REFRESH_PERIOD, type GuestItem } from '../services/meetup.service';
import { MeetupRsvpAttendanceStatusEnum, type MeetupGroupItem, type MeetupItem, type ScreensType } from '../types/types';
import type { UserSession } from '../types/user-session.type';

export const initialState: AppState = {
  currentScreen: "EVENTS",
  groupInfo: {
    data: null,
    lastFetched: Date.now() - API_CALL_REFRESH_PERIOD,
  },
  meetups: {
    data: [],
    lastFetched: Date.now() - API_CALL_REFRESH_PERIOD,
  },
  currentEvent: null,
  modalState: {
    openId: undefined,
  },
  attendModalState: {
    isOpen: false,
    formData: {
      guests: [],
      isAttending: MeetupRsvpAttendanceStatusEnum.Cannot,
    },
    currentStep: 0,
  },
  user: undefined,
};

export type AppState = {
  currentScreen: ScreensType;
  groupInfo: ApiFetchInfo<MeetupGroupItem | null>;
  meetups: ApiFetchInfo<MeetupItem[]>;
  currentEvent: MeetupItem | null;
  /** State for modals, which can only be shown 1 at a time */
  modalState: {
    openId: undefined | "EVENTS";
  };
  /** Attend modal can show over the top of other modals */
  attendModalState: {
    /** Zero-indexed step */
    currentStep: number;
    isOpen: boolean;
    formData: {
      guests: GuestItem[]; // an array of RSVP info for people signing up
      isAttending: MeetupRsvpAttendanceStatusEnum;
    }
  };

  // LOGGED IN
  user?: UserSession;
};

/** Generic type for storing fetch data */
export type ApiFetchInfo<T = unknown> = {
  lastFetched: number;
  data: T;
  /** If set to true, must set an errorMessage also */
  isError?: boolean;
  errorMessage?: string;
};
