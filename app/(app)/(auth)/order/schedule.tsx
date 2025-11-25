import { Colors } from '@/constants/theme';
import { Picker as AndroidPicker } from '@expo/ui/jetpack-compose';
import { Host, HStack, Picker } from '@expo/ui/swift-ui';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Page = () => {
    const router = useRouter();
    const [selectedDay, setSelectedDay] = useState(0);
    const [selectedTime, setSelectedTime] = useState(0);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const in2Days = new Date(today);
    in2Days.setDate(in2Days.getDate() + 2);
    const in3Days = new Date(today);
    in3Days.setDate(in3Days.getDate() + 3);

    const nextDays = [
        'Today',
        `${tomorrow.getDate()}.${tomorrow.getMonth() + 1}`,
        `${in2Days.getDate()}.${in2Days.getMonth() + 1}`,
        `${in3Days.getDate()}.${in3Days.getMonth() + 1}`,
    ];
    const nextTimes = Array.from({ length: 24 * 12 }, (_, i) => {
        const hour = Math.floor(i / 12);
        const minute = (i % 12) * 5;
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    });

    const handleConfirm = () => {
        router.dismiss();
    };
    return (
        <View style={styles.container}>
            {
                Platform.OS === "ios" && (
                    <Host style={{ height: 200 }}>
                        <HStack>
                            <Picker
                                variant="wheel"
                                options={nextDays}
                                selectedIndex={selectedDay}
                                onOptionSelected={({ nativeEvent: { index } }) => {
                                    setSelectedDay(index);
                                }}
                            />
                            <Picker
                                variant="wheel"
                                options={nextTimes}
                                selectedIndex={selectedTime}
                                onOptionSelected={({ nativeEvent: { index } }) => {
                                    setSelectedTime(index);
                                }}
                            />
                        </HStack>
                    </Host>
                )
            }
            {
                Platform.OS === "android" && (
                    <View style={{ height: 200, padding: 20, marginTop: 20 }}>
                        <AndroidPicker
                            variant="segmented"
                            options={nextDays}
                            selectedIndex={selectedDay}
                            onOptionSelected={({ nativeEvent: { index } }) => {
                                setSelectedDay(index);
                            }}
                            style={{marginBottom:20}}
                        />
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <AndroidPicker
                                variant="segmented"
                                options={nextTimes}
                                selectedIndex={selectedTime}
                                onOptionSelected={({ nativeEvent: { index } }) => {
                                    setSelectedTime(index);
                                }}
                            />
                        </ScrollView>
                    </View>
                )
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleConfirm}>
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default Page;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10, // 添加少量顶部内边距，确保不与标题重叠
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    button: {
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondary,
        boxShadow: '0px 4px 12px rgba(0, 157, 224, 0.3)',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'rgb(255, 255, 255)',
    },
});