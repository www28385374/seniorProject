import React, {useState} from 'react';
import { TouchableRipple } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView} from 'react-native';
import { Box, Stack, Heading, InfoIcon } from 'native-base';
import { Icon } from 'react-native-elements';

import colors from '../config/colors';
import NotificationList from '../components/NotificationList';

const NotificationScreen = ({navigation}) => {
    const NotificationList = ({ news }) => {
        return (
            news.map((info) => (
                <TouchableRipple style={{backgroundColor:'white', marginTop: 6}}underlayColor="lightgrey" onPress={() => {navigation.navigate('dummyScreen')}} key={ info.key }>
                    <View>
                        <Box
                            rounded="lg"
                            maxWidth="90%"
                            style={{flexDirection:'row'}}
                            p={[4, 4, 8]}
                        >
                            <Stack style={styles.iconInline}>
                                <View style={{marginLeft: -15,marginRight: 5}}>
                                    <Icon name="lens" color="#1E90FF" size={10} type="materialicons" />
                                </View>
                                <View borderRadius="50" style={styles.iconContainer}>
                                    <Icon name="mail" color="white" size={20} type="materialicons" style={{marginTop: 4}}/>
                                </View>
                            </Stack>
                            <Stack space={1} >
                                <View style={styles.inline}>
                                    <View style={styles.inline}>
                                        <Heading size={['sm', 'md', 'sm']} noOfLines={1}>
                                            { info.title }
                                        </Heading>
                                        <TouchableRipple onPress={()=>{}}>
                                            <Icon style={{padding:3}}name="dots-three-vertical" color="grey" size={16} type="entypo" />
                                        </TouchableRipple>
                                    </View>
                                </View>
                                <View minWidth="100%">
                                    <Heading size={['xs', 'xs', 'xs']} color="gray.700" style={{fontWeight: 'normal', marginTop: -4}} noOfLines={2}>
                                        { info.content }
                                    </Heading>
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{color:'grey', marginRight: 10}}>
                                        { info.date }
                                    </Text>
                                </View>
                            </Stack>
                        </Box>
                    </View>
                </TouchableRipple>
            ))
        );
    };

    const [news, setnews] = useState([
        { key:'1', title:'您訂閲主題有新資訊', content:'您訂閲的主題有2個新消息!', date:'2022-09-16'},
        { key:'2', title:'謝謝您完成註冊', content:'登入後即可【訂閲主題 & 收藏資訊】再也不錯過任何新消息', date:'2022-09-11'},

    ]);
    return (
        <ScrollView>
            <View style={{marginTop: -6}}>
                <NotificationList news={news} />
            </View>
        </ScrollView>
    );
};

export default NotificationScreen;

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
        flex: 1,
    },
    iconInline: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        marginRight: 8,
        alignSelf:'flex-start',
        borderRadius: 30 / 2,
        width: 30,
        height: 30,
        backgroundColor:colors.primary},
});
