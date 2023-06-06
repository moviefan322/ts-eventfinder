import React from "react";
import { getFeaturedEvents, Event } from "@/dummy-data";
import EventList from "@/components/events/EventList";

function EventsPage(): JSX.Element {
  const featuredEvents: Event[] = getFeaturedEvents();

  return (
    <div>
      <h1>All Events:</h1>
    </div>
  );
}

export default EventsPage;
