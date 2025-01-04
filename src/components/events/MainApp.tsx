import { useEffect } from "preact/hooks";
import GroupHeader from "./components/GroupHeader/GroupHeader";
import type { MeetupItem } from "./types/types";
import useAppStateContext from "./contexts/AppStateProvider";
import EventsList from "./screens/EventsList/EventsList";
import {
  getEventsByOrganiserId,
  getGroupInfo,
  hasUpdatedRecently,
} from "./services/meetup.service";
import Login from './screens/Login/Login';
import Dashboard from './screens/Dashboard/Dashboard';

export default function MainApp() {
  console.log("Rendering MainApp.tsx");
  const {
    api: {
      currentScreen,
      group,
      setGroup,
      meetups,
      setMeetups,
      handleShowEventModal,
    },
  } = useAppStateContext();

  const handleViewEvent = (newMeetup: MeetupItem) => {
    handleShowEventModal(newMeetup);
  };

  // useEffect here to fetch group ID and events for the group
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (
      group.value.data === null &&
      group.value.isError !== true &&
      hasUpdatedRecently(group.value.lastFetched)
    ) {
      return;
    }

    const p1 = getGroupInfo;
    const p2 = getEventsByOrganiserId;
    (async () => {
      // @todo - try-catch here if fails getting group info
      try {
        const groupInfo = await p1();
  
        if (!groupInfo || !groupInfo.data) {
          throw new Error("Failed to fetch group");
        }
        setGroup(groupInfo);
  
        // @todo - try-catch here if fails getting events
        const meetups = await p2();
        setMeetups(meetups);
        
      } catch (error) {
        setGroup({
          data: null,
          lastFetched: -1,
          isError: true,
          errorMessage: 'Could not fetch group info'
        });
        setMeetups({
          data: [],
          lastFetched: -1,
          isError: true,
          errorMessage: 'Could not fetch events'
        });
      }
    })();
  }, []);

  return (
    <div class="bg-slate-100 pb-12">
      <div class="mx-auto max-w-sm min-h-[100vh] bg-white rounded-b-lg">
        <div>
          {currentScreen.value === "EVENTS" && (
            <>
              {group.value.isError && (
                <div class="p-4 min-h-24 text-center">
                  <h2>{group.value.errorMessage}</h2>
                </div>
              )}
              {!group.value.isError && <GroupHeader group={group.value.data} />}
              <hr />
              {meetups.value.isError && (
                <div class="p-4 min-h-48 text-center">
                  <p>{meetups.value.errorMessage}</p>
                </div>
              )}
              {!meetups.value.isError && (
                <EventsList
                  meetups={meetups.value.data}
                  group={group.value.data}
                  viewEvent={(newMeetup) => handleViewEvent(newMeetup)}
                />
              )}
            </>
          )}
          {currentScreen.value === "LOGIN" && (
            <Login
              group={group.value.data}
            />
          )}
          {currentScreen.value === "DASHBOARD" && (
            <Dashboard
              group={group.value.data}
            />
          )}
        </div>
      </div>
    </div>
  );
}
