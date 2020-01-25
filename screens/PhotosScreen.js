import * as WebBrowser from 'expo-web-browser';
import React, {useState, useEffect} from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import { MonoText } from '../components/StyledText';

const URL = "http://www.1001.photos/api/photos";

function AppImage({ image }) {
  const screenWidth = Math.round(Dimensions.get('window').width);
  return <TouchableOpacity>
            <Image style={{width: screenWidth/3, height: screenWidth/3}} resizeMode='cover' source={{uri: image.attachment_url}} />
         </TouchableOpacity>
}

export default function PhotosScreen() {
  const [loaded, setLoaded] = useState(false);
  const [photos, setPhotos] = useState([]);
  
  // useEffect is kinda similar to componentDidMount 
  // and componentDidUpdate
  useEffect( () => {
    if(loaded) { return }
    console.log(">>>> INSIDE PHOTOS SCREEN > useEffect")
    fetch(URL).
    then( (response) => response.json()).
    then ( (json) => {
      setLoaded(true);
      setPhotos(json.photos)
      console.log(json);
    });
  })

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList 
        numColumns={3}
        data={photos}
        renderItem={({ item }) => <AppImage image={item} />}
        keyExtractor={image => String(image.id)}      
      />
    </SafeAreaView>
  );
}

PhotosScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
