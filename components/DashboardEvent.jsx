import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { API_URL } from "@/config/index";
import styles from "@/styles/DashboardEvent.module.css";

export default function DashboardEvent({ event, token }) {
  const router = useRouter();

  const deleteEvent = async () => {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`${API_URL}/api/events/${event.documentId}`, {
      method: "DELETE", 
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("Failed to delete event");
      return;
    }

    router.reload()
    toast.success("Event deleted");
  };

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
