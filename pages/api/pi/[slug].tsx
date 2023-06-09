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
        tw="relative mx-auto h-full w-full overflow-hidden"
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
        <div tw="flex mx-auto h-full w-full overflow-hidden">
          <div tw="flex flex-1 h-full">
            {(poll.options || []).slice(0, 2).map((option, index) => (
              <div
                key={index}
                tw="relative flex flex-1 flex-col items-center overflow-hidden text-center h-full"
                style={{
                  borderRight: index === 0 ? "2px solid #ffffff" : "",
                }}
              >
                {option.image?.url && (
                  <img
                    src={option.image.url}
                    alt={option.title}
                    tw="absolute top-0 w-full h-full bottom-0 left-0 right-0 text-transparent object-cover"
                    style={{ objectFit: "cover" }}
                  />
                )}
                <div
                  tw="absolute flex top-0 left-0 right-0 h-1/2 w-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom,#222222,transparent)",
                  }}
                />
                <div tw="flex flex-col items-center absolute top-0 w-full grow overflow-hidden bg-opacity-25 py-6 text-gray-300">
                  <div
                    tw="mb-1 text-4xl font-semibold"
                    style={{ textShadow: "1px 1px 1px #000" }}
                  >
                    {option.title}
                  </div>
                  <div tw="text-lg text-gray-400">{option.description}</div>
                </div>
              </div>
            ))}
            <div
              tw="absolute flex bottom-0 left-0 right-0 h-1/2 w-full"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom,transparent,#222222)",
              }}
            />
            <div tw="flex flex-col items-center absolute bottom-0 w-full grow overflow-hidden bg-opacity-25 px-12 text-gray-300">
              <div
                tw="mb-12 text-4xl font-semibold"
                style={{ textShadow: "1px 1px 1px #000" }}
              >
                {poll.title}
              </div>
            </div>
            <div
              tw="absolute py-4 px-5 rounded-full top-1/2 left-1/2 text-4xl font-bold drop-shadow"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, #D1FAE5 25%, #EFF6FF 50%, #FFE4E6 75%)",
                  transform: "translate(-50%, -50%)"
              }}
            >
              VS
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "BreeSerif",
          data: clashData,
        },
      ],
    },
  );
}
