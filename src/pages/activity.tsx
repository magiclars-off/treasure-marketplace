import { Listing_OrderBy } from "../../generated/marketplace.graphql";

import { useRouter } from "next/router";
import { useQuery } from "react-query";

import { marketplace } from "../lib/client";
import Listings from "../components/Listings";
import { CenterLoadingDots } from "../components/CenterLoadingDots";
import Metadata from "../components/Metadata";

const Activity = () => {
  const router = useRouter();
  const { activitySort } = router.query;
  const sortParam = activitySort ?? "time";

  const { data, isLoading } = useQuery(["activity", { sortParam }], () =>
    marketplace.getAllActivities({
      orderBy:
        sortParam === "price"
          ? Listing_OrderBy.pricePerItem
          : Listing_OrderBy.blockTimestamp,
    })
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden pt-24">
      <Metadata url={window.location.href} />
      {isLoading && <CenterLoadingDots className="h-60" />}
      {data?.listings && <Listings listings={data.listings} sort={sortParam} />}
    </div>
  );
};

export default Activity;
