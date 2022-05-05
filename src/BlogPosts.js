import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {ActivityIndicator, ScrollView, Text, StyleSheet} from 'react-native';
// import {Card} from 'react-native-shadow-cards';
import {Card, Title, Button, Paragraph} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#FAF9F6',
  },
});

const BlogPosts = props => {
  const {source} = props.route.params;
  const [data, setData] = useState([]);
  const [loading, setLoad] = useState(false);

  const sourceUrls = {
    cook: 'https://simmerwp.com/wp-json/wp/v2/posts',
    // matt: 'https://ma.tt/wp-json/wp/v2/posts',
    moeving:
      'https://public-api.wordpress.com/rest/v1.1/sites/themindmusingss.wordpress.com/posts/',
    event: 'https://eventespresso.com/wp-json/wp/v2/posts',
  };

  useEffect(() => {
    setLoad(true);
    const src = source || 'cook';
    const url = sourceUrls[src];

    console.log('inside useffect of blog posts');
    axios
      .get(url)
      .then(res => {
        setLoad(false);
        console.log('inside then ', res.data);
        let temp = [];
        if (source === 'moeving') temp = [res.data.posts[0]];
        else temp = res.data;
        return setData(temp);
      })
      .catch(err => console.error(err));
  }, [source]);

  function makeList() {
    // console.log(data);
    return data.map((d, i) => {
      return (
        <Card
          style={{padding: 5, marginBottom: 30}}
          key={i}
          onPress={() =>
            props.navigation.navigate('Post', {
              postData: d,
            })
          }>
          <Card.Title title={d.id}></Card.Title>
          <Card.Content>
            <Paragraph style={{marginBottom: 20}}>
              {d.title.rendered || 'First Post - MoEVing'}
            </Paragraph>
          </Card.Content>
        </Card>
      );
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 23,
        }}>
        You're viewing blogs from {source}
      </Text>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{marginTop: 250}}
        />
      ) : (
        makeList()
      )}
    </ScrollView>
  );
};

export default BlogPosts;
