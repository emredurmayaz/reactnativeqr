import React, { Component } from "react";
import { View, Text, Alert } from "react-native";
import Button from "../components/Button";
import Loading from "../components/Loading";

class Record extends Component {
  state = {
    getData: [],
    getDrug: [],
    qrData: {},
    arr: [],
    name: "",
    date: "",
    spinnerState: false
  };

  async componentDidMount() {
    this.setState({ spinnerState: true });
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.error
    ) {
      alert("Qr code uyumlu değildir.");
      return;
    }

    const qrData =
      this.props.navigation.state.params &&
      this.props.navigation.state.params.data
        ? this.props.navigation.state.params.data
        : null;
    this.setState({ qrData });

    const a = qrData.split('"');

    const name = a[1];
    const date = a[3];
    this.setState({ name, date, spinnerState: false });
  }
  async _handlePress() {
    this.setState({ spinnerState: true });
    var body = {
      name: this.state.name && this.state.name,
      expiredDate: this.state.date && this.state.date
    };
    const veri = await fetch("http://192.168.1.45:3042/api/Drug/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).catch(err => alert(err));

    if (veri.status === 200) {
      this.setState({ spinnerState: false }, () => {
        Alert.alert("Başarılı", "Veri Gönderilmiştir", [
          {
            text: "OK",
            onPress: () => this.props.navigation.navigate("MadicatesScreen")
          }
        ]);
      });
    }
    this.setState({ spinnerState: false });
  }

  render() {
    return (
      <View>
        <View style={{ borderBottomWidth: 1, borderBottomColor: "grey" }}>
          <Text style={{ margin: 20 }}> {this.state.name}</Text>
          <Text style={{ margin: 20 }}> {this.state.date}</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Button
            color="blue"
            onPress={() => this._handlePress()}
            title="KAYDET"
          />
        </View>
        <Loading opaticyState={this.state.spinnerState} />
      </View>
    );
  }
}

export default Record;
