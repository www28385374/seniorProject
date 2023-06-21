import React, { useState, useEffect } from 'react';
import { TouchableRipple } from 'react-native-paper';
import { RefreshControl, View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import { Box, Stack, Heading } from 'native-base';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../config/colors';

const saveArray = [];

const STORAGE_KEY_MEMBER_ID = '@m_id';
const STORAGE_KEY_DATA_ID = '@d_id';
const STORAGE_KEY_DATA_TITLE = '@d_title';

// save data to Async Storage
const saveData = async (key,value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log(`${key} = ${value}`);
    } catch (e) {
        console.log('fail');
        console.log(e);
    }
};

// call API to get saved events id to add saveStatus to event
let checkSaveStatus = async () => {
    const values = await AsyncStorage.getItem(STORAGE_KEY_MEMBER_ID);
    var details = {
        'm_id': values,
    };
    //Changes form data into x-www-form-urlencoded format
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://192.168.178.221:8080/Museum/showCollectiondata', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
    }).then(resp => {
        return Promise.all([resp.ok, resp.status, resp.json()]);
    }).then(([ok, status, json]) => {
        json.forEach(({d_id}) => saveArray.push(d_id));
        // console.log('Arr:' + saveArray)
        if (json.status === true) {
            return json.forEach(({t_id}) => saveArray.push(d_id));
        } else {
            // this.handleError(status, json.error);
            throw new Error(json.error);
        }
    }).catch(error => {
        throw error;
    });
};

const dummyScreen = ({navigation}) => {
    // Pull to Refresh
    // const [refreshing, setRefreshing] = useState(false);
    // const wait = (timeout) => {
    //     return new Promise(resolve => setTimeout(resolve, timeout));
    // };
    // const onRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     wait(2000).then(() => setRefreshing(false));
    //     checkSaveStatus();
    //     setTimeout( async ()=>{
    //         console.log('ONREFRESH');
    //         const values = await AsyncStorage.getItem(STORAGE_KEY_MEMBER_ID);
    //         var details = {
    //             'm_id': values,
    //         };
    //         //Changes form data into x-www-form-urlencoded format
    //         var formBody = [];
    //         for (var property in details) {
    //             var encodedKey = encodeURIComponent(property);
    //             var encodedValue = encodeURIComponent(details[property]);
    //             formBody.push(encodedKey + '=' + encodedValue);
    //         }
    //         formBody = formBody.join('&');

    //         fetch('http://192.168.178.221:8080/Museum/showCollectiondata', {
    //             method: 'POST',
    //             headers: {
    //                 'Accept': 'application/json',
    //                 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             body: formBody,
    //         }).then(resp => {
    //             return Promise.all([resp.ok, resp.status, resp.json()]);
    //             }).then(([ok, status, json]) => {
    //                 console.log([ok,status,json]);
    //             if (ok) {
    //                 setnews(json.map((allData, index) => ({
    //                     ...allData,
    //                     saveStatus: '1',
    //                   }))
    //                 );
    //                 console.log(news);
    //             } else {
    //                 // this.handleError(status, json.error);
    //                 throw new Error(json.error);
    //             }
    //             }).catch(error => {
    //             throw error;
    //             });
    //     },1000);
    // });

    // API Call
    useEffect(() => {
        // checkSaveStatus();
        // setTimeout( async ()=>{
        //     console.log('ONREFRESH');
        //     const values = await AsyncStorage.getItem(STORAGE_KEY_MEMBER_ID);
        //     var details = {
        //         'm_id': values,
        //     };
        //     //Changes form data into x-www-form-urlencoded format
        //     var formBody = [];
        //     for (var property in details) {
        //         var encodedKey = encodeURIComponent(property);
        //         var encodedValue = encodeURIComponent(details[property]);
        //         formBody.push(encodedKey + '=' + encodedValue);
        //     }
        //     formBody = formBody.join('&');

        //     fetch('http://192.168.178.221:8080/Museum/showCollectiondata', {
        //         method: 'POST',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //         body: formBody,
        //     }).then(resp => {
        //         return Promise.all([resp.ok, resp.status, resp.json()]);
        //         }).then(([ok, status, json]) => {
        //             console.log([ok,status,json]);
        //         if (ok) {
        //             setnews(json.map((allData, index) => ({
        //                 ...allData,
        //                 saveStatus: '1',
        //               }))
        //             );
        //             console.log(news);
        //         } else {
        //             // this.handleError(status, json.error);
        //             throw new Error(json.error);
        //         }
        //         }).catch(error => {
        //         throw error;
        //         });
        // },1000);
    },[]);

    const NewsList = ({ news }) => {
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

        // Populate UI (events data)
        return (
            news.map((info) => (
                <TouchableRipple style={{backgroundColor:'white', marginTop: 5}}underlayColor="lightgrey"
                onPress={()=> {
                    // saveData(STORAGE_KEY_DATA_ID, info.d_id);
                    // saveData(STORAGE_KEY_DATA_TITLE, info.d_title);
                    // navigation.navigate('EventContentScreen');
                }}
                key={ info.d_id }>
                    <View>
                        <Box
                            rounded="lg"
                            maxWidth="100%"
                        >
                            <Stack space={1} p={[4, 4, 8]}>
                                <View style={styles.inline}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
                                        <Image source={{uri:'https://img.icons8.com/color/48/000000/' + renderCategoryIcon(info.t_id)}}  style={{ width: 20, height: 20 }}/>
                                        <Text style={{color:'grey', fontSize: 13, marginLeft: 2}}> { renderCategoryText(info.t_id) }
                                        </Text>
                                    </View>
                                    <View onPress={()=>{}}>
                                        <Icon style={{padding:3}}name="dots-three-vertical" color="grey" size={16} type="entypo" />
                                    </View>
                                </View>
                                <Heading size={['sm', 'md', 'sm']} noOfLines={1}>
                                    Title
                                </Heading>
                                <Heading size={['xs', 'xs', 'xs']} color="gray.700" style={{fontWeight: 'normal',marginTop: 5}} noOfLines={1}>
                                    { info.d_content }
                                </Heading>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{color:'grey', marginRight: 10}}>
                                        { info.d_date }
                                    </Text>
                                    <TouchableRipple >
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 1,paddingRight: 5,borderRadius: 10}}>
                                            {/* <Icon name="bookmark-outline" color={colors.primary} size={24} type="materialicons" /> */}
                                            <Icon name={'bookmark-outline' } color={colors.primary} size={24} type="materialicons" />
                                            <Text style={{color:'grey'}}>收藏</Text>
                                        </View>
                                    </TouchableRipple>
                                </View>
                            </Stack>
                        </Box>
                    </View>
                </TouchableRipple>
            ))
        );
    };
    const [news, setnews] = useState([]);

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
    // Scroll View
    return (
        <ScrollView
        style={{paddingTop: 1}}
        >
            <TouchableRipple style={{backgroundColor:'white', marginTop: 5}}underlayColor="lightgrey"
                key={ 1 }>
                <View>
                    <Box
                        rounded="lg"
                        maxWidth="100%"
                    >
                        <Stack space={1} p={[4, 4, 8]}>
                            {/**
                             * =============================================== TEMPORARY BLOCK CODE ===============================================
                            */}

                            <View style={styles.triangleCornerTopRight}/>
                            <Text style={styles.triangleCornerTopRightText}>藝文</Text>
                            {/* <View style={[(info.unit === 'cul') ? styles.triangleCornerTopRight : styles.triangleCornerTopRightSecondary]}/>
                            <Text style={styles.triangleCornerTopRightText}>{(info.unit === 'cul') ? '藝文' :'樂齡'}</Text> */}

                            {/**
                             * =============================================== END OF TEMPORARY BLOCK CODE =========================================
                            */}
                            <View style={styles.inline}>
                                <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
                                    
                            {/**
                             * =============================================== TEMPORARY BLOCK CODE ===============================================
                            */}

                                    <Image source={{uri:'https://img.icons8.com/color/48/000000/adjacent.png'}}  style={{ width: 20, height: 20}}/>
                                    <Text style={{color:'grey', fontSize: 18, marginLeft: 2}}> { renderCityText('18')} </Text>
                                    <Image source={{uri:'https://img.icons8.com/color/48/000000/' + renderCategoryIcon('10')}}  style={{ width: 20, height: 20, marginLeft: 6  }}/>
                                    <Text style={{color:'grey', fontSize: 18, marginLeft: 2}}> { renderCategoryText('10') } </Text>

                            {/**
                             * =============================================== END OF TEMPORARY BLOCK CODE =========================================
                            */}
                                </View>
                                    {/* <Icon style={{padding:3}}name="dots-three-vertical" color='grey' size={16} type="entypo" /> */}
                            </View>
                            <Heading size={["lg", "lg", "lg"]} noOfLines={1}>
                                「臺北市文化景觀『中正紀念堂』保存維護計畫」公聽會公告
                            </Heading>
                            <Heading size={["md", "md", "md"]} color="gray.700" style={{fontWeight: 'normal',marginTop: 5}} noOfLines={1}>
                            壹、時間：2022年10月3日(一)下午2時。\n貳、地點：臺北市青少年發展處\n–\n6樓大型研討室\n(臺北市仁愛路一段17號6樓)\n參、會議議題：本計畫案基於《文化資產保存法》第62條提出【臺北市文化景觀『中正紀念堂』保存維護計畫】，並依《文化資產保存法施行細則》第28條研擬計畫案內容，針對文化景觀之保存維護計畫，進行該基地內歷史調查研究、研擬中正紀念堂園區保存維護相關規範事項，期望透過擬定本計畫落實該區域保存措施，並作為後續管理維護執行、修復再利用等依循。\n肆、會議流程：請詳附件
                            </Heading>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color:'grey', marginRight: 10,fontSize: 18}}>
                                    2022-09-16
                                </Text>
                                <View style={{flex:1,justifyContent:'space-between',flexDirection:'row'}}>
                                    <TouchableRipple onPress={ ()=>{}

                                    }>
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 1,paddingRight: 5,borderRadius: 10}}>
                                            <Icon name={ "bookmark-outline" } color={colors.primary} size={24} type="materialicons" />
                                            <Text style={{color:'grey',fontSize: 18}}>收藏</Text>
                                        </View>
                                    </TouchableRipple>
                                    <TouchableRipple 
                                    >
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 1,paddingRight: 5,paddingLeft: 5,borderRadius: 10}}>
                                            <Image source={{uri:'https://img.icons8.com/pastel-glyph/64/4632a1/calendar-plus.png'}}  style={{ width: 22, height: 22, color:'red'}}/>
                                            <Text style={{color:'grey',fontSize: 18}}> 加入行事曆</Text>
                                        </View>
                                    </TouchableRipple>
                                </View>
                            </View>
                        </Stack>
                    </Box>
                </View>
            </TouchableRipple>

            <TouchableRipple style={{backgroundColor:'white', marginTop: 5}}underlayColor="lightgrey"
                key={ 1 }>
                <View>
                    <Box
                        rounded="lg"
                        maxWidth="100%"
                    >
                        <Stack space={1} p={[4, 4, 8]}>
                            {/**
                             * =============================================== TEMPORARY BLOCK CODE ===============================================
                            */}

                            <View style={styles.triangleCornerTopRightSecondary}/>
                            <Text style={styles.triangleCornerTopRightText}>樂齡</Text>
                            {/* <View style={[(info.unit === 'cul') ? styles.triangleCornerTopRight : styles.triangleCornerTopRightSecondary]}/>
                            <Text style={styles.triangleCornerTopRightText}>{(info.unit === 'cul') ? '藝文' :'樂齡'}</Text> */}

                            {/**
                             * =============================================== END OF TEMPORARY BLOCK CODE =========================================
                            */}
                            <View style={styles.inline}>
                                <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}>
                                    
                            {/**
                             * =============================================== TEMPORARY BLOCK CODE ===============================================
                            */}

                                    <Image source={{uri:'https://img.icons8.com/color/48/000000/adjacent.png'}}  style={{ width: 20, height: 20}}/>
                                    <Text style={{color:'grey', fontSize: 18, marginLeft: 2}}> { renderCityText('13')} </Text>
                                    <Image source={{uri:'https://img.icons8.com/color/48/000000/' + renderCategoryIcon('23')}}  style={{ width: 20, height: 20, marginLeft: 6  }}/>
                                    <Text style={{color:'grey', fontSize: 18, marginLeft: 2}}> { renderCategoryText('23') } </Text>

                            {/**
                             * =============================================== END OF TEMPORARY BLOCK CODE =========================================
                            */}
                                </View>
                                    {/* <Icon style={{padding:3}}name="dots-three-vertical" color='grey' size={16} type="entypo" /> */}
                            </View>
                            <Heading size={["lg", "lg", "lg"]} noOfLines={1}>
                                新北市石碇區樂齡學習中心111年秋季班9-10月課程表
                            </Heading>
                            <Heading size={["md", "md", "md"]} color="gray.700" style={{fontWeight: 'normal',marginTop: 5}} noOfLines={1}>
                            "111年9-10月新北市石碇區樂齡學習中心課程活動表\n中心地址：新北市石碇區石碇西街15號\n查詢電話：(02)26631244分機13\n項次\n活動名稱\n日期\n時間\n地點\n講師\n報名費用\n1\n茶道班\n9/19、10/3、10/17\n13:30-15:30\n石碇樂齡中心\n莊月梅\n免費\n2\n舞蹈班\n9/21、9/28、10/5、10/12、10/19、10/26\n09:30-11:30\n石碇樂齡中心\n王美蘭\n免費\n3\n經絡班\n9/21、9/28、10/5、10/12、10/19、10/26\n13:30-15
                            </Heading>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color:'grey', marginRight: 10,fontSize: 18}}>
                                    2022-09-16
                                </Text>
                                <View style={{flex:1,justifyContent:'space-between',flexDirection:'row'}}>
                                    <TouchableRipple onPress={ ()=>{}

                                    }>
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 1,paddingRight: 5,borderRadius: 10}}>
                                            <Icon name={ "bookmark-outline" } color={colors.primary} size={24} type="materialicons" />
                                            <Text style={{color:'grey',fontSize: 18}}>收藏</Text>
                                        </View>
                                    </TouchableRipple>
                                    <TouchableRipple 
                                    >
                                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 1,paddingRight: 5,paddingLeft: 5,borderRadius: 10}}>
                                            <Image source={{uri:'https://img.icons8.com/pastel-glyph/64/4632a1/calendar-plus.png'}}  style={{ width: 22, height: 22, color:'red'}}/>
                                            <Text style={{color:'grey',fontSize: 18}}> 加入行事曆</Text>
                                        </View>
                                    </TouchableRipple>
                                </View>
                            </View>
                        </Stack>
                    </Box>
                </View>
            </TouchableRipple>
        </ScrollView>
    );
};

export default dummyScreen;

const styles = StyleSheet.create({
  scrollView: {
      flex: 1,
      backgroundColor: colors.white,
  },
  center: {
      flex: 1,
      justifyContent:'center',
      alignItems: 'center'
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
