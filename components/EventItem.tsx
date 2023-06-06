import React from "react";
import Image from "next/image";
import { Event } from "@/dummy-data";

type EventItemProps = {
  event: Event;
};

function EventItem({ event }: EventItemProps): JSX.Element {
  return (
    <div>
      <h1>{event.title}</h1>
      <Image src={"/" + event.image} alt={event.title} width={400} height={300}/>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>{event.date}</p>
    </div>
  );
}

export default EventItem;
