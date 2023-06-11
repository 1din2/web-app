import Layout from "@/components/layout";
import { MetaData } from "@/components/layout/meta";
import PollList from "@/components/polls/poll-list";
import apiClient from "@/lib/api/api-client";
import { Poll, PollStatus } from "@/lib/api/types";
import { FADE_DOWN_ANIMATION_VARIANTS, ROOT_URL } from "@/lib/constants";
import locales from "@/lib/locales";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

type Props = {
  polls: Poll[];
};

export default function Home({ polls }: Props) {
  const Items = <PollList list={polls} votable={true} />;
  const meta: MetaData = {
    canonical: ROOT_URL,
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
        {Items}
        <br />
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>{locales.title()}</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer ratio={0.6}>{locales.description()}</Balancer>
        </motion.p>
      </motion.div>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = apiClient();

  const polls = await client.pollList({
    status: [PollStatus.ACTIVE],
    limit: 5,
  });

  return {
    props: {
      polls,
    },
    revalidate: 60 * 15,
  };
}
