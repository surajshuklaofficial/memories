import React from "react";
import { memories } from "../../assets";

const Navbar = () => {
    return (
        <nav className="sm:px-32 px-2 py-4 ">
            <div className="flex justify-center border shadow-xl py-4 rounded-lg bg-white">
                <h1 className="text text-6xl text-[#00b7ff]">Memories</h1>
                <img className="w-16 h-16" src={memories} alt="memories"/>
            </div>
        </nav>
    )
};

export default Navbar;