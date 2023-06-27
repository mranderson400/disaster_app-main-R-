import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  PermissionsAndroid,
  Platform
} from 'react-native';
import { Button } from 'react-native-elements';
import Permissions, {PERMISSIONS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

const Home = props => {

  const [data, setData] = useState([{}]);
  const [total, setTotal] = useState([{}]);

  const requestLocationPermission = async () => {
    if (Platform.OS === "ios") {
      let permissionStatus = await Permissions.check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log(permissionStatus);
      if (permissionStatus === 'denied' || permissionStatus === 'restricted') {
        permissionStatus = await Permissions.request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        console.log(permissionStatus);
        if(permissionStatus === 'granted'){
            fetchLocation();
        }
      }
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Access Required",
          message: "This App needs to Access your location",
          buttonPositive: "OK"
        }
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Location permission not granted!");
      } else {
        fetchLocation();
      }
    }
  };

  const fetchLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, [props.navigation]);

  const fetchData = async () => {
    startLocationUpdates();
    try {
      const users = await Auth.getAccount();
      const response = await fetch(
        API_WEB_URLS.BASE + 'Masters/0/token/AgentLast5Tran/Id/' + users[0].Id,
      );
      const data = await response.json();
      setData(data.data.dataList);
    } catch (error) {
      console.error(error);
    }
  };

  // useFocusEffect(() => {
  //   fetchData();
  //   fetchDataTotal();
  //   return () => {};
  // });

  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={{marginTop: 5}}>
          <Button style={{height:50, width:100}} name="Get"/>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Home;
