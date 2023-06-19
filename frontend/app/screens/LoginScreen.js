import React, {useState, useEffect} from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Input, FormControl, Stack } from 'native-base';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../config/colors';

const LoginScreen = ({navigation}) => {
    const showAccPassIncorrectAlert = () =>
    Alert.alert(
      "Please try again",
      "Incorrect Password or Account!",
      [
        { text: "OK", onPress: () => {} }
      ]
    );

    let ClearFormData = () => {
        setAccount("")
        setPassword("")
    }

    let navigateToScreen = (screen) => {
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

    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const STORAGE_KEY = '@m_id'

    const saveData = async (value) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, value)
            // alert('Data successfully saved')
            console.log('data saved to storage');
        } catch (e) {
            alert('Failed to save the data to the storage, check log for more info')
            console.log(e);  
        }
    }

    const readData = async () => {
        try {
            const memberID = await AsyncStorage.getItem(STORAGE_KEY)
            if (memberID !== null) {
                console.log('success');
                console.log(memberID)
            }
        } catch (e) {
            alert('Failed to fetch the data from storage')
        }
    }

    useEffect(() => {
        readData()
    }, [])

    let handleSubmit = () => {
        // React Native does not support x-www-form-urlencoded
        var details = {
            'm_account': account,
            'm_password': password,
        };
        //Changes form data into x-www-form-urlencoded format
        var formBody = [];

        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch("http://192.168.137.51:8080/member/login_check", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(resp => {
            return Promise.all([resp.ok, resp.status, resp.json()]);
          }).then(([ok, status, json]) => {
              console.log([ok, status, json])
            if (json.status == true) {
                saveData(json.m_id)
                ClearFormData()
                navigateToScreen('IndexScreen')
                return json;
            } else {
                showAccPassIncorrectAlert();
                this.handleError(status, json.error);
                throw new Error(json.error);
            }
            
          }).catch(error => {
            throw error;
          });
      };
    
    return (
        <ScrollView
            scrollEnabled={false}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
        >
            {/* Background image */}
            <ImageBackground
                style={styles.background}
                source={require('../assets/background-3.jpg')}
                // blurRadius={6}
            >
                <View style={styles.brandView}>
                    <Icon
                        name="museum"
                        color={colors.white}
                        size={100}
                        type="materialicons"
                    />
                    <Text style={styles.brandViewText}>老派人生學習趣</Text>
                </View>

                <View style={styles.imageOverlay}/>
            </ImageBackground>
            {/* Bottom View */}
            <View style={styles.bottomView}>
                <View style={{padding: 40}}>
                    <Text style={styles.welcomeText}>會員登入</Text>
                    {/* Input View */}
                    <View
                        style={{marginTop: 20}}
                    >
                        <FormControl>
                        <Stack>
                            <FormControl.Label style={{marginBottom: 0}}>賬號</FormControl.Label>
                            <Input
                                value={account}
                                onChange={(e) => setAccount(e.nativeEvent.text)}
                                placeholder=" 賬號"
                                style={{borderColor: colors.primary}}
                                variant="underlined"
                                p={2}
                                InputLeftElement={
                                    <Icon
                                        name="person"
                                        color={colors.black}
                                        size={20}
                                        type="ionicon"
                                    />
                                }
                            />
                        </Stack>
                        </FormControl>

                        <FormControl styles={{marginTop:20}}>
                        <Stack>
                            <FormControl.Label style={{marginBottom: 0, marginTop: 10}}>密碼</FormControl.Label>
                            <Input
                                value={password}
                                onChange={(e) => setPassword(e.nativeEvent.text)}
                                placeholder=" 密碼"
                                type="password"
                                style={{borderColor: colors.primary}} 
                                variant="underlined"
                                p={2}
                                InputLeftElement={
                                    <Icon
                                        name="lock-closed"
                                        color={colors.black}
                                        size={20}
                                        type="ionicon"
                                    />
                                }
                                InputRightElement={
                                    <Icon
                                        name="eye"
                                        color={colors.black}
                                        size={30}
                                        type="ionicon"
                                    />
                                }
                            />
                        </Stack>
                        </FormControl>
                        <TouchableOpacity style={styles.loginButtonContainer} onPress={() => { handleSubmit() }}>
                            <Text style={styles.loginButtonText}>登入</Text>
                        </TouchableOpacity>
                        <Text style={styles.dontHaveAccountText}>還沒註冊帳號嗎?
                            <Text style={styles.registerText} onPress={() => navigation.navigate('SignUp')}>{' '}點這裡註冊！</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: colors.white,
    },
    background: {
        height: Dimensions.get('window').height / 2.05,
    },
    brandView: {
        flex: 1,
        marginTop: 40,
        // justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
    },
    imageOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.primary,
        opacity: 0.7,
        position: 'absolute',
    },
    brandViewText: {
        color: colors.white,
        fontSize: 40,
        fontWeight: 'bold',
    },
    bottomView: {
        flex: 1.5,
        backgroundColor: colors.white,
        bottom: 80,
        borderTopStartRadius: 40,
        borderTopEndRadius: 40,
    },
    welcomeText: {
        color: colors.primary,
        fontSize: 34,
        fontWeight: 'bold',
    },
    loginButtonContainer: {
        marginTop: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: colors.primary,
        width: Dimensions.get('window').width / 2,

        shadowOffset: {width: 1, height: 10},
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 15,
        shadowColor: colors.primary,
    },
    loginButtonText: {
        padding: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
    dontHaveAccountText: {
        color: '#757575',
        textAlign: 'center',
        marginTop: 10,
    },
    registerText: {
        color: 'salmon',
        fontStyle: 'italic',
    },
});
