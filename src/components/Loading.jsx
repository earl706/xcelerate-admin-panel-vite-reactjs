import React, { useEffect } from "react";

export default function Loading({ size, light }) {
  useEffect(() => {}, []);

  return light ? (
    <>
      <div
        className={`border-blue-700 h-${size} w-${size} border-${Math.ceil(
          size * (4 / 5)
        )} animate-spin rounded-full border-t-transparent`}
      />
    </>
  ) : (
    <>
      <div
        className={`border-white h-${size} w-${size} border-${Math.ceil(
          size * (4 / 5)
        )}  animate-spin rounded-full border-t-transparent`}
      />
    </>
  );
}
