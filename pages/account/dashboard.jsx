import { parseCookie } from "@/helpers/index";
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import { API_URL } from "@/config/index";
import styles from "@/styles/Dashboard.module.css";

export default function DashboardPage({ events }) {
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((event) => (
          <DashboardEvent key={event.id} event={event} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  const res = await fetch(
    `${API_URL}/api/users/me?populate[event][populate][image]=*`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = await res.json();

  return {
    props: {
      events: Object.values(
        data.event.reduce((acc, event) => {
          acc[event.documentId] = event;
          return acc;
        }, {}),
      ),
    },
  };
}
