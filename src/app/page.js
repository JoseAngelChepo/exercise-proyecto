"use client";
import { useServices } from "@/data/providers/ServicesProvider";
import { useEffect, useState } from "react";
import AuthGuard from "@/components/AuthGuard";

const Home = () => {
  const { getFlights } = useServices();
  const [flights, setFlights] = useState([]);

  const loadFlights = async () => {
    const flights = await getFlights();
    setFlights(flights);
  };

  useEffect(() => {
    loadFlights();
  }, []);
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 py-12 px-4">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-5xl font-extrabold text-center text-blue-800 drop-shadow mb-2 tracking-tight">
            Vuelos Disponibles
          </h1>
          <p className="text-center text-lg text-blue-600 mb-6">
            Encuentra tu próximo destino con las mejores aerolíneas
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {flights.length > 0 ? (
            flights.map((flight) => (
              <div
                key={flight.id}
                className="relative bg-white rounded-3xl shadow-xl p-7 flex flex-col w-full hover:scale-105 transition-transform duration-200 border border-blue-100 hover:border-blue-400"
              >
                <div className="flex items-center justify-between w-full mb-4">
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                    {flight.airline}
                  </span>
                  <span className="text-sm text-gray-400">{flight.date}</span>
                </div>
                <div className="flex-1 flex flex-col justify-center items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1 text-center">
                    {flight.origin}
                    <span className="mx-2 text-blue-500 text-2xl">→</span>
                    {flight.destination}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded">
                      Directo
                    </span>
                    <span className="inline-block bg-gray-100 text-gray-500 text-xs font-medium px-2 py-0.5 rounded">
                      Clase económica
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center mt-auto">
                  <span className="text-3xl font-extrabold text-green-600 mb-1">
                    ${flight.price}
                  </span>
                  <button className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition-colors">
                    Reservar
                  </button>
                </div>
                <div className="absolute bottom-4 right-4">
                  <svg
                    width="32"
                    height="32"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="text-blue-200"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M2.25 19.5l19.5-7.5-19.5-7.5v6l13.5 1.5-13.5 1.5v6z"
                    />
                  </svg>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No hay vuelos disponibles.
            </p>
          )}
        </div>
      </div>
    </AuthGuard>
  );
};

export default Home;
