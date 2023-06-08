/* eslint-disable @next/next/no-img-element */
import apiClient from "@/lib/api/api-client";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

const clash = fetch(
  new URL("../../../styles/BreeSerif-Regular.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  const [clashData] = await Promise.all([clash]);

  const { pathname } = req.nextUrl;
  const slug = pathname.split(/\//g)[3];
  const poll = await apiClient().pollBySlug({ slug });
  if (!poll) throw new Error("Poll not found");

  return new ImageResponse(
    (
      <div
        tw="relative mx-auto mt-2 h-full w-full overflow-hidden"
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          backgroundImage:
            "linear-gradient(to bottom right, #D1FAE5 25%, #EFF6FF 50%, #FFE4E6 75%)",
        }}
      >
        <div tw="flex h-full flex-col">
          {(poll.options || []).slice(0, 2).map((option, index) => (
            <div
              key={index}
              tw="relative flex flex-1 flex-col items-center overflow-hidden p-4 first:border-b text-center"
            >
              {option.image?.url && (
                <img
                  src={option.image.url}
                  alt={option.title}
                  tw="object-cover absolute top-0 w-full h-full bottom-0 left-0 right-0 text-transparent"
                />
              )}
              <div tw="absolute top-0 h-1/3 w-full bg-gradient-to-t from-transparent to-gray-800" />
              <div tw="flex absolute top-0 w-full grow overflow-hidden bg-opacity-25 py-2 text-white">
                <div tw="mb-1 text-lg font-semibold drop-shadow">
                  {option.title}
                </div>
                <div tw="whitespace-nowrap text-xs text-gray-300">
                  {option.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "SF Pro",
          data: clashData,
        },
      ],
    },
  );
}
