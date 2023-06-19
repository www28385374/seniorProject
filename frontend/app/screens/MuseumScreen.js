import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Linking, TouchableOpacityBase} from 'react-native';
import { Image, Button, Box, Modal, Center} from 'native-base';
import { Icon } from 'react-native-elements';
import colors from '../config/colors';
import MapView, { Callout, Marker } from "react-native-maps";
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions" // 👈

const MuseumScreen = ({navigation}) => {
    const handleLocationPermission = async () => { // 👈
        let permissionCheck = '';
        if (Platform.OS === 'ios') {
          permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    
          if (
            permissionCheck === RESULTS.BLOCKED ||
            permissionCheck === RESULTS.DENIED
          ) {
            const permissionRequest = await request(
              PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            );
            permissionRequest === RESULTS.GRANTED
              ? console.warn('Location permission granted.')
              : console.warn('location permission denied.');
          }
        }
    
        if (Platform.OS === 'android') {
          permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    
          if (
            permissionCheck === RESULTS.BLOCKED ||
            permissionCheck === RESULTS.DENIED
          ) {
            const permissionRequest = await request(
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
            );
            permissionRequest === RESULTS.GRANTED
              ? console.warn('Location permission granted.')
              : console.warn('location permission denied.');
          }
        }
    }

    useEffect(() => {
        handleLocationPermission()
      }, [])

    const [region, setRegion] = useState({
        latitude: 51.5079145,
        longitude: -0.0899163,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [showModal, setShowModal] = useState(false);
    
    const [modalKey, setModalKey] = useState(0)

    const museums = [
        // { id: 1, uri: 'https://khh.travel/content/images/static/1-4-1-01.jpg', address:'802高雄市苓雅區五福一路67號' ,alt: '高雄市立文化中心', phone:'072225136', href: 'http://www.khcc.gov.tw/rwd_home03.aspx?ID=$M102&IDK=2&EXEC=L' },
        // { id: 2, uri: 'https://khh.travel/content/images/static/1-4-1-02.jpg', address:'830高雄市鳳山區光遠路161號' ,alt: '大東文化藝術中心', phone:'077430011', href: 'http://dadongcenter.khcc.gov.tw/home01.aspx?ID=1' },
        // { id: 3, uri: 'https://khh.travel/content/images/static/1-4-1-03.jpg', address:'820高雄市岡山區岡山路43號' ,alt: '岡山文化中心', phone:'076262620', href: 'http://gangshan.khcc.gov.tw/home01.aspx?ID=1' },
        // { id: 4, uri: 'https://khh.travel/content/images/static/1-4-1-04.jpg', address:'812高雄市小港區學府路115號' ,alt: '高雄市立社會教育館', phone:'078034473',href: 'https://www.kmseh.gov.tw/03_activity/01_list.php' },
        // { id: 5, uri: 'https://khh.travel/content/images/static/1-4-1-05.jpg', address:'803高雄市鹽埕區河西路99號' ,alt: '高雄市音樂館', phone:'075315555',href: 'https://kaohsiungmusichall.khcc.gov.tw/home01.aspx?ID=1' },
        // { id: 6, uri: 'https://khh.travel/content/images/static/1-4-1-06.jpg', address:'高雄市鹽埕區河西路99號5樓' ,alt: '高雄市國樂團', phone:'077436633',href: 'https://www.facebook.com/%E9%AB%98%E9%9B%84%E5%B8%82%E5%9C%8B%E6%A8%82%E5%9C%98-131813126885013/' },
        // { id: 7, uri: 'https://khh.travel/content/images/static/1-4-1-07.jpg', address:'830高雄市鳳山區八德路二段148號' ,alt: '高雄市立交響樂團', phone:'077436633',href: 'https://www.facebook.com/kso.taiwan' },
        // { id: 8, uri: 'https://khh.travel/content/images/static/1-4-1-08.jpg', address:'830高雄市鳳山區三多一路1號' ,alt: '衛武營國家藝術文化中心', phone:'072626666',href: 'https://kaohsiungmusichall.khcc.gov.tw/home01.aspx?ID=1' },
        // { id: 9, uri: 'https://khh.travel/content/images/static/1-4-2-01.jpg', address:'804高雄市鼓山區美術館路80號' ,alt: '高雄市立美術館', phone:'075550331',href: 'https://www.kmfa.gov.tw/' },
        // { id: 10, uri: 'https://khh.travel/content/images/static/1-4-2-02.jpg', address:'803高雄市鹽埕區中正四路272號' ,alt: '高雄市立歷史博物館', phone:'075312560',href: 'http://www.khm.org.tw/tw/exhibition/currentexhibitions' },
        // { id: 11, uri: 'https://khh.travel/content/images/static/1-4-2-03.jpg', address:'803高雄市鹽埕區大勇路1號' ,alt: '駁二藝術特區', phone:'075214899',href: 'https://www.facebook.com/pier2art' }, 
    
        { id: 12, uri: '...', address:'80250高雄市苓雅區四維三路176號' ,alt: '高雄市苓雅區樂齡學習中心', phone:'07-3353307#410',href: 'https://sites.google.com/view/lingyaqulelingxuexizhongxin/%E9%A6%96%E9%A0%81' }, 
        { id: 13, uri: '...', address:'80767高雄市三民區建興路391號' ,alt: '高雄市三民區樂齡學習中心', phone:'07-3801371',href: 'https://moe.senioredu.moe.gov.tw/HomeSon/Kaohsiung/KaohsiungIndex' }, 
        { id: 14, uri: '...', address:'84345高雄市美濃區中正路二段351號' ,alt: '高雄市美濃區樂齡學習中心', phone:'07-6813405',href: '' }, 
        { id: 15, uri: '...', address:'80542高雄市旗津區中洲三路623號' ,alt: '高雄市旗津區樂齡學習中心', phone:'07-5715133',href: '' },
        { id: 16, uri: '...', address:'81252高雄市小港區飛機路153號' ,alt: '高雄市小港區樂齡學習中心', phone:'07-8014543',href: '' },
        { id: 17, uri: '...', address:'81151高雄市楠梓區樂群路220號' ,alt: '高雄市楠梓區樂齡學習中心	', phone:'07-3627169',href: '' }, 
        { id: 18, uri: '...', address:'80049高雄市新興區中正四路53號2樓' ,alt: '高雄市新興區樂齡學習中心', phone:'07-2222272',href: '' }, 
        { id: 19, uri: '...', address:'83154高雄市大寮區進學路150號' ,alt: '高雄市大寮區樂齡學習中心', phone:'07-7639199',href: '' }, 
        { id: 20, uri: '...', address:'82044高雄市岡山區柳橋東路36號' ,alt: '高雄市岡山區樂齡學習中心', phone:'07-6224415',href: '' },
        { id: 21, uri: '...', address:'84841高雄市桃源區高中里4鄰興中巷95號' ,alt: '高雄市桃源區樂齡學習中心', phone:'07-6883223',href: '' }, 
        { id: 22, uri: '...', address:'80673高雄市前鎮區新衙路93號' ,alt: '高雄市樂齡學習示範中心', phone:'07-8414911',href: '' }, 
        { id: 23, uri: '...', address:'80143高雄市前金區大同二路61號' ,alt: '高雄市前金區樂齡學習中心', phone:'07-2829001',href: '' }, 
        { id: 24, uri: '...', address:'80445高雄市鼓山區河西一路211號' ,alt: '高雄市鼓山區樂齡學習中心', phone:'07-5839946',href: '' }, 
        { id: 25, uri: '...', address:'813高雄市左營區新莊仔路30號' ,alt: '高雄市左營區樂齡學習中心', phone:'07-3433080',href: '' }, 
        { id: 26, uri: '...', address:'85244高雄市茄萣區茄萣路二段307號' ,alt: '高雄市茄萣區樂齡學習中心', phone:'07-6900057',href: '' }, 
        { id: 27, uri: '...', address:'84550高雄市內門區中正路203號' ,alt: '高雄市內門區樂齡學習中心', phone:'0935-971623',href: '' }, 
        { id: 28, uri: '...', address:'814高雄市仁武區仁心路31號' ,alt: '高雄市仁武區樂齡學習中心', phone:'07-6671672',href: '' }, 
        { id: 29, uri: '...', address:'82945高雄市湖內區民權路2號' ,alt: '高雄市湖內區樂齡學習中心', phone:'0935-971623',href: '' }, 
        { id: 30, uri: '...', address:'82743高雄市彌陀區中正路213號' ,alt: '高雄市彌陀區樂齡學習中心', phone:'07-6176300',href: '' }, 
        { id: 31, uri: '...', address:'82241高雄市阿蓮區民族路163號' ,alt: '高雄市阿蓮區樂齡學習中心', phone:'07-6312049',href: '' }, 
        { id: 32, uri: '...', address:'82441高雄市燕巢區中華路177號' ,alt: '高雄市燕巢區樂齡學習中心', phone:'07-6161495',href: '' }, 
        // { id: 33, uri: '...', address:'84044高雄市大樹區中華路國小巷1號' ,alt: '高雄市大樹區樂齡學習中心', phone:'07-6515536',href: '' }, 
        // { id: 34, uri: '...', address:'83075高雄市鳳山區國泰路二段81號' ,alt: '高雄市鳳山區樂齡學習中心', phone:'07-7632199',href: '' }, 
        // { id: 35, uri: '...', address:'82144高雄市路竹區環球路452號' ,alt: '高雄市路竹區樂齡學習中心', phone:'07-6979328',href: '' }, 
        // { id: 36, uri: '...', address:'82541高雄市橋頭區仕隆路進校巷16號' ,alt: '高雄市橋頭區樂齡學習中心', phone:'07-6113517',href: '' }, 
        // { id: 37, uri: '...', address:'80344高雄市鹽埕區五福四路183號' ,alt: '高雄市鹽埕區樂齡學習中心', phone:'07-6412125',href: '' }, 
        // { id: 38, uri: '...', address:'83249高雄市林園區忠孝西路20號' ,alt: '高雄市林園區樂齡學習中心', phone:'07-6412125',href: '' }, 
        // { id: 39, uri: '...', address:'83343高雄市鳥松區學堂路2號' ,alt: '高雄市鳥松區樂齡學習中心', phone:'07-7639199',href: '' }, 
        // { id: 40, uri: '...', address:'828高雄市永安區維新里光明九巷34號' ,alt: '高雄市永安區樂齡學習中心', phone:'07-6142095',href: '' },
        // { id: 41, uri: '...', address:'81544高雄市大社區大社路116-1號' ,alt: '高雄市大社區樂齡學習中心', phone:'07-428443',href: '' },
        // { id: 42, uri: '...', address:'842高雄市旗山區旗甲路二段256巷4號' ,alt: '高雄市旗山區樂齡學習中心', phone:'07-6692382',href: '' },
        // { id: 43, uri: '...', address:'84941高雄市那瑪夏區達卡努瓦里二鄰秀嶺巷82號' ,alt: '高雄市那瑪夏區樂齡學習中心', phone:'07-6701786',href: '' },
        // { id: 44, uri: '...', address:'84649高雄市杉林區大愛里和氣街150巷12號' ,alt: '高雄市杉林區樂齡學習中心', phone:'07-6775469',href: '' },
        // { id: 45, uri: '...', address:'84742高雄市甲仙區忠孝路2號' ,alt: '高雄市甲仙區樂齡學習中心', phone:'07-6754099',href: '' },
        // { id: 46, uri: '...', address:'84444高雄市六龜區南橫路72號' ,alt: '高雄市六龜區樂齡學習中心', phone:'07-6881311',href: '' },
        // { id: 47, uri: '...', address:'85141高雄市茂林區多納里1-2號' ,alt: '高雄市茂林區樂齡學習中心', phone:'07-6801178',href: '' },
        // { id: 48, uri: '...', address:'82341高雄市田寮區崇德路9之1號' ,alt: '高雄市田寮區樂齡學習中心', phone:'07-6367800',href: '' },
        // { id: 49, uri: '...', address:'82643高雄市梓官區平等路190號1樓' ,alt: '高雄市田寮區樂齡學習中心', phone:'0973-428443',href: '' },
        // { id: 50, uri: '...', address:'82343高雄市田寮區新興里和興路39號-5' ,alt: '高雄市田寮區牛稠埔樂齡學習中心', phone:'0973-428443',href: '' },




        // { id: 11, uri: 'https://khh.travel/content/images/static/1-4-2-03.jpg', address:'803高雄市鹽埕區大勇路1號' ,alt: '駁二藝術特區', phone:'075214899',href: 'https://www.facebook.com/pier2art' }, 
        
    ];

    const markers = [
        // { id: 1, latitude: 22.626812,longitude: 120.317658, uri: 'https://khh.travel/content/images/static/1-4-1-01.jpg' }, //高雄市立文化中心
        // { id: 2, latitude: 22.624980,longitude: 120.363450, uri: 'https://khh.travel/content/images/static/1-4-1-02.jpg' }, //大東文化藝術中心
        // { id: 3, latitude: 22.787620,longitude: 120.296300, uri: 'https://khh.travel/content/images/static/1-4-1-03.jpg' }, //岡山文化中心
        // { id: 4, latitude: 22.565310,longitude: 120.359619, uri: 'https://khh.travel/content/images/static/1-4-1-04.jpg' }, //高雄市立社會教育館
        // { id: 5, latitude: 22.628090,longitude: 120.286630, uri: 'https://khh.travel/content/images/static/1-4-1-05.jpg' }, //高雄市音樂館
        // { id: 6, latitude: 22.627572,longitude: 120.286564, uri: 'https://khh.travel/content/images/static/1-4-1-06.jpg' }, //高雄市國樂團
        // { id: 7, latitude: 22.64397,longitude: 120.355193, uri: 'https://khh.travel/content/images/static/1-4-1-07.jpg' }, //高雄市立交響樂團
        // { id: 8, latitude: 22.623820,longitude: 120.335850, uri: 'https://khh.travel/content/images/static/1-4-1-08.jpg' }, //衛武營國家藝術文化中心
        // { id: 9, latitude: 22.654980,longitude: 120.286970, uri: 'https://khh.travel/content/images/static/1-4-2-01.jpg' }, //高雄市立美術館
        // { id: 10, latitude: 22.626770,longitude: 120.286840, uri: 'https://khh.travel/content/images/static/1-4-2-02.jpg' }, //高雄市立歷史博物館
        // { id: 11, latitude: 22.6200,longitude: 120.2815, uri: 'https://khh.travel/content/images/static/1-4-2-03.jpg' }, //駁二藝術特區
        
        { id: 12, latitude: 22.618380, longitude: 120.306389, uri: '...' },
        { id: 13, latitude: 22.646770, longitude: 120.321500, uri: '...' },
        { id: 14, latitude: 22.883260, longitude: 120.534180, uri: '...' },
        { id: 15, latitude: 22.608610, longitude: 120.271760, uri: '...' },
        { id: 16, latitude: 22.573000, longitude: 120.360620, uri: '...' },
        { id: 17, latitude: 22.720610, longitude: 120.296460, uri: '...' },
        { id: 18, latitude: 22.630430, longitude: 120.301150, uri: '...' },
        { id: 19, latitude: 22.604410, longitude: 120.392950, uri: '...' },
        { id: 20, latitude: 22.791160, longitude: 120.293720, uri: '...' },
        { id: 21, latitude: 23.130530, longitude: 120.719380, uri: '...' },
        { id: 22, latitude: 22.582204, longitude: 120.317182, uri: '...' },
        { id: 23, latitude: 22.626400, longitude: 120.293910, uri: '...' },
        { id: 24, latitude: 22.639610, longitude: 120.283590, uri: '...' },
        { id: 25, latitude: 22.678274, longitude: 120.295835, uri: '...' },
        { id: 26, latitude: 22.907147, longitude: 120.181861, uri: '...' },
        { id: 27, latitude: 22.918213, longitude: 120.453867, uri: '...' },
        { id: 28, latitude: 22.683406, longitude: 120.357578, uri: '...' },
        { id: 29, latitude: 22.887835, longitude: 120.244097, uri: '...' },
        { id: 30, latitude: 22.784137, longitude: 120.248349, uri: '...' },
        { id: 31, latitude: 22.883248, longitude: 120.329747, uri: '...' },
        { id: 32, latitude: 22.795812, longitude: 120.366032, uri: '...' },
        // { id: 33, latitude: 22.668445, longitude: 120.407596, uri: '...' },
        // { id: 34, latitude: 22.620323, longitude: 120.346739, uri: '...' },
        // { id: 35, latitude: 22.884052, longitude: 120.261217, uri: '...' },
        // { id: 36, latitude: 22.751105, longitude: 120.311415, uri: '...' },
        // { id: 37, latitude: 22.623527, longitude: 120.282683, uri: '...' },
        // { id: 38, latitude: 22.507374, longitude: 120.393100, uri: '...' },
        // { id: 39, latitude: 22.657614, longitude: 120.398598, uri: '...' },
        // { id: 40, latitude: 22.806925, longitude: 120.246168, uri: '...' },
        // { id: 41, latitude: 22.733430, longitude: 120.352441, uri: '...' },
        // { id: 42, latitude: 22.920731, longitude: 120.496860, uri: '...' },
        // { id: 43, latitude: 22.268696, longitude: 120.719477, uri: '...' },
        // { id: 44, latitude: 22.967325, longitude: 120.544741, uri: '...' },
        // { id: 45, latitude: 22.081961, longitude: 120.587002, uri: '...' },
        // { id: 46, latitude: 22.073101, longitude: 120.672514, uri: '...' },
        // { id: 47, latitude: 22.910196, longitude: 120.716113, uri: '...' },
        // { id: 48, latitude: 22.877436, longitude: 120.382606, uri: '...' },
        // { id: 49, latitude: 22.759536, longitude: 120.268900, uri: '...' },
        // { id: 50, latitude: 22.834403, longitude: 120.369349, uri: '...' },
    ];




    // Zoom In
        // 0.00921
        // 0.00522

        // Zoom Out
        // 0.06977
        // 0.03957

    const Markers = () => {
        return (
            <>
            {markers.map((marker, modalKey) => {
                return(
                    <Marker key={modalKey} tracksViewChanges={false} coordinate={marker} onPress={() => {
                        setShowModal(true)
                        setModalKey(modalKey)
                        }}>
                            
                        {/* <Image source={{uri: marker.uri}} style={{height: 76, width:106 }} /> */}
                        <Image source={require('../assets/map_marker.png')} style={{height: 42, width: 42}} />

                    </Marker>    
                )
            })}
            </>
        );
    }


    return (
        <View style={styles.container}>
            <MapView
                showsUserLocation={true}
                showsMyLocationButton={true}
                style={styles.map}
                //specify our coordinates.
                initialRegion={{
                    latitude: 22.6573,
                    longitude: 120.3014,
                    latitudeDelta: 0.3522,
                    longitudeDelta: 0.0421,
                }}
                onRegionChangeComplete={(region) => setRegion(region)}
            >   
                <Markers/>
            </MapView>
        {/* <Text>Current latitude: {region.latitudeDelta}</Text>
        <Text>Current longitude: {region.longitudeDelta}</Text> */}
            <Center>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Body>
                        <Text style={{fontSize: 20, marginLeft: 5, marginTop: 10}}>
                            {museums[modalKey].alt}
                        </Text>
                        <Button variant="outline" colorScheme="coolGray" onPress={()=> Linking.openURL('geo:0,0?q='+museums[modalKey].address)} style={{flex:1, flexDirection: 'row',justifyContent: 'center', marginTop: 6,alignItems:'center', borderRadius: 50, borderWidth:  StyleSheet.hairlineWidth}}>
                                    <Icon name={"place"} color={'#C11'} size={30} type="materialicons" />
                                    <Text 
                                        style={styles.functionText}
                                    >
                                        {museums[modalKey].address}
                                    </Text>
                                {/* </View> */}
                            {/* </TouchableOpacity> */}
                        </Button>

                        <Button variant="outline" colorScheme="coolGray" onPress={()=> Linking.openURL(`tel:${museums[modalKey].phone}`)} style={{flex:1, flexDirection: 'row',justifyContent: 'center', marginTop: 6,alignItems:'center', borderRadius: 50, borderWidth:  StyleSheet.hairlineWidth}}>
                                <Icon name={"phone"} color={'#005b8f'} size={30} type="materialicons" />
                                    <Text 
                                        style={styles.functionText}
                                    >
                                        {museums[modalKey].phone}
                                    </Text>
                        </Button>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
            </Center>
        </View>
        // Zoom In
        // 0.00921
        // 0.00522

        // Zoom Out
        // 0.06977
        // 0.03957
  );
}

export default MuseumScreen;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1, //the container will fill the whole screen.
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#FFF',
        borderRadius: 6,
        borderColor: '#ccc',
        borderWidth: 0.5,
        padding: 5,
        width: '100%'
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32,
      },
      arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5,
        // marginBottom: -15
      },
    scrollView: {
        flex: 1,
        backgroundColor: colors.white,
    },
    box: {
        flex: 1,
        flexDirection: 'column',
        // alignItems: 'flex-start',
        backgroundColor:'white',
        padding: 15,
        borderRadius: 6,
        borderColor: 'lightgrey',
        borderWidth: StyleSheet.hairlineWidth,
    },
    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#f9f9f3',
        padding: 30,
        margin: 16,
        marginHorizontal: 22,
        borderRadius: 15,
    },
    functionContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 12,
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },
    functionButton: {
        backgroundColor: '#f9f9f3',
        padding: 5,
        borderRadius: 20,
        marginRight: 10,
        marginLeft: 10,
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
    icon:{
        width: 48,
        height: 48,
    },
    iconV2:{
        width: 40,
        height: 40,
    },
    profileInfo: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: 24,
        paddingLeft: 10,
    },
    profileText: {
        fontSize: 24,
    },
    functionButtonIcon: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        height: 80,
        width: 80,
    },
    functionText: {
        marginLeft: 10,
        fontSize: 16,
        textAlign:'left',
    },
    imageScrollView:{
        marginLeft: 12,
        marginVertical: 0,
    },
    imageContainer: {
        marginRight: 10,
    },
    museumImage: {
        width: 150,
        height: 100,
        borderRadius:5,
    },
    subTitleText: {
        marginTop: 5,
        color: 'grey',
        fontSize: 20,
        textDecorationLine: 'underline'
    },
    subTitleContainer: {
        marginHorizontal:24,
        marginBottom: 10,
    },
});