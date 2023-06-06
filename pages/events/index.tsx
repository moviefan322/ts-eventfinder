import React from "react";
import { getFeaturedEvents, Event } from "@/dummy-data";
import EventItem from "@/components/EventItem";

function EventsPage(): JSX.Element {
  const featuredEvents: Event[] = getFeaturedEvents();

  return (
    <div>
      <h1>Featured Events:</h1>
      {featuredEvents.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventsPage;
