import products from "./data/products.json";
import flights from "./data/flights.json";

export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
}

export function fetchFlights() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(flights), 500);
  });
}
