import React from 'react';
import {Catalog} from "../components/Catalog";
import {NavbarComponent} from "../components/NavBar";

export function CatalogPage(){
    return(
        <>
            <NavbarComponent />
            <Catalog />
        </>
    )
}