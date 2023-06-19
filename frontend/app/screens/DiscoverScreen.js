import React, { useState, useEffect, Fragment }  from 'react';
import { ScrollView, StyleSheet, View, Text, Image, Alert} from 'react-native';
import { Box, Button, Modal, Center, Select, CheckIcon } from 'native-base';
import { TouchableRipple } from 'react-native-paper';
import { Root, Popup, Toast } from 'react-native-popup-confirm-toast'
import { useFocusEffect } from '@react-navigation/native';

import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';


import colors from '../config/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backgroundColor, marginLeft, textAlign } from 'styled-system';
import { white } from 'react-native-paper/lib/typescript/styles/colors';

var _request = (url, method) =>
fetch(url, {
    method: method,
}).then(resp => {
    return Promise.all([resp.ok, resp.status, resp.json()]);
}).then(([ok, status, json]) => {
    if (ok) {
        return json;
    } else {
        // handleError(status, json.error);
        throw new Error(json.error);
    }
}).catch(error => {
    throw error;
});

const STORAGE_KEY = '@m_id';
let subscribedArray = [];

// Render Icons
const renderCategoryIcon = (param) =>{
    switch (param) {
        case '1':
            return '/f/f8/Emblem_of_Changhua_County.svg/100px-Emblem_of_Changhua_County.svg.png';
        case '2':
            return '/4/4d/Emblem_of_Chiayi_City.svg/100px-Emblem_of_Chiayi_City.svg.png';
        case '3':
            return '3/33/Emblem_of_Chiayi_County.svg/100px-Emblem_of_Chiayi_County.svg.png';
        case '4':
            return '/f/fc/Emblem_of_Hsinchu_City.svg/100px-Emblem_of_Hsinchu_City.svg.png';
        case '5':
            return '/a/a3/Hsinchu_County_Emblem.svg/100px-Hsinchu_County_Emblem.svg.png';
        case '6':
            return '/2/28/Emblem_of_Hualien_County_2010.svg/100px-Emblem_of_Hualien_County_2010.svg.png';
        case '7':
            return '/a/a9/Emblem_of_Kaohsiung_City.svg/100px-Emblem_of_Kaohsiung_City.svg.png';
        case '8':
            return '/b/ba/Seal_of_Keelung.svg/100px-Seal_of_Keelung.svg.png';
        case '9':
            return '/f/fb/Emblem_of_Kinmen_County.svg/100px-Emblem_of_Kinmen_County.svg.png';
        case '10':
            return '/5/57/Emblem_of_Lienchiang_County.svg/100px-Emblem_of_Lienchiang_County.svg.png';
        case '11':
            return '/f/f8/Miaoli_City_emblem.svg/100px-Miaoli_City_emblem.svg.png';
        case '12':
            return '/2/2a/Seal_of_Nantou_County.svg/100px-Seal_of_Nantou_County.svg.png';
        case '13':
            return '/d/da/New_Taipei_City_seal.svg/100px-New_Taipei_City_seal.svg.png';
        case '14':
            return '7/78/Seal_of_Penghu_County.svg/100px-Seal_of_Penghu_County.svg.png';
        case '15':
            return '0/09/Emblem_of_Pingtung_County.svg/100px-Emblem_of_Pingtung_County.svg.png';
        case '16':
            return '/5/5d/Seal_of_Taichung.svg/100px-Seal_of_Taichung.svg.png';
        case '17':
            return '2/2f/Seal_of_Tainan_City_%281978-2014%29.svg/100px-Seal_of_Tainan_City_%281978-2014%29.svg.png';
        case '18':
            return '/6/66/Emblem_of_Taipei_City.svg/100px-Emblem_of_Taipei_City.svg.png';
        case '19':
            return '/b/b4/Emblem_of_Taitung_County.svg/70px-Emblem_of_Taitung_County.svg.png';
        case '20':
            return '/2/2d/Emblem_of_Taoyuan_City.svg/100px-Emblem_of_Taoyuan_City.svg.png';
        case '21':
            return '/6/69/City_seal_of_Yilan_City%281%29.png/100px-City_seal_of_Yilan_City%281%29.png';
        case '22':
            return '/0/0d/Emblem_of_Yunlin_County.svg/100px-Emblem_of_Yunlin_County.svg.png';
        default:
            return 'help--v1';
    }
};

// Push Subscribed key to Array
let checkSubscribeStatus = async () => {
    const values = await AsyncStorage.getItem(STORAGE_KEY);
    var details = {
        'm_id': values,
        'sub_unit': 'S'
    };
    //Changes form data into x-www-form-urlencoded format
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://192.168.137.51:8080/subscribe/show_subscribe_senior', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    }).then(resp => {
        return Promise.all([resp.ok, resp.status, resp.json()]);
      }).then(([ok, status, json]) => {
            const res = json.result;
            console.log(res);
          res.forEach(({city_id}) => subscribedArray.push(city_id));
          console.log('sub array = ' + subscribedArray)
        if (json.status === true) {
            return res.forEach(({city_id}) => subscribedArray.push(city_id));

        } else {
            // this.handleError(status, json.error);
            throw new Error(json.error);
        }
      }).catch(error => {
        console.log(error);
      });
};

const DiscoverScreen = ({navigation}) => {
    const [service, setService] = React.useState("");

    useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
    
          return () => {
            subscribedArray = [];
          };
        }, [])
    )
    const [follows, setfollows] = useState([
        {t_id: 1,},
        {t_id: 2,},
        {t_id: 3,},
        {t_id: 4,},
        {t_id: 5,},
        {t_id: 6,},
        {t_id: 7,},
        {t_id: 8,},
        {t_id: 9,},
        {t_id: 10,},
        {t_id: 11,},
        {t_id: 12,},
    ]);
    const [showModal, setShowModal] = useState(false);
    const [modalKey, setModalKey] = useState(0)
    const [shouldShow, setShouldShow] = useState(false);

    const bodyComponent = (city_id, subscribeStatus) => {

        return <>
            <TouchableOpacity
            onPress={
                // console.log('button onpress logs'+follows[18].subscribeStatus)
                async () => {
                    Popup.show({
                        type: 'success',
                        title: '訂閲成功!',
                        textBody: '已經加入訂閲清單',
                        buttonText: 'Tamam',
                        timing: 3000,
                        buttonEnabled: false,
                        callback: () => Popup.hide()
                    })
                    if (true){
                        const values = await AsyncStorage.getItem(STORAGE_KEY);
                        var details = {
                            'm_id': values,
                            'city_id': city_id,
                            'sub_unit': 'S'
                        };
                        console.log(values);
                        console.log('city id' + city_id);
                        var formBody = [];
                        for (var property in details) {
                            var encodedKey = encodeURIComponent(property);
                            var encodedValue = encodeURIComponent(details[property]);
                            formBody.push(encodedKey + '=' + encodedValue);
                        }
                        formBody = formBody.join('&');
    
                        fetch('http://192.168.137.51:8080/subscribe/subscribe_unit', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: formBody,
                        }).then(resp => {
                            return Promise.all([resp.ok, resp.status, resp.json()]);
                            }).then(([ok, status, json]) => {
                                console.log(formBody)
                                console.log([ok,status,json]);
                            if (json.status === true) {
                                return json;
                            } else {
                                throw new Error(json.error);
                            }
                            }).catch(error => {
                            console.log(error);
                            });
                        // let key2 = +follow.t_id - 1;
                        // follows[key2].subscribeStatus = '1';
                        setfollows([...follows]);
                        Popup.hide();
                    } else{
    
                    }
            }
            }
            
            >
                <Button style={{backgroundColor: subscribeStatus === '0' ? 'gray' : colors.secondary, height: 45, borderRadius: 8}}>
                    <Text style={{fontSize:16,color: 'white',fontWeight: 'bold'}}>樂齡</Text>
                </Button>
                {/* <Button style={{backgroundColor: colors.secondary , height: 45, borderRadius: 8}}><Text style={{fontSize:18}}>樂齡</Text></Button> */}
            </TouchableOpacity>
        </>
    }

    const FollowList = ({ follows }) => {
        let key;
        return (
            follows.map((follow, index) => (
                // console.log(follow.city_name_CN),
                <Fragment key={follow.city_id}>
                    <Text style={styles.hide}>
                        {key = follow.city_id }
                    </Text>
                    <Button key={follow.city_id}
                        onPress={
                            async ()=>{
                                const buttonColor = follow.subscribeStatus === '0' ? 'gray' : colors.primary
                                console.log('sub status = ' + follow.subscribeStatus)
                                // setShowModal(true);
                                // setModalKey(modalKey)
                                Popup.show({
                                    type: 'confirm',
                                    title: '您決定要訂閲/取消訂閲主題嗎?',
                                    // textBody: 'Masdasgasdg. ',
                                    bodyComponent: () => bodyComponent(follow.city_id, follow.subscribeStatus),
                                    closeOnPressBack: true,
                                    // okButtonStyle	: {backgroundColor: 'gray'},
                                    okButtonStyle	: {backgroundColor: buttonColor},
                                    // okButtonStyle	: {backgroundColor:  follow[key - 1].subscribeStatus === '0' ? 'light' : 'primary' },
                                    okButtonTextStyle : {color:'white'},
                                    buttonText: '藝文',
                                    confirmText: 'Cancel',
                                    callback: async () => {
                                        Popup.show({
                                            type: 'success',
                                            title: '訂閲成功!',
                                            textBody: '已經加入訂閲清單',
                                            buttonText: 'Tamam',
                                            timing: 3000,
                                            buttonEnabled: false,
                                            callback: () => Popup.hide()
                                        })
                                        if (follow.subscribeStatus === '0'){
                                            const values = await AsyncStorage.getItem(STORAGE_KEY);
                                            var details = {
                                                'm_id': values,
                                                'city_id': follow.city_id,
                                                'sub_unit': 'C'
                                            };
                                            console.log(values);
                                            console.log('city id' + follow.city_id);
                                            var formBody = [];
                                            for (var property in details) {
                                                var encodedKey = encodeURIComponent(property);
                                                var encodedValue = encodeURIComponent(details[property]);
                                                formBody.push(encodedKey + '=' + encodedValue);
                                            }
                                            formBody = formBody.join('&');
                    
                                            fetch('http://192.168.137.51:8080/subscribe/subscribe_unit', {
                                                method: 'POST',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/x-www-form-urlencoded',
                                                },
                                                body: formBody,
                                            }).then(resp => {
                                                return Promise.all([resp.ok, resp.status, resp.json()]);
                                                }).then(([ok, status, json]) => {
                                                    console.log(formBody)
                                                    console.log([ok,status,json]);
                                                if (json.status === true) {
                                                    return json;
                                                } else {
                                                    throw new Error(json.error);
                                                }
                                                }).catch(error => {
                                                console.log(error);
                                                });
                                            // let key2 = +follow.t_id - 1;
                                            // follows[key2].subscribeStatus = '1';
                                            setfollows([...follows]);
                                            Popup.hide();
                                        } else {
                                            const values = await AsyncStorage.getItem(STORAGE_KEY);
                                            var details = {
                                                'm_id': values,
                                                't_id': follow.t_id,
                                            };
                                            console.log(values);
                                            console.log('tid' + follow.t_id);
                                            //Changes form data into x-www-form-urlencoded format
                                            var formBody = [];
                                            for (var property in details) {
                                                var encodedKey = encodeURIComponent(property);
                                                var encodedValue = encodeURIComponent(details[property]);
                                                formBody.push(encodedKey + '=' + encodedValue);
                                            }
                                            formBody = formBody.join('&');
                    
                                            fetch('http://192.168.137.51:8080/Museum/deleteSubscribeType', {
                                                method: 'POST',
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/x-www-form-urlencoded',
                                                },
                                                body: formBody,
                                            }).then(resp => {
                                                return Promise.all([resp.ok, resp.status, resp.json()]);
                                                }).then(([ok, status, json]) => {
                                                    console.log([ok,status,json]);
                                                if (json.status === true) {
                                                    return json;
                                                } else {
                                                    // this.handleError(status, json.error);
                                                    throw new Error(json.error);
                                                }
                                                }).catch(error => {
                                                    console.log(error)
                                                });
                                            // let key2 = +follow.t_id - 1;
                                            // follows[key2].subscribeStatus = '0';
                                            setfollows([...follows]);
                                            Popup.hide();
                                        }
                                        
                                    },
                                    cancelCallback: () => {
                                        Popup.hide();
                                    },
                                })
                            }
                        }
                        p={2}
                        style={styles.button}
                        // colorScheme={ follows[key - 1].subscribeStatus === '0' ? 'light' : 'primary' }
                        // colorScheme={'rose.500:alpha.100'}
                    >
                        {/* {console.log(follows[follow.id - 1])} */}
                        <View style={styles.buttonContainer}>
                            <View style={{flex:1, flexDirection:'row',justifyContent:'center',}}>
                                {/* <Text style={styles.buttonNo}>{key = +follow.city_id}.</Text> */}
                                {/* <Image source={{uri:'https://img.icons8.com/color/48/000000/' + 'adjacent.png'}} style={styles.buttonLogo}/>

                                <Text style={{color:'white', fontSize: 32, fontWeight:'bolder'}}>高雄市</Text> */}
                                {/* <Text style={styles.buttonNo}>{key = +follow.city_id}.</Text> */}
                                <Image source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/'+ renderCategoryIcon(`${follow.city_id}`)}} style={[styles.buttonLogo,[{marginLeft:0}]]}/>
                                <View style={{flexWrap: 'wrap',flex: 1,flexDirection:'row', alignItems:'center',justifyContent:'flex-end',marginTop:'auto',marginBottom:'auto'}}>
                                    <Text style={styles.buttonText}> { follow.city_name_CN } </Text>
                                </View>
                            </View>
                        </View>
                    </Button>
                </Fragment>
            ))
        );
    };

    useEffect(() => {
        checkSubscribeStatus();
        setTimeout(()=>{
            _request('http://192.168.137.51:8080/subscribe/show_city_info', 'GET')
            .then((data) => {
                const res = data.result;
                console.log(res)
            res.map((allData,index) => console.log(res[index].city_id))
            setfollows(res.map((allData,index) => (
                {
                    ...allData,
                    subscribeStatus : (subscribedArray.includes(res[index].city_id) ? '1' : '0'),
                }))
            );
            setShouldShow(true)
            console.log(follows);
        });
        },1000);
    },[]);

    return (
    <Root style={{height: 1000}}>
        <ScrollView>
            <View>
                <Box style={styles.subTitleContainer}>
                    <Text style={styles.subTitleText}>訂閲主題</Text>
                </Box>
            </View>

            <Box style={styles.followListContainer}>
                { shouldShow ? (<FollowList follows={follows}/>) : null }
            </Box>

        </ScrollView>
    </Root>
    );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: colors.white,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    followListContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        backgroundColor:'white',
        marginTop: -10
    },
    subTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        // alignItems: 'center',
        alignItems: 'flex-start',
        justifyContent:'flex-start',
        // justifyContent:'center',
        backgroundColor:'white',
        padding: 15,
    },
    subTitleText: {
        marginLeft: 8,
        color:'black',
        fontSize: 24,
    },
    hide: {
        display: 'none',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        width: 160,
        height: 30,
        justifyContent: 'center',
    },
    button: {
        width: '44%',
        height: 89,
        marginVertical: 8,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonLogo: {
        width: 60,
        height: 60,
        marginTop: 7,
        marginRight: 2,
        // justifyContent: 'center',
        // alignItems:'center',
        // flex:1,
    },
    buttonNo: {
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
        flexWrap:'wrap',
        // marginRight: 10,
    },
    buttonText: {
        // alignSelf: '',
        color: colors.white,
        fontSize: 24,
        fontWeight: 'bold',
        flexWrap:'wrap',
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'white',
        padding: 15,
        borderBottomColor: "lightgrey",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
});