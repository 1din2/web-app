import { motion } from "framer-motion";
import { Poll } from "@/lib/api/types";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Balancer from "react-wrap-balancer";
import links from "@/lib/links";

export default function PollListItem({ item }: { item: Poll }) {
  return (
    <motion.div
      className="group relative mx-auto mt-10 h-[250px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white sm:h-[400px] sm:w-[600px]"
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.a
        variants={FADE_DOWN_ANIMATION_VARIANTS}
        className="block h-full w-full p-4"
        href={links.poll(item.slug)}
      >
        <motion.h2
          className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-3xl font-bold tracking-[-0.02em] text-transparent shadow-black drop-shadow md:text-6xl md:leading-[4rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>{item.title}</Balancer>
        </motion.h2>
      </motion.a>
    </motion.div>
  );
}
