"use client";

import React from "react";

export interface MenuButton {
  id: string;
  icon?: string;
  label: string;
}

interface MenuButtonGroupProps {
  items: MenuButton[];
  onSelect: (id: string) => void;
  layout?: "grid" | "list";
  disabled?: boolean;
}

export default function MenuButtonGroup({
  items,
  onSelect,
  layout = "grid",
  disabled = false,
}: MenuButtonGroupProps) {
  const layoutClass =
    layout === "grid"
      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
      : "flex flex-col gap-2";

  return (
    <div className={`w-full ${layoutClass}`}>
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          disabled={disabled}
          className={`
            group relative flex items-center justify-center gap-3
            px-6 py-4 rounded-lg border-2
            transition-all duration-200
            ${
              disabled
                ? "opacity-50 cursor-not-allowed border-gray-300 bg-gray-100"
                : "border-blue-200 bg-white hover:border-blue-500 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            }
          `}
        >
          {item.icon && (
            <span className="text-3xl" role="img" aria-label={item.label}>
              {item.icon}
            </span>
          )}
          <span
            className={`
            text-base font-medium text-center
            ${disabled ? "text-gray-500" : "text-gray-800 group-hover:text-blue-600"}
          `}
          >
            {item.label}
          </span>
        </button>
      ))}
    </div>
  );
}
