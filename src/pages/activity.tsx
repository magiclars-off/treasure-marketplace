import type { GetServerSidePropsContext } from "next";
import { Activity } from "../components/Activity";
import { Metadata, MetadataProps } from "../components/Metadata";

export default function ActivityPage({ og }: { og: MetadataProps }) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden pt-24">
      <Metadata {...og} />
      <Activity title="Activity" />
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      og: {
        description: "View overall marketplace activity",
        image: "https://marketplace.treasure.lol/img/seoBanner.png",
        title: "Activity - Overall",
        url: `https://marketplace.treasure.lol${context.resolvedUrl}`,
      },
    },
  };
}
