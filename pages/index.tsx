import React from "react";
import { useRouter, NextRouter } from "next/router";
import { getFeaturedEvents, Event } from "@/helpers/api-util";
import EventList from "../components/events/EventList";
import EventSearch from "@/components/events/EventSearch";

type Props = {
  featuredEvents: Event[];
};

function HomePage(props: Props): JSX.Element {
  const { featuredEvents } = props;
  const router: NextRouter = useRouter();

  function findEventsHandler(year: string, month: string) {
    const fullPath: string = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  if (!featuredEvents) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <EventSearch onSearch={findEventsHandler} />
      <EventList events={featuredEvents} />
    </div>
  );
}

export async function getStaticProps(): Promise<{ props: Props }> {
  const featuredEvents: Event[] = await getFeaturedEvents();
  console.log(featuredEvents);

  return {
    props: {
      featuredEvents,
    },
  };
}

export default HomePage;
