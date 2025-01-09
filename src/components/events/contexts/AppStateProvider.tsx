import { createContext, type ComponentChildren } from "preact";
import { useContext } from "preact/hooks";
import { computed, effect, signal, type ReadonlySignal, type Signal } from "@preact/signals";
import { initialState, type AppState } from "../state/state";
import type { MeetupItem, ScreensType } from "../types/types";
import { LOCAL_STORAGE_KEYS } from "../config/config";
import * as MeetupService from "../services/meetup.service";
import { authLogin, type AuthData } from "../services/auth.service";

function createAppState(appState: AppState) {
  const restartApp = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.APP_STATE);
    window.location.reload();
  };

  const currentScreen = signal(appState.currentScreen);
  const setCurrentScreen = (newScreen: ScreensType) => {
    currentScreen.value = newScreen;
  };

  const modalState = signal(appState.modalState);
  const setModalState = (newState: AppState["modalState"]) => {
    modalState.value = { ...newState };
  };

  const currentEvent = signal(appState.currentEvent);
  const setCurrentEvent = (newEvent: AppState["currentEvent"]) => {
    currentEvent.value = newEvent;
  };

  const handleShowEventModal = (newEvent: MeetupItem) => {
    setCurrentEvent(newEvent);
    setModalState({
      ...modalState.value,
      openId: "EVENTS",
    });
  };

  const handleShowAttendModal = (newEvent: MeetupItem) => {
    setAttendModalState({
      ...attendModalState.value,
      isOpen: true,
    });
  };

  const group = signal(appState.groupInfo);
  const setGroup = (newGroup: AppState["groupInfo"]) => {
    group.value = newGroup;
  };

  const meetups = signal(appState.meetups);
  const setMeetups = (newMeetups: AppState["meetups"]) => {
    meetups.value = newMeetups;
  };

  const handleCloseModals = () => {
    setModalState({
      openId: undefined,
    });
  };

  const attendModalState = signal(appState.attendModalState);
  const setAttendModalState = (newState: AppState["attendModalState"]) => {
    attendModalState.value = { ...newState };
  };
  const attendModalCanSubmitForm = computed(() => {
    // make sure at least 1 guest
    // make sure coming/maybe/not coming matches ENUM
    // make sure all name fields and avatars are provided
    // extra: make sure last name, email, mobile are provided if meetup config asks for it
    // make sure no bad words: https://www.npmjs.com/package/bad-words
    const allNamesFilled = attendModalState.value.formData.guests.every(
      (i) => !!i.name && !!i.avatar
    );
    return allNamesFilled && attendModalState.value.formData.guests.length > 0;
  });

  const handleCloseAttendModal = () => {
    setAttendModalState({
      ...attendModalState.value,
      isOpen: false,
    });
  };

  const handleSubmitRsvp = async () => {
    if (!currentEvent.value?.meetupId) {
      return;
    }
    const payload = MeetupService.buildRsvpPayload(
      attendModalState.value.formData.isAttending,
      attendModalState.value.formData.guests,
      currentEvent.value?.meetupId
    );
    MeetupService.submitRsvp(payload)
      .then((resp: MeetupService.SubmitRsvpPayloadResponse) => {
        // CORRECT
        const { rsvpId } = resp;
        attendModalState.value = {
          ...attendModalState.value,
          currentStep: attendModalState.value.currentStep + 1,
          hasSubmitted: true,
          isLoading: false,
          rsvpId
        }
        
      })
      .catch((resp: MeetupService.SubmitRsvpPayloadResponse) => {
        // INCORRECT
        // setTimeout(() => {
        // }, 500);
      });
  };

  // USER LOGIN STUFF...CREATE A NEW PROVIDER?
  const user = signal(appState.user);
  const setUser = (newUser: AppState["user"]) => {
    if (!newUser) return;
    user.value = { ...newUser };
  };

  const userLogin = async (payload: AuthData) => {
    const resp = await authLogin(payload);
    if (resp === null) {
      // error logging in
    } else if (typeof resp === "string") {
      // api error
    } else {
      // success
      setUser({
        ...user.value,
        ...resp,
      });
      setCurrentScreen("DASHBOARD");
    }
  };

  const addToStorage = (newState: AppState) => {
    if (typeof window.localStorage === "undefined") return;
    window.localStorage.setItem(
      LOCAL_STORAGE_KEYS.APP_STATE,
      JSON.stringify(newState)
    );
  };

  effect(() => {
    // update storage when main state changes
    const newAppState: AppState = {
      ...appState,
      currentScreen: currentScreen.value,
      modalState: modalState.value,
      attendModalState: attendModalState.value,
      currentEvent: currentEvent.value,
      groupInfo: {
        ...appState.groupInfo,
        ...group.value,
      },
      meetups: {
        ...appState.meetups,
        ...meetups.value,
      },
    };
    addToStorage(newAppState);
  });

  return {
    currentScreen,
    setCurrentScreen,
    modalState,
    setModalState,
    attendModalState,
    setAttendModalState,
    attendModalCanSubmitForm,

    currentEvent,
    setCurrentEvent,

    handleShowEventModal,
    handleShowAttendModal,

    group,
    setGroup,
    meetups,
    setMeetups,

    handleCloseModals,
    handleCloseAttendModal,
    handleSubmitRsvp,
    restartApp,

    // AUTH
    user,
    userLogin,
  };
}

export type Api = {
  currentScreen: ReadonlySignal<ScreensType>;
  setCurrentScreen: (newScreen: ScreensType) => void;
  currentEvent: ReadonlySignal<AppState["currentEvent"]>;
  setCurrentEvent: (newEvent: AppState["currentEvent"]) => void;
  modalState: ReadonlySignal<AppState["modalState"]>;
  setModalState: (newState: AppState["modalState"]) => void;
  attendModalState: ReadonlySignal<AppState["attendModalState"]>;
  setAttendModalState: (newState: AppState["attendModalState"]) => void;
  attendModalCanSubmitForm: ReadonlySignal<boolean>;

  handleShowEventModal: (newEvent: MeetupItem) => void;
  handleShowAttendModal: (newEvent: MeetupItem) => void;

  group: ReadonlySignal<AppState["groupInfo"]>;
  setGroup: (newGroup: AppState["groupInfo"]) => void;
  meetups: ReadonlySignal<AppState["meetups"]>;
  setMeetups: (newMeetups: AppState["meetups"]) => void;
  handleCloseModals: () => void;
  handleCloseAttendModal: () => void;
  handleSubmitRsvp: () => void;
  restartApp: () => void;

  // AUTH
  user: Signal<AppState["user"]>;
  userLogin: (data: { email: string; password: string }) => void;
};

export type AppStateProps = {
  api: Api;
};
const AppStateContext = createContext<AppStateProps | undefined>(undefined);

type AppStateProviderProps = AppStateProps & {
  children: ComponentChildren;
};
export function AppStateProvider({ children }: AppStateProviderProps) {
  const getStoredAppData = (): AppState => {
    if (typeof window.localStorage === "undefined") return { ...initialState };
    const value = window.localStorage.getItem(LOCAL_STORAGE_KEYS.APP_STATE);
    if (value === null) return { ...initialState };
    // @todo - validate with Zod to prevent tampering?
    return JSON.parse(value);
  };

  const storedAppState = getStoredAppData();

  const {
    currentScreen,
    setCurrentScreen,
    modalState,
    setModalState,
    attendModalState,
    setAttendModalState,
    attendModalCanSubmitForm,
    currentEvent,
    setCurrentEvent,
    group,
    setGroup,
    meetups,
    setMeetups,

    handleCloseModals,
    handleCloseAttendModal,
    handleShowEventModal,
    handleShowAttendModal,
    handleSubmitRsvp,
    restartApp,

    user,
    userLogin,
  } = createAppState(storedAppState);
  return (
    <AppStateContext.Provider
      value={{
        api: {
          currentScreen,
          setCurrentScreen,
          currentEvent,
          setCurrentEvent,
          modalState,
          setModalState,
          attendModalState,
          setAttendModalState,
          attendModalCanSubmitForm,
          group,
          setGroup,
          meetups,
          setMeetups,

          handleShowEventModal,
          handleShowAttendModal,
          handleCloseModals,
          handleCloseAttendModal,
          handleSubmitRsvp,

          restartApp,

          user,
          userLogin,
        },
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export default function useAppStateContext() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error(
      "useAppStateContext must be used within an AppStateProvider"
    );
  }
  return context;
}
