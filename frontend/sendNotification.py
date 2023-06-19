import requests
import json

serverToken = 'AAAASitQM7s:APA91bFIdJ-4-gyGj0e4m8OVeYoJbzMUhC80J6BnlXS1Mn07SmXJvgGsR4cRxaeIgVC_31KntlmQE_JPAsUjR3LrTEvhTXyug5240mwVQTFFi6hvU1BFWN7JlAkMgCLnPxc9HCEBSjCf'
# deviceToken = 'dcXj-mDxTTW2pcQz9b86L8:APA91bE4ZTXrOnOYBgkEicUBdiFSPbpZSu75GPMTajR4ZhGQ2gQc8remqbLXJQCCtiZToEt8Hq1e75Xehcvcds5ZQBxQItGNrQpNiNW8c5-JGNA_2YJgq6riTF2fZldAF6HEDu3RCG5B'
# deviceToken = 'dCddinJ3QpCiXmEEl8kwwM:APA91bFyk8x7by-UprTTNZVhgx7THtA3Mk4Eg3P6NIaXvnrQipdCz4q3qigXKvzDPQFEfyqbKxncapBQuhHaKn4CZIOe7Gm_P1vBLannjyiirEws7jqJdGoVU64HALfzwA-GJZ481z3_'
# deviceToken = 'fce6QelGQw2b3RTyr8-62r:APA91bE0vdr0s7Lt2XqjF-qcrgwbb1y2OHqtgrRArifDcC2rTPZishAhTEOxpNMFC9qGiAhcQq0cbk2XYYDO4O_ND_y7abe9azs8dhLn7pMBbx_w85cPF1vVjWLWsWgO3ZLd6D3jJlcS'
deviceToken = 'cjtNsYOKSL295KnK0J1A5T:APA91bGNI7ZboVk4oqMlp3NR7Hmf0ijakzauexe2BLOM4ftNFJBJGNUjvcwHz2t05jTbHDkzkFhI4NsjBmVddFmXSZkSnu6Ad_IQgU07wyQQEAkxBTJ2O1efJx5jDZZsju_sShdAalg2'

headers = {
        'Content-Type': 'application/json',
        'Authorization': 'key=' + serverToken,
      }

dataPayLoad = {
        'test': 'test'
      }

body = {
          'notification': {'title': '您訂閲主題有新資訊',
                            'body': '您訂閲的主題有2個新消息!',
                            'visibility': 'public'
                            },
          'to': deviceToken,
          'priority': 'high',
          'data': dataPayLoad,
        }
response = requests.post("https://fcm.googleapis.com/fcm/send",headers = headers, data=json.dumps(body))
print(response.status_code)

print(response.json())

