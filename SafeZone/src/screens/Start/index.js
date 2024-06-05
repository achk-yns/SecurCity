import * as React from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Color, FontFamily, Border, FontSize } from "../../../GlobalStyles";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get('window');

const images = [
    require("../../../assets/navigationpana-1.png"),
    require("../../../assets/superheroamico-1.png")
];

const Start = ({navigation}) => {
  const handleLogin = () => {
    navigation.navigate('Auth', { screen: 'Login' }); 
  };

  const handleSignup = () => {
    navigation.navigate('Auth', { screen: 'Danger' }); 

  };
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image
          style={styles.image}
          contentFit="cover"
          source={require("../../../assets/union.png")}
        />
        <Text style={styles.securcity}>SecurCity</Text>
      </View>
      
      <Carousel
        loop
        width={width}
        height={width}
        autoPlay={true}
        data={images.map((image, index) => ({ key: index.toString(), image }))}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={item.image}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </View>
        )}
      />
      
      <Text style={[styles.trackAndLocate, styles.trackAndLocateTypo]}>
        Track and locate the danger in your area and be the hero of your city!
      </Text>
      
      <TouchableOpacity style={styles.frameInner} onPress={handleSignup}>
        <Text style={styles.getStarted}>Get started</Text>
      </TouchableOpacity>
      
      <Text style={styles.alreadyHaveAn}>Already have an account?</Text>
      
      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.logIn}>Log in</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 30,
  },
  titleContainer: {
    marginTop: 70,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 76,
    height: 76,
  },
  trackAndLocateTypo: {
    fontFamily: FontFamily.almaraiBold,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 21,
    letterSpacing: 0,
  },
  securcity: {
    fontSize: FontSize.size_13xl,
    fontFamily: FontFamily.balooThambiMedium,
    color: Color.labelColorLightPrimary,
    marginLeft: 10,
  },
  trackAndLocate: {
    margin: 60,
    color: Color.labelColorLightPrimary,
    fontSize: FontSize.calloutBold_size,
  },
  frameInner: {
    backgroundColor: Color.colorMediumaquamarine,
    paddingVertical: 10,
    borderRadius: Border.br_sm,
    marginTop: 20,
    width: "95%",
  },
  getStarted: {
    fontSize: FontSize.calloutBold_size,
    fontFamily: FontFamily.almaraiExtraBold,
    textAlign: "center",
  },
  alreadyHaveAn: {
    color: Color.colorDimgray,
    marginTop: 10,
  },
  logIn: {
    color: Color.colorLimegreen,
    marginTop: 5,
  },
  unionIcon: {
    width: 64,
    height: 64,
  },
});

export default Start;
