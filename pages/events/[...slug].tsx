import React, { useEffect, useState } from "react";
import { useRouter, NextRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
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
  const [loadedEvents, setLoadedEvents] = useState<Event[]>([]);
  const router: NextRouter = useRouter();

  const filteredData: string | string[] | undefined = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-db-98d2d-default-rtdb.firebaseio.com/events.json"
  );

  useEffect(() => {
    if (data) {
      const events: Event[] = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData: JSX.Element = (
    <Head>
      <title>Filtered Events</title>
      <meta name="description" content="A list of filtered events." />
    </Head>
  );

  if (!filteredData) {
    return (
      <>
        {pageHeadData}
        <p className="center">Loading...</p>
      </>
    );
  }

  const filteredYear: string = filteredData[0];
  const filteredMonth: string = filteredData[1];

  const numYear: number = +filteredYear;
  const numMonth: number = +filteredMonth;

  pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}`}
      />
    </Head>
  );

  const fileteredEvents = loadedEvents.filter((event: Event) => {
    const eventDate: Date = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
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
        {pageHeadData}
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
    <>
      {pageHeadData}
      <div>
        <ResultsTitle date={new Date(numYear, numMonth - 1)} />
        <EventList events={filteredEvents} />
      </div>
    </>
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
