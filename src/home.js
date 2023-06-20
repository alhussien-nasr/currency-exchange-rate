import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PERMISSIONS, request} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
export const Home = () => {
  const askPermissionAndroid = async () => {
    const a = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  };
  const [lonLat, setLonLat] = useState({longitude: 0, latitude: 0});
  const [location, setLocation] = useState('');

  useEffect(() => {
    Platform.OS == 'android' && askPermissionAndroid();

    Geolocation.getCurrentPosition(info => {
      const {longitude, latitude} = info.coords;
      console.log(info);
      setLonLat({longitude, latitude});
      Geolocation.requestAuthorization();
    });
  }, []);
  return (
    <View style={styles.container}>
      <Text>hello</Text>
      <TextInput
        onChangeText={e => {
          myPlace = e;
        }}
        placeholder="where are you from"
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setLocation(myPlace);
        }}>
        <Text style={{color: 'white'}}>ok</Text>
      </TouchableOpacity>
      {location ? (
        <Text> location : {location}</Text>
      ) : (
        <Text>
          your coordinate lat:{lonLat.latitude} - long:{lonLat.longitude}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderRadius: 20,
    marginVertical: 20,
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'rgb(24, 28, 105)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  container: {
    alignItems: 'center',
  },
});
