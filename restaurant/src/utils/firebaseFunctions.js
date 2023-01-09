import {collection, doc,orderBy,query,setDoc,getDocs} from "firebase/firestore"
import { firestore } from "../firebase.config"

//Saving the New Item to Firebase Storage
//Object from and merge it of document 
export const saveProductItem = async(productData)=>{
    await setDoc(doc(firestore,"productItem",`${Date.now()}`),productData,{
        merge : true
    })
}


//getting all items
export const getAllProductItems = async()=>{
    const items = await getDocs(
        query(collection(firestore,"productItem"),orderBy("id","desc"))
    )
    return items.docs.map((doc)=>doc.data());
}