import React, { Fragment } from "react";
import { useRouter, NextRouter } from "next/router";
import { getEventById } from "@/dummy-data";
import { Event } from "@/dummy-data";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/ui/error-alert";

function EventDetail() {
  const router: NextRouter = useRouter();
  const eventId: string = router.query.eventId as string;

  const event: Event | undefined = getEventById(eventId);

  if (!event) {
    return (
      <div>
        <ErrorAlert>
          <h1>No Event Found</h1>
        </ErrorAlert>
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

export default EventDetail;
