"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts, fetchFlights } from "../api/mock";
import { toast } from "react-toastify";

const ServicesContext = createContext();

export const ServicesProvider = ({ children }) => {
  const [stateServices, setStateServices] = useState(false);

  const getProducts = async () => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (error) {
      toast.error("Error al cargar los productos");
      return [];
    }
  };

  const getFlights = async () => {
    try {
      const flights = await fetchFlights();
      return flights;
    } catch (error) {
      toast.error("Error al cargar los vuelos");
      return [];
    }
  };

  const values = {
    stateServices,
    getProducts,
    getFlights,
  };

  useEffect(() => {
    setStateServices(true);
  }, []);
  return (
    <ServicesContext.Provider value={values}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);
