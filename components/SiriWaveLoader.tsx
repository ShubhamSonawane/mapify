"use client";

import type { FC } from "react";

export interface SiriWaveLoaderProps {
  active?: boolean; // if false, render nothing
  className?: string; // extra classes for positioning
  lightMode?: boolean; // switch colors for light theme
}

const SiriWaveLoader: FC<SiriWaveLoaderProps> = ({
  active = false,
  className,
  lightMode,
}) => {
  if (!active) return null;

  const gradientClass = lightMode
    ? "from-indigo-500 to-indigo-400"
    : "from-indigo-400 to-sky-400";

  return (
    <div
      className={`flex items-end justify-center gap-1 opacity-80 transition-opacity duration-300 ${
        className ?? ""
      }`}
      aria-hidden="true"
    >
      {/* 4 bars with slightly different baseline heights & animations */}
      <div
        className={`w-[3px] h-4 rounded-full bg-gradient-to-t ${gradientClass} animate-wave-bounce-1`}
      />
      <div
        className={`w-[3px] h-6 rounded-full bg-gradient-to-t ${gradientClass} animate-wave-bounce-2`}
      />
      <div
        className={`w-[3px] h-8 rounded-full bg-gradient-to-t ${gradientClass} animate-wave-bounce-3`}
      />
      <div
        className={`w-[3px] h-5 rounded-full bg-gradient-to-t ${gradientClass} animate-wave-bounce-4`}
      />
    </div>
  );
};

export default SiriWaveLoader;
