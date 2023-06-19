import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, FlatList, Image} from 'react-native';
import { Box, Button, Select, Input, CheckIcon, Checkbox, Stack, Heading, Radio} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableRipple, Card } from 'react-native-paper';
import { Icon } from 'react-native-elements';
import DatePicker from 'react-native-date-picker';

import colors from '../config/colors';

const saveArray = [];

const STORAGE_KEY_MEMBER_ID = '@m_id';
const STORAGE_KEY_DATA_ID = '@d_id';
const STORAGE_KEY_DATA_TITLE = '@d_title';

const STORAGE_KEY_UNIT = '@unit';

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

    fetch('http://192.168.137.51:8080/Museum/showCollectiondata', {
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
        console.log('Arr:' + saveArray)
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

const SearchScreen = ({navigation}) => {
    let getTimeStamp = (dateTime) => {
        var dateObj = dateTime;
        var month = dateObj. getUTCMonth() + 1; //months from 1-12.
        var day = dateObj. getUTCDate();
        var year = dateObj. getUTCFullYear();
        var newdate = year + "/" + month + "/" + day;
        return newdate
    }

    const handleCheckBoxChange = (id) => {
        let temp = products.map((product) => {
        if (id === product.id) {
            return { ...product, isChecked: !product.isChecked };
        }
        return product;
        });
        setProducts(temp);
    };

    const [museum, setMuseum] = useState("");
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [openStartDate, setOpenStartDate] = useState(false)
    const [openEndDate, setOpenEndDate] = useState(false)
    
    useEffect(() => {
        checkSaveStatus();
    }, []);

    // Checkbox
    const data = [
        { id: 1, txt: '視覺藝術', isChecked: false },
        { id: 2, txt: '工藝', isChecked: false },
        { id: 3, txt: '設計', isChecked: false },
        { id: 4, txt: '傳統音樂', isChecked: false },
        { id: 5, txt: '流行音樂', isChecked: false },
        { id: 6, txt: '戲劇', isChecked: false },
        { id: 7, txt: '舞蹈', isChecked: false },
        { id: 8, txt: '說唱', isChecked: false },
        { id: 9, txt: '影視/廣播', isChecked: false },
        { id: 10, txt: '民俗/文化資產', isChecked: false },
        { id: 11, txt: '語文/圖書', isChecked: false },
        { id: 12, txt: '其他', isChecked: false },
        { id: 13, txt: '綜合', isChecked: false },
    ];

    const [products, setProducts] = useState(data);
    let selected = products.filter((product) => product.isChecked).map((product) => product.id)
    const renderFlatList = (renderData) => {
        return (
        <FlatList
            // style={{flex:1,flexDirection:'column',backgroundColor:'red'}}
            numColumns={2}
            data={renderData}
            renderItem={({ item }) => (
            <Card style={{ margin: 5, width: '47%', flexDirection:'column' }}>
                <View style={styles.card}>
                    <View
                        style={{
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-between',
                        }}
                    >
                        <Checkbox 
                            value={item.isChecked} 
                            onChange={() => {
                                handleCheckBoxChange(item.id);
                            }} 
                            colorScheme='blue'
                        >
                            {item.txt}
                        </Checkbox>
                    </View>
                </View>
            </Card>
            )}
        />
        );
    };
    // End of Checkbox
    const [limit, setLimit] = React.useState(10)
    const [unit, setUnit] = useState('C')
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
                                <Text style={styles.triangleCornerTopRightText}>{(unit === 'C') ? '藝文' :'樂齡'}</Text>
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
                                    { info.se_title || info.cul_title }
                                </Heading>
                                <Heading size={["md", "md", "md"]} color="gray.700" style={{fontWeight: 'normal',marginTop: 5}} noOfLines={1}>
                                    { info.se_content || info.cul_content }
                                </Heading>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{color:'grey', marginRight: 10,fontSize: 18}}>
                                        { info.se_upload_date || info.cul_upload_date }
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
    const [value, setValue] = useState('C');
    return (
        <ScrollView style={{padding: 0,backgroundColor: '#FFF', width: '100%'}} nestedScrollEnabled={true}>
            <Text style={{fontSize: 24,marginBottom: 5,marginLeft:30,marginTop: 30}}>*博物館：</Text>
            <Radio.Group
                style={{marginLeft: 38}}
                name="myRadioGroup"
                value={value}
                onChange={(nextValue) => {
                    setValue(nextValue);
                }}
                >
                <Radio value="S" my="1" onPress={()=>{
                    saveData(STORAGE_KEY_UNIT, 'S')
                    setUnit('S')}
                }    
            >
                    <Text style={{fontSize:24}}>文化局</Text>
                </Radio>
                <Radio value="C" my="1" onPress={()=>{
                    saveData(STORAGE_KEY_UNIT, 'C')
                    setUnit('C')}
                }
            >
                    <Text style={{fontSize:24}}>樂齡中心</Text>
                </Radio>
            </Radio.Group>
                <Text style={{fontSize: 24,marginVertical: 10,marginLeft:30}}>*分類：</Text>
                <Box w="3/4" maxW="200" style={{marginLeft:30}}>
                    <Select style={{fontSize: 24, color: 'gray'}} selectedValue={museum} minWidth="345" accessibilityLabel="彰化縣" placeholder="彰化縣" _selectedItem={{
                    bg: colors.primary,
                    endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setMuseum(itemValue)}>
                        <Select.Item label="彰化縣" value="1" />
                        <Select.Item label="嘉義市" value="2" />
                        <Select.Item label="嘉義縣" value="3" />
                        <Select.Item label="新竹市" value="4" />
                        <Select.Item label="新竹縣" value="5" />
                        <Select.Item label="花蓮市" value="6" />
                        <Select.Item label="高雄市" value="7" />
                        <Select.Item label="基隆市" value="8" />
                        <Select.Item label="金門縣" value="9" />
                        <Select.Item label="連江縣" value="10" />
                        <Select.Item label="苗栗市" value="11" />
                        <Select.Item label="南投市" value="12" />
                        <Select.Item label="新北市" value="13" />
                        <Select.Item label="澎湖縣" value="14" />
                        <Select.Item label="屏東市" value="15" />
                        <Select.Item label="臺中市" value="16" />
                        <Select.Item label="臺南市" value="17" />
                        <Select.Item label="臺北市" value="18" />
                        <Select.Item label="臺東市" value="19" />
                        <Select.Item label="桃園市" value="20" />
                        <Select.Item label="宜蘭市" value="21" />
                        <Select.Item label="雲林縣" value="22" />
                    </Select>
                </Box>
                <>
                    <Text style={{fontSize: 24,marginVertical: 10,marginLeft:30}}>*日期：</Text>
                    <View style={{flex: 1, flexDirection:'row',marginLeft:30}}>
                        <Input style={{fontSize: 24, color: 'gray'}} placeholder="" w="43.5%" maxWidth="300px" onFocus={() => setOpenStartDate(true)} value={startDate.toString().substring(3,15)} />
                        <Text style={{alignSelf: 'center',paddingHorizontal: 10}}> 到 </Text>
                        <Input style={{fontSize: 24, color: 'gray'}} placeholder="" w="43.5%" maxWidth="300px" onFocus={() => setOpenEndDate(true)} value={endDate.toString().substring(3,15)} />
                    </View>
                    <DatePicker
                        modal
                        open={openStartDate}
                        date={startDate}
                        theme="light"
                        mode="date"
                        androidVariant = 'nativeAndroid'
                        onConfirm={(date) => {
                            setOpenStartDate(false)
                            setStartDate(date)
                        }}
                        onCancel={() => {
                            setOpenStartDate(false)
                        }}
                    />
                    <DatePicker
                        modal
                        open={openEndDate}
                        date={endDate}
                        theme="light"
                        mode="date"
                        androidVariant = 'nativeAndroid'
                        onConfirm={(date) => {
                            setOpenEndDate(false)
                            setEndDate(date)
                        }}
                        onCancel={() => {
                            setOpenEndDate(false)
                        }}
                    />
                </>

                {/* <View style={{ flex: 1,marginHorizontal:30 }}>{renderFlatList(products)}</View> */}
                <Button
                    p={4}
                    style={{marginHorizontal:30, marginVertical: 20}}
                    colorScheme={ 'indigo.900:alpha.80' }
                    bg={colors.primary}
                    onPress={()=>{
                        console.log(selected)
                        console.log(museum)
                        console.log(getTimeStamp(startDate))
                        console.log(getTimeStamp(endDate))

                        var data = {
                            'unit' : value,
                            'city_id': museum,
                            'min_date': getTimeStamp(startDate),
                            'max_date': getTimeStamp(endDate),
                        };
                        //Changes form data into x-www-form-urlencoded format
                        var formBody = [];
                        for (var property in data) {
                            var encodedKey = encodeURIComponent(property);
                            var encodedValue = encodeURIComponent(data[property]);
                            formBody.push(encodedKey + "=" + encodedValue);
                        }
                        formBody = formBody.join("&");
                        
                        console.log(formBody)
                    
                        fetch("http://192.168.137.51:8080/frontend/advanced_search", {
                            method: "POST",
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            body: formBody
                        }).then(resp => {
                            return Promise.all([resp.ok, resp.status, resp.json()]);
                          }).then(([ok, status, json]) => {
                                const res = json.result;
                                console.log(res)
                                setnews(res.map((allData, index) => ({
                                    ...allData,
                                    saveStatus: '0',
                                }))
                                );
                            if (json.status == true) {
                                // console.log('json:'+json)
                                // setnews(json.map((allData, index) => ({
                                //     ...allData,
                                //     saveStatus: '1',
                                //   }))
                                // );
                            } else {
                                // this.handleError(status, json.error);
                                throw new Error(json.error);
                            }
                          }).catch(error => {
                            throw error;
                          });
                    }}
                >   
                    <Text style={{paddingHorizontal: 6, color: colors.white,fontSize:24}}>
                        搜尋活動
                    </Text>
                </Button>

                <>
                <NewsList news={news} />
                </>
               
        </ScrollView>
    );
};

export default SearchScreen;

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
        borderBottomColor: 'lightgrey',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    box2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:'white',
        padding: 15,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    card: {
        padding: 9,
        margin: 5,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 5,
    },
    text: {
        textAlign: 'center',
        fontWeight: 'bold',
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

