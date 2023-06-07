import React from "react";
import { useRouter, NextRouter } from "next/router";
import { getFilteredEvents, Event } from "@/helpers/api-util";
import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";

type Props = {
  hasError: boolean;
  filteredEvents: Event[];
  date: {
    year: number;
    month: number;
  };
};

function FilteredEventsPage(props: Props): JSX.Element {
  // const router: NextRouter = useRouter();

  // const filteredData: string | string[] | undefined = router.query.slug;

  // if (!filteredData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear: string = filteredData[0];
  // const filteredMonth: string = filteredData[1];

  // const numYear: number = +filteredYear;
  // const numMonth: number = +filteredMonth;

  if (props.hasError) {
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

  const filteredEvents: Event[] = props.filteredEvents;

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
      <ResultsTitle date={new Date(props.date.year, props.date.month - 1)} />
      <EventList events={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const filteredData: string | string[] = params.slug;

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
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination: "/error",
      // },
    };
  }

  const filteredEvents: Event[] = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

export default FilteredEventsPage;
