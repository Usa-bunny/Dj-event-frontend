import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      {events.length > 0 && (
        <Link href="/events" className="btn-secondary">
          View All Events
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*&sort=date:asc&pagination[limit]=3`);
  // populate=* → include all relations.
  // sort=date:asc → sort by date field in ascending order (oldest first).
  // pagination[limit]=3 → limit the response to 3 items.
  const events = await res.json();

  return {
    props: { events: events.data },
    revalidate: 1
  };
}
