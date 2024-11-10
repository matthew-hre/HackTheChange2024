import bricks from "@/public/images/brickwall.jpeg";
import SlidingEventPage from '@/components/sliding-event-page'

export default function Home() {
  return (
    <div className="min-h-screen" style={{
      backgroundImage: `url(${bricks.src}`
    }}>
      <div className="text-7xl font-bold flex flex-row items-center justify-center font-grafitti text-gray-900"
        style={{
          mixBlendMode: "hard-light"
        }}
      >
        Brick-Wall-Poster-Art
      </div>
      <div>
      <SlidingEventPage />
      </div>
    </div>
  );
}
