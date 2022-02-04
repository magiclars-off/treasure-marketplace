import {
  ChevronDownIcon,
  ExternalLinkIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import {
  TagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import { Fragment } from "react";
import { ListingFieldsFragment } from "../../generated/marketplace.graphql";
import { Transition } from "@headlessui/react";
import { formatDistanceToNow } from "date-fns";
import {
  formatPrice,
  getCollectionSlugFromName,
  getCollectionNameFromAddress,
} from "../utils";
import { useChainId } from "../lib/hooks";
import { shortenAddress } from "@yuyao17/corefork";
import ImageWrapper from "./ImageWrapper";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useQuery } from "react-query";
import { bridgeworld, client } from "../lib/client";
import ActivityActions from "./ActivityActions";

const Listings = ({
  listings,
  salesOnly,
  sort,
}: {
  listings: ListingFieldsFragment[];
  salesOnly?: boolean;
  sort: string | string[];
}) => {
  const chainId = useChainId();

  const getStatus = (status: string) => {
    if (status === "Active") return <TagIcon className="flex-shrink-0 h-5 w-5 text-gray-600" />
    if (status === "Sold") return <ShoppingCartIcon className="flex-shrink-0 h-5 w-5 text-gray-600" />
    return "";
  };

  const tokens = listings
    .filter(
      (listing) =>
        getCollectionNameFromAddress(listing.collection.id, chainId) !==
        "Legions"
    )
    .map((listing) => listing.token.id);

  const legions = listings
    .filter(
      (listing) =>
        getCollectionNameFromAddress(listing.collection.id, chainId) ===
        "Legions"
    )
    .map((listing) => listing.token.id);

  const { data: metadataData } = useQuery(
    ["activity-metadata", tokens],
    () =>
      client.getTokensMetadata({
        ids: tokens,
      }),
    {
      enabled: tokens.length > 0,
      refetchInterval: false,
    }
  );

  const { data: legionMetadataData } = useQuery(
    ["activity-metadata-legions", legions],
    () => bridgeworld.getLegionMetadata({ ids: legions }),
    {
      enabled: legions.length > 0,
      refetchInterval: false,
    }
  );

  return (
    <div className="flex-1 flex items-stretch overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <div className="pt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="flex justify-between text-2xl font-bold text-gray-900 dark:text-gray-200">
            Activity
            <ActivityActions sort={sort} salesOnly={salesOnly} />
          </h1>

          <div className="mt-4 hidden lg:block">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 dark:bg-gray-500 sticky top-0">
                <tr>
                  <th scope="col" />
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Item
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Price ($MAGIC)
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    From
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    To
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing, index) => {
                  const collectionName = getCollectionNameFromAddress(
                    listing?.collection?.id,
                    chainId
                  );
                  const slugOrAddress =
                    getCollectionSlugFromName(collectionName) ??
                    listing.collection.id;

                  const legionsMetadata = legionMetadataData?.tokens.find(
                    (item) => item.id === listing.token.id
                  );
                  const legacyMetadata = metadataData?.tokens.find(
                    (item) => item?.id === listing.token.id
                  );
                  const metadata = legionsMetadata
                    ? {
                        id: legionsMetadata.id,
                        name: legionsMetadata.name,
                        tokenId: listing.token.tokenId,
                        metadata: {
                          image: legionsMetadata.image,
                          name: legionsMetadata.name,
                          description: "Legions",
                        },
                      }
                    : legacyMetadata?.metadata
                    ? {
                        id: legacyMetadata.id,
                        name: legacyMetadata.name,
                        tokenId: listing.token.tokenId,
                        metadata: {
                          image: legacyMetadata.metadata.image,
                          name: legacyMetadata.metadata.name,
                          description:
                            legacyMetadata.metadata.description.replace(
                              "Legion",
                              "Legacy Legion"
                            ),
                        },
                      }
                    : undefined;

                  return (
                    <tr
                      key={listing.id}
                      className={
                        index % 2 === 0
                          ? "bg-white dark:bg-gray-200"
                          : "bg-gray-50 dark:bg-gray-300"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                        {getStatus(listing.status)}
                      </td>
                      <td className="flex items-center px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                        {metadata?.metadata ? (
                          <ImageWrapper
                            height={48}
                            token={metadata}
                            width={48}
                            className="min-w-[32px] min-h-[32px]"
                          />
                        ) : (
                          <div className="animate-pulse w-full bg-gray-300 h-12 rounded-md m-auto" />
                        )}
                        <div className="pl-2">
                          <p className="text-gray-500 dark:text-gray-400 font-thin tracking-wide uppercase text-[0.5rem]">
                            {metadata?.metadata?.description ?? ""}
                          </p>
                          <Link
                            href={`/collection/${slugOrAddress}/${listing.token.tokenId}`}
                            passHref
                          >
                            <a className="text-xs text-gray-800 dark:text-gray-700 font-semibold truncate hover:underline">
                              {metadata?.name ?? ""}
                            </a>
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                        {formatPrice(listing.pricePerItem)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                        {listing.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                        {shortenAddress(listing.seller.id)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-700">
                        {listing.buyer?.id
                          ? shortenAddress(listing.buyer.id)
                          : ""}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 dark:text-gray-700">
                        <a
                          className="flex flex-1 items-center"
                          href={listing.transactionLink ?? ""}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {formatDistanceToNow(
                            new Date(Number(listing.blockTimestamp) * 1000),
                            { addSuffix: true }
                          )}
                          <ExternalLinkIcon className="h-5 pl-2" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="lg:hidden block">
          <ul
            role="list"
            className="mt-2 divide-y divide-gray-200 dark:divide-gray-300 overflow-hidden"
          >
            {listings.map((listing) => {
              const legionsMetadata = legionMetadataData?.tokens.find(
                (item) => item.id === listing.token.id
              );
              const metadata = legionsMetadata
                ? {
                    id: legionsMetadata.id,
                    name: legionsMetadata.name,
                    tokenId: listing.token.tokenId,
                    metadata: {
                      image: legionsMetadata.image,
                      name: legionsMetadata.name,
                      description: "Legions",
                    },
                  }
                : metadataData?.tokens.find(
                    (item) => item?.id === listing.token.id
                  ) ?? undefined;

              const collectionName = getCollectionNameFromAddress(
                listing?.collection?.id,
                chainId
              );

              const slugOrAddress =
                getCollectionSlugFromName(collectionName) ??
                listing.collection.id;

              return (
                <Disclosure as="li" key={listing.id}>
                  {({ open }) => (
                    <>
                      <div className="relative">
                        <div className="block px-4 py-4 hover:bg-gray-50 dark:bg-gray-200">
                          <span className="flex items-center">
                            <span className="flex-1 flex space-x-4 truncate">
                              {metadata?.metadata ? (
                                <ImageWrapper
                                  aria-hidden="true"
                                  height="50%"
                                  token={metadata}
                                  width="60%"
                                  className="min-w-[32px] min-h-[32px]"
                                />
                              ) : (
                                <div className="animate-pulse w-full bg-gray-300 h-48 rounded-md m-auto" />
                              )}
                              <span className="flex flex-col text-gray-500 space-y-1 text-sm truncate">
                                <span className="truncate text-xs text-gray-400 uppercase">
                                  {" "}
                                  {metadata?.metadata?.description ?? ""}
                                </span>
                                <span className="truncate text-gray-600 font-semibold">
                                  {" "}
                                  {metadata?.name ?? ""}
                                </span>
                                <span>
                                  <span className="text-gray-900 font-medium">
                                    {formatPrice(listing.pricePerItem)}
                                  </span>{" "}
                                  $MAGIC
                                </span>
                              </span>
                            </span>
                            {getStatus(listing.status)}
                            <p className="truncate text-gray-600 font-semibold mr-2">
                              
                            </p>
                            {open ? (
                              <ChevronDownIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            ) : (
                              <ChevronRightIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </div>
                        <Disclosure.Button className="absolute inset-0 focus:outline-none w-full h-full" />
                      </div>
                      <Transition show={open} as={Fragment}>
                        <Disclosure.Panel
                          static
                          className="block px-4 dark:bg-gray-200 text-gray-700"
                        >
                          <div className="pb-4 flex sm:space-y-0 space-y-2 sm:flex-row flex-col sm:divide-x-[1px] divide-gray-400 text-sm">
                            <Link
                              href={`/collection/${slugOrAddress}/${listing.token.tokenId}`}
                              passHref
                            >
                              <a className="text-red-500 hover:text-red-700 dark:text-gray-200 dark:hover:text-gray-300 text-sm flex items-center space-x-1 sm:pr-8">
                                View item
                              </a>
                            </Link>
                            <div className="space-y-1 sm:pr-8 sm:pl-8">
                              <p className="text-xs dark:text-gray-500">
                                From:
                              </p>
                              <p>
                                {listing.buyer?.id
                                  ? shortenAddress(listing.seller.id)
                                  : ""}
                              </p>
                            </div>
                            <div className="sm:px-8 space-y-1">
                              <p className="text-xs dark:text-gray-500">To:</p>
                              <p>
                                {listing.buyer?.id
                                  ? shortenAddress(listing.buyer.id)
                                  : ""}
                              </p>
                            </div>
                            <div className="sm:pl-8 space-y-1">
                              <p className="text-xs dark:text-gray-500">
                                Time:
                              </p>
                              <a
                                className="flex items-center"
                                href={listing.transactionLink ?? ""}
                                rel="noreferrer"
                                target="_blank"
                              >
                                {formatDistanceToNow(
                                  new Date(
                                    Number(listing.blockTimestamp) * 1000
                                  ),
                                  {
                                    addSuffix: true,
                                  }
                                )}
                                <ExternalLinkIcon className="h-4 m-[0.125rem] pl-1" />
                              </a>
                            </div>
                          </div>
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default Listings;
