import { parseCookie } from "@/helpers/index";
import { useContext } from "react";
import Layout from "@/components/Layout";
import DashboardEvent from "@/components/DashboardEvent";
import AuthContext from "@/context/AuthContex";
import styles from "@/styles/Dashboard.module.css";

export default function DashboardPage({ token }) {
  const { user, error } = useContext(AuthContext);

  if (!user)
    return (
      <Layout title="User Dashboard">
        <h1>Loading...</h1>
      </Layout>
    );

  const events = Object.values(
    (user.event || []).reduce((acc, event) => {
      acc[event.documentId] = event;
      return acc;
    }, {}),
  );

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((event) => (
          <DashboardEvent key={event.id} event={event} token={token} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  return {
    props: { token },
  };
}
