import {StyleSheet} from 'react-native';

const styles=StyleSheet.create({
    banner:{
        marginLeft:20,
        marginRight:10,
        paddingLeft:20,
        paddingBottom:20,
        borderRadius:10,

    },
    bannerItem:{
        flexDirection:'row',
        alignItems:'flex-end',
        marginBottom:10,
    },
    chipContainer:{
        backgroundColor:'#ff6a14',
        paddingHorizontal:20,
        paddingVertical:10,
        borderRadius:20,
    },
    chips:{
        color:'#fff',
        textTransform:'uppercase',
        fontFamily:'Montserrat-Bold',
        fontSize:12,
    },
    bannerImg:{
        height:100,
        width:100,
    },
    bannerTitle:{
        fontFamily:'Montserrat-Bold',
        fontSize:16,
        textTransform:'uppercase',
        color:'#fff',
        marginBottom:5,
    },
    bannerSubTiitle:{
        fontFamily:'Montserrat-Regular',
        fontSize:12,
        color:'#fff'
    },

})

export default styles;
