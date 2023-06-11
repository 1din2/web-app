import Layout from "@/components/layout";
import { MetaData } from "@/components/layout/meta";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import links from "@/lib/links";
import locales from "@/lib/locales";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { marked } from "marked";

const mdToHtml = marked;

export default function TermsPage() {
  const meta: MetaData = {
    canonical: links.terms(),
    title: locales.terms_title(),
    description: locales.terms_description(),
  };

  return (
    <Layout meta={meta}>
      <motion.div
        className="z-10 max-w-2xl px-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>{meta.title}</Balancer>
        </motion.h1>
        <br/>
        <div className="base-html"
          dangerouslySetInnerHTML={{
            __html: mdToHtml(locales.terms_content_md()),
          }}
        ></div>
      </motion.div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 60 * 60 * 24,
  };
}
