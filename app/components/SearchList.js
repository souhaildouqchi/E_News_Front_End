import React, { Component } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { SearchBar } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import Card from "./Card";
import colors from "../config/colors";

class SearchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      temp: [],
      error: null,
      search: null,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const url = "http://192.168.1.5:5001/posts"; // change this
    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      const json = await response.json(); // check here
      this.setResult(json);
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
            fontSize: 36,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Browse Articles
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

      this.state.data = this.state.temp
        .filter(function (item) {
          return item.title.includes(search);
        })
        .map(function ({ id, title, category, img, content }) {
          return { id, title, category, img, content };
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
            this.getData();
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
      </View>
    );
  }
}

export default SearchList;
