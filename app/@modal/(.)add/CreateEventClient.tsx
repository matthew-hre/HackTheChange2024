"use client";

import { createEvent } from "../../actions";
import { useRouter } from "next/navigation";

export default function CreateEventClient({
  causes,
}: {
  causes: { id: number; name: string }[];
}) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <form
      className="absolute z-50 left-0 top-0 w-full h-full flex items-center justify-center"
      action={createEvent}
    >
      <div
        className="absolute z-0 left-0 top-0 w-full h-full bg-black bg-opacity-50"
        onClick={handleClose}
      ></div>
      <div
        className={`bg-white text-black border border-gray-300 shadow-lg overflow-hidden z-100 transform aspect-[3/4]`}
      >
        <div className={`relative h-full flex flex-col p-4`}>
          <div className="space-y-2">
            <h2 className="text-lg sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              <input
                type="text"
                className="border w-full"
                placeholder="Event name"
                id="name"
                name="name"
              />
            </h2>
            <p className="text-sm sm:text-base md:text-lg opacity-90">
              <textarea
                className="border w-full"
                placeholder="Event description"
                id="description"
                name="description"
              />
            </p>
          </div>
          <div className="space-x-2 text-sm sm:text-base">
            <input
              type="date"
              className="border"
              placeholder="Event date"
              id="date"
              name="date"
            />
            <input
              type="text"
              className="border"
              placeholder="Event location"
              id="location"
              name="location"
            />
            <input
              type="url"
              className="border"
              placeholder="Event source"
              id="source"
              name="source"
            />
          </div>
          <div className="pt-2">
            <p className="text-xs sm:text-sm font-medium">
              <select
                name="causes"
                id="causes"
                className="border"
                multiple
                required
              >
                {causes.map((cause) => (
                  <option key={cause.id} value={cause.id}>
                    {cause.name}
                  </option>
                ))}
              </select>
            </p>
          </div>
          <button role="button" className="block border px-2 mt-4">
            Create event
          </button>
        </div>
      </div>
    </form>
  );
}
