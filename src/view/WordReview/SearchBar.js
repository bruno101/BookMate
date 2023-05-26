import { View, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native'
import { useState } from 'react'

var device = Dimensions.get('window');

//Aqui definimos a barra de pesquisa de palavras
const SearchBar = (props) => {

    return (

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

            <View
                style={{
                    backgroundColor: '#f8f8f8',
                    padding: 10,
                    marginTop: 30,
                    marginBottom: 10,
                    marginLeft: 15,
                    width: device.width - 85,
                    borderRadius: 20
                }}
            >

                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={props.query}
                    onChangeText={props.onChangeText}
                    placeholder="Search"
                    placeholderTextColor="black"
                    style={{ paddingHorizontal: 20, height: 40, color: "black" }}
                />

            </View>

            <TouchableOpacity style={{ marginLeft: 10, marginTop: 30, width: 50, height: 50 }} onPress={props.onSearch}>

                <Image
                    source={require('../../assets/searchIcon.png')}
                    style={{ width: "90%", height: "90%", marginLeft: "4%", marginTop: "4%" }}
                    resizeMode="stretch"
                />

            </TouchableOpacity>

        </View>
    );
}

export default SearchBar;