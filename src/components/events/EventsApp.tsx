import { computed } from "@preact/signals";
import { AppStateProvider, type Api } from "./contexts/AppStateProvider";
import { initialState, type AppState } from "./state/state";
import { LOCAL_STORAGE_KEYS } from './config/config';
import MainApp from './MainApp';

type EventsAppProps = {
  siteUrl: string;
}
export default function EventsApp({ siteUrl }: EventsAppProps) {
  console.log('Rendering EventsApp.tsx');
  
  const getStoredAppData = (siteUrl: string): AppState => {
    if (typeof window.localStorage === "undefined") return { ...initialState, siteUrl };
    const value = window.localStorage.getItem(LOCAL_STORAGE_KEYS.APP_STATE);
    if (value === null) return { ...initialState, siteUrl };
    return JSON.parse(value);
  };
  const storedAppState = getStoredAppData(siteUrl);

  const api: Api = {
    siteUrl: computed(() => storedAppState.siteUrl),
    currentScreen: computed(() => storedAppState.currentScreen),
    setCurrentScreen: () => {},
    currentEvent: computed(() => storedAppState.currentEvent),
    setCurrentEvent: () => { },
    modalState: computed(() => storedAppState.modalState),
    setModalState: () => { },
    attendModalState: computed(() => storedAppState.attendModalState),
    setAttendModalState: () => { },
    attendModalCanSubmitForm: computed(() => false),
    handleShowEventModal: () => { },
    handleShowAttendModal: () => { },
    handleCloseAttendModal: () => { },
    handleSubmitRsvp: () => { },
    group: computed(() => storedAppState.groupInfo),
    setGroup: () => { },
    meetups: computed(() => storedAppState.meetups),
    setMeetups: () => { },
    handleCloseModals: () => {},
    restartApp: () => { },
    user: computed(() => storedAppState.user),
    userLogin: () => { },
  }

  return (
    <AppStateProvider api={api} websiteUrl={siteUrl}>
      <MainApp />
    </AppStateProvider>
  );
}

