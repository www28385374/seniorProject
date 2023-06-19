import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { Box, Stack, Heading, InfoIcon } from "native-base";
import { Icon } from 'react-native-elements';

import colors from '../config/colors';
import { justifyContent } from 'styled-system';

const NotificationList = ({ news, navigation }) => {
    return (
        news.map((info) => (
            <TouchableRipple style={{backgroundColor:'white', marginTop: 6}}underlayColor="lightgrey" onPress={()=> {}} key={ info.key }>
                <View>
                    <Box
                        rounded="lg"
                        maxWidth='90%'
                        style={{flexDirection:'row'}}
                        p={[4, 4, 8]}
                    >
                        <Stack style={styles.iconInline}>
                            <View style={{marginLeft: -15,marginRight: 5}}>
                                <Icon name="lens" color='#1E90FF' size={10} type="materialicons" />
                            </View>
                            <View borderRadius='50' style={styles.iconContainer}>
                                <Icon name="mail" color='white' size={20} type="materialicons" style={{marginTop: 4}}/>
                            </View>
                        </Stack>
                        <Stack space={1} >
                            <View style={styles.inline}>
                                <View style={styles.inline}>
                                    <Heading size={["sm", "md", "sm"]} noOfLines={1}>
                                        { info.title }
                                    </Heading>
                                    <TouchableRipple onPress={()=>{}}>
                                        <Icon style={{padding:3}}name="dots-three-vertical" color='grey' size={16} type="entypo" />
                                    </TouchableRipple>
                                </View>
                            </View>
                            <View minWidth='100%'>
                                <Heading size={["xs", "xs", "xs"]} color="gray.700" style={{fontWeight: 'normal', marginTop: -4}} noOfLines={2}>
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

export default NotificationList;

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

