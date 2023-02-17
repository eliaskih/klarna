import express from "express";
const app = express();
import { config } from "dotenv";
config();

import { createOrder, retriveOrder } from "./klarna.js";

const products = [
  { id: "1", name: "table", price: 60 },
  { id: "2", name: "sofa", price: 80 },
  { id: "3", name: "chair", price: 57 },
];

app.get("/", (req, res) => {
  res.send(
    products
      .map((product) => `<a href="/p/${product.id}">${product.name}</a>`)
      .join("")
  );
});

app.get("/p/:id", async (req, res) => {
  const product = products.find((product) => product.id === req.params.id);
  const data = await createOrder(product);

  res.send(data.html_snippet);
});

app.get("/confirmation", async (req, res) => {
  const data = await retriveOrder(req.query.order_id);
  res.send(data.html_snippet);
});

app.listen(3000);
