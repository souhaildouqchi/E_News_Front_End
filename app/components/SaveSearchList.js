import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SearchBar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { ReadItem, DeleteItem } from "../components/DbHelper";
import Card from "./Card";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
class SaveSearchList extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      temp: [],
      error: null,
      search: null,
      saved: [],
    };
  }
  removeItem = () => {
    DeleteItem("saved")
      .then((res) => {
        this.setState({
          saved: [],
          data: [],
          temp: [],
        });
        console.log(res);
      })
      .catch((e) => console.log(e));
  };
  componentDidMount = () => {
    this._isMounted = true;
    this.getData();
    this.readItems();
    this.unsubscribe = this.props.navigation.addListener(
      "focus",
      this.readItems
    );
  };
  componentWillUnmount() {
    this.unsubscribe();
    this._isMounted = false;
  }
  readItems = () => {
    ReadItem("saved")
      .then((res) => {
        if (res) {
          const saved = JSON.parse(res);
          this.setState({
            saved: saved,
            temp: saved,
            data: saved,
          });
        }
      })
      .catch((e) => console.warn(e));
  };
  getData = async () => {
    this.setState({ loading: true });

    try {
      this.setResult(this.state.saved);
    } catch (e) {
      this.setState({ error: "Error Loading content", loading: false });
    }
  };
  setResult = (res) => {
    this.setState({
      data: [...this.state.data, ...res],
      temp: [...this.state.temp, ...res],
      error: res.error || null,
      loading: false,
    });
  };

  renderHeader = () => {
    return (
      <View style={{}}>
        <Text
          style={{
            color: colors.shade2,
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Browse Saved Articles
        </Text>
        <SearchBar
          containerStyle={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "#353540",
            borderTopColor: "#353540",
            borderBottomColor: "#353540",
          }}
          inputContainerStyle={{ backgroundColor: colors.shade1 }}
          round
          showLoading
          placeholder="Search for articles"
          onChangeText={this.updateSearch}
          value={this.state.search}
        />
      </View>
    );
  };

  updateSearch = (search) => {
    this.setState({ search }, () => {
      if ("" == search) {
        this.setState({
          data: [...this.state.temp],
        });
        return;
      }
      this.setState({
        data: this.state.temp
          .filter(function (item) {
            return item.title.includes(search);
          })
          .map(function ({ id, title, category, img, content }) {
            return { id, title, category, img, content };
          }),
      });
    });
  };

  render() {
    return this.state.error != null ? (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>{this.state.error}</Text>
        <Button
          onPress={() => {
            console.log("nothing");
          }}
          title="Reload"
        />
      </View>
    ) : (
      <View style={{ top: 50 }}>
        <FlatList
          style={{}}
          ListHeaderComponent={this.renderHeader}
          data={this.state.data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableScale
                activeScale={0.9}
                tension={50}
                friction={7}
                useNativeDriver
                onPress={() =>
                  this.props.navigation.navigate("DetailScreen", {
                    data: item,
                  })
                }
              >
                <View style={{ left: 10, top: 20 }}>
                  <Card item={item} />
                </View>
              </TouchableScale>
            );
          }}
        />
        <View style={styles.button}>
          {this.state.saved.length > 0 && (
            <AppButton
              title="Remove Key"
              color="secondary"
              onPress={this.removeItem}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    top: 20,
    width: 300,
    height: 250,
    alignItems: "center",
    left: 40,
  },
});
export default SaveSearchList;
