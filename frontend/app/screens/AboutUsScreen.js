import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, Alert} from 'react-native';
import { Box, Button } from 'native-base';
import { Icon } from 'react-native-elements';

import colors from '../config/colors';
import { TouchableRipple } from 'react-native-paper';



const AboutUsScreen = ({navigation}) => {

    return (
        <ScrollView>
            <Box style={styles.box}>
                    {/* <Image source={{uri:'https://img.icons8.com/color/48/000000/settings--v1.png'}}  style={{ width: 24, height: 24 }}/> */}
                    <Text style={{marginLeft: 5,fontSize: 17,textAlign:'justify'}}>
                    {/* {"\t\t\t "}根據文化部全國藝文活動資訊系統之統計數據，2020年在高雄舉辦的藝文活動達5,790場，面對如此龐雜的大量資訊，絕大多數的民眾都不易收集到所有有興趣參加的活動資訊。現今為高度競爭的社會，絕大多數的家長都希望能提供子女較佳的學習環境，在成長的過程能多參與各類動靜態活動以開闊視野，即近一步的了解自己的興趣，所以能協助父母親有效地過濾即將舉辦的各式活動訊息，主動地提醒有興趣的活動就變成一項重要的服務需求
                    {"\n"} */}
                    {"\t\t\t "}本專題為繁忙的家長主動收集高雄市藝文活動及展覽資訊，提供一個整合藝文展演活動的資訊服務平台，系統定期地主動蒐集各個展館的藝文展演及主題式展覽等相關活動資訊，透過訂閱服務及活動分類來過濾訊息，使用者選取有興趣的活動類別來追蹤，實施以下解決方式
                    {"\n"}
                    {"\t\t\t 1. "}定期的以網路爬蟲技術蒐集高雄市的所有藝文展演活動訊息，透過資料預處理及清洗程序，對蒐集到的活動訊息進行活動分類，並將相關的人事時地物資訊匯入藝文活動資料庫，以利後續的活動統整及通知作業。
                    {"\n"}
                    {"\t\t\t 2. "}以深度學習(Deep Learning)技術進行自然語言處理(Natural Language Processing, NLP)，依照全國藝文活動資訊網分類標準，建立藝文活動訊息文字自動分類模型，以利擷取活動資訊之自動化分類處理。
                    {"\n"}
                    {"\t\t\t 3. "}以發佈/訂閱 (Publish/Subscribe)模式來進行藝文活動訂閱及通知服務，除了使用者僅會收到已訂閱的活動類別資訊外，一旦系統收集到新發佈的活動訊息時，會主動地推播通知以訂閱的使用者，實現為用戶量身訂做的個人化服務(Personalized Service)。


                    </Text>
                    <Image source={require('../assets/image1.png')}  style={{ width: '100%',height:200, resizeMode:'contain'}}/>

                </Box>
            {/* <TouchableRipple style={{marginTop:3, backgroundColor: colors.white}} underlayColor="lightgrey" onPress={()=>{navigation.navigate('SavedEventScreen');}}>
                <View style={styles.box}>
                    <Icon name={ 'bookmark' } color={colors.primary} size={24} type="materialicons" />
                    <Text style={{marginLeft: 10}}>我的收藏</Text>
                </View>
            </TouchableRipple>

            <TouchableRipple style={{backgroundColor: colors.white}}underlayColor="lightgrey" onPress={()=> {}}>
                
            </TouchableRipple>

            <TouchableRipple style={{backgroundColor: colors.white}}underlayColor="lightgrey"
            onPress={() => {
                    navigateToScreen('Login');
                    Alert.alert(
                        'Successfully Logout',
                        'Please press OK to continue!',
                        [
                          { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]
                    );
                }
            }>
                <Box style={styles.box}>
                    <Image source={{uri:'https://img.icons8.com/color/48/000000/exit.png'}} style={{ width: 24, height: 24 }}/>
                    <Text style={{marginLeft: 10}}>登出</Text>
                </Box>
            </TouchableRipple> */}
        </ScrollView>
    );
};

export default AboutUsScreen;

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
        flexDirection: 'column',
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
});

