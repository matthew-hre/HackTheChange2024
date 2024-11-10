"use client";

import { useState, useEffect } from "react";

import EventCard from "@/components/EventCard";

import { saveUserCausesPreferences } from "../actions";

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
    events.filter((event) => userCauses.some((id) => event.causes.includes(id)))
  );

  useEffect(() => {
    if (filters.length === 0) {
      setFilteredEvents([]);
    } else {
      setFilteredEvents(
        events.filter((event) =>
          filters.some((id) => event.causes.includes(id))
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
      </div>
      <button
        onClick={() => saveUserCausesPreferences(filters)}
        className="block border px-2 mt-4"
      >
        Save preferences
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8 mt-8">
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
