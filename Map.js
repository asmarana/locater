import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker, Polygon } from 'react-native-maps'
import MapConfig from './Mapconfig'
import * as Location from 'expo-location';
const ApiKey = 'AIzaSyCY1oDgXTf55jiJBGLsiTsCgf9DyrlU66E';

export default class Map extends Component {

      state = {
            region: {
                  latitude: 33.874549,
                  longitude: 72.8162761,
                  latitudeDelta: 0.22,
                  longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height
            },
            marginBottom: 1,
            locationChosen: false,
            CurrentLocation: '',
            city: '',
            markers: []
      }
      onMapPress(e) {
            alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate));

      }
      updatedLocation = region => {
            this.setState({
                  region
            })
            this.getAddress(this.state.region.latitude, this.state.region.longitude);
      }

      getAddress = async (lat, lng) => {
            Location.setGoogleApiKey(ApiKey)
            try {
                  let res = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng }, { useGoogleMaps: true })
                  //   console.log(res);
                  let Address = res[0].name.concat(" " + res[1].name).concat("," + res[0].region)
                  let city = res[0].city
                  this.setState({
                        CurrentLocation: Address,
                        city: city
                  })
                  this.mark.showCallout();
            }
            catch (err) { console.log(err) }

      }

      onChangeValue = CurrentLocation => {
            console.log('Current', this.state.CurrentLocation);
            this.setState({
                  CurrentLocation
            })
      }
      handleMarkerPress(event) {
            const markerID = event.nativeEvent.identifier;
            alert(markerID);
        }

      render() {
            let marker =
                  <View style={{ top: '37%', bottom: '50%', marginLeft: 153, marginTop: 40, position: "absolute", zIndex: 100 }}>
                        <Marker
                              style={{ zIndex: 10000 }}
                              coordinate={this.state.region}
                              title={this.state.CurrentLocation}
                              description={this.state.city}
                              ref={ref => this.mark = ref}

                        >
                        </Marker>
                  </View>
            return (
                  <View style={{ flex: 1 }}>

                        <MapView
                              style={{ flex: 1, marginBottom: this.state.marginBottom }}
                              showsMyLocationButton={true}
                              showsUserLocation={true}
                              customMapStyle={MapConfig}
                              initialRegion={this.state.region}
                              onRegionChange={this.onChangeValue}
                              zoomControlEnabled={true}
                              followsUserLocation={true}
                              onRegionChangeComplete={this.updatedLocation}
                              ref={map => {
                                    this.map = map;
                              }}
                              onPress={this.onMapPress.bind(this)}>
                              {marker}
                              <Polygon fillColor="rgba(000, 000, 200, 0.3)"
                                    strokeColor="rgba(000, 000, 200, 0.3)"
                                    coordinates={[
                                          { latitude: 35.7645, longitude: 73.7679 },
                                          { latitude: 36.7420, longitude: 72.7175 },
                                          { latitude: 37.7499, longitude: 72.7277 },
                                          { latitude: 38.7599, longitude: 72.7477 },
                                          { latitude: 35.7645, longitude: 73.7679 }

                                    ]}>
                              </Polygon>
                        </MapView>
                        <Text style={{ position: 'absolute', bottom: 0, right: 0, zIndex: 1 }}>Text</Text>
                  </View>
            )
      }
}

const styles = StyleSheet.create({

      btntext: {
            fontSize: "2%",
            color: '#241416',
      },
      button:
      {
            height: "6.5%",
            width: "70%",
            backgroundColor: '#0000',
            justifyContent: "center",
            alignItems: 'center',
            borderRadius: 0,

      },
})