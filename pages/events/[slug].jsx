import moment from 'moment'
import { ToastContainer, toast } from "react-toastify";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";

export default function EventPage({ event }) {
  const router = useRouter();

  const deleteEvent = async () => {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`${API_URL}/api/events/${event.documentId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Failed to delete event");
      return;
    }

    router.push("/events");
  };

  return (
    <Layout title={`${event.name}`}>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.documentId}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <a className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {moment(event.date).format("MMM DD, YYYY")} at{" "}
          {moment(event.time, ["HH:mm", "hh:mm A"]).format("hh:mm A")}
        </span>
        <h1>{event.name}</h1>
        <ToastContainer />
        {event.image && (
          <div className={styles.image}>
            <Image
              src={event.image.formats.large.url}
              width={960}
              height={600}
              alt="image"
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{event.performers}</p>
        <h3>Description:</h3>
        <p>{event.description}</p>
        <h3>Venue: {event.venue}</h3>
        <p>{event.address}</p>

        <Link href={"/events"} className={styles.back}>
          {"<"} Go Back
        </Link>
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
  const res = await fetch(
    `${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`,
  );
  // filters[slug][$eq]=... → filter by slug equal that string.
  const events = await res.json();

  return {
    props: {
      event: events.data[0],
    },
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events?populate=*&filters[slug][$eq]=${slug}`);
//   const events = await res.json();

//   return {
//     props: {
//       event: events.data[0],
//     },
//   };
// }
