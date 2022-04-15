import { Activity } from "../components/Activity";
import Metadata from "../components/Metadata";

export default function ActivityPage() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden pt-24">
      <Metadata url={window.location.href} />
      <Activity title="Activity" />
    </div>
  );
}
