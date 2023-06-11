import { motion } from "framer-motion";
import { Poll, PollOption, PollStatus } from "@/lib/api/types";
import { FADE_DOWN_ANIMATION_VARIANTS, ROOT_URL } from "@/lib/constants";
import links from "@/lib/links";
import Link from "next/link";
import { getCurrentUser, onCurrentUserChanged } from "@/lib/current-user";
import { useContext, useEffect, useState } from "react";
import { LoginModalContext } from "../home/login-modal";
import CheckCircle from "../shared/icons/check-circle";
import apiClient from "@/lib/api/api-client";
import { LoadingDots } from "../shared/icons";
import Image from "next/image";
import { ShareModalContext, useShareModal } from "../home/share-modal";
import { hasVotedForIt } from "@/lib/has-voted-for-it";

// const MAP_IDS: Record<string, string> = {};

export default function PollItem({
  item,
  votable,
}: {
  item: Poll;
  votable: boolean;
}) {
  const [voting, setVoting] = useState(false);
  const [poll, setPoll] = useState(item);
  const { setShowLoginModal } = useContext(LoginModalContext);
  const { setShowShareModal } = useContext(ShareModalContext);
  useShareModal(`${ROOT_URL}/${links.poll(item.slug)}`, item.title);
  let currentUser = getCurrentUser();

  useEffect(() => {
    if (currentUser && !voting && !poll.userVotes?.length && item === poll) {
      apiClient()
        .pollBySlug({ slug: poll.slug })
        .then((p) => {
          if (p) setPoll(p);
        });
    }
  }, [currentUser, voting, poll, item]);

  const isActive = votable && poll.status === PollStatus.ACTIVE;
  const canVote = currentUser && isActive;

  const onClickOption = (e: Event, option: PollOption) => {
    if (!isActive) return;
    if (isActive && !currentUser) setShowLoginModal && setShowLoginModal(true);

    e.preventDefault();
    e.stopPropagation();

    if (
      voting ||
      (poll.userVotes || []).find((it) => it.pollOptionId === option.id)
    )
      return;

    if (currentUser) {
      setVoting(true);
      apiClient()
        .vote({ pollOptionIds: [option.id] })
        .then((p) => {
          setPoll(p);
          setTimeout(() => {
            if (!hasVotedForIt(poll.id)) {
              setShowShareModal && setShowShareModal(true);
              hasVotedForIt(poll.id, true);
            }
          }, 1000);
        })
        .finally(() => setVoting(false));
    }
  };

  onCurrentUserChanged("poll-item", () => {
    currentUser = getCurrentUser();
    setVoting(false);
  });

  const winnerOption = [...(poll.options || [])].sort(
    (a, b) => b.votesCount - a.votesCount,
  )[0];

  const optionItem = (option: PollOption) => {
    const isWinner =
      winnerOption &&
      winnerOption.votesCount > 0 &&
      winnerOption.id === option.id;

    const isSelected =
      currentUser &&
      !!(poll.userVotes || []).find((it) => it.pollOptionId === option.id);

    const piClass = [
      "pi",
      isWinner ? "is-winner" : "not-winner",
      isSelected ? "is-selected" : "not-selected",
    ].join(" ");

    return (
      <div
        key={option.id}
        className={piClass}
        onClick={(e) => onClickOption(e as never, option)}
      >
        {/* <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-b from-transparent to-slate-900" /> */}
        {option.image?.url && (
          <Image
            src={option.image.url}
            alt={option.title}
            fill={true}
            className="pi-image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute top-0 h-1/3 w-full bg-gradient-to-t from-transparent to-gray-700" />
        <div className="absolute top-0 w-full grow overflow-hidden bg-opacity-25 py-2 text-white ">
          <div className="mb-1 text-lg font-semibold drop-shadow">
            {option.title}
          </div>
          <div className="whitespace-nowrap text-xs text-gray-300 drop-shadow">
            {option.description}
          </div>
        </div>
        <div className="absolute bottom-2 grow-0">
          <div className="pi-counter">{option.votesCount}</div>
        </div>
        {/* <div className="group-[.can-vote]-hover:opacity-0 absolute top-0 h-full w-full bg-black opacity-0 transition-opacity group-[.can-vote]:cursor-pointer group-[.is-selected]:opacity-0" /> */}
        {voting && <LoadingDots color="text-sky-600" />}
        {!voting && canVote && <CheckCircle className="pi-check" />}
      </div>
    );
  };

  const h = (
    <h2 className="p-2 text-center font-display text-2xl font-semibold sm:text-3xl sm:leading-[2.2rem]">
      {poll.title}
    </h2>
  );

  const content = (
    <div
      className={
        (poll.status === PollStatus.ACTIVE ? "status-active " : "") +
        "poll-item relative mx-auto mt-2 h-[480px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-white sm:h-[320px]"
      }
    >
      <div className="flex h-full flex-col sm:flex-row">
        {(poll.options || []).map(optionItem)}
      </div>
    </div>
  );

  const pClass = ["p", canVote ? "can-vote" : "cannot-vote"].join(" ");

  return (
    <motion.div className={pClass} variants={FADE_DOWN_ANIMATION_VARIANTS}>
      <Link className="link block w-full" href={links.poll(poll.slug)}>
        {h}
        {!isActive && content}
      </Link>
      {isActive && content}
      <div className="ml-4 mr-4 flex items-center rounded-b-2xl bg-gray-200 px-4">
        <div>
          {(poll.tags || []).map((it) => (
            <Link className="link mr-2" key={it.slug} href={links.tag(it.slug)}>
              #{it.name}
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
