import moment from "moment";
import { parseCookie } from "@/helpers/index";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";
import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";

export default function EditEventPages({ event, token }) {
  const [values, setValues] = useState({
    name: event.name,
    performers: event.performers,
    venue: event.venue,
    address: event.address,
    date: event.date,
    time: event.time,
    description: event.description,
  });
  const [imagePreview, setImagePreview] = useState(
    event.image ? event.image.formats.thumbnail.url : null,
  );
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some(
      (element) => element === "",
    );

    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
      return;
    }

    const dataToSend = {
      ...values,
      slug: values.name.trim().toLowerCase().replaceAll(" ", "-"),
      date: values.date,
      time: moment(values.time, "HH:mm").format("HH:mm:ss.SSS"),
    };

    const res = await fetch(`${API_URL}/api/events/${event.documentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: dataToSend }),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("Something went wrong");
      return;
    } else {
      const event = await res.json();
      toast.info("Uploading...");
      setInterval(() => {
        router.push(`/events/${event.data.slug}`);
      }, 5500);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    const res = await fetch(
      `${API_URL}/api/events/${event.documentId}?populate=*`,
    );
    const events = await res.json();
    setImagePreview(events.data.image.formats.thumbnail.url);
    setShowModal(false);
    toast.success("Upload success");
  };

  return (
    <Layout title="Edit Event">
      <Link href={"/events"}>{"<"} Go Back</Link>
      <h1>Edit Event</h1>
      <ToastContainer />

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={moment(values.date).format("YYYY-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              name="time"
              id="time"
              value={moment(values.time, ["HH:mm", "hh:mm A"]).format("HH:mm")}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type="submit" value="Update Event" className="btn" />
      </form>

      <h2>Event Image</h2>
      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} />
      ) : (
        <div>
          <Image src="/images/event-default.png" height={100} width={170} />
          <p>No image uploaded</p>
        </div>
      )}

      <div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-secondary btn-icon"
        >
          <FaImage /> Set Image
        </button>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload
          eventId={event.id}
          imageUploaded={imageUploaded}
          token={token}
        />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const res = await fetch(`${API_URL}/api/events/${id}?populate=*`);
  const event = await res.json();
  const { token } = parseCookie(req);

  return {
    props: {
      event: event.data,
      token,
    },
  };
}
