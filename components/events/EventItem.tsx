import React from "react";
import Image from "next/image";
import { Event } from "@/dummy-data";
import Button from "../ui/button";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import classes from "./EventItem.module.css";

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
    <li className={classes.item}>
      <Image
        src={"/" + event.image}
        alt={event.title}
        width={400}
        height={300}
      />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{event.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedeAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default EventItem;
