import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useRef, useEffect} from 'react'
import { Audio, Video } from 'expo-av'

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

  const audioPlayer = useRef(new Audio.Sound())  
  const videoRef = useRef (null);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState();
  const [audioPosition, setAudioPosition] = useState();

 const playAudio = async () => {
  try {
    await audioPlayer.current.unloadAsync();
    await audioPlayer.current.loadAsync({uri: audios[currentAudioIndex]});
    await audioPlayer.current.unloadAsync();
    setIsAudioPlaying(true)
    
  } catch (error) {
    console.log("Error while playing the audio: ", error);
  }
 }

 const stopAudio = async () => {
  try {
    await audioPlayer.current.stopAsync()
    setIsAudioPlaying(false)
    
  } catch (error) {
    console.log("error while stopping the Audio: ", error);
  }
 }

const seekAudio = async (value) => {
  try {
    audioPlayer.current.setPositionAsync(value);
    setAudioPosition(value);
  } catch (error) {
    console.log("error while changing position of Audio: ", error);
  }
}

  
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})