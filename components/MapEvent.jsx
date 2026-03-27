import styles from "@/styles/Map.module.css";

export default function MapEvent({ event }) {
  const stateMap = {
    zoom: 16,
    type: "k",
    language: "en",
  }

  return (
    <div>
      <h3>Location in map</h3>
      <iframe
        className={styles.mapframe}
        src={`https://www.google.com/maps?q=${encodeURIComponent(
          event.address,
        )}&z=${stateMap.zoom}&t=${stateMap.type}&hl=${stateMap.language}&output=embed`}
        allowFullScreen
      ></iframe>
    </div>
  );
}
