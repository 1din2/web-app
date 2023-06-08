import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  createContext,
} from "react";
import { FACEBOOK_APP_ID } from "@/lib/constants";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";

const ShareModal = ({
  showShareModal,
  setShowShareModal,
  url,
}: {
  showShareModal: boolean;
  setShowShareModal: Dispatch<SetStateAction<boolean>>;
  url: string;
}) => {
  return (
    <Modal showModal={showShareModal} setShowModal={setShowShareModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="font-display text-2xl font-bold">Share</h3>
          <p className="text-sm text-gray-500">
            Share with Facebook or Google.
          </p>
        </div>

        <div className="grid gap-2 bg-gray-50 px-4 py-8 md:px-16">
          <FacebookShareButton url={url}>
            <FacebookIcon size={32} className="rounded" />
          </FacebookShareButton>
          <FacebookMessengerShareButton url={url} appId={FACEBOOK_APP_ID}>
            <FacebookMessengerIcon size={32} className="rounded" />
          </FacebookMessengerShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={32} className="rounded" />
          </TwitterShareButton>
          <EmailShareButton url={url}>
            <EmailIcon size={32} className="rounded" />
          </EmailShareButton>
        </div>
      </div>
    </Modal>
  );
};

export function useShareModal(url: string) {
  const [showShareModal, setShowShareModal] = useState(false);

  const ShareModalCallback = useCallback(() => {
    return (
      <ShareModal
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        url={url}
      />
    );
  }, [showShareModal, setShowShareModal, url]);

  return useMemo(
    () => ({
      setShowShareModal,
      ShareModal: ShareModalCallback,
    }),
    [ShareModalCallback],
  );
}

export const ShareModalContext = createContext<{
  setShowShareModal?: Dispatch<SetStateAction<boolean>>;
}>({});
