// You may need the next line in some situations
import { IronSession } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      token: string;
    };
  }
}

declare module "http" {
  interface IncomingMessage {
    session: IronSession & {
      user?: {
        token: string;
      };
    };
  }
}
