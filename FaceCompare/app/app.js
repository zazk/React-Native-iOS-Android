'use strict';
var CategoriesView = require('./categories');
var React = require('react-native');
var PrePhoto = require('./prephoto');

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


class AppView extends Component {

  onPress(cats) {
        this.props.navigator.push({
            title: 'category.name',
            component: PrePhoto,
            passProps: {cats}
        });
    }

  render() {
      return (
        <View style={styles.container}>
          <ScrollView automaticallyAdjustContentInsets={false} >
          <TouchableHighlight onPress={() => this.onPress(this.props.cats)}>
          <View>
              <CategoriesView />
          </View>
          </TouchableHighlight>
        </ScrollView>
        </View>
      );
  }
};

var styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:0,
        paddingBottom: 0,
    },
})

module.exports = AppView;
