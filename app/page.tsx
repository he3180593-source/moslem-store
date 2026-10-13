"use client";

import { useState } from "react";

const products = [
  {
    id: 1,
    name: "منتجات العناية بالبشرة",
    category: "مستحضرات التجميل",
    price: 250,
    icon: "🧴",
  },
  {
    id: 2,
    name: "كريم مرطب للبشرة",
    category: "العناية الشخصية",
    price: 180,
    icon: "✨",
  },
  {
    id: 3,
    name: "جهاز قياس ضغط الدم",
    category: "مستلزمات طبية",
    price: 950,
    icon: "🩺",
  },
  {
    id: 4,
    name: "ترمومتر رقمي",
    category: "مستلزمات طبية",
    price: 220,
    icon: "🌡️",
  },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<number[]>([]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  function orderOnWhatsApp() {
    if (cart.length === 0) {
      alert("أضف منتجًا إلى السلة أولاً");
      return;
    }

    const order = cart
      .map((id) => {
        const product = products.find((item) => item.id === id);
        return product ? `${product.name} - ${product.price} جنيه` : "";
      })
      .join("\n");

    const message = `مرحباً MOSLEM STORE، أريد طلب:\n${order}`;
    window.open(
      `https://wa.me/201033619335?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-3">
          <div>
            <h1 className="text-2xl font-black text-purple-700">
              MOSLEM
