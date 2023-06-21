import React from 'react';
import { TouchableRipple } from 'react-native-paper';
import { View, Text, StyleSheet, Image} from 'react-native';
import { Box, Stack, Heading, InfoIcon } from "native-base";
import { Icon } from 'react-native-elements';

import colors from '../config/colors';

const NewsList = ({ news }) => {
    return (
        news.map((info) => (
            <TouchableRipple style={{backgroundColor:'white', marginTop: 6}}underlayColor="lightgrey" onPress={()=> {}} key={ info.d_id }>
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
                                    <Icon style={{padding:3}}name="dots-three-vertical" color='grey' size={16} type="entypo" />
                                </View>
                            </View>
                            <Heading size={["sm", "md", "sm"]} noOfLines={1}>
                                { info.d_title }
                            </Heading>
                            <Heading size={["xs", "xs", "xs"]} color="gray.700" style={{fontWeight: 'normal',marginTop: 5}} noOfLines={1}>
                                { info.d_content }
                            </Heading>
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{color:'grey', marginRight: 10}}>
                                    { info.d_date }
                                </Text>
                                <TouchableRipple onPress={()=>{}}>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 1,paddingRight: 5,borderRadius: 10}}>
                                        <Icon name="bookmark-outline" color={colors.primary} size={24} type="materialicons" />
                                        {/* <Icon name={ info.saveStatus } color={colors.primary} size={24} type="materialicons" /> */}
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

export default NewsList;

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

