import React from "react";
import {
  View,
  Alert,
  FlatList,
  Dimensions,
  StyleSheet,
  Text
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Button from "../components/Button";
import Loading from "../components/Loading";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class MadicatesScreen extends React.Component {
  static navigationOptions = {
    title: "İlaçlar"
  };

  state = {
    drugs: [],
    getDrug: [],
    qrData: {},
    spinnerState: false
  };

  async componentDidMount() {
    this.setState({ spinnerState: true });
    const data = await fetch("http://192.168.1.45:3042/api/Drug/get", {
      method: "GET"
    });
    const drugs = await data.json();
    await this.setState({ getDrug: drugs, spinnerState: false });
  }

  async _deleteProduct(id) {
    this.setState({ spinnerState: true });
    const body = { id: id };
    const res = await fetch("http://192.168.1.45:3042/api/Drug/delete", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).catch(err => alert(err), this.setState({ spinnerState: false }));

    if (res.status === 200) {
      Alert.alert("Ürün başarıyla silinmiştir!");
      await this.componentDidMount();
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 5 }}>
        <NavigationEvents onWillFocus={payload => this.componentDidMount()} />
        <FlatList
          keyExtractor={(x, i) => i.toString()}
          data={this.state.getDrug}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.container}>
              <View>
                <Text style={{ color: "black", margin: 15, fontSize: 15 }}>
                  {item && item.name}
                </Text>
                <Text style={{ color: "black", margin: 15, fontSize: 15 }}>
                  {item && item.expiredDate}
                </Text>
              </View>
              <Button
                color="red"
                onPress={() => this._deleteProduct(item.id)}
                title="SİL"
              />
            </View>
          )}
        />
        <Loading opaticyState={this.state.spinnerState} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 6,
    width: deviceWidth - 10,
    height: deviceHeight / 6,
    borderWidth: 0.6,
    borderColor: "red",
    borderRadius: 5,
    justifyContent: "space-between",
    alignItems: "center"
  }
});
