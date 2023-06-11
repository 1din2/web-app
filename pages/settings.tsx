import { useLoginModal } from "@/components/home/login-modal";
import Layout from "@/components/layout";
import { MetaData } from "@/components/layout/meta";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { getCurrentUser } from "@/lib/current-user";
import links from "@/lib/links";
import locales from "@/lib/locales";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Balancer from "react-wrap-balancer";

export default function SettingsPage() {
  const [currentUser] = useState(getCurrentUser());
  const meta: MetaData = {
    canonical: links.settings(),
    title: locales.settings(),
    description: locales.settings_description(),
  };

  const { setShowLoginModal, LoginModal } = useLoginModal();
  useEffect(() => {
    if (!currentUser) setShowLoginModal(true);
  }, [currentUser, setShowLoginModal]);

  const deleteMyData = () => {
    if (!currentUser) setShowLoginModal(true);
    if (currentUser) {
      console.log("delete my data");
    }
  };

  return (
    <Layout meta={meta}>
      <LoginModal />
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
        <br />
        <div className="base-html">
          <h3>{locales.delete_my_data_info()}</h3>
          <button
            className="rounded-full bg-blue-700 px-4 py-1 text-white"
            onClick={() => deleteMyData()}
          >
            {locales.delete_my_data()}
          </button>
        </div>
      </motion.div>
    </Layout>
  );
}
