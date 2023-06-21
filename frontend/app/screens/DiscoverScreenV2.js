import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import { Box, Button } from 'native-base';

import colors from '../config/colors';
import { TouchableRipple } from 'react-native-paper';
import { handleScheduleNotification } from '../components/notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

var _request = (url, method) =>
fetch(url, {
    method: method,
}).then(resp => {
    return Promise.all([resp.ok, resp.status, resp.json()]);
}).then(([ok, status, json]) => {
    if (ok) {
        return json;
    } else {
        handleError(status, json.error);
        throw new Error(json.error);
    }
}).catch(error => {
    throw error;
});

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

const STORAGE_KEY = '@m_id'
const subscribedArray = [];

let checkSubscribeStatus = async () => {
    const values = await AsyncStorage.getItem(STORAGE_KEY)
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

    fetch("http://192.168.137.51:8080/Museum/showSubscribeType", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formBody
    }).then(resp => {
        return Promise.all([resp.ok, resp.status, resp.json()]);
      }).then(([ok, status, json]) => {
          json.forEach(({t_id}) => subscribedArray.push(t_id))
        if (json.status == true) {
            return json.forEach(({t_id}) => subscribedArray.push(t_id));
        } else {
            // this.handleError(status, json.error);
            throw new Error(json.error);
        }
      }).catch(error => {
        throw error;
      });
};

const DiscoverScreenV2 = ({navigation}) => {
    useEffect(() => {
        checkSubscribeStatus();
        setTimeout(()=>{
            _request("http://192.168.137.51:8080/Museum/showAllType", "GET")
            .then((data) => {
            setfollows(data.map((allData,index) => (
                {
                    ...allData,
                    subscribeStatus : (subscribedArray.includes(data[index].t_id) ? "1" : "0"),
                }))
            )
            console.log(follows);
        })
        },1000)
    }, [])

    const FollowList = ({ follows }) => {
        let key;
        return (
        follows.map((follow) => (
                <TouchableRipple style={{backgroundColor: colors.white}} underlayColor="lightgrey" 
                key={ follow.t_id }>
                    <View>
                        <Box style={styles.box}>
                            <Image source={{uri:'https://img.icons8.com/color/48/000000/' + renderCategoryIcon(follow.t_id)}}  style={{ width: 24, height: 24 }}/>
                            <Text style={{marginLeft: 10}}>
                                {key = +follow.t_id}. &nbsp;
                                { follow.t_name }
                            </Text>
                            <Button
                                onPress={
                                    async ()=>{
                                        if(follow.subscribeStatus === '0'){
                                            const values = await AsyncStorage.getItem(STORAGE_KEY)
                                            var details = {
                                                'm_id': values,
                                                't_id': follow.t_id,
                                            };
                                            console.log(values)
                                            console.log("tid" + follow.t_id)
                                            //Changes form data into x-www-form-urlencoded format
                                            var formBody = [];
                                            for (var property in details) {
                                                var encodedKey = encodeURIComponent(property);
                                                var encodedValue = encodeURIComponent(details[property]);
                                                formBody.push(encodedKey + "=" + encodedValue);
                                            }
                                            formBody = formBody.join("&");
                                        
                                            fetch("http://192.168.137.51:8080/Museum/subscribeType", {
                                                method: "POST",
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/x-www-form-urlencoded'
                                                },
                                                body: formBody
                                            }).then(resp => {
                                                return Promise.all([resp.ok, resp.status, resp.json()]);
                                              }).then(([ok, status, json]) => {
                                                    console.log([ok,status,json])
                                                if (json.status == true) {
                                                    return json;
                                                } else {
                                                    // this.handleError(status, json.error);
                                                    throw new Error(json.error);
                                                }
                                              }).catch(error => {
                                                throw error;
                                              });
                                            let key2= +follow.t_id-1;
                                            follows[key2].subscribeStatus = '1'
                                            setfollows([...follows])
                                        } else{
                                            const values = await AsyncStorage.getItem(STORAGE_KEY)
                                            var details = {
                                                'm_id': values,
                                                't_id': follow.t_id,
                                            };
                                            console.log(values)
                                            console.log("tid" + follow.t_id)
                                            //Changes form data into x-www-form-urlencoded format
                                            var formBody = [];
                                            for (var property in details) {
                                                var encodedKey = encodeURIComponent(property);
                                                var encodedValue = encodeURIComponent(details[property]);
                                                formBody.push(encodedKey + "=" + encodedValue);
                                            }
                                            formBody = formBody.join("&");
                                        
                                            fetch("http://192.168.137.51:8080/Museum/deleteSubscribeType", {
                                                method: "POST",
                                                headers: {
                                                    'Accept': 'application/json',
                                                    'Content-Type': 'application/x-www-form-urlencoded'
                                                },
                                                body: formBody
                                            }).then(resp => {
                                                return Promise.all([resp.ok, resp.status, resp.json()]);
                                              }).then(([ok, status, json]) => {
                                                    console.log([ok,status,json])
                                                if (json.status == true) {
                                                    return json;
                                                } else {
                                                    // this.handleError(status, json.error);
                                                    throw new Error(json.error);
                                                }
                                              }).catch(error => {
                                                throw error;
                                              });
                                            let key2= +follow.t_id-1;
                                            follows[key2].subscribeStatus = '0'
                                            setfollows([...follows])
                                        }
                                    }
                                }
                                p={2}
                                style={{ marginLeft: 'auto'}}
                                colorScheme={ follows[key-1].subscribeStatus == '0' ? 'blue' : 'light' }
                            >
                                <Text style={{paddingHorizontal: 6, color: colors.white}}>
                                    { follows[key-1].subscribeStatus == '0' ? '訂閲' : '訂閲中' }
                                </Text>
                            </Button>
                        </Box>
                    </View>
                </TouchableRipple>
            ))
        );
    };

    const [follows, setfollows] = useState([]);

    return (
        <ScrollView>
            <TouchableRipple style={{marginTop:3, backgroundColor: colors.white}} underlayColor="lightgrey" onPress={()=>handleScheduleNotification('hello', 'this is message')}>
                <View style={styles.box}>
                    <Image source={{uri:'https://img.icons8.com/color/48/000000/overview-pages-3'}}  style={{ width: 24, height: 24 }}/>
                    <Text style={{marginLeft: 10}}>所有看板</Text>
                </View>
            </TouchableRipple>

            <TouchableRipple style={{backgroundColor: colors.white}}underlayColor="lightgrey" onPress={()=> {}}>
                <Box style={styles.box}>
                    <Image source={{uri:'https://img.icons8.com/color/48/000000/fire-element--v1.png'}}  style={{ width: 24, height: 24 }}/>
                    <Text style={{marginLeft: 10}}>熱門看板</Text>
                </Box>
            </TouchableRipple>

            <View>
                <Box style={styles.box2}>
                    <Text style={{marginLeft: 8, color:'grey'}}>精選看板</Text>
                </Box>
            </View>

            <FollowList follows={follows}/>
        </ScrollView>
    );
};

export default DiscoverScreenV2;

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
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor:'white',
        padding: 15,
        borderBottomColor: "lightgrey",
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    box2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        padding: 15,
    }
});

