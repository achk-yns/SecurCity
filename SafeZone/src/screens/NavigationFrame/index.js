import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontFamily, Color, FontSize } from "../../../GlobalStyles";
import GoogleMapsScreen from '../../../Pages/GoogleMapsScreen';


const NavigationFrame = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.securcity}>SecurCity</Text>
      <View style={styles.contentWrapper}>
        <GoogleMapsScreen />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  securcity: {
    fontSize: FontSize.size_13xl,
    color: Color.colorMediumaquamarine,
    fontFamily: FontFamily.balooThambiMedium,
    textAlign: 'center',
  },
});

export default NavigationFrame;
