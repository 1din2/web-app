import Layout from "@/components/layout";
import PollItem from "@/components/polls/poll-item";
import PollList from "@/components/polls/poll-list";
import apiClient from "@/lib/api/api-client";
import { Poll, PollStatus } from "@/lib/api/types";
import { motion } from "framer-motion";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

type Props = {
  poll: Poll;
  latest: Poll[];
};

export default function PollPage({ poll, latest }: Props) {
  const Items = <PollList list={latest} />;

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
        <PollItem item={poll} active={true} />
        {/* {Items} */}
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
): Promise<GetStaticPropsResult<Props>> => {
  const { slug } = context.params;
  const client = apiClient();
  const [poll, latest] = await Promise.all([
    client.pollBySlug({ slug }),
    client.pollList({
      // status: PollStatus.DRAFT,
      limit: 10,
    }),
  ]);

  if (!poll) return { notFound: true, revalidate: 10 };

  return {
    props: {
      latest,
      poll,
    },
    revalidate: poll.status === PollStatus.ENDED ? 60 * 60 : 30,
  };
};
