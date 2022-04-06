import Image from "next/image";

import logoImg from "../../public/img/logotransparent.png";
import Link from "next/link";

const collections = [
  {
    href: "legion-genesis",
    name: "Legion Genesis",
    image:
      "https://ipfs.io/ipfs/QmRqosGZZ6icx6uSDjLuFFMJiWDefZAiAZdpJdBK9BP5S4/Warlock.png",
    description: "The Origin Legions of Bridgeworld with a fixed supply.",
  },
  {
    href: "smol-brains",
    name: "Smol Brains",
    image:
      "https://ipfs.io/ipfs/QmY71ban6QoWg9nbNwikk6wVWknj8NFBG8nMGHEuzwfAwf/121/0.png",
    description:
      "The Smol Brains are a dynamic PFP of a monkey whose head gets bigger the larger its IQ becomes.",
  },
  {
    href: "seed-of-life",
    name: "Seed of Life",
    image:
      "https://ipfs.io/ipfs/QmbkpUo9dPsTVDfttdgkV6eqbPLCXyoKhFBxhwdAgqB15z/Seed of Life 1.png",
    description:
      "Built atop the Magic ecosystem, Life embodies the metaverse as a living breathing ecosystem...",
  },
  {
    href: "battlefly",
    name: "BattleFly",
    image:
      "https://ipfs.io/ipfs/QmVSMdABd2hahtS74owdeu6nHauaXhWviReyMGch8Ztb6W",
    description:
      "BattleFly is an experimental PVP/P2E strategy game, powered by $MAGIC.",
  },
  {
    href: "legion-auxiliary",
    name: "Legion Auxiliary",
    image:
      "https://ipfs.io/ipfs/QmTxcMUqVvrHMrdLUqtSjFSbHZ4ZoQ2bUB6U7CEpA7JDiF/Uncommon Fighter.gif",
    description:
      "Descendants of Genesis Legions that can be summoned in Bridgeworld.",
  },
  {
    href: "treasures",
    name: "Treasures",
    image:
      "https://ipfs.io/ipfs/Qmbyy8EWMzrSTSGG1bDNsYZfvnkcjAFNM5TXJqvsbuY8Dz/Honeycomb.gif",
    description:
      "Treasures are composable building blocks in Bridgeworld that will be used inter- and intra-metaverse.",
  },
  {
    href: "consumables",
    name: "Consumables",
    image:
      "https://ipfs.io/ipfs/QmdpMJMTRrGu1Z43RF94WnDRj5QwiLJXo43TwKWPX2cTWE/Medium Prism.gif",
    description:
      "Functional items that are crafted from Treasures and give utility in the Metaverse.",
  },
  {
    href: "smol-bodies",
    name: "Smol Bodies",
    image:
      "https://ipfs.io/ipfs/QmSqwxNFMeFtgdCnjBTTixx46Wi6TH9FtQ5jAp98JnAoeR/3948/0.png",
    description:
      "The Smol Bodies inhabit a gym near you, stacking $plates to earn muscle and be not smol.",
  },
  {
    href: "smithonia-weapons",
    name: "Smithonia Weapons",
    image:
      "https://ipfs.io/ipfs/bafkreibzmyesy7amoir273ckdcnpndkaz4b3ljdpc6lgexv2abzfnuieq4",
    description:
      "Smithonia is a SmithyDAO project. It's a world of staking and adventure which supports a hybrid economy where the primary objective of the game is to build the rarity of your weapon through gameplay.",
  },
  {
    href: "tales-of-elleria",
    name: "Tales of Elleria",
    image:
      "https://ipfs.io/ipfs/Qmd66PRkYUWN78VUSzYyxmZeP4zLpC8Wroif3QNCyofvj7",
    description:
      "Tales of Elleria is an immersive three-dimensional role-playing GameFi project. Summon heroes, take on assignments, go on quests and epic adventures to battle dangerous monsters earn tremendous rewards.",
  },
  {
    href: "peek-a-boo",
    name: "Peek-A-Boo",
    image: "/img/peekaboo.svg",
    description:
      "Peek-A-Boo is a collection of 10,000 adorable NFTs. There are two types, Ghosts and Busters.",
  },
  {
    href: "realm",
    name: "Realm",
    image: "/img/realm.png",
    description:
      "Realm is a decentralized world-building experience. Enjoy $MAGIC emissions and Loot from across the Metaverse.",
  },
  {
    href: "smol-brains-pets",
    name: "Smol Brains Pets",
    image:
      "https://ipfs.io/ipfs/QmdRyjjv6suTcS9E1aNnKRhvL2McYynrzLbg5VwXH8cCQB/614.gif",
    description:
      "The Smol Brains Pets are cute companions to accompany your Smol Brain in Smolverse.",
  },
  {
    href: "smol-cars",
    name: "Smol Cars",
    image:
      "https://ipfs.io/ipfs/QmVjjJJ7XQKRbM5uBmDtTP9r22UZC1Wv55AT9p4yGecHpP/30.png",
    description:
      "The Smol Cars are here to get you around in Smolverse. Vroom vroom.",
  },

  {
    href: "smol-treasures",
    name: "Smol Treasures",
    image:
      "https://ipfs.io/ipfs/QmZK1i4y7qn7Fi7mEMgT4KZcb1Etb12yndcTZ5dnhigDPt/2.gif",
    description:
      "Smols and Swols are currently farming Smol treasures on the moon.",
  },
];

export default function Home() {
  return (
    <div className="relative">
      <main className="flex flex-col mt-16 pt-20 w-full min-h-screen landing">
        <div className="z-10 px-8 max-w-2xl lg:max-w-7xl mx-auto">
          <div className="lg:max-w-[70%]">
            <Image
              alt="Treasure Marketplace Logo"
              src={logoImg.src}
              width={logoImg.width}
              height={logoImg.height}
              className="dark:filter dark:invert"
            />
            <p className="text-right font-semibold tracking-wider mt-2 text-lg">
              MARKETPLACE
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Collections</h2>

          <div className="grid gap-4 grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
            {collections.map((product) => (
              <div
                key={product.href}
                className="group relative bg-white dark:bg-gray-500 border border-gray-200 dark:border-gray-600 rounded-lg flex flex-col overflow-hidden"
              >
                <div className="relative aspect-none bg-gray-200 group-hover:opacity-75">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="responsive"
                    width={400}
                    height={400}
                  />
                </div>
                <div className="flex-1 p-4 space-y-2 flex flex-col">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                    <Link href={`/collection/${product.href}`}>
                      <a>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </Link>
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    {product.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
