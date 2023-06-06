import React from "react";
import { Event } from "../dummy-data";
import EventItem from "./EventItem";

type EventListProps = {
  events: Array<Event>;
};

function EventList({ events }: EventListProps) {
  return (
    <ul>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
