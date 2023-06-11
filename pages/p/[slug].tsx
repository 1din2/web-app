import Layout from "@/components/layout";
import { MetaData } from "@/components/layout/meta";
import PollItem from "@/components/polls/poll-item";
import PollList from "@/components/polls/poll-list";
import apiClient from "@/lib/api/api-client";
import { Poll, PollStatus } from "@/lib/api/types";
import { ROOT_URL } from "@/lib/constants";
import links from "@/lib/links";
import locales from "@/lib/locales";
import { motion } from "framer-motion";
import { GetStaticPropsContext, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";

type Props = {
  poll: Poll;
  latest: Poll[];
};

export default function PollPage({ poll, latest }: Props) {
  const Items = <PollList list={latest} />;
  const options = poll.options || [];
  const meta: MetaData = {
    canonical: `${ROOT_URL}${links.poll(poll.slug)}`,
    title: poll.title,
    description: `${locales.name1_or_name2({
      name1: options[0]?.title || "1",
      name2: options[1]?.title || "2",
    })}? ${poll.description || ""}`.trim(),
    image: links.pollSocialImage(poll.slug),
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
        <PollItem item={poll} active={true} />
        <p className="text-center text-gray-500">{poll.description}</p>
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
