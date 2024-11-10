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
                className="w-full p-4"
                placeholder="Event name"
                id="name"
                name="name"
              />
            </h2>
            <p className="text-sm sm:text-base md:text-lg opacity-90">
              <textarea
                className="w-full p-4 border"
                rows={12}
                placeholder="Event description"
                id="description"
                name="description"
              />
            </p>
          </div>
          <div className="space-x-4 text-sm sm:text-base flex flex-row mt-4">
            <input
              type="date"
              className="border p-2 flex-1"
              placeholder="Event date"
              id="date"
              name="date"
            />
            <input
              type="text"
              className="border p-2 flex-1"
              placeholder="Event location"
              id="location"
              name="location"
            />
          </div>
          <input
            type="url"
            className="border w-full mt-4 p-2"
            placeholder="Event source"
            id="source"
            name="source"
          />
          <div className="pt-4">
            <p className="text-xs sm:text-sm font-medium">
              <select
                name="causes"
                id="causes"
                className="border w-full p-2"
                defaultValue={"select"}
                required
              >
                <option value="select" disabled>
                  Select a cause
                </option>
                {causes.map((cause) => (
                  <option key={cause.id} value={cause.id}>
                    {cause.name}
                  </option>
                ))}
              </select>
            </p>
          </div>
          <button
            role="button"
            className="block border px-2 rounded-full bg-red-500 text-white font-bold text-lg mt-auto"
          >
            Create Event
          </button>
        </div>
      </div>
    </form>
  );
}
