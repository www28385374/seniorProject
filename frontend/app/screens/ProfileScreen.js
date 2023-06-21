import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Alert, Switch, TextInput} from 'react-native';
import { Box, Button, Image, Avatar } from 'native-base';
import { Icon } from 'react-native-elements'
import { TouchableRipple } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Root, Popup, Toast } from 'react-native-popup-confirm-toast'

import colors from '../config/colors';

const STORAGE_KEY_MEMBER_ID = '@m_id'

const ProfileScreen = ({navigation}) => {

    const navigateToScreen = (screen) => {
        // navigation.navigate(screen)
        navigation.reset({
            index: 0,
            routes: [
              {
                name: screen,
              },
            ],
        });
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const clearAll = async () => {
        try {
          await AsyncStorage.clear()
        } catch(e) {
          // clear error
        }
        console.log('Done.')
    }

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [name, onChangeName] = useState("");
    const [firstLetter, setFirstLetter] = useState("");
    const [email, onChangeEmail] = useState("");

    let getMemberInfo = async () => {
        const values = await AsyncStorage.getItem(STORAGE_KEY_MEMBER_ID)
        console.log(values)
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
    
        fetch("http://192.168.137.51:8080/member/show_member_info", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(resp => {
            return Promise.all([resp.ok, resp.status, resp.json()]);
        }).then(([ok, status, json]) => {
                const data = json.result[0];
                const userInfo = data;
                let { 
                    m_name,
                } = userInfo
                console.log(m_name)
                onChangeName(capitalizeFirstLetter(m_name),)
                setFirstLetter(m_name.charAt(0).toUpperCase())
                onChangeName(m_name)
                // onChangeEmail(m_email)
                // json.forEach(({d_id}) => saveArray.push(d_id))
            if (json.status == true) {
                return [ok, status, json]
            } else {
                throw new Error(json.error);
            }
        }).catch(error => {
            throw error;
        });
    };
    
    useEffect(() => {
        getMemberInfo();
    }, [])

    return (
        <Root>
            <ScrollView>
                {/* <TouchableRipple style={{marginTop:3, backgroundColor: colors.white}} underlayColor="lightgrey" onPress={()=>{navigation.navigate('SavedEventScreen')}}>
                    <View style={styles.box}>
                        <Icon name={ 'bookmark' } color={colors.primary} size={24} type="materialicons" />
                        <Text style={{marginLeft: 10}}>我的收藏</Text>
                    </View>
                </TouchableRipple> */}

                {/* <TouchableRipple style={{backgroundColor: colors.white}}underlayColor="lightgrey" onPress={()=> {}}>
                    <Box style={styles.box}>
                        <Image source={{uri:'https://img.icons8.com/color/48/000000/settings--v1.png'}}  style={{ width: 24, height: 24 }}/>
                        <Text style={{marginLeft: 10}}>修改個人資料</Text>
                    </Box>
                </TouchableRipple> */}

                <View style={styles.profileContainer}>
                    <View style={styles.profileAvatar}>
                        <Avatar bg="green.500" m="1" size="lg"source={{
                        uri: 'https://bit.ly/broken-link',
                        }}>
                            {firstLetter}
                        </Avatar>
                    </View>
                    <View style={styles.profileInfo}>
                    {/* <View style={{flex:1,flexDirection:'row', alignItems:'center'}}> */}
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeName}
                            value={name}
                        />
                        {/* <Icon name={ 'edit' } color={'gray'} size={24} type="materialicons" style={{marginLeft: 5}}/> */}
                    {/* </View> */}

                    {/* <View style={{flex:1,flexDirection:'row', alignItems:'center'}}> */}
                        {/* <TextInput
                            style={styles.emailInput}
                            onChangeText={onChangeEmail}
                            value={email}
                        /> */}
                        {/* <Icon name={ 'edit' } color={'gray'} size={24} type="materialicons" style={{marginLeft: 5}}/> */}
                    {/* </View> */}
                    


                    <Button
                        p={2}
                        style={{ marginTop: 20}}
                        colorScheme={ 'blue' }
                        onPress={()=> {
                            Popup.show({
                                type: 'confirm',
                                title: 'Are you sure you want to change your name / email?',
                                // textBody: 'Masdasgasdg. ',
                                buttonText: 'Confirm',
                                confirmText: 'Cancel',
                                callback: () => {
                                    Popup.hide();
                                },
                                cancelCallback: () => {
                                    Popup.hide();
                                },
                            })
                        }}
                    >   
                        <Text style={{paddingHorizontal: 6, color: colors.white}}>
                            確定修改
                        </Text>
                    </Button>    
                        {/* <TouchableRipple
                            onPress={() => navigation.navigate('ProfileScreen')}
                            borderless={true}
                            style={styles.editProfileButton}>
                            <View
                            >
                                <Text>Edit Profile</Text>
                            </View>
                        </TouchableRipple> */}
                    </View>
                </View>
                {/* <TouchableRipple style={{backgroundColor: colors.white}}underlayColor="lightgrey" onPress={()=> {}}>
                    <Box style={styles.box}>
                        <Image alt="alt" source={{uri:'https://img.icons8.com/external-inipagistudio-lineal-color-inipagistudio/64/000000/external-language-student-program-inipagistudio-lineal-color-inipagistudio.png'}}  style={{ width: 24, height: 24 }}/>
                        <View style={{flex:1,flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}}>
                            <Text style={{marginLeft: 10}}>語言</Text>
                            <View style={{flex:1,flexDirection:'row', justifyContent:'flex-end', alignItems: 'center'}}>
                                <Text>繁体中文</Text>
                                <Icon name="chevron-right" color={colors.black} size={30} type="materialicons"/>
                            </View>
                        </View>
                    </Box>
                </TouchableRipple>

                <TouchableRipple style={{backgroundColor: colors.white}}underlayColor="lightgrey" onPress={()=> {}}>
                    <Box style={styles.box}>
                        <Image alt="alt" source={{uri:'https://img.icons8.com/material-sharp/24/000000/do-not-disturb-2.png'}}  style={{ width: 24, height: 24 }}/>
                        <View style={{flex:1,flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}}>
                            <Text style={{marginLeft: 10}}>深色模式</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                    </Box>
                </TouchableRipple> */}

                {/* <TouchableRipple style={{backgroundColor: colors.white}}underlayColor="lightgrey" onPress={()=>{}}>
                    <Box style={styles.box}>
                        <Image alt="alt" source={{uri:'https://img.icons8.com/color/48/000000/lock.png'}} style={{ width: 24, height: 24 }}/>
                        <Text style={{marginLeft: 10}}>修改密碼</Text>
                    </Box>
                </TouchableRipple> */}

                <TouchableRipple style={{backgroundColor: colors.white}}underlayColor="lightgrey"
                onPress={() => {
                        clearAll();
                        navigateToScreen('Login')
                        Alert.alert(
                            "Successfully Logout",
                            "Please press OK to continue!",
                            [
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        )
                    }
                }>
                    <Box style={styles.box}>
                        <Image alt="alt" source={{uri:'https://img.icons8.com/color/48/000000/exit.png'}} style={{ width: 24, height: 24 }}/>
                        <Text style={{marginLeft: 10}}>登出</Text>
                    </Box>
                </TouchableRipple>
            </ScrollView>
        </Root>
    );
};

export default ProfileScreen;

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
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding:20,
        margin: 16,
        marginHorizontal: 22,
        borderRadius: 15,
    }, 
    profileInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginLeft: 24,
        // paddingLeft: 10,
    },
    profileText: {
        fontSize: 24,
    },
    emailText: {
        color: 'gray',
    },
    editProfileButton: {
        // backgroundColor: '#5bc0de',
        // backgroundColor: '#DEDEDE',
        padding: 10,
        marginTop: 4,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: 'grey',
        borderWidth: 0.8,
    },
    input: {
        color: 'black',
        fontSize: 20,
        height: 43,
        margin: 5,
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
    },
    emailInput: {
        color: 'black',
        height: 38,
        borderWidth: 0.5,
        borderRadius: 5,
        padding: 10,
    },
});

