import React from 'react'
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar
} from 'react-native'

import getImageForWeather from './utils/getImageForWeather'
import { fetchLocationId, fetchWeather } from './utils/api'

import SearchInput from './components/SearchInput'

export default class App extends React.Component {
  state = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: ''
  }

  componentDidMount() {
    this.handleUpdateLocation('San Francisco')
  }

  handleUpdateLocation = async city => {
    if (!city) return

    this.setState({ loading: true }, async () => {
      try {
        const locationId = await fetchLocationId(city)

        const { location, temperature, weather } = await fetchWeather(
          locationId
        )
        this.setState({
          location,
          temperature,
          weather,
          loading: false,
          error: false
        })
      } catch (e) {
        this.setState({ error: true, loading: false })
      }
    })
  }
  renderContent() {
    const { error } = this.state
    return (
      <View>
        {error && (
          <Text style={[styles.smallText, styles.textStyle]}>
            Could not load weather, please try a different city.
          </Text>
        )}
        {!error && this.renderInfo()}
      </View>
    )
  }
  renderInfo() {
    const { weather, temperature, location } = this.state
    return (
      <View>
        <Text style={[styles.largeText, styles.textStyle]}>{location}</Text>
        <Text style={[styles.smallText, styles.textStyle]}>{weather}</Text>
        <Text style={[styles.largeText, styles.textStyle]}>
          {`${Math.round(temperature)}°`}
        </Text>
      </View>
    )
  }
  render() {
    const { location, temperature, weather, loading, error } = this.state

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={getImageForWeather(weather)}
          style={styles.imageContainer}
          imageStyle={styles.image}
        >
          <View style={styles.detailsContainer}>
            <ActivityIndicator animating={loading} color="white" size="large" />
            {!loading && this.renderContent()}
            <SearchInput
              placeholder="Search any city"
              onSubmit={this.handleUpdateLocation}
            />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E'
  },
  imageContainer: {
    flex: 1
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 20
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
    color: 'white'
  },
  largeText: {
    fontSize: 44
  },
  smallText: {
    fontSize: 18
  }
})
