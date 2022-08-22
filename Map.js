import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet,Dimensions  } from 'react-native'
import MapView ,{Marker} from 'react-native-maps'
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
            city: ''
      }
      updatedLocation =region => {
            this.setState({
                  region
            })
            this.getAddress(this.state.region.latitude,this.state.region.longitude);
      }

      getAddress = async (lat, lng) => {
            Location.setGoogleApiKey(ApiKey)
            try {
                  let res = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lng }, { useGoogleMaps: true })
                //   console.log(res);
                  let Address = res[0].name.concat(" " + res[1].name).concat (","+res[0].region)
                  let city = res[0].city
                  this.setState({
                        CurrentLocation: Address,
                        city: city
                  })
                  this.mark.showCallout();
            }
            catch (err) { console.log(err) }

      }

      onChangeValue = CurrentLocation=> {
console.log('Current',this.state.CurrentLocation);
            this.setState({
                  CurrentLocation
            })
      }

      render() {
        let marker =
              <View style={{ top: '37%', bottom: '50%', marginLeft: 153, marginTop: 40, position: "absolute", zIndex: 100 }}>
                    <Marker
                  style={{zIndex:10000}}
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
                          }}>
                          {marker}
                    </MapView>
                    <View></View>
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