import {StyleSheet, Dimensions} from 'react-native'
const {width, height}=Dimensions.get('window')
const styles=StyleSheet.create({
    
    icons:{
        // color:'#ffbd7d'
    },
    cartIcons:{
        width:width/8
    },
    cartIcon:{
        position:'absolute',
        backgroundColor:'#346473',
        height:60,
        width:60,
        borderRadius:60,
        top:-50,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:50
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
    },
    icon:{
        color:'#fff'
    },
    circle:{
        position:'absolute',
        alignSelf:'center',
        top:-64.5
    }
})

export default styles