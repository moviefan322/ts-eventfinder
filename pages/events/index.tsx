import React from "react";
import { getFeaturedEvents, Event } from "@/dummy-data";
import EventList from "@/components/EventList";

function EventsPage(): JSX.Element {
  const featuredEvents: Event[] = getFeaturedEvents();

  return (
    <div>
      <h1>Featured Events:</h1>
      <EventList events={featuredEvents} />
    </div>
  );
}

export default EventsPage;
