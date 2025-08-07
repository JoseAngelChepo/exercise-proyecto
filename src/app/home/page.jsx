import AuthGuard from "@/components/AuthGuard";

const posts = [
  {
    id: 1,
    title: "Descubre la Magia de Bali",
    excerpt: "Explora templos, playas y cultura en la isla de los dioses.",
    image: "/globe.svg",
    date: "07 Ago 2025",
  },
  {
    id: 2,
    title: "Aventura en los Alpes Suizos",
    excerpt: "Rutas de senderismo, paisajes de ensueño y chocolate suizo.",
    image: "/window.svg",
    date: "01 Ago 2025",
  },
  {
    id: 3,
    title: "Guía para Viajar por Japón",
    excerpt: "Consejos para moverte en tren bala y descubrir Tokio y Kioto.",
    image: "/vercel.svg",
    date: "25 Jul 2025",
  },
];

const HomePage = () => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-[#f7f6f2] to-[#e9e7e1] py-0 px-0">
        {/* Encabezado principal */}
        <div className="relative h-[340px] flex items-center justify-center bg-[#b6a48a] bg-opacity-30">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url(/file.svg)" }}
          />
          <div className="relative z-10 text-center">
            <h1 className="text-6xl font-serif font-extrabold text-[#4b3f2d] drop-shadow-lg tracking-tight">
              Travel <span className="italic font-light">Blog</span>
            </h1>
            <p className="mt-2 text-lg text-[#6d5c3d] font-medium">
              Inspiración y consejos para tu próxima aventura
            </p>
          </div>
        </div>

        {/* Introducción */}
        <section className="max-w-3xl mx-auto py-12 px-4 text-center">
          <p className="text-[#4b3f2d] text-lg md:text-xl font-serif mb-4">
            Bienvenido a nuestro blog de viajes, donde compartimos experiencias,
            guías y tips para que vivas el mundo a tu manera. Descubre destinos
            únicos, culturas fascinantes y consejos prácticos para viajeros de
            todo tipo.
          </p>
        </section>

        {/* Sección de artículos */}
        <section className="max-w-6xl mx-auto pb-16 px-4">
          <h2 className="text-3xl font-bold text-[#4b3f2d] mb-8 font-serif text-left">
            Artículos recientes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col hover:scale-105 transition-transform duration-200 border border-[#e9e7e1] hover:border-[#b6a48a]"
              >
                <div className="h-40 w-full mb-4 flex items-center justify-center bg-[#f7f6f2] rounded-2xl overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-24 object-contain"
                  />
                </div>
                <span className="text-xs text-[#b6a48a] mb-2 font-semibold">
                  {post.date}
                </span>
                <h3 className="text-xl font-bold text-[#4b3f2d] mb-2 font-serif">
                  {post.title}
                </h3>
                <p className="text-[#6d5c3d] mb-4 flex-1">{post.excerpt}</p>
                <button className="mt-auto px-5 py-2 bg-[#b6a48a] text-white rounded-full font-semibold shadow hover:bg-[#4b3f2d] transition-colors">
                  Leer más
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AuthGuard>
  );
};

export default HomePage;
