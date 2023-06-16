import { motion } from "framer-motion";
import { Poll, PollOption, PollStatus } from "@/lib/api/types";
import { FADE_DOWN_ANIMATION_VARIANTS, ROOT_URL } from "@/lib/constants";
import links from "@/lib/links";
import Link from "next/link";
import { useEffect, useState } from "react";
import CheckCircle from "../shared/icons/check-circle";
import apiClient from "@/lib/api/api-client";
import Image from "next/image";
import { useShareModal } from "../home/share-modal";
import { hasVotedForIt } from "@/lib/has-voted-for-it";
import { getCurrentVoter } from "@/lib/current-voter";

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
  const [voting, setVoting] = useState(false);
  const [poll, setPoll] = useState(item);
  const { ShareModal, setShowShareModal } = useShareModal(
    `${ROOT_URL}/${links.poll(item.slug)}`,
    item.title,
  );
  const [currentVoter, setCurrentVoter] = useState<string | null>(null);
  const isActive = votable && poll.status === PollStatus.ACTIVE;
  const canVote = currentVoter && isActive;

  useEffect(() => {
    if (currentVoter && !poll.userVotes?.length && item === poll) {
      apiClient()
        .pollBySlug({ slug: poll.slug })
        .then((p) => {
          if (p) setPoll(p);
        });
    }
    if (!currentVoter) {
      const d = getCurrentVoter();
      if (d && !currentVoter) setCurrentVoter(d);
    }
  }, [currentVoter, poll, item]);

  const onClickOption = (e: Event, option?: PollOption) => {
    if (!isActive) return;

    e.preventDefault();
    e.stopPropagation();

    if (!option) return;

    if ((poll.userVotes || []).find((it) => it.pollOptionId === option.id))
      return;

    if (currentVoter) {
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
          }, 1500);
        })
        .finally(() => setVoting(false));
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
      currentVoter &&
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
        <div className="absolute bottom-10 grow-0">
          <div className="pi-counter">{option.votesCount}</div>
        </div>
        {!voting && <CheckCircle className="pi-check" />}
      </div>
    );
  };

  const h = <h2 className="p-title">{poll.title}</h2>;

  const content = (
    <div className={rounded ? "p-body" : "p-body not-rounded"}>
      <div className="flex h-full flex-col sm:flex-row">
        {(poll.options || []).map(optionItem)}
      </div>
      <div onClick={(e) => onClickOption(e as never)} className="p-vs">
        VS
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
      {canVote && <ShareModal />}
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
