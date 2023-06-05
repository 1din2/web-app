import { AnimatePresence } from "framer-motion";
import { Poll } from "@/lib/api/types";
import PollListItem from "./poll-list-item";

export default function PollList({ list }: { list: Poll[] }) {
  return (
    <AnimatePresence>
      {list.map((item) => (
        <PollListItem key={item.id} item={item} />
      ))}
    </AnimatePresence>
  );
}
