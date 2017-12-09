import React from "react"
import { StyleSheet, View, TextInput } from "react-native"

export default class SearchInput extends React.Component {
  render() {
    return (
      <TextInput
        autoCorrect={false}
        placeholder={this.props.placeholder}
        placeholderTextColor="white"
        style={styles.textInput}
        clearButtonMode="always"
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#666",
    height: 40,
    marginTop: 20,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textInput: {
    flex: 1,
    color: "white"
  }
})
