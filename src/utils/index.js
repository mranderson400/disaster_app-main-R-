import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    primary: "#49c074",
    secondary:'#074691',
    lightGreen:'#b8ebc9',
    greenBG:'#ecfbf1',
    white: '#FFFFFF',
    black: "#000000",
    background:'#f8fffa',
    text: 'rgba(24,0,75,1)',






    transparentPrimary: 'rgba(227, 120, 75, 0.4)',
    orange: "#FFA133",
    lightOrange: "#FFA133",
    lightOrange2: "#FDDED4",
    lightOrange3: '#FFD9AD',
    green: "#27AE60",
    red: "#FF1717",
    blue: '#0064C0',
    darkBlue: "#111A2C",
    darkGray: "#525C67",
    darkGray2: "#757D85",
    gray: "#898B9A",
    gray2: "#BBBDC1",
    gray3: '#CFD0D7',
    lightGray1: "#DDDDDD",
    lightGray2: "#F5F5F8",
    white2: "#FBFBFB",
    

    transparent: 'transparent',
    transparentBlack1: "rgba(0, 0, 0, 0.1)",
    transparentBlack7: "rgba(0, 0, 0, 0.7)"

};


export const SIZES={
width,
height

}

export const FONTS={
    bold:'Montserrat-Bold',
    semiBold:'Montserrat-SemiBold',
    medium:'Montserrat-Medium',
    regular:'Montserrat-Regular'


}


export const AppConfig={
  google_api_key: 'AIzaSyDwei6hXch0g9p4PXIJx5x1hViccXZaI_8',

}
export default {COLORS, SIZES, FONTS, AppConfig}


// "#FF6C44", //orange