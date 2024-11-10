"use client";

import { LucideIcon, Calendar, MapPin, Link as LinkIcon } from "lucide-react";
import { random } from "@/utils/math";
import Link from "next/link";

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

function EventCard({
  event,
  causes,
}: {
  event: {
    id: number;
    name: string;
    description: string;
    date: string;
    location: string;
    source: string;
    causes: number[];
  };
  causes: {
    id: number;
    name: string;
  }[];
}) {
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
    <Link
      href={`/e/${event.id}`}
      className="relative w-full h-full group hover:z-50 hover:rotate-0"
      style={{
        transform: `rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`,
      }}
    >
      <div
        className="absolute -top-2 -left-2 w-6 h-6 rounded-full shadow-md transform z-10 group-hover:z-10 transition-transform"
        style={{
          backgroundColor: `#${random(event.causes[0] || 0)
            .toString(16)
            .slice(2, 8)}`,
        }}
      >
        <div
          className="absolute top-1 left-1 w-4 h-4 rounded-full shadow-md transform z-10 group-hover:z-10 transition-transform"
          style={{
            backgroundColor: `#ccc`,
            mixBlendMode: "multiply",
          }}
        ></div>
      </div>
      <div
        className={`${backgroundPattern} ${fontFamily} text-black border border-gray-300 shadow-lg overflow-hidden aspect-[3/4]`}
      >
        <div className={`relative h-full ${layout} p-4 gap-4`}>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {event.name}
            </h2>
            <p className="text-sm sm:text-base md:text-lg opacity-90">
              {event.description.split("\n")[0]}
            </p>
          </div>
          <div className="space-y-2 text-sm sm:text-base">
            <EventDetail
              Icon={Calendar}
              text={new Date(event.date).toLocaleString()}
            />
            <EventDetail Icon={MapPin} text={event.location} />
            <EventDetail Icon={LinkIcon} text={`Source: ${event.source}`} />
          </div>
          <div className="pt-2 border-t border-current">
            <p className="text-xs sm:text-sm font-medium">
              {event.causes
                .map((causeId: number) => findCauseById(causes || [], causeId))
                .map((cause: { id: number; name: string }) => cause.name)
                .join(", ")}
            </p>
          </div>
        </div>
      </div>
    </Link>
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

export default EventCard;
