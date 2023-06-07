import { motion } from "framer-motion";
import { Poll, PollOption, PollStatus } from "@/lib/api/types";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import links from "@/lib/links";
import Link from "next/link";
import { getCurrentUser, onCurrentUserChanged } from "@/lib/current-user";
import { useContext, useEffect, useState } from "react";
import { LoginModalContext } from "../home/login-modal";
import CheckCircle from "../shared/icons/check-circle";
import apiClient from "@/lib/api/api-client";
import { LoadingDots } from "../shared/icons";

// const MAP_IDS: Record<string, string> = {};

export default function PollItem({
  item,
  active = false,
}: {
  item: Poll;
  active?: boolean;
}) {
  const [voting, setVoting] = useState(false);
  const [poll, setPoll] = useState(item);
  const { setShowLoginModal } = useContext(LoginModalContext);
  let currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser && !voting && !poll.userVotes?.length && item === poll) {
      // MAP_IDS[poll.id] = poll.id;
      console.log("initial poll getting");

      apiClient()
        .pollBySlug({ slug: poll.slug })
        .then((p) => {
          console.log(`got p`);
          if (p) setPoll(p);
        });
    }
  }, [currentUser, voting, poll, item]);

  const isActive = active && poll.status === PollStatus.ACTIVE;

  const onClickOption = (e: Event, option: PollOption) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentUser) {
      setShowLoginModal && setShowLoginModal(true);
    }
    if (
      voting ||
      (poll.userVotes || []).find((it) => it.pollOptionId === option.id)
    )
      return;
    // if (!active) return;
    if (currentUser) {
      console.log("vote", option);
      // const { data, error } = useSWR('/api/user', fetcher)
      setVoting(true);
      apiClient()
        .vote({ pollOptionIds: [option.id] })
        .then(setPoll)
        .finally(() => setVoting(false));
    }
  };

  onCurrentUserChanged("poll-item", () => {
    currentUser = getCurrentUser();
    setVoting(false);
  });

  const optionItem = (option: PollOption) => {
    const canVote = currentUser && isActive;
    const isSelected =
      currentUser &&
      !!(poll.userVotes || []).find((it) => it.pollOptionId === option.id);
    return (
      <div
        key={option.id}
        className={`group relative flex flex-1 flex-col items-center overflow-hidden p-4 first:border-b md:first:border-r text-center${
          isSelected ? " is-selected" : ""
        }${canVote ? " can-vote" : ""}`}
        onClick={canVote ? (e) => onClickOption(e as never, option) : undefined}
      >
        <div className="grow-[1] overflow-hidden">
          <div className="mb-1 text-lg font-semibold">{option.title}</div>
          <div className="whitespace-nowrap text-xs">{option.description}</div>
        </div>
        <div className="grow-[6]"></div>
        <div className="grow-0">
          <div className="mb-1 text-lg font-semibold">{option.votesCount}</div>
        </div>
        <div className="absolute top-0 h-full w-full group-[.can-vote]:cursor-pointer bg-black opacity-5 transition-opacity group-[.can-vote]-hover:opacity-0 group-[.is-selected]:opacity-0" />
        {voting && <LoadingDots color="text-sky-600" />}
        {!voting && (
          <CheckCircle className="absolute left-1/2 top-1/2 mx-auto h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-white opacity-50 transition-colors group-[.can-vote]-hover:text-sky-600 group-[.is-selected]:text-sky-600" />
        )}
      </div>
    );
  };

  const h = (
    <h2 className="bg-gradient-to-br from-black to-stone-500 bg-clip-text p-2 text-center font-display text-3xl font-semibold text-transparent shadow-black drop-shadow sm:text-4xl sm:leading-[2.2rem]">
      {poll.title}
    </h2>
  );

  const content = (
    <div className="relative mx-auto mt-2 h-[480px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white sm:h-[320px]">
      <div className="flex h-full flex-col sm:flex-row">
        {(poll.options || []).map(optionItem)}
      </div>
    </div>
  );

  return (
    <motion.div
      className="relative mx-auto mb-10 mt-2 w-full overflow-hidden sm:w-[600px]"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
      <Link className="block w-full" href={links.poll(poll.slug)}>
        {h}
        {!isActive && content}
      </Link>
      {isActive && content}
      <div className="ml-4 mr-4 flex items-center justify-center rounded-b-2xl bg-gray-200">
        <div>
          {(poll.tags || []).map((it) => (
            <Link className="mr-2" key={it.slug} href={links.tag(it.slug)}>
              #{it.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
