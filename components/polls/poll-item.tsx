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
  active = false,
}: {
  item: Poll;
  active?: boolean;
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
      // const { data, error } = useSWR('/api/user', fetcher)
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
        onClick={(e) => onClickOption(e as never, option)}
      >
        {/* <Image
          src="https://storage.agora.md/api/v1/t/0f72916c7469b1ab500ddba7c24c4a695a8bf928/public/fit_1280"
          alt={option.title}
          // width={500}
          // height={500}
          fill={true}
          // objectFit="cover"
          style={{ objectFit: "cover" }}
          // className="absolute top-0 left-0 w-full h-full"
          // className="group-[.can-vote]:grayscale group-[.is-selected]:grayscale-0"
          className="flex-none"
        /> */}
        {/* <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-b from-transparent to-slate-900" /> */}
        {option.image?.url && (
          <Image
            src={option.image.url}
            alt={option.title}
            fill={true}
            className="group-[.can-vote]:grayscale group-[.is-selected]:grayscale-0"
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
          <div className="m-auto mb-1 inline-block rounded bg-white bg-opacity-75 px-4 py-0 text-lg font-semibold text-gray-800">
            {option.votesCount}
          </div>
        </div>
        {/* <div className="group-[.can-vote]-hover:opacity-0 absolute top-0 h-full w-full bg-black opacity-0 transition-opacity group-[.can-vote]:cursor-pointer group-[.is-selected]:opacity-0" /> */}
        {voting && <LoadingDots color="text-sky-600" />}
        {!voting && isSelected && (
          <CheckCircle className="group-[.can-vote]-hover:text-sky-600 absolute bottom-2 right-2 h-10 w-10 text-white opacity-50 transition-colors group-[.is-selected]:opacity-90" />
        )}
      </div>
    );
  };

  const h = (
    <h2 className="p-2 text-center font-display text-3xl font-semibold sm:text-4xl sm:leading-[2.2rem]">
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

  return (
    <motion.div
      className="relative mx-auto mb-10 mt-2 w-full overflow-hidden sm:w-[600px]"
      variants={FADE_DOWN_ANIMATION_VARIANTS}
    >
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
