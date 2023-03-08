import React from "react";
import { LiNavBar } from "./List";
import { SvgRound } from "./Svg";
import { BotonNavBar } from "./ComponenteA";
import { useState } from "react";
import { InputBuscar } from "./Inputs";

export function NavBar() {
    const [navbar, setNavbar] = useState(false);
    return (
        <nav className="w-full bg-gray-800 shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <BotonNavBar nombre="ChanchiGastos" clase="text-2xl font-bold text-white" />
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <SvgRound
                                        classProp="w-6 h-6"
                                        fillProp="none"
                                        viewBoxProp="0 0 24 24"
                                        dProp="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <div className="flex items-center">

                                <SvgRound
                                    classProp="peer w-10 rounded-l-lg border px-2 text-sm h-8 bg-white"
                                    fillProp="none"
                                    viewBoxProp="0 0 24 24"
                                    dProp="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                                <InputBuscar 
                                classProp="peer w-full rounded-r-lg border px-2 text-sm text-black transition-colors duration-300 focus:outline-none h-8" 
                                placeholderProp="Buscar" 
                                />
                            </div>

                            <LiNavBar nombre="Inicio" tamanioLetra="base" />
                            <LiNavBar nombre="Usuarios" tamanioLetra="base" />
                            <LiNavBar nombre="Categorias" tamanioLetra="base" />
                            <LiNavBar nombre="Gastos" tamanioLetra="base" />
                            <LiNavBar nombre="Ingresos" tamanioLetra="base" />
                            <LiNavBar nombre="Estrategias" tamanioLetra="base" />
                        </ul>
                        <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                            <BotonNavBar nombre="Ingresar" clase="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800" />
                            <BotonNavBar nombre="Salir   " clase="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100" />
                        </div>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                    <BotonNavBar nombre="Ingresar" clase="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800" />
                    <BotonNavBar nombre="Salir" clase="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100" />
                </div>
            </div>
        </nav>
    );
}
