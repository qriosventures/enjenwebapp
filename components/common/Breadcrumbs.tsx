"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const formatSegment = (segment: string) =>
    segment
      .replace(/-/g, " ") 
      .replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <nav className="flex items-center text-sm text-gray-600">
      {segments.map((segment, idx) => {
        const href = "/" + segments.slice(0, idx + 1).join("/");
        const isLast = idx === segments.length - 1;

        return (
          <div key={href} className="flex items-center">
            {!isLast ? (
              <Link
                href={href}
                className="hover:text-gray-900 transition-colors duration-150 text-[#6C7059]"
              >
                {formatSegment(segment)}
              </Link>
            ) : (
              <span className="text-[#1B1C1E] font-medium">
                {formatSegment(segment)}
              </span>
            )}

            {!isLast && <span className="mx-2 text-[#6C7059]">/</span>}
          </div>
        );
      })}
    </nav>
  );
}
