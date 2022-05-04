import { BookOpenIcon, GlobeAltIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { ALL_COLLECTION_METADATA } from "../const";
import { useCollection } from "../lib/hooks";
import {
  ArbitrumIcon,
  DiscordIcon,
  GameIcon,
  TreasureToolsIcon,
  TwitterIcon,
} from "./Icons";
import { Tooltip } from "./Tooltip";
import classNames from "clsx";

function IconLink({
  className,
  href,
  name,
  icon: Icon,
}: {
  className?: string;
  href: string;
  icon: <T>(props: T) => JSX.Element;
  name: string;
}) {
  return (
    <Tooltip content={name} sideOffset={5}>
      <div className="">
        <span className="relative z-0 inline-flex shadow-sm rounded-md">
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(
              className,
              "relative inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-white dark:bg-transparent text-sm font-medium text-gray-500 dark:text-gray-200 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 dark:focus:ring-gray-500 dark:focus:border-gray-500"
            )}
          >
            <span className="sr-only">{name}</span>
            <Icon className="w-7 h-7" aria-hidden="true" />
          </a>
        </span>
      </div>
    </Tooltip>
  );
}

export function CollectionLinks() {
  const router = useRouter();
  const { address: slugOrAddress, tokenId } = router.query;
  const { id: formattedAddress, slug } = useCollection(slugOrAddress);

  const info = ALL_COLLECTION_METADATA.find((item) => item.href === slug);

  return (
    <>
      {[
        info?.website
          ? {
              href: info.website,
              icon: GlobeAltIcon,
              name: "Website",
            }
          : null,
        info?.game
          ? {
              href: info.game,
              icon: GameIcon,
              name: "Game",
            }
          : null,
        info?.docs
          ? {
              href: info.docs,
              icon: BookOpenIcon,
              name: "Docs/Guide",
            }
          : null,
        info?.tools
          ? {
              href: `https://treasure.tools/collections/${info.tools}${
                tokenId ? `?search=${tokenId}` : ""
              }`,
              icon: TreasureToolsIcon,
              name: "Treasure Tools",
            }
          : null,
        formattedAddress
          ? {
              href: `https://arbiscan.io/address/${formattedAddress}`,
              icon: ArbitrumIcon,
              name: "Arbiscan",
            }
          : null,
        info?.discord
          ? {
              href: `https://discord.gg/${info.discord}`,
              icon: DiscordIcon,
              name: "Discord",
            }
          : null,
        info?.twitter
          ? {
              href: `https://twitter.com/${info.twitter}`,
              icon: TwitterIcon,
              name: "Twitter",
            }
          : null,
      ]
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .map((item, index, array) => (
          <IconLink
            key={item.href}
            className={classNames(
              index === 0 ? "border-l rounded-l-md" : undefined,
              index === array.length - 1 ? "rounded-r-md" : undefined
            )}
            {...item}
          />
        ))}
    </>
  );
}
