import { Colors } from "@/constants/theme";
import { useRestaurantMarkers, useRestaurants } from "@/hooks/useRestaurants";
import { Ionicons } from "@expo/vector-icons";
import {
    getCurrentLocation,
    initSDK,
    MapView,
    Marker
} from 'expo-gaode-map';
import * as Location from 'expo-location';
import { AppleMaps, GoogleMaps } from "expo-maps";
import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Page = () => {
    const router = useRouter()
    const insets = useSafeAreaInsets()
    const mapRef = useRef<AppleMaps.MapView | GoogleMaps.MapView>(null);
    const { data: restaurants, isLoading: restaurantsLoading } = useRestaurants()
    const { data: restaurantsMarkers, isLoading: restaurantsMarkersLoading } = useRestaurantMarkers()
    const [initialPosition, setInitialPosition] = useState<{
        android?: {
            target: { latitude: number, longitude: number },
            zoom: number
        },
        ios?: {
            coordinates?: { latitude: number, longitude: number },
            zoom: number
        }
    } | null>(null);
    type markerNew = AppleMaps.Marker & {
        latlong: {
            latitude: number,
            longitude: number,
        }
    }
    const markers: markerNew[] = restaurantsMarkers?.map((marker) => ({
        id: marker.id,
        systemImage: "circle.fill",
        tintColor: Colors.muted,
        coordinates: {
            latitude: marker.latitude,
            longitude: marker.longitude,
        },
        latlong: {
            latitude: marker.latitude,
            longitude: marker.longitude,
        },
        title: marker.name
    })) || [];
    const locateMe = async () => {
        try {
            if (Platform.OS === "ios") {
                const location = await Location.getCurrentPositionAsync();
                // (mapRef.current as AppleMaps.MapView)?.setCameraPosition({
                //     coordinates: {
                //         latitude: location.coords.latitude,
                //         longitude: location.coords.longitude,
                //     },
                //     zoom: 14,
                // })
                setInitialPosition({
                    ios: {
                        // target: { latitude: 51.9625, longitude: 7.6257 },
                        coordinates: { latitude: location.coords.latitude, longitude: location.coords.longitude },
                        zoom: 15
                    }
                });
            } else {
                initSDK({
                    androidKey: 'd172741818ae3f3156c1559bc710f080',
                });
                const location = await getCurrentLocation();
                setInitialPosition({
                    android: {
                        // target: { latitude: 51.9625, longitude: 7.6257 },
                        target: { latitude: location.latitude, longitude: location.longitude },
                        zoom: 15
                    }
                });
            }
        } catch (e) {
            console.log("11111", e);
        }
    }
    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                alert('Permission to access location was denied')
                return
            }
            locateMe()
        }
        getCurrentLocation()
    }, [markers])
    if (restaurantsLoading || restaurantsMarkersLoading) {
        return (
            <View>
                <ActivityIndicator
                    animating={true}
                    color={Colors.secondary}
                    size="large"
                />
            </View>
        )
    }

    const markerSelected = (e: any) => {
        router.push({
            pathname: "/(app)/(auth)/(modal)/(restaurant)/[id]",
            params: { id: e.id }
        })
    }

    if (Platform.OS === "ios") {
        return (
            <>
                <View style={[styles.header, { paddingTop: insets.top }]}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.dismiss()}>
                        <Ionicons name="chevron-back" color={Colors.muted} size={22} />
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        <Link href={'/(app)/(auth)/(modal)/filter'} asChild>
                            <TouchableOpacity style={styles.backButton}>
                                <Ionicons name="filter" size={22} />
                            </TouchableOpacity>
                        </Link>
                        <TouchableOpacity style={styles.backButton} onPress={locateMe}>
                            <Ionicons name="locate-outline" size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
                <AppleMaps.View
                    style={StyleSheet.absoluteFillObject}
                    ref={mapRef as React.Ref<AppleMaps.MapView>}
                    markers={markers}
                    cameraPosition={initialPosition?.ios}
                    properties={{
                        isTrafficEnabled: false,//流量层是否在地图上被启用
                        mapType: AppleMapsMapType.STANDARD,//地图类型
                        selectionEnabled: false,//用户可以在地图上选择位置获取更多信息
                        isMyLocationEnabled: false//用户位置是否显示在地图上
                    }}
                    uiSettings={{
                        myLocationButtonEnabled: false,//“我的定位”按钮是否可见。
                        compassEnabled: false//指南针是否在地图上启用
                    }}
                    onMarkerClick={markerSelected}
                />
                <View style={styles.footerScroll}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}>
                        {restaurants?.map((restaurant) => (
                            <TouchableOpacity
                                key={restaurant.id}
                                style={styles.card}
                                onPress={() => router.push(`/(modal)/(restaurant)/${restaurant.id}`)}>
                                <Image source={restaurant.image!} style={styles.cardImage} />
                                <View style={styles.cardContent}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.cardTitle} numberOfLines={1}>
                                            {restaurant.name}
                                        </Text>
                                        {restaurant.tags.includes('Wolt+') && (
                                            <View style={styles.woltBadge}>
                                                <Text style={styles.woltBadgeText}>W+</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.cardDescription} numberOfLines={1}>
                                        {restaurant.description}
                                    </Text>
                                    <View style={styles.cardFooter}>
                                        <Ionicons name="bicycle-outline" size={14} color="#666" />
                                        <Text style={styles.cardFooterText}>
                                            {restaurant.deliveryFee === 0
                                                ? 'Free delivery'
                                                : `${restaurant.deliveryFee.toFixed(2)} €`}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </>
        )
    } else {
        return (
            // <View style={styles.container}>
            //     {/* <GoogleMaps.View style={{ flex: 1 }} /> */}
            // </View>
            initialPosition && markers && <>
                <View style={[styles.header, { paddingTop: insets.top }]}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.dismiss()}>
                        <Ionicons name="chevron-back" color={Colors.muted} size={22} />
                    </TouchableOpacity>
                    <View style={styles.headerRight}>
                        <Link href={'/(app)/(auth)/(modal)/filter'} asChild>
                            <TouchableOpacity style={styles.backButton}>
                                <Ionicons name="filter" size={22} />
                            </TouchableOpacity>
                        </Link>
                        <TouchableOpacity style={styles.backButton} onPress={locateMe}>
                            <Ionicons name="locate-outline" size={22} />
                        </TouchableOpacity>
                    </View>
                </View>
                <MapView
                    initialCameraPosition={initialPosition?.android}
                    myLocationEnabled={true}
                    style={{ flex: 1, padding: 10 }} >
                    {markers.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={marker.latlong}
                            title={marker.title}
                            draggable={true}
                        />
                    ))}
                </MapView>
                <View style={styles.footerScroll}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}>
                        {restaurants?.map((restaurant) => (
                            <TouchableOpacity
                                key={restaurant.id}
                                style={styles.card}
                                onPress={() => router.push(`/(modal)/(restaurant)/${restaurant.id}`)}>
                                <Image source={restaurant.image!} style={styles.cardImage} />
                                <View style={styles.cardContent}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.cardTitle} numberOfLines={1}>
                                            {restaurant.name}
                                        </Text>
                                        {restaurant.tags.includes('Wolt+') && (
                                            <View style={styles.woltBadge}>
                                                <Text style={styles.woltBadgeText}>W+</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text style={styles.cardDescription} numberOfLines={1}>
                                        {restaurant.description}
                                    </Text>
                                    <View style={styles.cardFooter}>
                                        <Ionicons name="bicycle-outline" size={14} color="#666" />
                                        <Text style={styles.cardFooterText}>
                                            {restaurant.deliveryFee === 0
                                                ? 'Free delivery'
                                                : `${restaurant.deliveryFee.toFixed(2)} €`}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom:10
    },
    header: {
        position: "absolute",
        top: 0,
        left: 16,
        right: 16,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        backgroundColor: Colors.background,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 4px 2px -2px rgba(0, 0, 0, 0.1)',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    footerScroll: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        paddingBottom: 20,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 12,
        marginVertical: 16,
    },
    card: {
        width: 280,
        backgroundColor: '#fff',
        borderRadius: 16,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        flexDirection: 'row',
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        margin: 10,
    },
    cardContent: {
        flex: 1,
        padding: 12,
        paddingLeft: 0,
        justifyContent: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        flex: 1,
    },
    woltBadge: {
        backgroundColor: '#009de0',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    woltBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#fff',
    },
    cardDescription: {
        fontSize: 13,
        color: '#666',
        marginBottom: 6,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    cardFooterText: {
        fontSize: 12,
        color: '#666',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
})
export default Page