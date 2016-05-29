'use strict';

var CategoriesView = require('./app/categories.js');
var AppView = require('./app/app.js');
var BadInstagramCloneApp = require('./app/camera.js');
// Android has a problem with autentication
//var parseURL = 'https://pjKUgtat9p0T7gbxhtIwn5OSCnAhvitNmOYPUaMp:javascript-key=6dE2rjU46uXAJBtYExMhqWM0zrUFibsugd9LgQvN@api.parse.com/1/classes/Categories?where={"readyNew" :true}';
var parseURL = 'http://w.areminds.com/api.face.js';

import React, {
  AppRegistry,
  Image,
  ListView,
  Navigator,
  StyleSheet,
  Text,
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
            if(route.name == 'Camera') {
              return <FCCamera title={route.title} navigator={navigator} {...route.passProps} />
            }
            if(route.name == 'Category') {
              return <PrePhoto title={route.title} navigator={navigator} {...route.passProps} />
            }
            if(route.name == 'Home') {
              return <CategoriesView title={route.title} navigator={navigator} />
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
        <View style={styles.titleCell}>
          <Text style={styles.trackTitle}>{this.props.category.name}</Text>
        </View>
      </View>
      </TouchableOpacity >
    );
  },
  
  selectCategory: function (category) {
    this.props.navigator.push({
      name: 'Category', 
      passProps: {category:category}
    });
  } 
  
});

var PrePhoto = React.createClass({
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
      component: FCCamera,
      passProps: {category:category}
    });
  }
});

var FCCamera = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.Fill}
          captureTarget={Camera.constants.CaptureTarget.temp}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    );
  },

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

AppRegistry.registerComponent('FaceCompare', () => FaceCompare);
