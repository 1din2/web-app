import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

export default function ShareButtons({
  size = 32,
  url,
}: {
  size?: number;
  url: string;
  title?: string;
}) {
  // const {isMobile} = useWindowSize();
  return (
    <>
      <FacebookShareButton url={url}>
        <FacebookIcon size={size} className="rounded-full" />
      </FacebookShareButton>
      {/* <FacebookMessengerShareButton url={url} appId={FACEBOOK_APP_ID}>
        <FacebookMessengerIcon size={size} className="rounded-full" />
      </FacebookMessengerShareButton> */}
      <TwitterShareButton url={url}>
        <TwitterIcon size={size} className="rounded-full" />
      </TwitterShareButton>
      {/* <EmailShareButton url={url} form={FROM_EMAIL} title={meta.title}>
        <EmailIcon size={size} className="rounded-full" />
      </EmailShareButton> */}
      {/* {isMobile && (
        <a onClick={()=>shareOnMobile()}>
        <ExpandingArrow /></a>
      )} */}
    </>
  );
}
