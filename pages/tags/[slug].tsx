import Layout from "@/components/layout";
import PollList from "@/components/polls/poll-list";
import apiClient from "@/lib/api/api-client";
import { Poll, PollStatus, Tag } from "@/lib/api/types";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import locales from "@/lib/locales";
import getUserTokenServer from "@/lib/user-token-server";
import { motion } from "framer-motion";
import { GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import Balancer from "react-wrap-balancer";

export default function TagPage({ polls, tag }: { polls: Poll[]; tag: Tag }) {
  const Items = <PollList list={polls} />;

  return (
    <Layout>
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
          <Balancer>
            {locales.tag_page_title_format({ name: tag.name })}
          </Balancer>
        </motion.h1>
        {Items}
      </motion.div>
    </Layout>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps = async (
  context: GetStaticPropsContext & { params: Params },
) => {
  const { slug } = context.params;
  const client = apiClient();
  const [tag, polls] = await Promise.all([
    client.tagBySlug({ slug }),
    client.pollList({
      // status: PollStatus.DRAFT,
      limit: 10,
      tag: slug,
    }),
  ]);

  if (!tag) return { notFound: true, revalidate: 5 };

  return {
    props: {
      polls,
      tag,
    },
    revalidate: 60,
  };
};
