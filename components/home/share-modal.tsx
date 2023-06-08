import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  createContext,
} from "react";
import { FACEBOOK_APP_ID, FROM_EMAIL } from "@/lib/constants";
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
import locales from "@/lib/locales";
import ShareIcon from "../shared/icons/share-icon";

const ShareModal = ({
  showShareModal,
  setShowShareModal,
  url,
  title,
}: {
  showShareModal: boolean;
  setShowShareModal: Dispatch<SetStateAction<boolean>>;
  url: string;
  title?: string;
}) => {
  const size = 42;
  return (
    <Modal showModal={showShareModal} setShowModal={setShowShareModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          {/* <h3 className="font-display text-2xl font-bold">Share</h3> */}
          <div className="justify-center">
            <ShareIcon className="h-8 w-8" />
          </div>
          <p className="text-sm text-gray-500">{locales.share_poll_info()}</p>
        </div>

        <div className="flex items-center justify-center space-x-4 bg-gray-50 px-4 py-8 md:px-16">
          <FacebookShareButton url={url}>
            <FacebookIcon size={size} className="rounded-full" />
          </FacebookShareButton>
          <FacebookMessengerShareButton url={url} appId={FACEBOOK_APP_ID}>
            <FacebookMessengerIcon size={size} className="rounded-full" />
          </FacebookMessengerShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={size} className="rounded-full" />
          </TwitterShareButton>
          <EmailShareButton url={url} form={FROM_EMAIL} title={title}>
            <EmailIcon size={size} className="rounded-full" />
          </EmailShareButton>
        </div>
      </div>
    </Modal>
  );
};

export function useShareModal(url: string, title?: string) {
  const [showShareModal, setShowShareModal] = useState(false);

  const ShareModalCallback = useCallback(() => {
    return (
      <ShareModal
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        url={url}
        title={title}
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
