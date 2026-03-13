import qs from "qs";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";

export default function SearchPage({ events, term }) {
  return (
    <Layout title="Search Results">
      <Link href={"/events"}>{"<"} Go Back</Link>
      <h1>Search Results for "{term}"</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      populate: "*",
      filters: {
        $or: [
          { slug: { $containsi: term } },
          { name: { $containsi: term } },
          { venue: { $containsi: term } },
          { address: { $containsi: term } },
          { performers: { $containsi: term } },
          { description: { $containsi: term } },
        ],
      },
    },
    { encodeValuesOnly: true },
  );

  const res = await fetch(`${API_URL}/api/events?${query}`);
  const events = await res.json();

  return {
    props: { events: events.data, term },
  };
}
