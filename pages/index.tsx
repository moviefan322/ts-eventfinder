import React from "react";
import { getFeaturedEvents, Event } from "@/dummy-data";
import EventList from "@/components/EventList";

function HomePage(): JSX.Element {
  const featuredEvents: Event[] = getFeaturedEvents();

  return (
    <div>
      <h1>Home Page</h1>
      <EventList events={featuredEvents} />
    </div>
  );
}

export default HomePage;
