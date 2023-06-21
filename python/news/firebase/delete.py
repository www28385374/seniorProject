import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./museum-3f66b-firebase-adminsdk-xgvbc-66a34842ab.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

db = firestore.client()

doc_ref=db.collection(u'culture')
doc = doc_ref.get()
for i in doc:
    print (i.to_dict())
