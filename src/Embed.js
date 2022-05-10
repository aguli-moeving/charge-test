import React, {useEffect, useRef, Component} from 'react';
import {Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {BackHandler} from 'react-native';

// function Embed(props) {
//   var urls = {
//     simmer: 'https://simmerwp.com/blog/',
//     moeving: 'https://themindmusingss.wordpress.com/',
//     event: 'https://eventespresso.com/blog/',
//     matt: 'https://ma.tt/',
//   };

//   const {source} = props.route.params;
//   const url = urls[source] || urls.simmer;

//   const webview = useRef(null);
//   const onAndroidBackPress = () => {
//     if (webview.current) {
//       webview.current.goBack();
//       return true; // prevent default behavior (exit app)
//     }
//     return false;
//   };

//   useEffect(() => {
//     BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
//     return () => {
//       BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
//     };
//   }, []); // Never re-run this effect

//   return (
//     <View style={{flex: 1}}>
//       <WebView
//         automaticallyAdjustContentInsets={false}
//         source={{uri: url}}
//         javaScriptEnabled={true}
//         domStorageEnabled={true}
//         decelerationRate="normal"
//         startInLoadingState={true}
//         scalesPageToFit={true}
//         ref={webview}
//       />
//     </View>
//   );
// }

class Embed extends Component {
  constructor(props) {
    super(props);
    this.WEBVIEW_REF = React.createRef();
    this.state = {
      close: null,
      url: null,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = e => {
    console.log('inside handleBackButton', e);
    console.log(this.WEBVIEW_REF.current);
    var urls = {
      simmer: 'https://simmerwp.com/blog/',
      moeving: 'https://themindmusingss.wordpress.com/',
      event: 'https://eventespresso.com/blog/',
      matt: 'https://ma.tt/',
    };
    this.WEBVIEW_REF.current.goBack();
    if (Object.values(urls).includes(this.state.url)) {
      console.log('inside if backutton');
      if (this.props.status) {
        this.props.handlerCb(false);
        return true;
      }
      return null;
    } else {
      console.log('here');
      return true;
    }
  };

  onNavigationStateChange(navState) {
    this.setState({
      canGoBack: navState.canGoBack,
    });
    this.setState({
      url: navState.url,
    });
  }

  render() {
    console.log('inside render of embed component');
    var urls = {
      simmer: 'https://simmerwp.com/blog/',
      moeving: 'https://themindmusingss.wordpress.com/',
      event: 'https://eventespresso.com/blog/',
      matt: 'https://ma.tt/',
    };

    console.log('htis is it', this.props);
    const {source} = this.props.route
      ? this.props.route.params
      : {source: 'moeving'};
    const url = urls[source] || urls.simmer;
    console.log(source, 'here me', url);

    const uri =
      'file:///C:/Users/ashwi/moeving/wordpress/charging/android/app/src/main/assets/moeving.html';
    return (
      <View style={{flex: 1}}>
        <WebView
          automaticallyAdjustContentInsets={false}
          source={{
            // uri: 'file:///C:/Users/ashwi/moeving/wordpress/charging/android/app/src/main/assets/moeving.html',
            // uri: '../android/app/src/main/assets/moeving.html',
            uri: url,
          }}
          allowFileAccess={true}
          allowUniversalAccessFromFileURLs={true}
          useWebKit={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={true}
          ref={this.WEBVIEW_REF}
          androidLayerType={'software'}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
      </View>
    );
  }
}

export default Embed;
