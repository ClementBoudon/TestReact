/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  ListView,
  Image,
  Text,
  View
} from 'react-native';

var MOCKED_MOVIES_DATA=[ {title:'Title',year:'2015',posters:{thumbnail:'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }
  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }
  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }


    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovieRow}
        style={styles.listView}
      />
      )

  }
  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }
  renderMovieRow(movie) {
    return (
      <View>
        <View style={styles.container}>
          <Image
            source={{uri: movie.posters.thumbnail}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.year}>{movie.year}</Text>
          </View>
        </View>
      </View>
    );
  }
}

class MovieComponent extends Component{

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.props.movie.posters.thumbnail}}
          style={styles.thumbnail}
          />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{this.props.movie.title}</Text>
          <Text style={styles.year}>{this.props.movie.year}</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.mpaa_rating}>{this.props.movie.mpaa_rating}</Text>
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container:{
flex:1,
flexDirection:'row',
justifyContent:'center',
alignItems:'center',
backgroundColor:'#F5FCFF',
},
rightContainer:{
  flex:1,
},
title:{
  fontSize:20,
  marginBottom:8,
  textAlign:'center',
},
year:{
textAlign:'center',
},
mpaa_rating:{
textAlign:'right',
backgroundColor:'red',
},
   thumbnail:{
    width:53,
    height:81,
    },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
