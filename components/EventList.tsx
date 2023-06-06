import React from "react";
import { Event } from "../dummy-data";
import EventItem from "./EventItem";
import classes from "./EventList.module.css";

type EventListProps = {
  events: Array<Event>;
};

function EventList({ events }: EventListProps) {
  return (
    <ul className={classes.list}>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </ul>
  );
}

export default EventList;
