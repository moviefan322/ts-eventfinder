import React from "react";
import { getAllEvents, Event } from "@/dummy-data";
import EventList from "@/components/events/EventList";

function EventsPage(): JSX.Element {
  const allEvents: Event[] = getAllEvents();

  return (
    <div>
      <EventList events={allEvents} />
    </div>
  );
}

export default EventsPage;
