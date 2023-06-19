import React, { useState, useEffect, Fragment } from 'react';
import { TouchableRipple } from 'react-native-paper';
import { RefreshControl, View, Text, StyleSheet, Image, ScrollView, ToastAndroid} from 'react-native';
import { Box, Stack, Heading } from "native-base";
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import RNCalendarEvents from "react-native-calendar-events";
import moment from 'moment';
// import 'moment/locale/zh-cn';

import colors from '../config/colors';

let saveArray = [];

const STORAGE_KEY_MEMBER_ID = '@m_id'
const STORAGE_KEY_DATA_ID = '@d_id'
const STORAGE_KEY_DATA_TITLE = '@d_title'
const STORAGE_KEY_DATA_UNIT = '@d_unit'

// save data to Async Storage
const saveData = async (key,value) => {
    try {
        await AsyncStorage.setItem(key, value)
        console.log(`testlog ${key} = ${value}`);
    } catch (e) {
        alert('Failed to save the data to the storage')
        // console.log('fail');
        // console.log(e);
    }
}

// Fetch API
var _request = (url, method) =>
  fetch(url, {
    method: method,
  }).then(resp => {
    return Promise.all([resp.ok, resp.status, resp.json()]);
  }).then(([ok, status, json]) => {
    if (ok) {
      return json;
    } else {
        console.log(json.error);
    }
  }).catch(error => {
        console.log(error);
  });

let checkSaveStatus = async () => {
    const values = await AsyncStorage.getItem(STORAGE_KEY_MEMBER_ID)
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

    fetch("http://192.168.137.51:8080/frontend/show_save_all_data", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then(resp => {
        return Promise.all([resp.ok, resp.status, resp.json()]);
    }).then(([ok, status, json]) => {
        const data = json.result;
        console.log("data" + data)
        data.forEach(({id}) => saveArray.push(id))
        if (true) {
            return data.forEach(({id}) => saveArray.push(id));
        } else {
            console.log(json.error);
        }
    }).catch(error => {
        console.log(error);
    });
};

// Check if screen in near to End of Screen
let isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) =>{
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
}

const HomeScreenAll = ({navigation}) => {

    useFocusEffect(
        React.useCallback(() => {
          // Do something when the screen is focused
          return () => {
            saveArray = [];
          };
        }, [])
    )
    // Pull to refresh
    // const [refreshing, setRefreshing] = React.useState(false);
    // const wait = (timeout) => {
    //     return new Promise(resolve => setTimeout(resolve, timeout));
    // }
    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     wait(2000).then(() => setRefreshing(false));
    //     setLimit(10)
    //     checkSaveStatus()
    //     setTimeout(()=>{
    //         checkSaveStatus();
    //         _request("http://192.168.137.51:8080/Museum/Read", "GET")
    //         .then((data) => {
    //             console.log(`saveArr = ${saveArray}`)
    //             setnews(data.map((allData, index) => ({
    //                 ...allData,
    //                 saveStatus: (saveArray.includes(data[index].d_id) ? "1" : "0")
    //               }))
    //             );
    //         })
    //       },1000)
    // })

    // Populate UI (events data)
    useEffect(() => {
        checkSaveStatus();
        setTimeout(()=>{
            _request("http://192.168.137.51:8080/frontend/show_all", "GET")
            .then((data) => {
                const res = data.result;
                console.log(`saveArr = ${saveArray}`)
                setnews(
                    res.map((allData, index) => ({
                    ...allData,
                    saveStatus: (saveArray.includes(res[index].id) ? "1" : "0")
                }))
                );
            })
            .catch(error => console.log(error))
        },1000)
    }, [])

    // Set limit of event shown
    const [limit, setLimit] = React.useState(10)
    const loadMoreData = () => {
        setLimit( limit + 5 );
    }

const NewsList = ({ news }) => {
    const renderCategoryText = (param) =>{
        switch(param) {
            case '1':
                return '視覺藝術';
            case '2':
                return '工藝';
            case '3':
                return '設計';
            case '4':
                return '古典與傳統音樂';
            case '5':
                return '流行音樂';
            case '6':
                return '戲劇';
            case '7':
                return '舞蹈';
            case '8':
                return '說唱';
            case '9':
                return '影視／廣播';
            case '10':
                return '民俗與文化資產';
            case '11':
                return '語文與圖書';
            case '12':
                return '其他';
            case '13':
                return '綜合';
            default:
                return '其他';
        }
    };
    const renderCategoryIcon = (param) =>{
        switch(param) {
            case '1':
                return 'drawing--v2';
            case '2':
                return 'hammer-and-anvil';
            case '3':
                return 'drawing--v2';
            case '4':
                return '70s-music';
            case '5':
                return 'musical-notes';
            case '6':
                return 'theatre-mask';
            case '7':
                return 'ballerina-full-body';
            case '8':
                return 'musical-notes';
            case '9':
                return 'camcorder-pro';
            case '10':
                return 'pagoda';
            case '11':
                return 'story-book';
            case '12':
                return 'help--v1';
            case '13':
                return 'categorize';
            default:
                return 'help--v1';
        }
    };
    const renderCityText = (param) =>{
        switch(param) {
            case '1':
                return '彰化縣';
            case '2':
                return '嘉義市';
            case '3':
                return '嘉義縣';
            case '4':
                return '新竹市';
            case '5':
                return '新竹縣';
            case '6':
                return '花蓮市';
            case '7':
                return '高雄市';
            case '8':
                return '基隆市';
            case '9':
                return '金門縣';
            case '10':
                return '連江縣';
            case '11':
                return '苗栗市';
            case '12':
                return '南投市';
            case '13':
                return '新北市';
            case '14':
                return '澎湖縣';
            case '15':
                return '屏東市';
            case '16':
                return '臺中市';
            case '17':
                return '臺南市';
            case '18':
                return '臺北市';
            case '19':
                return '臺東市';
            case '20':
                return '桃園市';
            case '21':
                return '宜蘭市';
            case '22':
                return '雲林縣';
            default:
                return '其他';
        }
    };
    const showAddToCalendarToast = () => {
        ToastAndroid.showWithGravity(
          "成功加入行事曆!",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      };
    let key;
    // render Events Data
    return (
        // slice to limit data shown on screen
        // console.log('news' + news),
        news.slice(0,limit).map((info) => (
            <TouchableRipple style={{backgroundColor:'white', marginTop: 5}}underlayColor="lightgrey"
                onPress={()=> {
                    saveData(STORAGE_KEY_DATA_ID, info.id)
                    saveData(STORAGE_KEY_DATA_TITLE, info.title)
                    saveData(STORAGE_KEY_DATA_UNIT, info.unit)
                    navigation.navigate('EventContentScreen') 
                }} 
                key={ info.cul_id }>
                <View>
                    <Box
                        rounded="lg"
                        maxWidth="100%"
                    >
                        <Stack space={1} p={[4, 4, 8]} >
                            <View style={[(info.unit === 'cul') ? styles.triangleCornerTopRight : styles.triangleCornerTopRightSecondary]}/>
                            <Text style={styles.triangleCornerTopRightText}>{(info.unit === 'cul') ? '藝文' :'樂齡'}</Text>
                            <View style={styles.inline}>
                                <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
                                    <Image source={{uri:'https://img.icons8.com/color/48/000000/adjacent.png'}}  style={{ width: 30, height: 30}}/>
                                    <Text style={{color:'grey', fontSize: 22, marginLeft: 2}}> { renderCityText(info.city_id)} </Text>
                                    <Image source={{uri:'https://img.icons8.com/color/48/000000/' + renderCategoryIcon(info.t_id)}}  style={{ width: 30, height: 30, marginLeft: 6  }}/>
                                    <Text style={{color:'grey', fontSize: 22, marginLeft: 2}}> { renderCategoryText(info.t_id) } </Text>
                                </View>
                                    {/* <Icon style={{padding:3}}name="dots-three-vertical" color='grey' size={16} type="entypo" /> */}
                            </View>
                            <Heading size={["lg", "lg", "lg"]} noOfLines={1}>
                                { info.title }
                            </Heading>
                            <Heading size={["md", "md", "md"]} color="gray.700" style={{fontWeight: 'normal',marginTop: 5}} noOfLines={1}>
                                { info.content }
                            </Heading>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color:'grey', marginRight: 10,fontSize: 18}}>
                                    { info.upload_date }
                                </Text>
                                <View style={{flex:1,justifyContent:'space-between',flexDirection:'row'}}>
                                    <TouchableRipple onPress={
                                        // Save / Unsave Event Function
                                        async ()=>{
                                            if(info.saveStatus === '0'){
                                                if(info.unit === 'cul'){
                                                    const values = await AsyncStorage.getItem(STORAGE_KEY_MEMBER_ID)
                                                    var details = {
                                                        'm_id': values,
                                                        'cul_id': info.id,
                                                    };
                                                    //Changes form data into x-www-form-urlencoded format
                                                    var formBody = [];
                                                    for (var property in details) {
                                                        var encodedKey = encodeURIComponent(property);
                                                        var encodedValue = encodeURIComponent(details[property]);
                                                        formBody.push(encodedKey + "=" + encodedValue);
                                                    }
                                                    formBody = formBody.join("&");
                                                    console.log(formBody)
                                                    fetch("http://192.168.137.51:8080/culture/save_culture_data", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/x-www-form-urlencoded'
                                                        },
                                                        body: formBody
                                                    }).then(resp => {
                                                        return Promise.all([resp.ok, resp.status, resp.json()]);
                                                    }).then(([ok, status, json]) => {
                                                            // console.log([ok,status,json])
                                                        if (json.status == true) {
                                                            return json;
                                                        } else {
                                                            throw new Error(json.error);
                                                        }
                                                    }).catch(error => {
                                                        throw error;
                                                    });
                                                    info.saveStatus = '1'
                                                    setnews([...news])
                                                } else {
                                                    const values = await AsyncStorage.getItem(STORAGE_KEY_MEMBER_ID)
                                                    var details = {
                                                        'm_id': values,
                                                        'se_id': info.id,
                                                    };
                                                    //Changes form data into x-www-form-urlencoded format
                                                    var formBody = [];
                                                    for (var property in details) {
                                                        var encodedKey = encodeURIComponent(property);
                                                        var encodedValue = encodeURIComponent(details[property]);
                                                        formBody.push(encodedKey + "=" + encodedValue);
                                                    }
                                                    formBody = formBody.join("&");
                                                    console.log(formBody)
                                                    fetch("http://192.168.137.51:8080/senior/save_senior_data", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/x-www-form-urlencoded'
                                                        },
                                                        body: formBody
                                                    }).then(resp => {
                                                        return Promise.all([resp.ok, resp.status, resp.json()]);
                                                    }).then(([ok, status, json]) => {
                                                            // console.log([ok,status,json])
                                                        if (json.status == true) {
                                                            return json;
                                                        } else {
                                                            throw new Error(json.error);
                                                        }
                                                    }).catch(error => {
                                                        throw error;
                                                    });
                                                    info.saveStatus = '1'
                                                    setnews([...news])
                                                }
                                                
                                            } else{
                                                if(info.unit === 'cul'){
                                                    const values = await AsyncStorage.getItem(STORAGE_KEY_MEMBER_ID)
                                                    var details = {
                                                        'm_id': values,
                                                        'cul_id': info.id,
                                                    };
                                                    //Changes form data into x-www-form-urlencoded format
                                                    var formBody = [];
                                                    for (var property in details) {
                                                        var encodedKey = encodeURIComponent(property);
                                                        var encodedValue = encodeURIComponent(details[property]);
                                                        formBody.push(encodedKey + "=" + encodedValue);
                                                    }
                                                    formBody = formBody.join("&");
                                                    console.log(formBody)
                                                    fetch("http://192.168.137.51:8080/culture/delete_save_culture_data", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/x-www-form-urlencoded'
                                                        },
                                                        body: formBody
                                                    }).then(resp => {
                                                        return Promise.all([resp.ok, resp.status, resp.json()]);
                                                        }).then(([ok, status, json]) => {
                                                            //   console.log([ok,status,json])
                                                        if (json.status == true) {
                                                            return json;
                                                        } else {
                                                            // this.handleError(status, json.error);
                                                            throw new Error(json.error);
                                                        }
                                                        }).catch(error => {
                                                        throw error;
                                                        });
                                                    info.saveStatus = '0'
                                                    setnews([...news])
                                                } else {
                                                    const values = await AsyncStorage.getItem(STORAGE_KEY_MEMBER_ID)
                                                    var details = {
                                                        'm_id': values,
                                                        'se_id': info.id,
                                                    };
                                                    //Changes form data into x-www-form-urlencoded format
                                                    var formBody = [];
                                                    for (var property in details) {
                                                        var encodedKey = encodeURIComponent(property);
                                                        var encodedValue = encodeURIComponent(details[property]);
                                                        formBody.push(encodedKey + "=" + encodedValue);
                                                    }
                                                    formBody = formBody.join("&");
                                                    console.log(formBody)
                                                    fetch("http://192.168.137.51:8080/senior/delete_save_senior_data", {
                                                        method: "POST",
                                                        headers: {
                                                            'Accept': 'application/json',
                                                            'Content-Type': 'application/x-www-form-urlencoded'
                                                        },
                                                        body: formBody
                                                    }).then(resp => {
                                                        return Promise.all([resp.ok, resp.status, resp.json()]);
                                                        }).then(([ok, status, json]) => {
                                                            //   console.log([ok,status,json])
                                                        if (json.status == true) {
                                                            return json;
                                                        } else {
                                                            // this.handleError(status, json.error);
                                                            throw new Error(json.error);
                                                        }
                                                        }).catch(error => {
                                                        throw error;
                                                        });
                                                    info.saveStatus = '0'
                                                    setnews([...news])
                                                }
                                                
                                            }
                                        }
                                    }>
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 1,paddingRight: 5,borderRadius: 10}}>
                                            <Icon name={ info.saveStatus == '1' ? "bookmark" : "bookmark-outline" } color={colors.primary} size={30} type="materialicons" />
                                            <Text style={{color:'grey',fontSize: 18}}>收藏</Text>
                                        </View>
                                    </TouchableRipple>
                                    <TouchableRipple onPress={
                                        // Add Event to Calendar
                                        ()=> {
                                            showAddToCalendarToast()
                                            let eventStartDate = moment(`${info.upload_date} 08`).toISOString();
                                            let dayBefore = moment(`${info.upload_date} 08`).subtract(1, 'days').toISOString();
                                            let eventEndDate = moment(`${info.upload_date} 08`).add(4, 'hours').toISOString()
                                            console.log(eventStartDate)
                                            console.log(eventEndDate)
                                            RNCalendarEvents.saveEvent(info.title, {
                                                startDate: eventStartDate,
                                                endDate: eventEndDate,
                                                location: renderCityText(info.city_id),
                                                allDay: true,
                                                event:true,
                                                alarms: [{
                                                    date: '2022-09-15T19:21:00.000Z'
                                                  }]
                                            }).then((res) => {
                                                console.log("res" + res);
                                            }).catch((error) => {
                                                console.log("err" + error);
                                            });
                                        }
                                    }>
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 1,paddingRight: 5,paddingLeft: 5,borderRadius: 10}}>
                                            <Image source={{uri:'https://img.icons8.com/pastel-glyph/64/4632a1/calendar-plus.png'}}  style={{ width: 30, height: 30}}/>
                                            <Text style={{color:'grey',fontSize:18}}> 加入行事曆</Text>
                                        </View>
                                    </TouchableRipple>
                                </View>
                            </View>
                        </Stack>
                    </Box>
                </View>
            </TouchableRipple>
        ))
    );
};
    const [news, setnews] = useState([]);
    return (
        <ScrollView
            onScroll={({nativeEvent})=>{
                if(isCloseToBottom(nativeEvent)){
                    loadMoreData();
                }
            }}
        //     refreshControl={
        //     <RefreshControl
        //       refreshing={refreshing}
        //       onRefresh={onRefresh}
        //       colors={["dodgerblue","green","purple","red"]}
        //     />
        //   }
        >
            <View style={{marginTop: -6}}>
                <NewsList news={news} />
            </View>
        </ScrollView>
        
    );
};

export default HomeScreenAll;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: colors.white,
    },
    center: {
        flex: 1,
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    triangleCornerTopRight: {
        flex: 1,
        position: 'absolute',
        right: 0,
        justifyContent: 'flex-start',
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 65,
        borderTopWidth: 65,
        borderRightColor: "transparent",
        // borderTopColor: "#f4b082",
        borderTopColor: colors.primary,
        transform: [{ rotate: "90deg" }],
    },
    triangleCornerTopRightSecondary: {
        flex: 1,
        position: 'absolute',
        right: 0,
        justifyContent: 'flex-start',
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRightWidth: 65,
        borderTopWidth: 65,
        borderRightColor: "transparent",
        // borderTopColor: "#f4b082",
        borderTopColor: colors.secondary,
        transform: [{ rotate: "90deg" }],
    },
    triangleCornerTopRightText: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
        top: 20,
        right: -10,
        // left: 0,
        width: 0,
        height: 0,
        borderRightWidth: 65,
        borderTopWidth: 65,
        borderRightColor: "transparent",
        borderTopColor: "transparent",
        transform: [{ rotate: "45deg" }],
    },
});
