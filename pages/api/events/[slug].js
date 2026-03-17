const { events } = require("./data.json");
export default function handler(req, res) {
  const event = events.filter((event) => event.slug === req.query.slug);
  if (req.method === "GET") {
    res.status(200).json(event); 
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}

// // You can do this if want to access data with api and use it as next.js api
// import { API_URL } from "@/config";
// export default async function handler(req, res) {
//   const response = await fetch(`${API_URL}/api/events?populate=*`)
//   const data = await response.json()
//   const event = data.data.filter((event) => event.slug === req.query.slug);
//   if (req.method === "GET") {
//     res.status(200).json(event[0]); 
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).json({ message: `Method ${req.method} is not allowed` });
//   }
// }

// ENDPOINT : http://localhost:3000/api/events/boom-dance-festival-experience
