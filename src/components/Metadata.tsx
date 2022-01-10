import { FC } from "react";
import Head from "next/head";
import { Metadata } from "../../generated/graphql";

type MetadataProps = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const Metadata: FC<MetadataProps> = ({
  title,
  description,
  url,
  image,
}) => {
  const metaTitle = title ? title : "Treasure Marketplace";
  const metaDescription = description
    ? description
    : "Arbitrum native NFT marketplace, created by TreasureDAO";
  const metaUrl = url ? url : "http://marketplace.treasure.lol/";
  const metaImage = image
    ? image
    : "http://marketplace.treasure.lol/img/seoBanner.png";

  return (
    <Head>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <script async src="https://cdn.splitbee.io/sb.js"></script>
    </Head>
  );
};

export default Metadata;
