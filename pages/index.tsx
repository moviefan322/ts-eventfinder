import React from "react";
import { getFeaturedEvents, Event } from "@/dummy-data";
import EventList from "../components/events/EventList";
import EventSearch from "@/components/events/EventSearch";

function HomePage(): JSX.Element {
  const featuredEvents: Event[] = getFeaturedEvents();

  return (
    <div>
      <EventSearch />
      <EventList events={featuredEvents} />
    </div>
  );
}

export default HomePage;
