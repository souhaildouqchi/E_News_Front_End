import React, { useState, useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import Header from "../components/Header";
import ArticleList from "../components/ArticleList";
import ArticleListVer from "../components/ArticleListVer";
import Categories from "../components/Categories";
import HotTopics from "../components/HotTopics";
import { LinearGradient } from "expo-linear-gradient";
import useApi from "../hooks/useApi";
import ArticlesApi from "../api/ScrapingAPI/Articles";
import ActivityIndicator from "../components/ActivityIndicator";
function MainScreen({ navigation }) {
  const [loading, setloading] = useState(true);
  const getArticlesApi = useApi(ArticlesApi.getArticles);
  const getPostsApi = useApi(ArticlesApi.getPosts);
  useEffect(() => {
    let mounted = true;
    getArticlesApi.request().then(() => {
      if (mounted) {
        setloading(false);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    let mounted = true;
    getPostsApi.request().then(() => {
      if (mounted) {
        setloading(false);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, []);
  const [category, setCategory] = useState();

  const filterResultsByCategory = (category) => {
    return getPostsApi.data.filter((onepost) => {
      return onepost.category === category;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {/* header Date and title */}
      <LinearGradient
        colors={["#353540", "#353540", "#1E1E24"]}
        style={{ width: "100%", height: "100%" }}
      >
        <ActivityIndicator visible={getArticlesApi.loading} />
        <SafeAreaView style={{ flex: 1 }}>
          <Header headerTitle="TODAY'S ARTICLES" />
          {/* haeder Categories */}
          <Categories onCategorySelect={setCategory} />
          {/* show the data in a flatlist */}
          <ArticleList
            data={getArticlesApi.data}
            navigation={navigation}
            error={getArticlesApi.error}
            loading={getArticlesApi.loading}
          />
          {/* show the categories in a flatlist*/}
          <HotTopics
            onCategorySelect={setCategory}
            ImageWidth={100}
            ImageHeight={120}
            ImageRadius={16}
          />
          {/* show the vertical Article list */}
          <ArticleListVer
            post={filterResultsByCategory(category)}
            navigation={navigation}
            error={getPostsApi.error}
            Loading={getPostsApi.loading}
          />
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}
MainScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default MainScreen;
