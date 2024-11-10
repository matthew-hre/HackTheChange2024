"use client";

import { Calendar, LinkIcon, LucideIcon, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { random } from "@/utils/math";

const fontFamilies = [
  "font-serif",
  "font-sans",
  "font-mono",
  "font-cursive",
  "font-fantasy",
];

const backgroundPatterns = [
  "bg-red-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-yellow-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-indigo-100",
  "bg-gray-100",
  "bg-slate-100",
];

const layouts = ["grid grid-rows-[auto_1fr_auto]"];

export default function CreateEventClient({
  causes,
  event,
}: {
  causes: { id: number; name: string }[];
  event: {
    id: number;
    name: string;
    description: string;
    date: string;
    location: string;
    source: string;
    causes: number[];
  };
}) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const rotation = Math.ceil(random(event.id) * 8 - 4);
  const translateX = Math.ceil(random(event.id) * 40 - 20);
  const translateY = Math.ceil(random(event.id) * 40 - 20);

  const fontFamily =
    fontFamilies[Math.floor(random(event.id) * fontFamilies.length)];
  const backgroundPattern =
    backgroundPatterns[
      Math.floor(random(event.id) * backgroundPatterns.length)
    ];
  const layout = layouts[Math.floor(random(event.id) * layouts.length)];

  return (
    <div className="absolute z-50 left-0 top-0 w-full h-full flex items-center justify-center">
      <div
        className="absolute z-0 left-0 top-0 w-full h-full bg-black bg-opacity-50"
        onClick={handleClose}
      ></div>
      <div
        className={`${backgroundPattern} ${fontFamily} text-black border border-gray-300 shadow-lg overflow-hidden z-100 transform aspect-[3/4] max-w-screen-sm`}
        style={{
          transform: `rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`,
        }}
      >
        <div className={`relative h-full ${layout} p-4 gap-4`}>
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {event.name}
            </h2>
            {event.description.split("\n").map((line, index) => (
              <p
                key={index}
                className="text-sm sm:text-base md:text-lg opacity-90"
              >
                {line}
              </p>
            ))}
          </div>
          <div className="space-y-2 text-sm sm:text-base mt-auto">
            <EventDetail
              Icon={Calendar}
              text={new Date(event.date).toLocaleString()}
            />
            <EventDetail Icon={MapPin} text={event.location} />
            <EventDetail Icon={LinkIcon} text={`Source: ${event.source}`} />
          </div>
          <div className="pt-2 border-t border-current flex flex-row justify-between">
            <p className="text-xs sm:text-sm font-medium">
              {event.causes
                .map((causeId: number) => findCauseById(causes || [], causeId))
                .map((cause: { id: number; name: string }) => cause.name)
                .join(", ")}
            </p>
            <button
              className="text-xs sm:text-sm font-medium"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/e/${event.id}`
                );
              }}
            >
              Copy link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventDetail({ Icon, text }: { Icon: LucideIcon; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}

function findCauseById(causes: { id: number; name: string }[], id: number) {
  return causes.find((cause) => cause.id === id) || { id, name: "Unknown" };
}
