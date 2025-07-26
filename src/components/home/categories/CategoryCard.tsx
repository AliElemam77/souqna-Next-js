export default function CategoryCard({
  cat,
}: {
  cat: { id: string; nameEn: string; image: string; name: string };
}) {
  return (
    <div className="rounded-2xl p-4 text-center bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer group">
      <div className="overflow-hidden rounded-xl mb-3">
        <img
          src={cat.image}
          alt={cat.name}
          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110 hover:shadow-lg rounded-lg shadow-sm  aspect-square"
        />
      </div>
      <h2 className="font-semibold text-gray-900 text-base leading-tight">
        {cat.nameEn}
      </h2>
    </div>
  );
}
