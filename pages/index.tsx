import Layout from "@/components/layout";
import PollList from "@/components/polls/poll-list";
import { Twitter } from "@/components/shared/icons";
import Tooltip from "@/components/shared/tooltip";
import apiClient from "@/lib/api/api-client";
import { Poll, PollStatus } from "@/lib/api/types";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";

type Props = {
  polls: Poll[];
};

export default function Home({ polls }: Props) {
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
        {Items}
        <motion.a
          variants={FADE_DOWN_ANIMATION_VARIANTS}
          href="https://twitter.com/steventey/status/1616505632001232896"
          target="_blank"
          rel="noreferrer"
          className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
        >
          <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          <p className="text-sm font-semibold text-[#1d9bf0]">
            Introducing Extrapolate
          </p>
        </motion.a>
        <motion.h1
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>See how well you age with AI</Balancer>
        </motion.h1>
        <motion.p
          className="mt-6 text-center text-gray-500 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer ratio={0.6}>
            Curious how you&apos;ll look in 10 years? 20 years? When you&apos;re
            90? Upload a photo and find out!{" "}
            <Tooltip
              content={
                <div className="flex flex-col items-center justify-center space-y-3 p-10 text-center sm:max-w-xs">
                  <p className="text-sm text-gray-700">
                    Any photos you upload are automatically deleted after 24
                    hours.
                  </p>
                  <a
                    href="https://github.com/steven-tey/extrapolate"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 rounded-full border border-black bg-black px-5 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
                  >
                    See how it works
                  </a>
                </div>
              }
            >
              <span className="hidden cursor-default underline decoration-dotted underline-offset-2 transition-colors hover:text-gray-800 sm:block">
                100% free and privacy-friendly
              </span>
            </Tooltip>
          </Balancer>
        </motion.p>
      </motion.div>
    </Layout>
  );
}

export async function getStaticProps() {
  const client = apiClient();
  const polls = await client.pollList({
    // status: PollStatus.DRAFT,
    limit: 5,
  });

  return {
    props: {
      polls,
    },
    revalidate: 60,
  };
}
