import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';

export default function PostScreen(props) {
  const navigation = props.navigation;
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  let camera;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={ ref => (camera=ref)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.cameraText}> Flip </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{
              flex: 0.4,
              alignSelf: 'flex-end',
              alignItems: 'flex-end',
            }} onPress={ () => {
              camera.takePictureAsync().then( ({uri}) => {
                console.log(uri)
                // navigate to the Submit screen
                navigation.navigate('Submit', { uri })
              })
            } } >
            <Text style={styles.cameraText}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

PostScreen.navigationOptions = {
  title: 'Post a Photo',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  cameraText: { 
    fontSize: 18, 
    marginBottom: 10, 
    color: 'white' 
  }
});
