/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import BlogPosts from './src/BlogPosts';
import Post from './src/Post';
import Embed from './src/Embed';
import {Text, View} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Card, Title, Paragraph} from 'react-native-paper';

function HomeScreen({navigation}) {
  const [source, setSource] = useState('');
  return (
    <View>
      <Text
        style={{
          paddingLeft: 30,
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 50,
        }}>
        List of Blogs {source}
      </Text>

      <Card
        style={{padding: 5, margin: 5}}
        key={'Simmer'}
        onPress={() => {
          setSource('simmer');
          navigation.navigate('Simmer', {
            source: 'simmer',
          });
        }}>
        <Card.Title title={'Simmer'}></Card.Title>
        <Card.Content></Card.Content>
      </Card>

      <Card
        style={{padding: 5, margin: 5}}
        key={'moeving'}
        onPress={() => {
          setSource('moeving');
          navigation.navigate('Moeving', {
            source: 'moeving',
          });
        }}>
        <Card.Title title={'MoEving'}></Card.Title>
        <Card.Content></Card.Content>
      </Card>

      <Card
        style={{padding: 5, margin: 5}}
        key={'matt'}
        onPress={() => {
          setSource('matt');
          navigation.navigate('Matt', {
            source: 'matt',
          });
        }}>
        <Card.Title title={'Matt'}></Card.Title>
        <Card.Content></Card.Content>
      </Card>

      <Card
        style={{padding: 5, margin: 5}}
        key={'event'}
        onPress={() => {
          setSource('event');
          navigation.navigate('Event', {
            source: 'event',
          });
        }}>
        <Card.Title title={'Events'}></Card.Title>
        <Card.Content></Card.Content>
      </Card>

      <Card
        style={{
          padding: 5,
          marginBottom: 0,
          margin: 50,
          backgroundColor: '#FBF8F1',
        }}
        key={'oc'}
        onPress={() => {
          setSource('ocook');
          navigation.navigate('BlogPosts', {
            source: 'ocook',
          });
        }}>
        <Card.Title title={'Old Cooking'}></Card.Title>
        <Card.Content></Card.Content>
      </Card>

      <Card
        style={{
          padding: 5,
          marginBottom: 10,
          margin: 50,
          backgroundColor: '#F7E9D7',
        }}
        key={'om'}
        onPress={() => {
          setSource('omoeving');
          navigation.navigate('BlogPosts', {
            source: 'omoeving',
          });
        }}>
        <Card.Title title={'Old MoEVing'}></Card.Title>
        <Card.Content></Card.Content>
      </Card>

      <Card
        style={{padding: 5, marginBottom: 30, margin: 50}}
        key={'e'}
        onPress={() => {
          setSource('oevent');
          navigation.navigate('BlogPosts', {
            source: 'oevent',
          });
        }}>
        <Card.Title title={'Old Events'}></Card.Title>
        <Card.Content></Card.Content>
      </Card>
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home'}}
        />
        <Stack.Screen
          name="BlogPosts"
          component={BlogPosts}
          options={{title: 'Blog Posts'}}
        />
        <Stack.Screen name="Post" component={Post} options={{title: 'Post'}} />
        <Stack.Screen
          name="Simmer"
          component={Embed}
          options={{title: 'Simmer'}}
        />

        <Stack.Screen
          name="Moeving"
          component={Embed}
          options={{title: 'MoEVing'}}
        />

        <Stack.Screen name="Matt" component={Embed} options={{title: 'Matt'}} />

        <Stack.Screen
          name="Event"
          component={Embed}
          options={{title: 'Events'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
