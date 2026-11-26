"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

function WarRoomFallback() {
  return (
    <section
      className="club-war-room club-war-room--loading"
      id="club-war-room"
      aria-labelledby="club-war-room-loading-title"
      aria-busy="true"
    >
      <p id="club-war-room-loading-title" role="status">
        THE COMMUNITY WAR ROOM IS ON FILE. ITS ARTWORK CANVAS WILL LOAD AS YOU APPROACH THIS OFFICE.
      </p>
    </section>
  );
}

const ClubWarRoom = dynamic(() => import("./club-war-room"), {
  loading: () => <WarRoomFallback />,
});

export default function ClubWarRoomLazy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !("IntersectionObserver" in window)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef}>
      {shouldLoad ? <ClubWarRoom /> : <WarRoomFallback />}
    </div>
  );
}
