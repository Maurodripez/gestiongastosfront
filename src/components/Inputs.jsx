import React from "react";

export function InputBuscar(props) {
    const { classProp, placeholderProp } = props;
    return (
        <input
            className={classProp}
            type="text"
            placeholder={placeholderProp}
        />
    );
}