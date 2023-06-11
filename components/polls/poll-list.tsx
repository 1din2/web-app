import { AnimatePresence } from "framer-motion";
import { Poll } from "@/lib/api/types";
import PollItem from "./poll-item";

export default function PollList({ list, votable }: { list: Poll[], votable:boolean }) {
  return (
    <AnimatePresence>
      {list.map((item) => (
        <PollItem key={item.id} item={item} votable={votable} />
      ))}
    </AnimatePresence>
  );
}
