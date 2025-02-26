import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import Voice from 'react-native-voice';

const VoiceRecognition = () => {
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [pulseAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    setStarted(true);
    startPulse();
  };

  const onSpeechEnd = e => {
    setStarted(false);
    stopPulse();
  };

  const onSpeechResults = e => {
    setResults(prev => [...prev, ...e.value]);
  };

  const onSpeechError = e => {
    setError(JSON.stringify(e.error));
  };

  const startPulse = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const stopPulse = () => {
    pulseAnim.setValue(1);
  };

  const startRecognizing = async () => {
    if (Platform.OS === 'android') {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (!hasPermission) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setError('Microphone permission denied');
          return;
        }
      }
    }
    try {
      await Voice.start('en-US');
      setError('');
    } catch (e) {
      setError(e.message);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
        renderItem={({item}) => (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{item}</Text>
          </View>
        )}
      />
      {error ? <Text style={styles.errorText}>{`Error: ${error}`}</Text> : null}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.inputContainer}>
          <Animated.View style={{transform: [{scale: pulseAnim}]}}>
            <TouchableOpacity
              onPress={started ? stopRecognizing : startRecognizing}
              style={styles.micButton}>
              <Text style={styles.micIcon}>{started ? '🎤' : '🎙️'}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  chatContainer: {
    padding: 15,
  },
  messageBubble: {
    backgroundColor: '#6200ea',
    padding: 15,
    marginVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
    maxWidth: '75%',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    marginRight: 10,
  },
  micButton: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 50,
    elevation: 5,
  },
  micIcon: {
    fontSize: 24,
    color: '#fff',
  },
  errorText: {
    color: '#e53935',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default VoiceRecognition;
