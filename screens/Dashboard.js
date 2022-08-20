import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Animated,
    ScrollView,
    Platform,
    StyleSheet
} from 'react-native';

import { dummyData, COLORS, SIZES, FONTS, icons, images } from '../constants';

const COUNTRIES_ITEM_SIZE = SIZES.width / 3;

const Dashboard = ({ navigation }) => {
    const [countries, setCountries] = useState([ { id: -1 }, ...dummyData.countries, { id: -2 }]);
    const countryScrollX = useRef(new Animated.Value(0)).current;

    function renderHeader() {
        return (
            <View style = { styles.header }>
                { /* Side Drawer */ }
                <TouchableOpacity style = { styles.sideDrawer }>
                    <Image source = { icons.side_drawer } resizeMode = 'contain' style = { styles.sideDrawerImage } />
                </TouchableOpacity>
                { /* Label / Title */ }
                <View style = { styles.headerTitle }>
                    <Text style = { styles.headerText }>ASIA</Text>
                </View>
                { /* Profile */ }
                <TouchableOpacity onPress = { () => console.log('Profile') }>
                    <Image source = { images.profile_pic } resizeMode = 'contain' style = { styles.headerProfilePic } />
                </TouchableOpacity>
            </View>
        );
    }

    function renderCountries() {
        return (
            <Animated.FlatList 
                horizontal
                pagingEnabled
                snapToAlignment = 'center'
                snapToInterval = { COUNTRIES_ITEM_SIZE }
                showsHorizontalScrollIndicator = { false }
                scrollEventThrottle = { 16 }
                decelerationRate = { 0 }
                data = { countries }
                keyExtractor = { item => `${item.id}` }
                onScroll = { Animated.event([
                    { nativeEvent: {
                        contentOffset: { x: countryScrollX }
                    } }
                ], { useNativeDriver: false }) }
                renderItem = {( { item, index } ) => {
                    const opacity = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            index * COUNTRIES_ITEM_SIZE,
                        ],
                        outputRange: [ 0.3, 1, 0.3 ],
                        extrapolate: 'clamp'
                    });
                    const mapSize = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            index * COUNTRIES_ITEM_SIZE,
                        ],
                        outputRange: [ 25, Platform.OS === 'ios' ? 80 : 60, 25 ],
                        extrapolate: 'clamp'
                    });
                    const fontSize = countryScrollX.interpolate({
                        inputRange: [
                            (index - 2) * COUNTRIES_ITEM_SIZE,
                            (index - 1) * COUNTRIES_ITEM_SIZE,
                            index * COUNTRIES_ITEM_SIZE,
                        ],
                        outputRange: [ 15, 25, 15 ],
                        extrapolate: 'clamp'
                    });
                    if (index == 0 || index == countries.length -1) {
                        return (
                            <View style = {{ width: COUNTRIES_ITEM_SIZE }}>
                            </View>
                        );
                    } else {
                        return (
                            <Animated.View 
                                opacity = { opacity }
                                style = {{
                                    height: 130,
                                    width: COUNTRIES_ITEM_SIZE,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Animated.Image 
                                    source = { item.image } 
                                    resizeMode = 'contain' 
                                    style = {{
                                        width: mapSize,
                                        height: mapSize,
                                        tintColor: COLORS.lightGreen
                                    }} 
                                />
                                <Animated.Text
                                    style = {{
                                        marginTop: 3,
                                        color: COLORS.lightGreen,
                                        ...FONTS.h1,
                                        fontSize: fontSize,
                                    }}
                                >
                                    { item.name }
                                </Animated.Text>
                            </Animated.View>
                        );
                    }
                    
                }}
            />
        );
    }

    return (
        <SafeAreaView style = {{ flex: 1, backgroundColor: COLORS.darkGreen }}>
           { renderHeader() }
           <ScrollView contentContainerStyle = {{ paddingBottom: Platform.OS === 'ios' ? 40 : 0 }}>
                <View style = {{ height: 700 }}>
                    { /* Countries */ }
                    <View>
                        { renderCountries() }
                    </View>
                </View>
           </ScrollView>
        </SafeAreaView>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.base,
        alignItems: 'center'
    },
    sideDrawer: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sideDrawerImage: {
        width: 25,
        height: 25,
        tintColor: COLORS.lightGreen
    },
    headerTitle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerText: {
        color: COLORS.lightGreen,
        ...FONTS.h3
    },
    headerProfilePic: {
        width: 45,
        height: 45,
        borderRadius: 30
    },
})