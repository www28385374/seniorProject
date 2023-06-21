import React, {useState, useEffect} from 'react';
import { TouchableRipple } from 'react-native-paper';
import { View, Text, StyleSheet, Image, ScrollView, Linking} from 'react-native';
import { Box, Stack, Heading, Button } from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements';


import colors from '../config/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
const renderCategoryText = (param) =>{
    switch(param) {
        case '1':
            return '視覺藝術（藝術品與美術）';
        case '2':
            return '工藝（不含古物、古董）';
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

const STORAGE_KEY_DATA_ID = '@d_id'
const STORAGE_KEY_DATA_UNIT = '@d_unit'
const STORAGE_KEY_DATA_TITLE = '@d_title'

const EventContentScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout( async ()=>{
            const d_id = await AsyncStorage.getItem(STORAGE_KEY_DATA_ID)
            const d_unit = await AsyncStorage.getItem(STORAGE_KEY_DATA_UNIT)
            var details = {
                'id': d_id,
                'unit': d_unit,
            };
            //Changes form data into x-www-form-urlencoded format
            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
        
            fetch("http://192.168.137.51:8080/frontend/show_single_post", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            }).then(resp => {
                return Promise.all([resp.ok, resp.status, resp.json()]);
                }).then(([ok, status, json]) => {
                    // console.log(json.result)
                    setcontents([...json.result]);
                    const title = json.result[0].cul_title;
                    navigation.setOptions({ title: title })
                if (ok) {
                    console.log(ok)
                } else {
                    // this.handleError(status, json.error);
                    throw new Error(json.error);
                }
                }).catch(error => {
                throw error;
                });
        },1000)
    }, [])

    const DataContent = ({ contents }) => {
        return (
            contents.map((info) => (
                <View style={{backgroundColor:'white'}}underlayColor="lightgrey" onPress={()=> {}} key='1'>
                <View>
                    <Box
                        rounded="xl"
                        maxWidth="100%"
                    >
                        <Stack space={1} p={[4, 4, 8]}>
                            <View style={styles.inline}>
                                <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 0}}>
                                    <Image source={{uri:'https://img.icons8.com/color/48/000000/' + 'adjacent'}}  style={{ width: 24, height: 24}}/>
                                    <Text style={{color:'grey', fontSize: 16, marginLeft: 2}}>{renderCityText(info.city_id)}</Text>
                                </View>
                                <View>
                                    {/* <Icon style={{padding:3}}name="cross" color='grey' size={40} type="entypo" onPress={()=>{navigation.goBack()}}/> */}
                                </View>
                            </View>
                            <Heading size={["lg", "lg", "lg"]}>
                                {info.cul_title || info.se_title}
                            </Heading>
                            <View style={styles.inline}>
                                <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 0}}>
                                    <Image source={{uri:'https://img.icons8.com/color/48/000000/' + renderCategoryIcon(info.t_id)}}  style={{ width: 20, height: 20 }}/>
                                    <Text style={{color:'dodgerblue', fontSize: 14, marginLeft: 2}}> {renderCategoryText(info.t_id)}</Text>
                                    <Text style={{color:'grey', fontSize: 14, marginLeft: 2}}> — 日期：{info.se_upload_date || info.cul_upload_date}</Text>
                                    {/* <Button
                                        p={2}
                                        style={{ marginLeft: 10}}
                                        colorScheme={ 'blue'}
                                    >
                                    <Text style={{paddingHorizontal: 6, color: colors.white}}>
                                        {'訂閲'}
                                    </Text>
                                    </Button> */}
                                </View>
                            </View>
                            
                            <Heading size={["md", "md", "md"]} color="gray.700" style={{fontWeight: 'normal',marginTop: 0}} >
                                {info.se_content || info.cul_content}
                            </Heading>
                            {/* <Heading size={["sm", "sm", "sm"]} color="gray.700" style={{fontWeight: 'normal',marginTop: 0,}}
                                onPress={() => Linking.openURL(info.se_href || info.cul_href)}>
                                查看更多：
                            </Heading> */}
                            <Button
                                title="Press me"
                                onPress={() => Linking.openURL(info.se_href || info.cul_href)}>
                                <Text style={{fontSize:24, color:'white'}}>查看更多</Text>
                            </Button>
                            {/* <Heading size={["sm", "sm", "sm"]} color="gray.700" style={{fontWeight: 'normal',marginTop: 0, color:'blue'}}
                                onPress={() => Linking.openURL(info.se_href || info.cul_href)}>
                                {info.se_href || info.cul_href}
                            </Heading> */}
                            
                        </Stack>
                    </Box>
                </View>
            </View>
            ))
        );
    };
    const [contents, setcontents] = useState([]);

    return (
        <ScrollView>
            <DataContent contents={contents}/>
        </ScrollView>
    );
};

export default EventContentScreen;

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
});