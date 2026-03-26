import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config/index";
import styles from "@/styles/DashboardEvent.module.css";

export default function DashboardEvent({ event }) {
  const deleteEvent = async () => {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`${API_URL}/api/events/${event.documentId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      toast.error("Failed to delete event");
      return;
    }
  }

  return (
    <div className={styles.event}>
      <ToastContainer />
      <h4>
        <Link href={`/events/${event.slug}`}>{event.name}</Link>
      </h4>
      <Link href={`/events/edit/${event.documentId}`} className={styles.edit}>
        <FaPencilAlt /> Edit Event
      </Link>
      <a className={styles.delete} onClick={deleteEvent}>
        <FaTimes /> Delete Event
      </a>
    </div>
  );
}
