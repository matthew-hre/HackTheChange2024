"use client";

import { useState, useEffect } from "react";

import EventCard from "@/components/EventCard";

import { saveUserCausesPreferences } from "../actions";
import { Save } from "lucide-react";

export default function EventsClient({
  causes,
  events,
  userCauses,
}: {
  causes: { id: number; name: string }[];
  events: {
    id: number;
    name: string;
    description: string;
    date: string;
    location: string;
    source: string;
    causes: number[];
  }[];
  userCauses: number[];
}) {
  const [filters, setFilters] = useState<number[]>(userCauses);
  const [filteredEvents, setFilteredEvents] = useState<typeof events>(
    events
      .filter((event) => userCauses.some((id) => event.causes.includes(id)))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  );

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredEvents([]);
    } else {
      setFilteredEvents(
        events
          .filter((event) => filters.some((id) => event.causes.includes(id)))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
      );
    }
  }, [filters, events]);

  const handleFilter = (causeId: number) => {
    if (filters.includes(causeId)) {
      setFilters(filters.filter((id) => id !== causeId));
    } else {
      setFilters([...filters, causeId]);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {causes?.map((cause) => (
          <CauseWidget
            key={cause.id}
            cause={cause}
            onClick={() => handleFilter(cause.id)}
            selected={filters.includes(cause.id)}
          />
        ))}
        <button
          onClick={() => saveUserCausesPreferences(filters)}
          className="border px-4 py-1 mr-auto rounded-full flex flex-row items-center gap-2 bg-emerald-600 text-white font-bold"
        >
          <Save size={24} />
          Save preferences
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 p-8 mt-8">
        {
          // Show a tutorial card if the user has no causes selected
          filters.length === 0 && <TutorialCard />
        }
        {filteredEvents?.map((event) => (
          <EventCard key={event.id} event={event} causes={causes || []} />
        ))}
      </div>
    </>
  );
}

function CauseWidget({
  cause,
  onClick,
  selected,
}: {
  cause: { id: number; name: string };
  onClick: () => void;
  selected?: boolean;
}) {
  return (
    <div
      className="flex flex-row items-center justify-center border rounded-full px-4 py-1 gap-2 hover:scale-110 transition-all hover:shadow-xs hover:cursor-pointer"
      onClick={onClick}
      style={{
        backgroundColor: selected
          ? `#${random(cause.id).toString(16).slice(2, 8)}33`
          : "",
        outline: selected ? "1px solid #ccc" : "",
      }}
    >
      <div
        className="min-w-4 h-4 rounded-full"
        style={{
          backgroundColor: `#${random(cause.id).toString(16).slice(2, 8)}`,
        }}
      ></div>
      <h2>{cause.name}</h2>
    </div>
  );
}

function random(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function TutorialCard() {
  const rotation = 4;
  const translateX = 6;
  const translateY = 6;

  return (
    <div
      className="relative w-full h-full group hover:z-50 hover:rotate-0 col-span-2"
      style={{
        transform: `rotate(${rotation}deg) translate(${translateX}px, ${translateY}px)`,
      }}
    >
      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full shadow-md transform z-10 group-hover:z-10 transition-transform bg-red-500">
        <div
          className="absolute top-1 left-1 w-4 h-4 rounded-full shadow-md transform z-10 group-hover:z-10 transition-transform"
          style={{
            backgroundColor: `#ccc`,
            mixBlendMode: "multiply",
          }}
        ></div>
      </div>
      <div
        className={`bg-gray-100 text-black border border-gray-300 shadow-lg overflow-hidden`}
      >
        <div className={`relative h-full flex flex-col p-4 gap-4`}>
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight bg-red-500 text-white px-[2px]">
              Welcome to BLOCparty
            </h2>
            <p className="text-sm sm:text-base md:text-lg opacity-90">
              {`Every day, people all over the world rally together to create real
              change, championing causes that shape our future. From solidarity
              marches and awareness campaigns, to workshops and community
              projects, there's a movement happening, waiting for people like
              you.`}
            </p>
            <p className="text-sm sm:text-base md:text-lg opacity-90">
              {`Yet too many of these efforts go unseen, overshadowed by the noise
              of endless social feeds and media overload. Vital voices get lost.
              Important causes slip by unheard. Posters are left to fade.`}
            </p>
            <p className="text-sm sm:text-base md:text-lg opacity-90">
              <strong>BLOCparty is your personal billboard for change. </strong>
              {`Here, we amplify the events that matter to you. Choose the causes
              you care about, whether it's climate action, social justice, or
              community support. We'll connect you to the rallies, gatherings,
              and moments of action, right in your community.`}
            </p>
            <p className="text-sm sm:text-base md:text-lg opacity-90">
              Together, our voices create movements. Together, we make a
              difference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
