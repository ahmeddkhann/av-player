// App.js
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio, Video } from 'expo-av';
import { MaterialIcons } from '@expo/vector-icons';

const App = () => {
  // Audio and Video Lists
  const audios = [
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  ];

  const videos = [
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    'https://sample-videos.com/video123/mp4/480/asdasdas.mp4',
  ];

  const audioPlayer = useRef(new Audio.Sound());
  const videoRef = useRef(null);

  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioPosition, setAudioPosition] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    const playNextAudio = async () => {
      audioPlayer.current.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          nextAudio();
          playAudio();
        } else if (status.isLoaded) {
          setAudioPosition(status.positionMillis);
          setAudioDuration(status.durationMillis);
        }
      });
    };
    playNextAudio();
  }, [currentAudioIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          nextVideo();
        }
      });
    }
  }, [currentVideoIndex]);

  // Audio Controls
  const playAudio = async () => {
    try {
      await audioPlayer.current.unloadAsync();
      await audioPlayer.current.loadAsync({ uri: audios[currentAudioIndex] });
      await audioPlayer.current.playAsync();
      setIsAudioPlaying(true);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const stopAudio = async () => {
    try {
      await audioPlayer.current.stopAsync();
      setIsAudioPlaying(false);
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  };

  const nextAudio = () => {
    setCurrentAudioIndex((prevIndex) => (prevIndex + 1) % audios.length);
  };

  const prevAudio = () => {
    setCurrentAudioIndex((prevIndex) => (prevIndex - 1 + audios.length) % audios.length);
  };

  const seekAudio = async (value) => {
    try {
      await audioPlayer.current.setPositionAsync(value);
      setAudioPosition(value);
    } catch (error) {
      console.error('Error seeking audio:', error);
    }
  };

  // Video Controls
  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Audio Player</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={audioDuration}
        value={audioPosition}
        onSlidingComplete={seekAudio}
      />
      <View style={styles.timeContainer}>
        <Text>
          {`${Math.floor(audioPosition / 60000)}.${Math.floor((audioPosition % 60000) / 1000)}s`}
        </Text>
        <Text>
          {`${Math.floor(audioDuration / 60000)}.${Math.floor((audioDuration % 60000) / 1000)}s`}
        </Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={prevAudio}>
          <MaterialIcons name="skip-previous" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={isAudioPlaying ? stopAudio : playAudio}>
          <MaterialIcons name={isAudioPlaying ? "pause" : "play-arrow"} size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={nextAudio}>
          <MaterialIcons name="skip-next" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Video Player</Text>
      <Video
        ref={videoRef}
        source={{ uri: videos[currentVideoIndex] }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        shouldPlay
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={prevVideo}>
          <MaterialIcons name="skip-previous" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={nextVideo}>
          <MaterialIcons name="skip-next" size={40} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  slider: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
  },
});

export default App;
