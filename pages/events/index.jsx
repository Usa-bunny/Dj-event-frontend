import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import { API_URL, PER_PAGE } from "@/config/index";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}

      <Pagination total={total} page={page}/>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total / count
  const totalRes = await fetch(`${API_URL}/api/events`);
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/api/events?populate=*&sort=updatedAt:desc&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`,
  );
  const events = await eventRes.json();

  return {
    props: { events: events.data, page: +page, total : total.meta.pagination.total },
  };
}
