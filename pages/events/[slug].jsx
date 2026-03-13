import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

export default function EventPage({ event }) {
  const deleteEvent = e => {
    console.log("delete")
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {new Date(event.date).toDateString(navigator.language)} at {event.time}
        </span>
        <h1>{event.name}</h1>
        {event.image && (
          <div className={styles.image}>
            <Image src={event.image.formats.large.url} width={960} height={600} alt="image"/>
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href={"/events"} className={styles.back}>{'<'} Go Back</Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const events = await res.json();

  const paths = events.data.map((event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`);
  // filters[slug][$eq]=... → filter by slug equal that string.
  const events = await res.json();

  return {
    props: {
      event: events.data[0],
    },
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       event: events[0],
//     },
//   };
// }
