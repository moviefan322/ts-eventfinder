import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetStaticProps } from "next";
import { getAllEvents, Event } from "@/helpers/api-util";
import EventList from "@/components/events/EventList";
import EventSearch from "@/components/events/EventSearch";

type Props = {
  events: Event[];
};

function EventsPage(props: Props): JSX.Element {
  const router = useRouter();
  const allEvents: Event[] = props.events;

  function findEventsHandler(year: string, month: string) {
    const fullPath: string = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name="description"
          content="Find a lot of great events that allow you to evolve..."
        />
      </Head>
      <div>
        <EventSearch onSearch={findEventsHandler} />
        <EventList events={allEvents} />
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allEvents: Event[] = await getAllEvents();

  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
};

export default EventsPage;
