import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Polygon, Polyline, mapKit } from 'react-native-maps';
import * as Location from 'expo-location';

import fetch from 'node-fetch';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import pointInPolygon from 'point-in-polygon';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

const LATITUDE = 31.63416;
const LONGITUDE = -7.99994;
const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = 0.1;

let id = 0;

const GoogleMapsScreen = () => {

  const [region, setRegion] = useState({
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const zoneColors = {
    erruption: "rgba(179, 38, 30, 0.5)",
    flood: "rgba(65, 97, 178, 0.5)",
    fire: "rgba(246, 119, 52, 0.5)",
    hazard: "rgba(255, 192, 12, 0.5)",
    attackers: "rgba(225, 81, 202, 0.5)",
    tornado: "rgba(125, 127, 130, 0.5)"
  };
  
  const [TypeZones,setTypeZones] = useState([])
  const [ZonesIds,setZonesIds] = useState([])
  const [markers, setMarkers] = useState([]);
  const [polylineCoords, setPolylineCoords] = useState([]);
  const [polygonCoords, setPolygonCoords] = useState([]);
  const [heading, setHeading] = useState(0);
  const [alertShown, setAlertShown] = useState(false);
  const [selectedValue , setSelectedValue] = useState("");
  const user = useSelector((state) => state.auth.user);
  const fetchZones = async () => {
    try {
      const response = await fetch("http://192.168.0.169:3000/api/Allzones");
      if (response.ok) {
        const data = await response.json();
        setPolygonCoords(data);
      } else {
        console.error('Failed to fetch zones from database');
      }
    } catch (error) {
      console.error('Error fetching zones:', error);
    }
  };

  useEffect(() => {
    fetchZones();
    
    const intervalId = setInterval(fetchZones, 20000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          await AsyncStorage.setItem('locationPermission', 'granted');
          subscribeToHeading();
          getCurrentLocation();
        } else {
          Alert.alert(
            'Permission Denied',
            'Please grant permission to access your location in order to use this feature.',
            [{ text: 'OK', onPress: () => Location.openSettings() }]
          );
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    };

    requestPermissions();
  }, []);

  const getZonesTypes = async ()=>{
    const response = await fetch("http://192.168.0.169:3000/api/zones/types");
        if (response.ok) {
          const data = await response.json();
          console.log("TYpe Zoness : " , data)
          setTypeZones(data);
        } else {
          console.error('Failed to fetch zones from database');
      }
  }
  const getZonesIds = async ()=>{
    const response = await fetch("http://192.168.0.169:3000/api/zones/ids");
        if (response.ok) {
          const data = await response.json();
          setZonesIds(data)
        } else {
          console.error('Failed to fetch zones from database');
      }
  }

  useEffect(()=>{
    getZonesTypes();
    getZonesIds()
    const intervalId = setInterval(getZonesTypes, 20000);
    const intervalId2 = setInterval(getZonesIds, 20000);
    return () => clearInterval(intervalId ,intervalId2);
  },[])

  useEffect(() => {
    if (region.latitude && region.longitude && !alertShown) {
      checkIfInsideZone(region.latitude, region.longitude);
    }
  }, [region, polygonCoords]);

  const getCurrentLocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        ...region,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      await AsyncStorage.setItem('currentLocation', JSON.stringify(locationData));

    } catch (error) {
      console.error('Error fetching current location:', error);
    }
  };

  const subscribeToHeading = async () => {
    try {
      await Location.watchHeadingAsync((newHeading) => {
        setHeading(newHeading.trueHeading || 0);
      });
    } catch (error) {
      console.error('Error subscribing to heading:', error);
    }
  };

  const checkIfInsideZone = (latitude, longitude) => {
    const point = [longitude, latitude];
    for (const polygon of polygonCoords) {
      const polygonPoints = polygon.map(coord => [coord.longitude, coord.latitude]);
      if (pointInPolygon(point, polygonPoints)) {
        Alert.alert('Zone Alert', 'You are inside a defined zone.');
        setAlertShown(true)
        break;
      }
    }
  };
  const checkIfMarkerInsideZone = (latitude, longitude) => {
    const point = [longitude, latitude];
    for (const polygon of polygonCoords) {
      const polygonPoints = polygon.map(coord => [coord.longitude, coord.latitude]);
      if (pointInPolygon(point, polygonPoints)) {
        console.log(polygonPoints);
        if(user.isEtat == false){
          Alert.alert('Zone Alert', 'You are inside a defined zone.');
        }
        setAlertShown(true);
        return true;
      }
    }
    return false;
  };
  

  const onMarkerDragEnd = (e, markerKey) => {
    const newCoordinate = e.nativeEvent.coordinate;
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        marker.key === markerKey
          ? { ...marker, coordinate: newCoordinate }
          : marker
      )
    );
    setPolylineCoords((prevCoords) =>
      prevCoords.map((coord, index) =>
        markers[index]?.key === markerKey ? newCoordinate : coord
      )
    );
  };

  const deleteLastMarker = () => {
    setMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.pop();
      return newMarkers;
    });
    setPolylineCoords((prevCoords) => {
      const newCoords = [...prevCoords];
      newCoords.pop();
      return newCoords;
    });
  };

  const deleteZone = async (zoneId)=>{
    if(user.isEtat){

      Alert.alert(
        "Delete Zone",
        "Are you sure you want to Save this Zone",
        [
          {
            text: "No", onPress: () => {
            console.log("Delete No");
            }
          },
          {
            text:"Yes",onPress:async()=>{
              const response = await fetch(`http://192.168.0.169:3000/api/zones/${zoneId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
                });
  
                if (response.ok) {
                  const data = await response.json();
                  console.log("Suppression", data);
                  fetchZones();
                } else {
                  console.error('Failed to save data to database');
                }
            }
          },{ defaultIndex: 1 }
        ]
      )
    }
  }
  

  const saveCoordAndZone = async () => {
    Alert.alert(
      "Save Zone",
      "Are you sure you want to Save this Zone",
      [
        {
          text: "No", onPress: () => {
            setMarkers([]);
            setPolylineCoords([]);
          }
        },
        {
          text: "Yes", onPress: async () => {
            if(selectedValue){
              if (markers.length > 2) {
                const markerData = markers.map((marker, index) => ({
                  longitude: marker.coordinate.longitude,
                  latitude: marker.coordinate.latitude,
                  order: index,
                }));
  
                console.log(selectedValue);
  
                const closedPolylineCoords = [...polylineCoords, polylineCoords[0]];
                setPolylineCoords(closedPolylineCoords);
  
                try {
                  console.log({ coordinates: markerData });
                  const response = await fetch("http://192.168.0.169:3000/api/zones", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ coordinates: markerData , typeZone:selectedValue }),
                  });
  
                  if (response.ok) {
                    const data = await response.json();
                    console.log("SaveDATA " , data);
                    getZonesTypes();
                    setMarkers([]);
                    setPolylineCoords([]);
                    setPolygonCoords((prevCoords) => [...prevCoords, markerData]);
                    console.log("asdancakc", polylineCoords);
                  } else {
                    console.error('Failed to save data to database');
                  }} catch (error) {
                    console.error('Error saving data to database:', error);
                  }
           
            } else {
              Alert.alert('No markers to save.');
            }
          }else{
            Alert.alert("Choose a Type of zone ")
          } 
          }
        },
        { defaultIndex: 1 }
      ]
    );
  };

  const onMapPress = (e) => {
    setPolylineCoords([]);
    const newMarker = {
      coordinate: e.nativeEvent.coordinate,
      key: id++,
    };
    if(checkIfMarkerInsideZone(newMarker.coordinate.latitude,newMarker.coordinate.longitude)){deleteLastMarker();}
    else {
    setMarkers([...markers, newMarker]);
    setPolylineCoords([...polylineCoords, e.nativeEvent.coordinate]);}
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider={mapKit}
        initialRegion={region}
        onPress={onMapPress}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.key}
            coordinate={marker.coordinate}
            pinColor='red'
            draggable
            onDragEnd={(e) => onMarkerDragEnd(e, marker.key)}
          />
        ))}

        <Polyline coordinates={polylineCoords} strokeColor="#FF0000" strokeWidth={2} />

        {polygonCoords.map((coordinates, index) => (
          
          <Polygon
            coordinates={coordinates}
            key={index}
            fillColor ={zoneColors[TypeZones[index]]|| "rgba(255, 255, 255, 0)"}
            strokeColor="rgba(0,0,0,0.5)"
            strokeWidth={2}
            onPress={()=> deleteZone(ZonesIds[index])}
          />
        ))}

        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          anchor={{ x: 0.5, y: 0.5 }}
          zIndex={999}
        >
          <Icon name="location-arrow" size={30} color="rgba(0, 0, 255, 0.7)" />
        </Marker>
      </MapView>
     { markers.length !==0 && <Picker
      selectedValue={selectedValue}
      onValueChange={(itemValue) => {console.log(itemValue); setSelectedValue(itemValue)}}
    >
  <Picker.Item label="" value="" />
  <Picker.Item label="Erruption" value="erruption" />
  <Picker.Item label="Flood" value="flood" />
  <Picker.Item label="Fire" value="fire" />
  <Picker.Item label="Hazard" value="hazard" />
  <Picker.Item label="Attackers" value="attackers" />
  <Picker.Item label="Tornado" value="tornado" /> 
</Picker>
}
      <View style={styles.buttonContainer}>
        <Button title="Delete Last Marker" onPress={deleteLastMarker} style={styles.button} />
        <Button title="Save" onPress={saveCoordAndZone} style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  button: {
    fontSize: 20,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default GoogleMapsScreen
