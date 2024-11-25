import React from "react";
import { styled } from "styled-components";

export const ThemeModeButton = ({ toggleTheme, themeMode }) => {
  return (
    <ThemeModeWrapper onClick={toggleTheme}>
      {themeMode === "lightTheme" ? "🌝" : "🌚"}
    </ThemeModeWrapper>
  );
};


export const ThemeModeWrapper = styled.button`

    position: fixed;
    bottom: 20px;
    right: 20px;

    width: 80px;
    height: 50px;
    border: none;
    border-radius: 10px;

    background-color: ${(props) => props.theme.colors.colorMain};
    box-shadow: ${(props) => props.theme.colors.colorShadow};

`;

