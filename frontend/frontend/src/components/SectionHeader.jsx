import React from "react";

export default function SectionHeader({ title, subtitle, align = "center", white = false }) {
  return (
    <div className={`section-header text-${align}`} data-aos="fade-up">
      <h1 className={`section-title fw-bold display-4${white ? " text-white" : ""}`}>{title}</h1>
      {subtitle && (
        <p className={`section-subtitle fw-bold${white ? " text-white" : " text-dark"}`}>{subtitle}</p>
      )}
    </div>
  );
}
