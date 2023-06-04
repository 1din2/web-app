import { motion } from "framer-motion";
import { Poll } from "@/lib/api/types";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Balancer from "react-wrap-balancer";

export default function PollListItem({ item }: { item: Poll }) {
  return (
    <motion.a variants={FADE_DOWN_ANIMATION_VARIANTS} className="w-full h-full block p-4" href={`/p/${item.slug}`}>
      <motion.h2
        className="bg-gradient-to-br from-white to-white bg-clip-text text-center font-display text-3xl font-bold tracking-[-0.02em] text-transparent drop-shadow shadow-black md:text-6xl md:leading-[4rem]"
        variants={FADE_DOWN_ANIMATION_VARIANTS}
      >
        <Balancer>{item.title}</Balancer>
      </motion.h2>
    </motion.a>
  );
}
