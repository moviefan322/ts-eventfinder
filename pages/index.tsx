import React from "react";
import {useRouter, NextRouter} from "next/router";
import { getFeaturedEvents, Event } from "@/dummy-data";
import EventList from "../components/events/EventList";
import EventSearch from "@/components/events/EventSearch";

function HomePage(): JSX.Element {
  const featuredEvents: Event[] = getFeaturedEvents();
  const router: NextRouter = useRouter();

  function findEventsHandler(year: string, month: string) {
    const fullPath: string = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList events={featuredEvents} />
    </div>
  );
}

export default HomePage;
