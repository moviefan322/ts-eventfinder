import React from "react";
import { useRouter, NextRouter } from "next/router";
import { getFilteredEvents, Event } from "@/dummy-data";

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
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  const filteredEvents: Event[] = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No events found for the chosen filter!</p>;
  }

  return (
    <div>
      <h1>Filtered Events</h1>
    </div>
  );
}

export default FilteredEventsPage;
