import React from "react";

export function LiNavBar(props) {
  const { nombre, tamanioLetra } = props;
  return (
    <li className={`text-white text-${tamanioLetra} hover:text-indigo-200`}>
      <a href="#">{nombre}</a>
    </li>
  );
}
