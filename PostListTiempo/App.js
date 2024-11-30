import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, FlatList, Text, View, ActivityIndicator, Image} from 'react-native';


import postData from './data.json';

export default function App() {
  const [postlist, setPostlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [limit, setLimit] = useState(5);
  
  const getImageSource = (imagePath) => {
    switch(imagePath) {
      case './assets/facebook.png':
        return require('./assets/facebook.png');
      case './assets/tiktok.png':
        return require('./assets/tiktok.png');
      case './assets/ig.png':
        return require('./assets/ig.png');
      case './assets/shopee.png':
        return require('./assets/shopee.png');
      case './assets/lazada.png':
        return require('./assets/lazada.png');
      case './assets/iphone.png':
        return require('./assets/iphone.png');
      case './assets/github.png':
        return require('./assets/github.png');
      case './assets/youtube.png':
        return require('./assets/youtube.png');
      case './assets/paymaya.png':
        return require('./assets/paymaya.png');
      case './assets/vscode.png':
        return require('./assets/vscode.png');
      default:
        return require('./assets/snack-icon.png');
    }
  };

  const fetchData = () => {
    setPostlist(postData.slice(0, limit)); 
    setIsLoading(false);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setLimit(prevLimit => prevLimit + 10 );
    setRefreshing(false);
  }
  

  useEffect(() => {
    fetchData(); 
  }, [limit]); 

  if (isLoading){
    return(
      <SafeAreaView style={styles.loadingCon}>
        <ActivityIndicator size="large" color="#0000ff"/>
        <Text>Loading.....</Text>
      </SafeAreaView>
    )
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={postlist}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Image source={getImageSource(item.image)} 
                       style={styles.logo}
                       resizeMode="cover"
                       />
                <Text style={styles.titletxt}>{item.title}</Text>
                <Text style={styles.deftxt}>{item.definition}</Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                height: 16,
              }}
            />
          )}
          ListEmptyComponent={<Text>No Posts Found</Text>}
          ListHeaderComponent={<Text style={styles.headerText}>Post List</Text>}
          ListFooterComponent={<Text style={styles.footerText}>End of list</Text>}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
    paddingTop: StatusBar.currentHeight,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 35,
  },
  card: {
    backgroundColor: 'white',
    alignItems: "center",
    borderWidth: 3,
    padding: 50,
    borderRadius: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "500",
    marginBottom: 20,
    marginTop: 20,
  },
  footerText: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  titletxt: {
    fontSize: 25,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    height: 100,
    width: 100,
  },
  deftxt: {
    fontSize: 20,
    textAlign: "center",
  },
  loadingCon: {
    flex: 1,
    backgroundColor: "#F5F5E5",
    paddingTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  }
})