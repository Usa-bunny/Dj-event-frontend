import { API_URL } from "@/config";
export default async function handler(req, res) {
  if (req.method === "GET") {
    const response = await fetch(`${API_URL}/api/events?populate=*`)
    const data = await response.json()
    res.status(200).json(data);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed` });
  }
}

// You can do this if want to access data local and use it as next.js api
// const { data } = require("./data.json");
// export default function handler(req, res) {
//   if (req.method === "GET") {
//     res.status(200).json(data);
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     res.status(405).json({ message: `Method ${req.method} is not allowed` });
//   }
// }

// ENDPOINT : http://localhost:3000/api/events