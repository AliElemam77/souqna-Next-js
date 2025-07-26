import React from "react";

export default function Header({ title }: { title: string }) {
  return (
    <h2 className="text-3xl font-extrabold text-gray-800 mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-1/3 after:h-1 after:bg-gradient-to-r after:from-primary after:to-pink-500">
      {title}
    </h2>
  );
}
