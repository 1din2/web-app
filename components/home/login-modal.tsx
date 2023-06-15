import Modal from "@/components/shared/modal";
import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  createContext,
  useEffect,
} from "react";
import {
  API_URL,
  FADE_DOWN_ANIMATION_VARIANTS,
  PROJECT_ID,
} from "@/lib/constants";
import { saveCurrentUserToken } from "@/lib/current-user";
import { motion } from "framer-motion";
import Facebook from "../shared/icons/facebook";
import Google from "../shared/icons/google";

let newWindow: Window;

const LoginModal = ({
  showLoginModal,
  setShowLoginModal,
}: {
  showLoginModal: boolean;
  setShowLoginModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const onLogin = (event: any) => {
    if (
      event.origin !== "http://localhost:42123" &&
      event.origin !== "https://api.1of2.net"
    )
      return;
    const { data } = event;
    if (data && data.token) {
      saveCurrentUserToken(data.token);
    }
    setShowLoginModal(false);
    try {
      newWindow.close();
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(function mount() {
    window.addEventListener("message", onLogin, false);
    return function unMount() {
      window.removeEventListener("message", onLogin);
    };
  });

  const clickLogin = (provider: string) => {
    const w = window as any;
    const url = `${API_URL.replace(
      "/graphql",
      "",
    )}/auth/${provider}?project=${PROJECT_ID}`;
    const popWidth = 600,
      popHeight = 480,
      left = w.innerWidth / 2 - popWidth / 2 + w.screenX,
      top = w.innerHeight / 2 - popHeight / 2 + w.screenY,
      popParams =
        "scrollbars=no, width=" +
        popWidth +
        ", height=" +
        popHeight +
        ", top=" +
        top +
        ", left=" +
        left;
    newWindow = w.open(url, "", popParams);

    if (w.focus) {
      newWindow.focus();
    }
  };

  return (
    <Modal showModal={showLoginModal} setShowModal={setShowLoginModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <h3 className="font-display text-2xl font-bold">Login</h3>
          <p className="text-sm text-gray-500">
            Login with Facebook or Google.
          </p>
        </div>

        <div className="grid gap-2 bg-gray-50 px-4 py-8 md:px-16">
          <motion.button
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            onClick={() => clickLogin("facebook")}
            className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-800 px-5 py-2 transition-colors hover:bg-blue-600"
          >
            <Facebook className="h-5 w-5 text-white" />
            <p className="text-sm font-semibold text-white">
              Continue with Facebook
            </p>
          </motion.button>
          <motion.button
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            onClick={() => clickLogin("google")}
            className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-red-600 px-5 py-2 transition-colors hover:bg-red-400"
          >
            <Google className="h-5 w-5 text-white" />
            <p className="text-sm font-semibold text-white">
              Continue with Google
            </p>
          </motion.button>
          {/* <motion.button
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            onClick={() => clickLogin("facebook")}
            className="mx-auto mb-5 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
          >
            <Twitter className="h-5 w-5 text-[#1d9bf0]" />
            <p className="text-sm font-semibold text-[#1d9bf0]">
              Introducing Extrapolate
            </p>
          </motion.button> */}
        </div>
      </div>
    </Modal>
  );
};

export function useLoginModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const LoginModalCallback = useCallback(() => {
    return (
      <LoginModal
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
      />
    );
  }, [showLoginModal, setShowLoginModal]);

  return useMemo(
    () => ({
      setShowLoginModal,
      LoginModal: LoginModalCallback,
    }),
    [LoginModalCallback],
  );
}

export const LoginModalContext = createContext<{
  setShowLoginModal?: Dispatch<SetStateAction<boolean>>;
}>({});
