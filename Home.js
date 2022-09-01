import React, { Component } from 'react'
import { View, StyleSheet, ToastAndroid } from 'react-native'
import MapView, { Marker, Polyline, Polygon } from 'react-native-maps'
const ApiKey = 'AIzaSyCY1oDgXTf55jiJBGLsiTsCgf9DyrlU66E';

export default class Map extends Component {
    state = {
        region: {
            latitude: 33.874549,
            longitude: 72.8162761,
            latitudeDelta: 0.22,
            longitudeDelta: 0.2
        },
        markers: []
    }
    onMapPress(e) {
        alert("coordinates:" + JSON.stringify(e.nativeEvent.coordinate));

        this.setState({
            marker: [
                {
                    coordinate: e.nativeEvent.coordinate
                }
            ]
        });
    }

    handleMarkerPress(event) {
        const markerID = event.nativeEvent.identifier;
        alert(markerID);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <MapView
                    style={{ flex: 1, marginBottom: this.state.marginBottom }}
                    showsMyLocationButton={true}
                    showsUserLocation={true}
                    region={this.state.region}
                    zoomControlEnabled={true}
                    followsUserLocation={true}
                    onPress={(e) => this.setState({ markers: [...this.state.markers, { latlng: e.nativeEvent.coordinate }] })}>
                    {
                        this.state.markers.map((marker, i) => (
                            <MapView.Marker coordinate={marker.latlng} key={i} />
                        ))
                    }
                    <OverlayComponent
                        style={{ position: "absolute", bottom: 50 }}
                        HELLO
                    />
                </MapView>
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
