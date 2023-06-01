import Layout from "@/components/layout";
import apiClient from "@/lib/api/api-client";
import { CurrentUser } from "@/lib/current-user";

type Props = {
  user?: CurrentUser | null;
};

export default function Home({ user }: Props) {
  console.log("getStaticProps", typeof window);
  return (
    <Layout>
      <h1>Home</h1>
      <p>user: {user ? "aha" : "no"}</p>
    </Layout>
  );
}

export async function getServerSideProps() {
  console.log("getStaticProps", typeof window);
  const user = await apiClient.me();
  return {
    props: {
      user,
    },
  };
}

export const revalidate = 3600;
