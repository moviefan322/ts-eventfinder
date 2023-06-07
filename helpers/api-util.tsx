export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  imageAlt: string;
  isFeatured: boolean;
}

export async function getFeaturedEvents(): Promise<Event[]> {
  const allEvents: Event[] = await getAllEvents();
  console.log(allEvents);
  return allEvents.filter((event: Event) => event.isFeatured);
}

export async function getAllEvents(): Promise<Event[]> {
  const response = await fetch(
    "https://nextjs-db-98d2d-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  console.log(data);

  const events: Event[] = [];

  for (const key in data) {
    events.push({
      id: data[key].id,
      title: data[key].title,
      description: data[key].description,
      location: data[key].location,
      date: data[key].date,
      image: data[key].image,
      imageAlt: data[key].imageAlt,
      isFeatured: data[key].isFeatured,
    });
  }

  console.log(events);
  return events;
}

export async function getFilteredEvents() {}

export async function getEventById(id: string) {
    const allEvents: Event[] = await getAllEvents();
    return allEvents.find((event: Event) => event.id === id);
}
