import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default class Map extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView 
          showsBuildings
          ref={ref => { this.map = ref }}
          onLayout={() => {
            this.map.animateToBearing(125);
            this.map.animateCamera(45);
          }}
          initialRegion={{
            latitude: 33.874549,
            longitude: 72.8162761,
            latitudeDelta: 1 / 300,
            longitudeDelta: 2 / 300
          }}
          //smaxZoomLevel={10}
          style={styles.mapStyle}>
          {/* <MapView.UrlTile urlTemplate={"http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg"} zIndex={-1} /> */}
          </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
