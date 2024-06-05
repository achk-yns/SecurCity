import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?`;

const states = [
  { name: 'Erruption', icon: 'whatshot', devices: 4, color: "#b3261e" },
  { name: 'Flood', icon: 'water', devices: 6, color: '#4161b2' },
  { name: 'Tornado', icon: 'tornado', devices: 4, color: '#7d7f82' },
  { name: 'Fire', icon: 'local-fire-department', devices: 6, color: '#f67734' },
  { name: 'Hazard', icon: 'warning', devices: 6, color: '#ffc00c' },
  { name: 'Attackers', icon: 'security', devices: 4, color: '#e151ca' },
];

export default function Dashboard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
    const intervalId = setInterval(fetchWeather, 20000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchWeather = async () => {
    try {
      const savedLocation = await AsyncStorage.getItem('currentLocation');
      if (savedLocation) {
        const { latitude, longitude } = JSON.parse(savedLocation);
        const response = await axios.get(`${WEATHER_API_URL}lat=${latitude}&lon=${longitude}&appid=a7a5e76f081927c3f4f5febc192e9ce3`);
        setWeather(response.data);
      } else {
        setError('Location data not found. Please enable location services.');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Error fetching weather data. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/soleil.jpeg')}
        style={styles.header}
        resizeMode="cover">
        <Text style={styles.headerText}>Dashboard</Text>
        {weather && (
          <View style={styles.weatherContainer}>
            <Text style={styles.weatherLocation}>{weather.name}</Text>
            <Text style={styles.weatherTemp}>{`${(weather.main.temp - 273.15).toFixed(1)}°`}</Text>
            <Text style={styles.weatherDescription}>{weather.weather[0].description}</Text>
            <Text style={styles.weatherRange}>{`H:${(weather.main.temp_max - 273.15).toFixed(1)}° L:${(weather.main.temp_min - 273.15).toFixed(1)}°`}</Text>
          </View>
        )}
      </ImageBackground>
      <ScrollView contentContainerStyle={styles.statesContainer}>
        {states.map((state, index) => (
          <TouchableOpacity key={index} style={[styles.stateCard]}>
            <View style={styles.stateInfo}>
              <MaterialIcons name={state.icon} size={40} style={[ { color: state.color }]}/>
              <Text style={styles.stateName}>{state.name}</Text>
            </View>
            <Text style={[styles.deviceCount, { color: state.color }]}>{state.devices}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 300, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop:35,
  },
  weatherContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    
  },
  weatherLocation: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  weatherTemp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  weatherDescription: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  weatherRange: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
  },
  statesContainer: {
    paddingVertical: 20,
  },
  stateCard: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    elevation: 2,
    borderWidth: 1, 
    borderColor: '#ccc',  
  },
  stateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stateName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  deviceCount: {
    fontSize: 35,
    color: '#666',
  },
});
