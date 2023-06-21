import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Linking} from 'react-native';
import { Image, Avatar } from 'native-base';
import { Icon } from 'react-native-elements';
import colors from '../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableRipple } from 'react-native-paper';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

import RNCalendarEvents from "react-native-calendar-events";

const STORAGE_KEY_MEMBER_ID = '@m_id'

const museums = [
    { key: 1, uri: 'https://khh.travel/content/images/static/1-4-1-01.jpg', alt: '高雄市立文化中心', href: 'http://www.khcc.gov.tw/rwd_home03.aspx?ID=$M102&IDK=2&EXEC=L' },
    { key: 2, uri: 'https://khh.travel/content/images/static/1-4-1-02.jpg', alt: '大東文化藝術中心', href: 'http://dadongcenter.khcc.gov.tw/home01.aspx?ID=1' },
    { key: 3, uri: 'https://khh.travel/content/images/static/1-4-1-03.jpg', alt: '岡山文化中心', href: 'http://gangshan.khcc.gov.tw/home01.aspx?ID=1' },
    { key: 4, uri: 'https://khh.travel/content/images/static/1-4-1-04.jpg', alt: '高雄市立社會教育館', href: 'https://www.kmseh.gov.tw/03_activity/01_list.php' },
    { key: 5, uri: 'https://khh.travel/content/images/static/1-4-1-05.jpg', alt: '高雄市音樂館', href: 'https://kaohsiungmusichall.khcc.gov.tw/home01.aspx?ID=1' },
    { key: 6, uri: 'https://khh.travel/content/images/static/1-4-1-06.jpg', alt: '高雄市國樂團', href: 'https://www.facebook.com/%E9%AB%98%E9%9B%84%E5%B8%82%E5%9C%8B%E6%A8%82%E5%9C%98-131813126885013/' },
    { key: 7, uri: 'https://khh.travel/content/images/static/1-4-1-07.jpg', alt: '高雄市立交響樂團', href: 'https://www.facebook.com/kso.taiwan' },
    { key: 8, uri: 'https://khh.travel/content/images/static/1-4-1-08.jpg', alt: '衛武營國家藝術文化中心', href: 'https://kaohsiungmusichall.khcc.gov.tw/home01.aspx?ID=1' },
    { key: 9, uri: 'https://khh.travel/content/images/static/1-4-2-01.jpg', alt: '高雄市立美術館', href: 'https://www.kmfa.gov.tw/' },
    { key: 10, uri: 'https://khh.travel/content/images/static/1-4-2-02.jpg', alt: '高雄市立歷史博物館', href: 'http://www.khm.org.tw/tw/exhibition/currentexhibitions' },
    { key: 11, uri: 'https://khh.travel/content/images/static/1-4-2-03.jpg', alt: '駁二藝術特區', href: 'https://www.facebook.com/pier2art' },
    
];

const MuseumImage = () => {
    return (
        <ScrollView horizontal={true} style={styles.imageScrollView}>
        {museums.map(museum => {
            return(
                <TouchableOpacity style={styles.imageContainer} onPress={() => Linking.openURL(museum.href)} key={museum.key}>
                    <>
                    <Image 
                        onPress={() => Linking.openURL(museum.href)}
                        style={styles.museumImage}
                        source={{
                            uri: museum.uri,
                        }} alt={museum.alt} size="xl" />
                        <Text style={styles.linkText} onPress={() => Linking.openURL(museum.href)}>{museum.alt}</Text>
                    </>
                    
                </TouchableOpacity>
            )
        })}
        </ScrollView>
    );
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const IndexScreen = ({navigation}) => {
    const [name, onChangeName] = useState("");
    const [firstLetter, setFirstLetter] = useState("");

    let getMemberInfo = async () => {
        const values = await AsyncStorage.getItem(STORAGE_KEY_MEMBER_ID)
        console.log('m_id = ' + values)
        var details = {
            'm_id': values,
        };
        //Changes form data into x-www-form-urlencoded format
        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    
        fetch("http://192.168.137.51:8080/member/show_member_info", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(resp => {
            return Promise.all([resp.ok, resp.status, resp.json()]);
        }).then(([ok, status, json]) => {
                const data = json.result[0];
                const userInfo = data;
                let { 
                    m_name,
                } = userInfo
                console.log(m_name)
                onChangeName(capitalizeFirstLetter(m_name),)
                setFirstLetter(m_name.charAt(0).toUpperCase())
                // setFirstLetter(m_name.charAt(0).toUpperCase() + m_name.charAt(m_name.length-1).toUpperCase())
            if (json.status == true) {
                return [ok, status, json]
            } else {
                throw new Error(json.error);
            }
        }).catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        getMemberInfo()
        RNCalendarEvents.requestPermissions((readOnly = false)).then((res) => {
            console.log('Permission Response',res);
        }).catch((error) => {
            console.log(error);
        });

        RNCalendarEvents.checkPermissions((readOnly = false)).then((res) => {
            console.log('Check Permission Response',res);
        }).catch((error) => {
            console.log(error);
        });

        // RNCalendarEvents.saveEvent('React Native Calendar Test', {
        //     startDate: '2022-09-06T19:26:00.000Z',
        //     endDate: '2022-09-07T19:26:00.000Z'
        // }).then((res) => {
        //     console.log("res" + res);
        // }).catch((error) => {
        //     console.log("err" + error);
        // });

        RNCalendarEvents.fetchAllEvents('2022-09-20T19:26:00.000Z', '2022-09-30T19:26:00.000Z').then((res) => {
            console.log('calendar Events = '+res);
        }).catch((error) => {
            console.log(error);
        });
        // RNCalendarEvents.findCalendars().then((res) => {
        //     console.log(res);
        // }).catch((error) => {
        //     console.log(error);
        // });
        


    }, []);

    // Scroll View
    return (
        <ScrollView>
            {/* Profile Container */}
            <View style={styles.profileContainer}>
                <View style={styles.profileAvatar}>
                        <Avatar bg="green.500" m="1" size="lg"source={{
                        uri: 'https://bit.ly/broken-link',
                        }}>
                            {firstLetter}
                        </Avatar>
                    </View>
                <View style={styles.profileInfo}>
                    <Text style={styles.profileText}>
                        {name}
                    </Text>
                    <TouchableRipple
                        onPress={() => navigation.navigate('ProfileScreen')}
                        borderless={true}
                        style={styles.editProfileButton}>
                        <View
                        >
                            <Text>Edit Profile</Text>
                        </View>
                    </TouchableRipple>
                </View>
            </View>
            {/* End of Profile Container */}

            <View style={styles.subTitleContainer}><Text style={styles.subTitleText}>功能列表</Text></View>
            <View style={styles.functionContainer}>
                <View>
                    <TouchableRipple
                        onPress={() => navigation.navigate('HomeScreen')}
                        borderless={true}
                        style={styles.functionButton}>
                        <View
                            style={styles.functionButtonIcon}
                        >
                            <Image source={{uri:'https://img.icons8.com/color/48/000000/' + 'overview-pages-3'}}  style={styles.iconV2} alt="Alternate Text"/>
                        </View>
                    </TouchableRipple>
                    <Text style={styles.functionText}>查看活動</Text>
                </View>

                <View>
                    <TouchableRipple
                        onPress={() => navigation.navigate('SearchScreen')}
                        borderless={true}
                        style={styles.functionButton}>
                        <View
                            style={styles.functionButtonIcon}
                        >
                            <Image source={{uri:'https://img.icons8.com/color/48/000000/' + 'search'}}  style={styles.iconV2} alt="Alternate Text"/>
                        </View>
                    </TouchableRipple>
                    <Text style={styles.functionText}>搜尋</Text>
                </View>

                <View>
                    <TouchableRipple
                        onPress={() => navigation.navigate('MuseumScreen')}
                        borderless={true}
                        style={styles.functionButton}>
                        <View
                            style={styles.functionButtonIcon}
                        >
                            <Image source={{uri:'https://img.icons8.com/color/48/000000/' + 'map-marker'}}  style={styles.iconV2} alt="Alternate Text"/>
                        </View>
                    </TouchableRipple>
                    <Text style={styles.functionText}>地點一覽表</Text>
                </View>

                <View>
                    <TouchableRipple
                        onPress={() => navigation.navigate('DiscoverScreen')}
                        borderless={true}
                        style={styles.functionButton}>
                        <View
                            style={styles.functionButtonIcon}
                        >
                            <Image source={{uri:'https://img.icons8.com/external-bearicons-flat-bearicons/64/000000/external-Subscribe-social-media-bearicons-flat-bearicons.png'}} style={styles.iconV2} alt="Alternate Text"/>
                        </View>
                    </TouchableRipple>
                    <Text style={styles.functionText}>查看訂閲</Text>
                </View>

                <View>
                    <TouchableRipple
                        onPress={() => navigation.navigate('SavedEventScreen')}
                        borderless={true}
                        style={styles.functionButton}>
                        <View
                            style={styles.functionButtonIcon}
                        >
                            <Icon name={'bookmark'} color={colors.primary} size={60} type="materialicons" />
                        </View>
                    </TouchableRipple>
                    <Text style={styles.functionText}>收藏</Text>
                </View>

                <View>
                    <TouchableRipple
                        onPress={() => navigation.navigate('AboutUsScreen')}
                        borderless={true}
                        style={styles.functionButton}>
                        <View
                            style={styles.functionButtonIcon}
                        >
                            <Icon name={'info'} color={'dodgerblue'} size={60} type="materialicons" />
                        </View>
                    </TouchableRipple>
                    <Text style={styles.functionText}>關於我們</Text>
                </View>
            </View>

            {/* Link-to Image */}
            <View style={styles.subTitleContainer}><Text style={styles.subTitleText}>展館連結</Text></View>
            <MuseumImage/>
        </ScrollView>
    );
};

export default IndexScreen;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: colors.white,
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 30,
        margin: 16,
        marginHorizontal: 22,
        borderRadius: 15,
    },
    functionContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 12,
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },
    functionButton: {
        backgroundColor: '#ffffff',
        padding: 25,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 10,
    },
    editProfileButton: {
        // backgroundColor: '#5bc0de',
        // backgroundColor: '#DEDEDE',
        padding: 10,
        marginTop: 4,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: 'grey',
        borderWidth: 0.8,
    },
    icon:{
        width: 48,
        height: 48,
    },
    iconV2:{
        width: 60,
        height: 60,
    },
    profileInfo: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 24,
        paddingLeft: 10,
    },
    profileText: {
        fontSize: 24,
    },
    functionButtonIcon: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height: 80,
        width: 80,
    },
    functionText: {
        fontSize: 24,
        textAlign:'center',
        marginVertical:12,
    },
    linkText: {
        fontSize: 18,
        textAlign:'center',
        marginVertical:12,
    },
    imageScrollView:{
        marginLeft: 12,
        marginVertical: 0,
    },
    imageContainer: {
        marginRight: 10,
    },
    museumImage: {
        width: 180,
        height: 130,
        borderRadius: 20,
    },
    subTitleText: {
        marginTop: 5,
        color: 'grey',
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    subTitleContainer: {
        marginHorizontal:24,
        marginBottom: 10,
    },
});
