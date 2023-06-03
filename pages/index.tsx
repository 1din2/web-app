import Layout from "@/components/layout";
import apiClient from "@/lib/api/api-client";
import { Poll, PollStatus } from "@/lib/api/types";

type Props = {
  polls: Poll[];
};

export default function Home({ polls }: Props) {
  return (
    <Layout>
      <h1>Home</h1>
      <p>polls: {polls.length}</p>
    </Layout>
  );
}

export async function getStaticProps() {
  const polls = await apiClient.pollList(PollStatus.ACTIVE, 10);
  return {
    props: {
      polls,
    },
    revalidate: 60,
  };
}
