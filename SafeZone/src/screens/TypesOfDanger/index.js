import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Border, Color, FontFamily, FontSize } from "../../../GlobalStyles";

const TypesOfDanger = () => {
  const [selectedDanger, setSelectedDanger] = React.useState(null);

  const handleSelectDanger = (danger) => {
    setSelectedDanger(danger);
    Alert.alert('Type of Danger', 'Submitted Successfully');
  };

  const isSelected = (danger) => selectedDanger === danger;

  return (
    <View style={styles.typesOfDanger}>
      <View style={styles.header}>
        <Text style={styles.securcity}>SecurCity</Text>
        <View style={styles.search} />
      </View>
      <Text style={styles.pleaseSelectThe}>Please select the danger type :</Text>
      <View style={styles.dangerList}>
        {[
          { name: 'Erruption', color: Color.colorFirebrick },
          { name: 'Flood', color: '#4161b2' },
          { name: 'Fire', color: '#f67734' },
          { name: 'Hazard', color: '#ffc00c' },
          { name: 'Attackers', color: '#e151ca' },
          { name: 'Tornado', color: '#7d7f82' },
        ].map((danger) => (
          <TouchableOpacity
            key={danger.name}
            style={[
              styles.dangerItem,
              { backgroundColor: danger.color },
              isSelected(danger.name) && styles.selectedItem,
            ]}
            onPress={() => handleSelectDanger(danger.name)}
          >
            <Text style={styles.dangerText}>{danger.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  typesOfDanger: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  securcity: {
    fontSize: FontSize.size_13xl,
    color: Color.colorMediumaquamarine,
    fontFamily: FontFamily.balooThambiMedium,
    textAlign: 'center'
  },
  pleaseSelectThe: {
    fontSize: FontSize.size_xl,
    color: Color.colorGray_100,
    fontFamily: FontFamily.nunitoSemiBold,
    marginBottom: 20,
  },
  dangerList: {
    flex: 1,
  },
  dangerItem: {
    height: 73,
    borderRadius: Border.br_3xs,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  selectedItem: {
    borderWidth: 2,
    borderColor: Color.colorMediumaquamarine,
  },
  dangerText: {
    fontSize: FontSize.size_13xl,
    color: Color.colorWhite,
    fontFamily: FontFamily.balooThambiMedium,
  },
});

export default TypesOfDanger;
