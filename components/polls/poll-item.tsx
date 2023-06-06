import { motion } from "framer-motion";
import { Poll, PollOption } from "@/lib/api/types";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import links from "@/lib/links";
import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
import { useContext } from "react";
import { LoginModalContext } from "../home/login-modal";

export default function PollItem({ item }: { item: Poll }) {
  const { setShowLoginModal } = useContext(LoginModalContext);
  const currentUser = getCurrentUser();

  const onClickOption = (option: PollOption) => {
    if (!currentUser) {
      setShowLoginModal && setShowLoginModal(true);
    }
  };

  const optionItem = (option: PollOption) => {
    return (
      <div
        key={option.id}
        className="relative flex flex-1 flex-col items-center overflow-hidden p-4 text-center"
        onClick={() => onClickOption(option)}
      >
        <div className="grow-[1] overflow-hidden">
          <div className="mb-1 text-lg font-semibold">{option.title}</div>
          <div className="whitespace-nowrap text-xs">{option.description}</div>
        </div>
        <div className="grow-[6]">vote</div>
        <div className="grow-0">
          <div className="mb-1 text-lg font-semibold">{option.votesCount}</div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="group relative mx-auto mb-10 mt-2 w-full overflow-hidden sm:w-[600px]"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <Link className="block w-full p-2" href={links.poll(item.slug)}>
        <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-3xl font-semibold text-transparent shadow-black drop-shadow sm:text-4xl sm:leading-[2.2rem]">
          {item.title}
        </h2>
      </Link>
      <div className="group relative mx-auto mt-2 h-[480px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white sm:h-[320px]">
        <div className="flex h-full flex-col sm:flex-row">
          {(item.options || []).map(optionItem)}
        </div>
      </div>
      <div className="ml-4 mr-4 flex items-center justify-center rounded-b-2xl bg-gray-200">
        <div>
          {(item.tags || []).map((it) => (
            <Link className="mr-2" key={it.slug} href={links.tag(it.slug)}>
              #{it.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
