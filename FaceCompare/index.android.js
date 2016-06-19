'use strict';

var CategoriesView = require('./app/categories.js');
var AppView = require('./app/app.js');
var BadInstagramCloneApp = require('./app/camera.js');
// Android has a problem with autentication
//var parseURL = 'https://pjKUgtat9p0T7gbxhtIwn5OSCnAhvitNmOYPUaMp:javascript-key=6dE2rjU46uXAJBtYExMhqWM0zrUFibsugd9LgQvN@api.parse.com/1/classes/Categories?where={"readyNew" :true}';
var parseURL = 'http://w.areminds.com/api.face.js';

import React, {
  AppRegistry,
  CameraRoll,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
  Alert,
  Dimensions,
  TextInput,
  TouchableHighlight,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';

import Camera from 'react-native-camera';


var NavigationBarRouteMapper = {

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }
    console.log("INDEX:",index);
    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          {previousRoute.title}
        </Text>
      </TouchableOpacity>
    );
  },
  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  },
  RightButton: function( route, navigator, index, navState ){
    return(
      <Text>{ route.rightButton }</Text>
    )
  }
}

var FaceCompare = React.createClass({
  render() {
    return (
      <Navigator
          style={styles.container}
          initialRoute={{
              name:'Home',
              title: 'Pick a Category'
          }}
          renderScene={(route, navigator) => {
            if(route.name == 'Home') {
              return <CategoriesView title={route.title} navigator={navigator} {...route.passProps}  />
            }
            if(route.name == 'Category') {
              return <PrePhoto title={route.title} navigator={navigator} {...route.passProps} />
            }
            if(route.name == 'Camera') {
              return <FCCamera title={route.title} navigator={navigator} {...route.passProps} />
            }
            if(route.name == 'Preview') {
              return <PreviewCompare title={route.title} navigator={navigator} {...route.passProps}  />
            }

          }}

          navigationBar={
             <Navigator.NavigationBar
              routeMapper={ NavigationBarRouteMapper }
              style={ styles.navBar }  />}

          />
    );
  }
});

var CategoriesView = React.createClass ( {
  _navigate(name) {
  	this.props.navigator.push({
    	name: 'Home',
      passProps: {
      	name: name
      }
    })
  },
  componentDidMount: function() {
   this.fetchData();
 },

  getInitialState: function() {
   return {
   isLoading: true,
   dataSource: new ListView.DataSource({
     rowHasChanged: (row1, row2) => row1 !== row2
   })
  };
 },

  fetchData() {
    fetch(parseURL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(responseData.results),
        isLoading: false,
      });
    })
    .done();
  },

  render() {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderCategory}
          />
      );
  },
  renderCategory(category) {
      return (
        <RenderCell navigator={this.props.navigator} category = {category} />
      );
  }
});

var RenderCell = React.createClass ({

  render: function(){
    return (
      <TouchableOpacity onPress={() => this.selectCategory(this.props.category)}>
      <View style={styles.trackCell}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: this.props.category.imageFemale.url}}
            style={styles.thumbnail}/>
        </View>
          <Text style={styles.trackTitle}>{this.props.category.name}</Text>
      </View>
      </TouchableOpacity >
    );
  },

  selectCategory: function (category) {
    this.props.navigator.push({
      name: 'Category',
      title: category.name,
      passProps: {category:category}
    });
  }

});

var PrePhoto = React.createClass({
  _navigate(name) {
  	this.props.navigator.push({
    	name: 'Category',
      passProps: {
      	name: name
      }
    })
  },
  render: function() {
    return (
      <View style={styles.trackScreen}>
       <Image
          style={styles.largeArtwork}
          source={{uri: this.props.category.imageFemale.url}}>
        </Image>
        <Text style={styles.trackTitle}>{this.props.category.name}</Text>
        <Text style={styles.trackArtist}>{this.props.category.name}</Text>
        <View style={styles.buttonRow}>
          <TouchableHighlight onPress={()=>this.onSelectGender(this.props.category)} style={styles.playButton}>
            <View style={{flexDirection: 'row'}}>

              <Text style={styles.playButtonText}>Play Track</Text>
             </View>
          </TouchableHighlight>
        </View>

      </View>
    );
  },
  onSelectGender: function (category) {
    this.props.navigator.push({
      name: 'Camera',
      title:'Take a Picture',
      component: FCCamera,
      passProps: {category:category}
    });
  }
});

var FCCamera = React.createClass({
  _navigate(name) {
  	this.props.navigator.push({
    	name: 'Camera',
      passProps: {
      	name: name
      }
    })
  },

  getInitialState: function() {
      return {
          cameraType: Camera.constants.Type.back
      }
  },

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref="cam"
          style={styles.preview}
          aspect={Camera.constants.Aspect.Fill}
          type={this.state.cameraType}
          captureTarget={Camera.constants.CaptureTarget.temp} >
        </Camera>

        <View style={styles.buttonBar}>
          <TouchableHighlight style={styles.button} onPress={this._switchCamera}>
            <Text style={styles.buttonText} >FLIP</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this._takePicture}>
            <Text style={styles.buttonText} >CAPTURE</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  },

  _switchCamera: function() {
    var state = this.state;
    state.cameraType = state.cameraType === Camera.constants.Type.back ? Camera.constants.Type.front : Camera.constants.Type.back;
    this.setState(state);

  },

  _takePicture: function() {
    this.refs.cam.capture()
      .then((data) => {
        console.log(data);
        this.props.navigator.push({
          name: 'Preview',
          title:'Preview',
          passProps: {image:data}
        });
      })
      .catch(err => console.error(err));
  }

});

var PreviewCompare = React.createClass({
  render(){
    return (
      <View style={styles.container}>
        <Image
          style={styles.preview}
          source={{uri: this.props.image}}>
        </Image>
        <View style={styles.buttonBar}>
            <TouchableHighlight style={styles.button} onPress={this._compare}>
              <Text style={styles.buttonText} >COMPARE</Text>
            </TouchableHighlight>
        </View>
      </View>
    )
  },

  _compare: function() {
    console.log(this);
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://w.areminds.com/f/upload.php');
    xhr.onload = () => {
      if (xhr.status !== 200) {
        Alert.alert(
          'Alert Title',
          'My Alert Msg',
          [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
        );
        return;
      }
      console.log("Upload Success",xhr.status,xhr.responseText);
      // upload succeeded
    };

    var formdata = new FormData();
    formdata.append('image', {type: "image/jpg", name: + new Date() + 'image.jpg', uri: this.props.image });
    console.log("Sent This!", this.props.image,xhr.upload);

    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        console.log('upload onprogress', event);
        if (event.lengthComputable) {
          this.setState({uploadProgress: event.loaded / event.total});
        }
      };
    }
    xhr.send(formdata);
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    backgroundColor: '#efefef',
  },
  navBarText: {
    fontSize: 16,
  },
  navBarTitleText: {
    color: '#373E4D',
    fontWeight: '500',
    fontSize:24,
    marginVertical: 9,
    textAlign:'center',
    alignItems: 'center'
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  navBarButtonText: {
    color: '#5890FF',
  },
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  largeArtwork: {
    width: 300,
    height: 300
  },
  thumbnail: {
    width: 350,
    height: 350,
  },
  titleCell: {
    flex: 1,
    opacity: 50,
    backgroundColor: '#010101',
  },
  trackCell: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
    padding: 4,
    borderBottomWidth: 1,
    borderColor: 'lightgray'
  },
  trackTitle: {
    fontSize: 30,
    color: 'white',
    marginTop: -40,
    textAlign: 'center',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent'
  },
  buttonBar: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    right: 0,
    left: 0,
    justifyContent: "center"
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    backgroundColor:'#000000',
    margin: 5
  },
  buttonText: {
      color: "#FFFFFF"
  }

});

AppRegistry.registerComponent('FaceCompare', () => FaceCompare);
