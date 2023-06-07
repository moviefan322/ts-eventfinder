import React, { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import { Event } from "@/dummy-data";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";

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
  const paths: { params: { eventId: string } }[] = events.map((event: Event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export default EventDetail;
