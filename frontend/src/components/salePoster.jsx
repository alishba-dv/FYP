import React, { useEffect, useState } from "react";
import axios from "axios";

const SalePoster = () => {
  const [sale, setSale] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");
  const host = window.location.hostname === 'localhost'
  ? 'localhost'
  : '0.0.0.0'; 
  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await axios.get(`http://${host}:8080/api/getsale`);
        if (response.data && response.data.isActive) {
          setSale({
            percentage: response.data.discountPercentage,
            endDate: response.data.endDate,
          });
        }
      } catch (error) {
        console.error("Error fetching sale data:", error);
      }
    };

    fetchSale();
  }, []);

  useEffect(() => {
    if (!sale) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(sale.endDate).getTime();
      const diff = end - now;

      if (diff <= 0) {
        setSale(null);
        clearInterval(interval);
        return;
      }

      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [sale]);

  if (!sale) return null;

  return (
    <div className="w-full h-16 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white rounded shadow flex items-center justify-center text-base font-semibold glowing-banner">
      🎉 Get <span className="mx-1 text-xl font-bold">{sale.percentage}%</span> OFF!
      <span className="ml-10 text-large">⏳ Ends in: {timeLeft}</span>
    </div>
  );
};

export default SalePoster;
