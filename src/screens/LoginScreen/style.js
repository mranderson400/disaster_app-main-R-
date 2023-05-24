import { Platform, StyleSheet } from "react-native";
import { COLORS } from "../../utils";
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.white,
      },
    formContainer: {
        paddingTop: '5%',
        marginBottom: '7%',
      },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        // backgroundColor:'#009387',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50,
    },
    footer: {
        // flex: 3,
        // backgroundColor: '#fff',
        // borderTopLeftRadius: 30,
        // borderTopRightRadius: 30,
        paddingHorizontal: 20,
        // paddingVertical: 30,
        paddingTop: '5%',
        marginBottom: '7%',
    },
    text_header:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:30,
    },
    text_footer:{
        color:'#05375a',
        fontSize:18,
    },
    action:{
        flexDirection:'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'#f2f2f2',
        paddingBottom:5,
    },
    textInput:{
        flex:1,
        marginTop:Platform.OS==='ios'? 0: -12,
        paddingLeft:10,
        color:'#05375a',
    },
    button:{
        alignItems:'center',
        marginTop:50,
        backgroundColor:'#074691',
        borderRadius:10,
    },
    signIn:{
        width:'100%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        
    },
    textSign:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff'
    },
    buttonSugnUp:{
        alignItems:'center',
        marginTop:20,
        borderWidth:1,
        borderColor:'#074691',
        backgroundColor:'#fff',
        borderRadius:10,
    },
    textSignUp:{
        fontSize:18,
        fontWeight:'bold',
        color:'#074691'
    }
})

export default styles