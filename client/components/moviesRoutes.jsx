import {Route, Routes} from "react-router-dom";
import React from "react";

export function MoviesRoutes() {
    return (
        <Routes>
            <Route path={"/"} element={<h2>Front page</h2>}/>
            <Route path={"*"} element={<h2>Not Found</h2>}/>
        </Routes>
    );
}