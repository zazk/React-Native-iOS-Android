'use strict';

var React = require('react-native');
var CategoryURL = 'https://facecompareapp.herokuapp.com/cats';
var parseURL = 'https://pjKUgtat9p0T7gbxhtIwn5OSCnAhvitNmOYPUaMp:javascript-key=6dE2rjU46uXAJBtYExMhqWM0zrUFibsugd9LgQvN@api.parse.com/1/classes/Categories?where={"readyNew" :true}';
var PrePhoto = require('./prephoto');

var {
  StyleSheet,
  Image,
  Text,
  View,
  ListView,
  ScrollView,
  TouchableHighlight,
  Component
 } = React;

class CategoriesView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }

  componentDidMount() {
   this.fetchData();
  }

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
  }

  // onPress() {
  //       this.props.navigator.push({
  //           title: category.name,
  //           component: PrePhoto
  //       });
  //   }

  render() {
      return (
        <ListView
          navigator={this.props.navigator}
          dataSource={this.state.dataSource}
          renderRow={this.renderCategories.bind(this)}
          renderScrollComponent={props => <ScrollView horizontal={false}
          directionalLockEnabled={true}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}/>}
          />
      );
  }
  renderCategories(cats) {
    return (
      //<TouchableHighlight onPress={this.onPress}>
      <View style={styles.trackCell}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: cats.imageFemale.url}}
            style={styles.thumbnail}/>
        </View>
        <View style={styles.titleCell}>
          <Text style={styles.trackTitle}>{cats.name}</Text>
        </View>
      </View>
      //</TouchableHighlight >
    );
  }
}
var styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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

});
module.exports = CategoriesView;
