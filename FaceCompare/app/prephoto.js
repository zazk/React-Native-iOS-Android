'use strict';
var CategoriesView = require('./categories');
var React = require('react-native');

var {
    StyleSheet,
    Image,
    NavigatorIOS,
    View,
    Text,
    ScrollView,
    TouchableHighlight,
    Component
   } = React;


class PrePhoto extends Component {

  render() {
      return (
        <View>
        <View style={styles.container}>
          <Text> Yes!!!! </Text>
        </View>
        <View style={styles.trackCell}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: this.props.cats.imageFemale.url}}
              style={styles.thumbnail}/>
          </View>
          <View style={styles.titleCell}>
            <Text style={styles.trackTitle}>{this.props.cats.name}</Text>
          </View>
        </View>
        </View>

      );
  }
};


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop:0,
        paddingBottom: 0,
        backgroundColor: '#c0deed'
    },
})

module.exports = PrePhoto;
