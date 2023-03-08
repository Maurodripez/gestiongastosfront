import React from "react";

export function BotonNavBar(props) {
    const { nombre,clase } = props;
    return (
        <a
            href="#"
            className={clase}
        >
            {nombre}
        </a>
    );
}