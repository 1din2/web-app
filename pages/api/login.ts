import { withSessionRoute } from "@/lib/with-session";
import { NextApiRequest, NextApiResponse } from "next";

export default withSessionRoute(loginRoute);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).send(false);
  const { token } = (req.body || {}) as { token: string };
  if (!token) return res.status(400).send(false);
  req.session.user = { token };
  await req.session.save();
  res.send(true);
}
