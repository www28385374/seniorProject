import PushNotification from "react-native-push-notification";

const showNotification = (title, message) => {
    PushNotification.localNotification({
        channelId: "123",
        autoCancel: true,
        title: '新消息!!',
        message: '您訂閲的主題有2個新消息',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: '["查看"]',
    });
};

const handleScheduleNotification = (title, message) => {
    PushNotification.localNotificationSchedule({
        channelId: "123",
        autoCancel: true,
        title: '「走過戒/解嚴—藝術家如何書寫大時代? 」雲端論壇徵文開始（即日起~11月5日）',
        message: '本論壇計畫緣自高美館預定於2022年6月上檔之「多元史觀特藏室二部曲：南方作為衝撞之所；展覽聚焦於探討1970-90年代走過戒嚴與解嚴時代，身處壓力鍋沸騰極限又乍然釋放下的大高雄藝術圈。',
        vibrate: true,
        vibration: 300,
        playSound: true,
        soundName: 'default',
        actions: '["查看"]',
        date: new Date(Date.now() + 5 * 1000),
    });
};

const handleCancel = () => {
    PushNotification.cancelAllLocalNotifications();
};

export { showNotification, handleScheduleNotification, handleCancel }
