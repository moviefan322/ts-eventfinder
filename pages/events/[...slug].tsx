import React from "react";
import { useRouter, NextRouter } from "next/router";
import { getFilteredEvents, Event } from "@/dummy-data";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";

function FilteredEventsPage(): JSX.Element {
  const router: NextRouter = useRouter();

  const filteredData: string | string[] | undefined = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear: string = filteredData[0];
  const filteredMonth: string = filteredData[1];

  const numYear: number = +filteredYear;
  const numMonth: number = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents: Event[] = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  return (
    <div>
      <ResultsTitle date={new Date(numYear, numMonth - 1)} />
      <EventList events={filteredEvents} />
    </div>
  );
}

export default FilteredEventsPage;
