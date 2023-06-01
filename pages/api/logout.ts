import { withSessionRoute } from "@/lib/with-session";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(logoutRoute);

async function logoutRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  res.send(true);
}
