import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const URL = "http://www.1001.photos/api/photos";

export default function SubmitScreen(props) {
  const [text, setText] = useState("");
  const navigation = props.navigation

  const uri = navigation.state.params.uri;

  return <View style={styles.container}>
    <Image source={{uri: uri}} style={{width: 300, height: 300}} />
    <TextInput style={styles.textInput} onChangeText={text => setText(text) }/>
    <TouchableOpacity style={styles.submitButton} 
    onPress={() => {
      const formData = new FormData();
      formData.append('photo[attachment]', {
        uri: uri,
        name: 'photo-upload',
        type: 'image/jpeg'
      });
      formData.append('photo[word_name]', text);
      // submit image to backend
      fetch(URL, {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      }).then( () => {
        navigation.pop();
        navigation.navigate('Home', { loadAgain: true })
      });
    }}>
      <Text>Submit</Text>
    </TouchableOpacity>
  </View>
}

const styles = StyleSheet.create( {
  container: { flex: 1, justifyContent: 'center', alignItems: 'center'},
  textInput: {
    height: 40,
    width: 200,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5
  },
  submitButton: {
    width: 200,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 5,
  }
})