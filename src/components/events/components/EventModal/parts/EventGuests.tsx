import { RiAccountCircleFill } from "../../Icons/Icons";
import {
  MeetupRsvpAttendanceStatusEnum,
  type MeetupGroupItem,
  type MeetupItem,
} from "../../../types/types";
import { getGuestList } from "../../../utils/utils";
import { useCallback } from "preact/hooks";

type EventGuestsProps = {
  event: MeetupItem;
  group: MeetupGroupItem | null;
};
export default function EventGuests({ event, group }: EventGuestsProps) {
  const { rsvps } = event;
  // const confirmedGuests = useCallback(
  //   () => getGuestList(rsvps, MeetupRsvpAttendanceStatusEnum.Coming),
  //   [rsvps]
  // );
  // const unconfirmedGuests = useCallback(
  //   () => getGuestList(rsvps, MeetupRsvpAttendanceStatusEnum.Cannot),
  //   [rsvps]
  // );
  const confirmedGuests = getGuestList(rsvps, MeetupRsvpAttendanceStatusEnum.Coming);
  const unconfirmedGuests = getGuestList(rsvps, MeetupRsvpAttendanceStatusEnum.Cannot);

  return (
    <>
      <GuestBlock
        title="Confirmed guests"
        numberOfGuests={confirmedGuests.length.toString()}
      />
      <hr />
      <GuestBlock
        title="Un-confirmed guests"
        numberOfGuests={unconfirmedGuests.length.toString()}
      />
    </>
  );
}

type GuestBlockProps = {
  title: string;
  numberOfGuests: string;
};
function GuestBlock({ title, numberOfGuests }: GuestBlockProps) {
  return (
    <div class="flex flex-col gap-2">
      <h2 class="text-base tracking-tight font-semibold">{title}</h2>
      <div class="flex flex-row items-start gap-2">
        <RiAccountCircleFill width={24} height={24} />
        <div class="flex flex-row flex-wrap relative flex-grow">
          {numberOfGuests} guest/s
        </div>
      </div>
    </div>
  );
}
