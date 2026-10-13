"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  icon: string;
};

const products: Product[] = [
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

  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      ),
    [search]
  );

  const cartProducts = cart
    .map((id) => products.find((product) => product.id === id))
    .filter((product): product is Product => Boolean(product));

  const total = cartProducts.reduce(
    (sum, product) => sum + product.price,
    0
  );

  function addToCart(id: number) {
    setCart((current) => [...current, id]);
  }

  function removeFromCart(index: number) {
    setCart((current) => current.filter((_, i) => i !== index));
  }

  function orderOnWhatsApp() {
    if (cartProducts.length === 0) {
      alert("أضف منتجًا إلى السلة أولًا");
      return;
    }

    const order = cartProducts
      .map(
        (product, index) =>
          `${index + 1}- ${product.name} — ${product.price} جنيه`
      )
      .join("\n");

    const message =
      `مرحبًا MOSLEM STORE، أريد طلب المنتجات التالية:\n\n` +
      `${order}\n\n` +
      `الإجمالي: ${total} جنيه`;

    const url = `https://wa.me/201033619335?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-gray-50 text-gray-800"
    >
      <header className="sticky top-0 z-20 border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
          <div>
            <h1 className="text-2xl font-black text-purple-700">
              MOSLEM STORE
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              كل احتياجاتك في مكان واحد
            </p>
          </div>

          <a
            href="#cart"
            className="rounded-xl bg-purple-700 px-4 py-3 text-sm font-bold text-white"
          >
            🛒 السلة ({cart.length})
          </a>
        </div>
      </header>

      <section className="bg-gradient-to-l from-purple-900 via-purple-700 to-indigo-600 text-white">
        <div className="mx-auto max-w-6xl px-5 py-12 md:py-20">
          <span className="rounded-full bg-white/15 px-4 py-2 text-sm">
            أهلًا بك في متجرنا
          </span>

          <h2 className="mt-6 text-3xl font-black leading-tight md:text-5xl">
            تسوّق احتياجاتك
            <br />
            بكل سهولة
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-purple-100 md:text-base">
            اكتشف مجموعة من منتجات العناية الشخصية والمستلزمات الطبية،
            وأرسل طلبك مباشرة عبر واتساب.
          </p>

          <a
            href="#products"
            className="mt-7 inline-block rounded-xl bg-white px-6 py-3 font-bold text-purple-800 transition hover:bg-purple-100"
          >
            تصفح المنتجات ←
          </a>
        </div>
      </section>

      <section
        id="products"
        className="mx-auto max-w-6xl px-4 py-10"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-black text-gray-900">
            منتجاتنا
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            اختار المنتجات المناسبة لك وأضفها إلى السلة.
          </p>
        </div>

        <label className="mb-8 block">
          <span className="sr-only">ابحث عن منتج</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ابحث عن منتج أو قسم..."
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
          />
        </label>

        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center text-gray-500">
            لا توجد منتجات مطابقة لبحثك.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100">
                  <span className="text-7xl" aria-hidden="true">
                    {product.icon}
                  </span>
                </div>

                <div className="p-5">
                  <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700">
                    {product.category}
                  </span>

                  <h3 className="mt-4 min-h-12 font-bold leading-6">
                    {product.name}
                  </h3>

                  <p className="mt-3 text-xl font-black text-purple-700">
                    {product.price} جنيه
                  </p>

                  <button
                    type="button"
                    onClick={() => addToCart(product.id)}
                    className="mt-5 w-full rounded-xl bg-purple-700 px-4 py-3 font-bold text-white transition hover:bg-purple-800"
                  >
                    + أضف إلى السلة
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section
        id="cart"
        className="mx-auto max-w-6xl px-4 pb-12"
      >
        <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm md:p-7">
          <h2 className="text-2xl font-black text-gray-900">
            🛒 سلة المشتريات
          </h2>

          {cartProducts.length === 0 ? (
            <p className="mt-5 rounded-xl bg-gray-50 p-5 text-center text-gray-500">
              السلة فارغة حاليًا. أضف المنتجات التي تريدها.
            </p>
          ) : (
            <div className="mt-5 space-y-3">
              {cartProducts.map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gray-50 p-4"
                >
                  <div>
                    <p className="font-bold">{product.name}</p>
                    <p className="mt-1 text-sm text-purple-700">
                      {product.price} جنيه
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(index)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    حذف
                  </button>
                </div>
              ))}

              <div className="flex items-center justify-between border-t pt-5">
                <span className="font-bold">الإجمالي</span>
                <span className="text-2xl font-black text-purple-700">
                  {total} جنيه
                </span>
              </div>

              <button
                type="button"
                onClick={orderOnWhatsApp}
                className="w-full rounded-xl bg-green-600 px-5 py-4 font-bold text-white transition hover:bg-green-700"
              >
                اطلب الآن عبر واتساب
              </button>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 px-4 py-8 text-center text-white">
        <h2 className="text-xl font-black text-purple-300">
          MOSLEM STORE
        </h2>
        <p className="mt-3 text-sm text-gray-400">
          شكرًا لزيارتك متجرنا ❤️
        </p>
        <p className="mt-4 text-xs text-gray-500">
          جميع الأسعار بالجنيه المصري.
        </p>
      </footer>
    </main>
  );
}
