import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

import logoImg from "../../public/img/logotransparent.png";
import { Metadata } from "../components/Metadata";
import { BATTLEFLY, COLLECTION_METADATA, TOADSTOOLZ } from "../const";

export default function Home() {
  return (
    <div className="relative">
      <Metadata
        description="Arbitrum native NFT marketplace, created by TreasureDAO and powered by $MAGIC"
        exactTitle
        image="https://marketplace.treasure.lol/img/seoBanner.png"
        title="Treasure Marketplace, native to Arbitrum"
        url="https://marketplace.treasure.lol"
      />
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
            {COLLECTION_METADATA.slice(0, 3)
              .concat(TOADSTOOLZ)
              .concat(COLLECTION_METADATA.slice(3, 7))
              .concat(BATTLEFLY)
              .concat(COLLECTION_METADATA.slice(7))
              .map((product) => (
                <div
                  key={product.href}
                  className="group relative bg-white dark:bg-gray-500 border border-gray-200 dark:border-gray-600 rounded-lg flex flex-col overflow-hidden"
                >
                  <div
                    className={clsx(
                      "relative aspect-none group-hover:opacity-75",
                      product.imageBgColor
                        ? `bg-[${product.imageBgColor}]`
                        : "bg-gray-200"
                    )}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="responsive"
                      width={400}
                      height={400}
                      objectFit={product.imageContain ? "contain" : "fill"}
                    />
                  </div>
                  <div className="flex-1 p-4 space-y-2 flex flex-col">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
                      <Link href={`/collection/${product.href}`}>
                        <a>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
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
