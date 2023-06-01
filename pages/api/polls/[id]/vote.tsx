import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (!req.session.user)
    return res.status(403).send({ message: "Unauthorized" });

  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const pollId = url.pathname.split("/")[3];
  const { pollOptionIds } = req.body as { pollOptionIds: string[] };
  if (!pollOptionIds?.length)
    return res.status(400).send({ message: "Bad Request" });

  return NextResponse.json({});
}
