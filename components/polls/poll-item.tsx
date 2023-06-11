import { motion } from "framer-motion";
import { Poll, PollOption, PollStatus } from "@/lib/api/types";
import { FADE_DOWN_ANIMATION_VARIANTS, ROOT_URL } from "@/lib/constants";
import links from "@/lib/links";
import Link from "next/link";
import { getCurrentUser } from "@/lib/current-user";
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
  rounded = true,
}: {
  item: Poll;
  votable: boolean;
  rounded?: boolean;
}) {
  // const [voting, setVoting] = useState(false);
  const [poll, setPoll] = useState(item);
  const { setShowLoginModal } = useContext(LoginModalContext);
  const { setShowShareModal } = useContext(ShareModalContext);
  useShareModal(`${ROOT_URL}/${links.poll(item.slug)}`, item.title);
  const [currentUser, setCurrentUser] = useState(getCurrentUser());

  useEffect(() => {
    if (currentUser && !poll.userVotes?.length && item === poll) {
      apiClient()
        .pollBySlug({ slug: poll.slug })
        .then((p) => {
          if (p) setPoll(p);
        });
    }
  }, [currentUser, poll, item]);

  if (!currentUser) {
    const d = getCurrentUser();
    if (d) setCurrentUser(d);
  }

  const isActive = votable && poll.status === PollStatus.ACTIVE;
  const canVote = currentUser && isActive;

  const onClickOption = (e: Event, option: PollOption) => {
    if (!isActive) return;
    if (isActive && !currentUser) setShowLoginModal && setShowLoginModal(true);

    e.preventDefault();
    e.stopPropagation();

    if (
    
      (poll.userVotes || []).find((it) => it.pollOptionId === option.id)
    )
      return;

    if (currentUser) {
      // setVoting(true);
      apiClient()
        .vote({ pollOptionIds: [option.id] })
        .then((p) => {
          setPoll(p);
          setTimeout(() => {
            if (!hasVotedForIt(poll.id)) {
              setShowShareModal && setShowShareModal(true);
              hasVotedForIt(poll.id, true);
            }
          }, 1500);
        });
    }
  };

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
        {option.image?.url && (
          <Image
            src={option.image.url}
            alt={option.title}
            fill={true}
            className="pi-image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="pi-shadow" />
        <div className="pi-text">
          <div className="pi-title">{option.title}</div>
          <div className="pi-d">{option.description}</div>
        </div>
        <div className="absolute bottom-2 grow-0">
          <div className="pi-counter">{option.votesCount}</div>
        </div>
        {/* <div className="group-[.can-vote]-hover:opacity-0 absolute top-0 h-full w-full bg-black opacity-0 transition-opacity group-[.can-vote]:cursor-pointer group-[.is-selected]:opacity-0" /> */}
        {/* {voting && <LoadingDots color="text-sky-600" />} */}
        {canVote && <CheckCircle className="pi-check" />}
      </div>
    );
  };

  const h = <h2 className="p-title">{poll.title}</h2>;

  const content = (
    <div className={rounded ? "p-body" : "p-body not-rounded"}>
      <div className="flex h-full flex-col sm:flex-row">
        {(poll.options || []).map(optionItem)}
      </div>
    </div>
  );

  const pClass = [
    "p",
    canVote ? "can-vote" : "cannot-vote",
    isActive ? "is-active" : "not-active",
  ].join(" ");

  return (
    <motion.div className={pClass} variants={FADE_DOWN_ANIMATION_VARIANTS}>
      <Link className="link block w-full" href={links.poll(poll.slug)}>
        {h}
        {!isActive && content}
      </Link>
      {isActive && content}
      <div className="p-tags">
        {(poll.tags || []).map((it) => (
          <Link className="link mr-2" key={it.slug} href={links.tag(it.slug)}>
            #{it.name}
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
