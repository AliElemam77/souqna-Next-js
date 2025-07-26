export default function ProductSkeleton() {
  return (
    <div className="h-64 p-4 bg-gray-200 rounded-xl animate-pulse flex flex-col gap-4">
      <div className="h-36 bg-gray-300 rounded-md" />
      <div className="h-4 w-3/4 bg-gray-300 rounded" />
      <div className="h-4 w-1/2 bg-gray-300 rounded" />
    </div>
  );
}
