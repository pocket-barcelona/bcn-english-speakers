import useAppStateContext from "../../contexts/AppStateProvider";
import type { MeetupGroupItem } from "../../types/types";

type DashboardProps = {
  group: MeetupGroupItem | null;
};
export default function Dashboard({ group }: DashboardProps) {
  const {
    api: { user },
  } = useAppStateContext();

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      Dashboard here
    </div>
  );
}
