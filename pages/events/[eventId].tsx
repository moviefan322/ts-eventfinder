import React, { Fragment } from "react";
import Head from "next/head";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import { Event } from "@/dummy-data";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import Comments from "@/components/input/comments";

type Props = {
  event: Event;
};

function EventDetail(props: Props) {
  const event: Event | undefined = props.event;

  if (!event) {
    return (
      <div className="center">
        <h1>Loading..</h1>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.imageAlt}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context: any) {
  const eventId: string = context.params.eventId;
  const event: Event | undefined = await getEventById(eventId);

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events: Event[] = await getFeaturedEvents();
  const paths: { params: { eventId: string } }[] = events.map(
    (event: Event) => ({
      params: { eventId: event.id },
    })
  );

  return {
    paths,
    fallback: true,
  };
}

export default EventDetail;
