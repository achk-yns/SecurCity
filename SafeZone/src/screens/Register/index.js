import * as React from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Linking } from "react-native";
import { Image } from "expo-image";
import { FontSize, Color, Border, FontFamily } from "../../../GlobalStyles";
import Checkbox from "expo-checkbox";

const Register = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);

  const handleLogin = () => {
    navigation.navigate('Auth', { screen: 'Login' });
  };

  const handleSignup = async() => {
    if (isChecked) {

      const response = await fetch("http://192.168.0.169:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name , email, password }),

    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }

    const user = await response.json();
    navigation.navigate('Auth', { screen: 'Login' });
    } else {
      alert("You must agree to the terms and conditions to register.");
    }
  };

  const openTermsOfService = () => {
    Linking.openURL('https://www.termsfeed.com/live/672f89c1-7dd9-4cbc-b91f-c768cafb5849');
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
      <Text style={styles.signIn}>Sign Up</Text>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.inputField}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            autoCapitalize="none"
          />
        </View>
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
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxText}>
            I agree to the{" "}
              <Text style={styles.linkText} onPress={openTermsOfService}>Terms of Service</Text>
            {" "}and{" "}
              <Text style={styles.linkText} onPress={openTermsOfService}>Privacy Policy</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.logInButton} onPress={handleSignup}>
          <Text style={styles.logInButtonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.signUpLink}>Already have an account?</Text>
        <TouchableOpacity onPress={handleLogin}>
          <Text style={styles.signUpLinkText}>Sign in</Text>
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
    marginTop: 20,
  },
  formContainer: {
    marginTop: 30,
    width: "80%",
  },
  inputContainer: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: FontSize.bodySmall400_size,
    fontFamily: FontFamily.bodySmall400,
    color: Color.gray600,
    marginBottom: 5,
  },
  inputField: {
    borderWidth: 1,
    borderColor: Color.gray600,
    borderRadius: Border.br_3xs,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: FontSize.bodySmall400_size,
    fontFamily: FontFamily.bodySmall400,
    color: Color.gray600,
  },
  linkText: {
    color: Color.colorMediumslateblue,
    textDecorationLine: 'underline',
  },
  logInButton: {
    backgroundColor: Color.colorMediumaquamarine,
    paddingVertical: 10,
    borderRadius: Border.br_sm,
    marginTop: 20,
  },
  logInButtonText: {
    color: Color.colorWhite,
    fontSize: FontSize.calloutBold_size,
    fontFamily: FontFamily.almaraiExtraBold,
    textAlign: "center",
  },
  signUpLink: {
    textAlign: "center",
    marginTop: 10,
  },
  signUpLinkText: {
    textAlign: "center",
    color: Color.colorLimegreen,
  },
});

export default Register;
