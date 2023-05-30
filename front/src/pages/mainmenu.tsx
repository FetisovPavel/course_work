import React from 'react';
import {MainMenu} from "../components/MainMenu";
import {NavbarComponent} from "../components/NavBar";

export function MainMenuPage(){
    return(
        <>
            <NavbarComponent />
            <MainMenu />
        </>
    )
}