import moment from "moment";
import { parseCookie } from "@/helpers/index";
import { useContext } from "react";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContex";
import styles from "@/styles/UserProfile.module.css";

export default function ProfilePage({ token }) {
  const { user, error } = useContext(AuthContext);

  if (!user)
    return (
      <Layout title="User profile">
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
    <Layout title="User profile">
      <div className={styles.dash}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            {user.avatar?.url ? (
              <img src={user.avatar.url} alt={user.username} />
            ) : (
              <div className={styles.placeholder}>
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h1>{user.username}'s Profile</h1>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <h3>ID</h3>
            <p>{user.documentId}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Email</h3>
            <p>{user.email}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Provider</h3>
            <p>{user.provider}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Created</h3>
            <p>{moment(user.createdAt).format("MMM DD, YYYY hh:mm A")}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Updated</h3>
            <p>{moment(user.updatedAt).format("MMM DD, YYYY hh:mm A")}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Published</h3>
            <p>{moment(user.publishedAt).format("MMM DD, YYYY hh:mm A")}</p>
          </div>
          <div className={styles.infoItem}>
            <h3>Total Events</h3>
            <p>{events.length}</p>
          </div>
        </div>
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
