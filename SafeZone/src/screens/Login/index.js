import * as React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { FontSize, Color, Border, FontFamily, Padding } from "../../../GlobalStyles";
import { useDispatch } from "react-redux";
import { login } from "../../../auth/authSlice";

const Login = ({navigation}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const handleLogin = () => {
    if(email && password){
      dispatch(login({email,password}));
    }else{
        console.log("Fields are empty..");
    }
  };

  const handleSignup = () => {
    
    navigation.navigate('Auth', { screen: 'Register' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          contentFit="cover"
          source={require("../../../assets/union.png")}
        />
      </View>
      <Text style={styles.signIn}>Sign In</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.inputField}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            style={styles.inputField}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleLogin}>
          <Text style={styles.logInButtonText}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.signUpLink}>Don’t have an account?</Text>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.signUpLinkText}>Sign up</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    marginTop: 100,
  },
  image: {
    width: 100,
    height: 100,
  },
  signIn: {
    fontSize: FontSize.size_13xl,
    fontFamily: FontFamily.balooThambiMedium,
    color: Color.labelColorLightPrimary,
    marginTop: 20, // Adjust as needed
  },
  formContainer: {
    marginTop: 30, // Adjust as needed
    width: "80%", // Adjust as needed
  },
  inputContainer: {
    marginBottom: 10, // Adjust as needed
  },
  inputLabel: {
    fontSize: FontSize.bodySmall400_size,
    fontFamily: FontFamily.bodySmall400,
    color: Color.gray600,
    marginBottom: 5, // Adjust as needed
  },
  inputField: {
    borderWidth: 1,
    borderColor: Color.gray600,
    borderRadius: Border.br_3xs,
    padding: 10,
  },
  logInButton: {
    backgroundColor: Color.colorMediumaquamarine,
    paddingVertical: 10,
    borderRadius: Border.br_sm,
    marginTop: 20, // Adjust as needed
  },
  logInButtonText: {
    color: Color.colorWhite,
    fontSize: FontSize.calloutBold_size,
    fontFamily: FontFamily.almaraiExtraBold,
    textAlign: "center",
  },
  signUpLink: {
    textAlign: "center",
    marginTop: 10, // Adjust as needed
  },
  signUpLinkText: {
    textAlign: "center",
    color: Color.colorLimegreen,
  },
});

export default Login;
