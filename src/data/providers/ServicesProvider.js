"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { fetchProducts, fetchFlights } from "@/data/api/mock";
import Services from "@/data/api/server";
import handleApiError from "@/utils/handleApiError";
import { toast } from "react-toastify";
import auth from "@/data/api/server/auth";

const ServicesContext = createContext();

const setupCookie = (name, value, days) => {
  const expires = days
    ? new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
    : "";

  document.cookie = `${name}=${value}${
    expires ? `; expires=${expires}` : ""
  }; path=/; SameSite=Strict; Secure`;
};

export const ServicesProvider = ({ children }) => {
  const [stateServices, setStateServices] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  const register = (data) => {
    return Services.register(data)
      .then((data) => data)
      .catch((error) => {
        const message = handleApiError(error);
        toast.error(message);
        return false;
      });
  };

  const login = async (email, password) => {
    return Services.login(email, password)
      .then((res) => {
        setupCookie("token", res.accessToken);
        setupCookie("role", res.role);
        setToken(res.accessToken);
        setRole(res.role);
        return res;
      })
      .catch((error) => {
        const message = handleApiError(error);
        toast.error(message);
        return false;
      });
  };

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
    user,
    token,
    role,
    register,
    login,
    getProducts,
    getFlights,
  };

  useEffect(() => {
    const storedToken = auth.getToken();
    const storedRole = auth.getRole();
    if (storedToken && storedRole) {
      // verificar token con mi servicio
      const resultadoDeValidacionToken = true;
      if (resultadoDeValidacionToken) {
        setToken(storedToken);
        setRole(storedRole);
      } else {
        logout();
      }
    }
    setStateServices(true);
  }, []);
  return (
    <ServicesContext.Provider value={values}>
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => useContext(ServicesContext);
