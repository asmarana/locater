import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import MapView, {
  MAP_TYPES,
  Polygon,
  ProviderPropType,
  PROVIDER_GOOGLE
} from 'react-native-maps'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE = 37.78825
const LONGITUDE = -122.4324
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO
let id = 0

class Maps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      polygons: [],
      editing: null,
      creatingHole: false
    }
  }

  finish() {
   const { polygons, editing } = this.state;
   this.setState({
   polygons: [...polygons, editing],
   editing: null,
   creatingHole: false,
  });
  }

  clear = () => {
    this.setState({
      polygons: [],
      editing: null,
      creatingHole: false
    })
  }

  createHole() {
    const { editing, creatingHole } = this.state
    if (!creatingHole) {
      this.setState({
        creatingHole: true,
        editing: {
          ...editing,
          holes: [...editing.holes, []]
        }
      })
    } else {
      const holes = [...editing.holes]
      if (holes[holes.length - 1].length === 0) {
        holes.pop()
        this.setState({
          editing: {
            ...editing,
            holes
          }
        })
      }
      this.setState({ creatingHole: false })
    }
  }

  onPress(e) {
    console.log(this.state.polygons)
    const { editing, creatingHole } = this.state
    if (!editing) {
      this.setState({
        editing: {
          id: id++,
          coordinates: [e.nativeEvent.coordinate],
          holes: []
        }
      })
    } else if (!creatingHole) {
      this.setState({
        editing: {
          ...editing,
          coordinates: [...editing.coordinates, e.nativeEvent.coordinate]
        }
      })
    } else {
      const holes = [...editing.holes]
      holes[holes.length - 1] = [
        ...holes[holes.length - 1],
        e.nativeEvent.coordinate
      ]
      this.setState({
        editing: {
          ...editing,
          id: id++, // keep incrementing id to trigger display refresh
          coordinates: [...editing.coordinates],
          holes
        }
      })
    }
  }

  render() {
    const mapOptions = {
      scrollEnabled: true
    }

    if (this.state.editing) {
      mapOptions.scrollEnabled = false
      mapOptions.onPanDrag = e => this.onPress(e)
    }

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          mapType={MAP_TYPES.SATELLITE}
          initialRegion={this.state.region}
          onPress={e => this.onPress(e)}
          {...mapOptions}
        >
          {this.state.polygons.map(polygon => (
            <Polygon
              key={polygon.id}
              coordinates={polygon.coordinates}
              holes={polygon.holes}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          ))}
          {this.state.editing && (
            <Polygon
              key={this.state.editing.id}
              coordinates={this.state.editing.coordinates}
              holes={this.state.editing.holes}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={1}
            />
          )}
        </MapView>

        <View style={styles.buttonContainer}>
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.createHole()}
              style={[styles.bubble, styles.button]}
            >
              <Text>
                {this.state.creatingHole ? 'Finish Polygon' : 'Create Polygon'}
              </Text>
            </TouchableOpacity>
          )}
          {this.state.editing && (
            <TouchableOpacity
              onPress={() => this.finish()}
              style={[styles.bubble, styles.button]}
            >
              <Text>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => this.clear()}
          style={[styles.bubble, styles.button]}
        >
          <Text>Clear</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

Maps.propTypes = {
  provider: ProviderPropType
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: 'stretch'
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent'
  }
})

export default Maps;





// import React, {useState, useEffect } from 'react'
// import { View, StyleSheet, ToastAndroid } from 'react-native'
// import MapView, { Marker, Polyline, Polygon } from 'react-native-maps'
// const ApiKey = 'AIzaSyCY1oDgXTf55jiJBGLsiTsCgf9DyrlU66E';


// function get_polygon_centroid(pts) {
//     var first = pts[0], last = pts[pts.length - 1];
//     if (first.lat != last.lat || first.lng != last.lng) pts.push(first);
//     var twicearea = 0,
//         x = 0, y = 0,
//         nPts = pts.length,
//         p1, p2, f;
//     for (var i = 0, j = nPts - 1; i < nPts; j = i++) {
//         p1 = pts[i]; p2 = pts[j];
//         f = (p1.lng - first.lng) * (p2.lat - first.lat) - (p2.lng - first.lng) * (p1.lat - first.lat);
//         twicearea += f;data
//         x += (p1.lat + p2.lat - 2 * first.lat) * f;
//         y += (p1.lng + p2.lng - 2 * first.lng) * f;
//     }
//     f = twicearea * 3;
//     return { lat: x / f + first.lat, lng: y / f + first.lng };
// }
// const Map = () => {

//     return (
//         <View style={{ flex: 1 }}>

//             <MapView
//                 style={{ flex: 1 }}
//                 initialRegion={{
//                     latitude: 37.78825,
//                     longitude: -122.4324,
//                     latitudeDelta: 0.0922,
//                     longitudeDelta: 0.0421,
//                   }}
//             >
//                 <Polygon paths={polygonCords}

//                     options={{
//                         strokeColor: "#FF0000",
//                         // strokeOpacity: 0.8,
//                         // strokeWeight: 2,
//                         // fillColor: "#FF0000",
//                         fillOpacity: 0


//                     }}
//                     onDblClick={(e) => handleMarker(e)}
//                 />
//             </MapView>
//         </View>
//     );
// }
// export default Map;
