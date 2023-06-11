import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta, { MetaData } from "./meta";
import { useLoginModal, LoginModalContext } from "../home/login-modal";
import { ShareModalContext, useShareModal } from "../home/share-modal";
import locales from "@/lib/locales";
import ShareButtons from "../shared/share-buttons";

export default function Layout({
  meta,
  children,
}: {
  meta: MetaData;
  children: ReactNode;
}) {
  const scrolled = useScroll(50);
  const { LoginModal, setShowLoginModal } = useLoginModal();
  const { ShareModal, setShowShareModal } = useShareModal(meta.canonical);

  return (
    <>
      <Meta {...meta} />
      <LoginModal />
      <ShareModal />
      <div className="fixed h-screen w-full bg-gradient-to-br from-emerald-100 via-blue-50 to-rose-100" />
      <div
        className={`fixed top-0 w-full ${
          scrolled
            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
            : "bg-white/0"
        } z-30 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.svg"
              alt="Logo image of a chat bubble"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            ></Image>
            <p>{locales.logo_name()}</p>
          </Link>
          <div className="flex items-center space-x-4">
            <ShareButtons url={meta.canonical} />
          </div>
        </div>
      </div>
      <main className="flex min-h-screen w-full flex-col items-center justify-center py-24">
        <LoginModalContext.Provider value={{ setShowLoginModal }}>
          <ShareModalContext.Provider value={{ setShowShareModal }}>
            {children}
          </ShareModalContext.Provider>
        </LoginModalContext.Provider>
      </main>
      <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
          Powered by{" "}
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-black"
            href="https://vercel.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>
          ,{" "}
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-black"
            href="https://replicate.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Replicate
          </a>{" "}
          and{" "}
          <a
            className="font-semibold text-gray-600 transition-colors hover:text-black"
            href="https://upstash.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Upstash
          </a>
          .
        </p>
      </div>
    </>
  );
}
