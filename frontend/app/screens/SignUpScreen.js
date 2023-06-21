import React, {useState} from 'react';
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { Input, FormControl, Stack, Select, Box, CheckIcon } from 'native-base';
import { Icon } from 'react-native-elements';

import colors from '../config/colors';

const SignUpScreen = ({navigation}) => {

    const [account, setAccount] = useState("")
    const [name, setName] = useState("")
    const [phoneNo, setPhoneNo] = useState("")
    const [password, setPassword] = useState("")
    const [sex, setSex] = useState("")
    const [birthday, setBirthday] = useState("")

    const [gender, setGender] = useState("");


    let ClearFormData = () => {
        setAccount("")
        setName("")
        setPhoneNo("")
        setPassword("")
        setSex("")
        setBirthday("")
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

    let handleSubmit = () => {
        // React Native does not support x-www-form-urlencoded
        var details = {
            'm_name': name,
            'm_account': account,
            'm_birthday': birthday,
            'm_sex': sex,
            'm_phone': phoneNo,
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

        fetch("http://192.168.137.51:8080/member/create", {
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
                ClearFormData()
                navigateToScreen('Login')
                return json;
            } else {
                this.handleError(status, json.error);
                throw new Error(json.error);
            }
            
          }).catch(error => {
            throw error;
          });

        // CLEAR FORM AND NAVIGATE TO HOMESCREEN IF SUCCESS ELSE SHOW ERROR
        // ClearFormData()
        // navigateToScreen('Home')
      };

    return (
        <ScrollView
            scrollEnabled={false}
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
        >
            <View
                style={{
                    alignItems: 'flex-end',
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                }}
            >
                <Icon style={{position: 'absolute', right: 5,top:5}}name="cross" color='grey' size={40} type="entypo" onPress={()=>{navigation.goBack()}}/>
            </View>
            <View style={styles.brandView}>
                <Icon
                    name="museum"
                    color={colors.primary}
                    size={100}
                    type="materialicons"
                />
                <Text style={styles.brandViewText}>老派人生學習趣</Text>
            </View>
            <View style={styles.mainContainerView}>
                <View style={{padding: 40, paddingTop: 0}}>
                    {/* <Text style={styles.signUpText}>Sign Up</Text> */}
                    {/* Input View */}
                    <View
                        style={{marginTop: 10}}
                    >
                        <FormControl>
                        <Stack>
                            <FormControl.Label style={{marginBottom: 0}}>賬號</FormControl.Label>
                            <Input
                                value = {account}
                                onChange={(e) => setAccount(e.nativeEvent.text)}
                                placeholder=" 賬號"
                                style={{borderColor: colors.primary}}
                                variant="underlined"
                                p={2}
                                InputLeftElement={
                                    <Icon
                                        name="badge"
                                        color={colors.black}
                                        size={20}
                                        type="materialicons"
                                    />
                                }
                            />
                        </Stack>
                        </FormControl>

                        <FormControl>
                        <Stack>
                            <FormControl.Label style={{marginTop: 10, marginBottom: 0}}>姓名</FormControl.Label>
                            <Input
                                value = {name}
                                onChange={(e) => setName(e.nativeEvent.text)}
                                placeholder=" 信箱"
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

                        <FormControl>
                        <Stack>
                            <FormControl.Label style={{marginTop: 10, marginBottom: 0}}>生日</FormControl.Label>
                            <Input
                                value = {birthday}
                                onChange={(e) => setBirthday(e.nativeEvent.text)}
                                placeholder=" 生日"
                                style={{borderColor: colors.primary}} 
                                variant="underlined"
                                p={2}
                                InputLeftElement={
                                    <Icon
                                        name="cake"
                                        color={colors.black}
                                        size={20}
                                        type="materialicons"
                                    />
                                }
                            />
                        </Stack>
                        </FormControl>

                        <FormControl>
                        <Stack>
                            <FormControl.Label style={{marginTop: 10, marginBottom: 0}}>性別</FormControl.Label>
                            {/* <Input
                                value = {name}
                                onChange={(e) => setName(e.nativeEvent.text)}
                                placeholder=" 性別"
                                style={{borderColor: colors.primary}} 
                                variant="underlined"
                                p={2}
                                InputLeftElement={
                                    <Icon
                                        name="transgender"
                                        color={colors.black}
                                        size={20}
                                        type="ionicon"
                                    />
                                }
                            /> */}
                            <View style={{flexDirection:'row',alignItems:"center"}}>
                                <Icon style={{}} name="gender-male-female" color='black' size={25} type="material-community" onPress={()=>{}}/>
                                <Select style={{fontSize: 14, color: 'gray'}} selectedValue={sex} minWidth="100" accessibilityLabel="性別" placeholder="性別" _selectedItem={{
                                bg: colors.primary,
                                endIcon: <CheckIcon size="5" />
                                }} mt={1} onValueChange={itemValue => setSex(itemValue)}>
                                    <Select.Item label="男" value="F" />
                                    <Select.Item label="女" value="M" />
                                    <Select.Item label="其他" value="O" />
                                </Select>
                            </View>
                            
                        </Stack>
                        </FormControl>

                    

                        <FormControl>
                        <Stack>
                            <FormControl.Label style={{marginTop: 10, marginBottom: 0}}>電話號碼</FormControl.Label>
                            <Input
                                value = {phoneNo}
                                onChange={
                                    (e) => {
                                        setPhoneNo(e.nativeEvent.text)
                                    }
                                
                                }
                                placeholder=" 電話號碼"
                                style={{borderColor: colors.primary}} 
                                variant="underlined"
                                p={2}
                                InputLeftElement={
                                    <Icon
                                        name="call"
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
                                value = {password}
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
                                // InputRightElement={
                                //     <Icon
                                //         name="eye"
                                //         color={colors.black}
                                //         size={30}
                                //         type="ionicon"
                                //     />
                                // }
                            />
                        </Stack>
                        </FormControl>

                        {/* <FormControl styles={{marginTop:20}}>
                        <Stack>
                            <FormControl.Label style={{marginBottom: 0, marginTop: 10}}>Confirm Password</FormControl.Label>
                            <Input
                                placeholder=" Confirm Password"
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
                        </FormControl> */}
                        {/* Login Button */}
                        <TouchableOpacity style={styles.signUpButtonContainer} onPress={() => handleSubmit()}>
                            <Text style={styles.signUpButtonText}>註冊</Text>
                        </TouchableOpacity>
                        <Text style={styles.HaveAccountText}>已經有帳號了嗎?
                            <Text style={styles.loginText} onPress={() => navigation.navigate('Login')}>{' '}點這裡登入!</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    brandView: {
        paddingTop: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99999,
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.white,
    },
    mainContainerView: {
        flex: 1,
        height: Dimensions.get('window').height,
        backgroundColor: colors.white,
    },
    signUpText: {
        color: colors.primary,
        fontSize: 34,
        fontWeight: 'bold',
    },
    brandViewText: {
        color: colors.black,
        fontSize: 40,
        fontWeight: 'bold',
    },
    signUpButtonContainer: {
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
    signUpButtonText: {
        padding: 10,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        textTransform: 'uppercase',
    },
    HaveAccountText: {
        color: '#757575',
        textAlign: 'center',
        marginTop: 10,
    },
    loginText: {
        color: 'salmon',
        fontStyle: 'italic',
    },
});

