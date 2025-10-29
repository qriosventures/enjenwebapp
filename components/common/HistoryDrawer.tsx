"use client";

import * as React from "react";

interface HistoryItem {
  id: string | number;
  title: string;
  subtitle: string;
}

interface HistoryDrawerProps {
  history: HistoryItem[];
}

const HistoryDrawer = ({
  history
}: HistoryDrawerProps) => {
  return (
        <div className="space-y-5 relative">
          <div className="absolute left-5 top-0 bottom-0 w-[1.5px] bg-gray-300" />
          {history?.map((item) => (
            <div key={item.id} className="relative px-7">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black border-2 border-[#F9F9F7]" />

              <div className="ml-4 bg-white shadow-sm border border-[#E6E6E6] rounded-lg p-4 w-full">
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-gray-500 mt-1">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
  );
};

export default HistoryDrawer;
