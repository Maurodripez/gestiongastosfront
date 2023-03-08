import React from "react";

export function SvgRound(props) {
  const { classProp, viewBoxProp, fillProp, dProp } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classProp}
      fill={fillProp}
      viewBox={viewBoxProp}
      stroke="black"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d={dProp}
      />
    </svg>
  );
}
