import React, {forceUpdate} from 'react';
import { TouchableRipple } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import { Box, Button } from 'native-base';
import { Icon } from 'react-native-elements';

import colors from '../config/colors';


const FollowList = ({ follows }) => {

    return (
        follows.map((follow) => (
            <TouchableRipple style={{backgroundColor: colors.white}} underlayColor="lightgrey" onPress={()=> {}} key={ follow.key }>
                <View>
                    <Box style={styles.box}>
                        <Icon
                            name={ follow.icon }
                            color={colors.black}
                            size={26}
                            type="materialicons"
                        />
                        <Text style={{marginLeft: 10}}>
                            { follow.title }
                        </Text>
                        <Button
                            onPress={
                                ()=>{
                                    if(follow.subscribeStatus === '1'){
                                        follow.subscribeStatus = '0'
                                    } else {
                                        follow.subscribeStatus = '1'
                                    }
                                }
                            }
                            p={2}
                            style={{ marginLeft: 'auto'}}
                            colorScheme={ follow.subscribeStatus === '0' ? 'blue' : 'light'}
                        >
                            <Text style={{paddingHorizontal: 6, color: colors.white}}>
                                { follow.subscribeStatus === '0' ? '訂閲' : '訂閲中' }
                            </Text>
                        </Button>
                    </Box>
                </View>
            </TouchableRipple>
        ))
    );
};

export default FollowList;

const styles = StyleSheet.create({
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
});
