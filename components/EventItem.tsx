import React from "react";
import Image from "next/image";
import { Event } from "@/dummy-data";
import Link from "next/link";

type EventItemProps = {
  event: Event;
};

function EventItem({ event }: EventItemProps): JSX.Element {
  const readableDate = new Date(event.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedeAddress = event.location.replace(", ", "\n");
  const exploreLink = `/events/${event.id}`;

  return (
    <li>
      <Image
        src={"/" + event.image}
        alt={event.title}
        width={400}
        height={300}
      />
      <div>
        <div>
          <h2>{event.title}</h2>
          <div>
            <time>{readableDate}</time>
          </div>
          <div>{formattedeAddress}</div>
        </div>
        <div>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>

      <p>{event.description}</p>
    </li>
  );
}

export default EventItem;
