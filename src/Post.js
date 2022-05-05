import React, {Component} from 'react';
import axios from 'axios';
import {View, Text, Dimensions, ScrollView, StyleSheet} from 'react-native';
// import {useWindowDimensions} from 'react-native';
import RenderHTML, {
  HTMLContentModel,
  HTMLElementModel,
  defaultHTMLElementModels,
  domNodeToHTMLString,
} from 'react-native-render-html';
import YoutubePlayer from 'react-native-youtube-iframe';
import {WebView} from 'react-native-webview';
import YouTube from 'react-native-youtube';

const window = Dimensions.get('window');

function videoWithAds({TDefaultRenderer, ...props}) {
  console.log('inside video with ads');
  // console.log(props);
  // console.log(TDefaultRenderer);
  // return <Text>Awesome this is the video</Text>;
  // return (
  //   <YoutubePlayer
  //     height={300}
  //     width={400}
  //     play={false}
  //     videoId={'84WIaK3bl_s'}
  //   />
  // );
  return (
    // <YouTube
    //   videoId="KVZ-P-ZI6W4" // The YouTube video ID
    //   play={true}
    //   style={{height: 300, width: 400}}
    //   onError={e => console.log('errored', e)}
    //   apiKey={'AIzaSyCfSvLlRnGGTN60ld2RjYfHcl9uOVG2NSY'}
    // />
    <WebView
      style={{marginTop: 20, width: 320, height: 230}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsFullscreenVideo={true}
      source={{uri: 'https://www.youtube.com/embed/-ZZPOXn6_9w'}}
    />
  );
}

function iframeCustom({tnode, style, key}) {
  console.log('inside iframe custom renderer');
  const videoUrl = tnode.domNode.attribs.src.split('?')[0];
  console.log(videoUrl);
  return (
    <WebView
      style={{marginTop: 20, width: 320, height: 230}}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      allowsFullscreenVideo={true}
      source={{uri: videoUrl}}
    />
  );
}

const customHTMLElementModels = {
  video: defaultHTMLElementModels.video.extend({
    contentModel: HTMLContentModel.mixed,
  }),
  iframe: defaultHTMLElementModels.iframe.extend({
    contentModel: HTMLContentModel.mixed,
  }),
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      source: null,
    };
  }

  componentDidMount() {
    console.log('in compdid mount');
    const {postData} = this.props.route.params;
    const source = {
      html: postData.content.rendered || postData.content,
    };

    this.setState({source: source});
    axios
      .get('https://simmerwp.com/wp-json/wp/v2/posts')
      .then(res => {
        return this.setState({data: res.data});
      })
      .catch(err => console.error(err));
  }

  videoError = () => {
    console.log('video error');
  };

  onBuffer = () => {
    console.log('on buffer');
  };

  render() {
    // const {width} = useWindowDimensions();
    // console.log(HTMLContentModel);
    console.log('inside render');
    // console.log(HTMLElementModel);

    const renderers = {
      video: videoWithAds,
      iframe: iframeCustom,
    };

    if (!this.state.source)
      return (
        <View>
          <Text>null vlaue.</Text>
        </View>
      );
    const webViewProps = {
      originWhitelist: '*',
    };
    return (
      <ScrollView style={{padding: 30}}>
        <RenderHTML
          contentWidth={window.width}
          source={this.state.source}
          tagsStyles={tagStyles}
          // ignoredDomTags={['video']}
          customHTMLElementModels={customHTMLElementModels}
          renderers={renderers}
          WebView={WebView}
          defaultWebViewProps={webViewProps}
        />
      </ScrollView>
    );
  }
}

const tagStyles = {
  p: {
    fontSize: 18,
  },
};

export default Post;
