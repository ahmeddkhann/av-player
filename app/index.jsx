import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useRef} from 'react'

const App = () => {
  const audios = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  ]
  const videos = [
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://sample-videos.com/video123/mp4/480/asdasdas.mp4',
  ]
  
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})