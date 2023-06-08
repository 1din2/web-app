import { DOMAIN, ROOT_URL } from "@/lib/constants";
import Head from "next/head";

export type MetaData = {
  title?: string;
  description?: string;
  image?: string;
  canonical: string;
};

export default function Meta({
  title = "Extrapolate - Transform your face with Artificial Intelligence",
  description = "Extrapolate is an app for you to see how well you age by transforming your face with Artificial Intelligence. 100% free and privacy friendly.",
  image = `${ROOT_URL}/api/og`,
  canonical,
}: MetaData) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link rel="canonical" href={canonical} />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta itemProp="image" content={image} />
      <meta property="og:logo" content={`${ROOT_URL}/logo.png`}></meta>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${DOMAIN}`} />
      <meta name="twitter:creator" content={`@${DOMAIN}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
