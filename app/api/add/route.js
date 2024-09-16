import { NextResponse } from "next/server";
import db from "@/utils/firestore";
import { collection,addDoc } from "@firebase/firestore";

export async function POST(request) {
let link={
    agl:"https://angel-one.onelink.me/Wjgr/mlhw3tsu",
    wzo:"https://winzo.onelink.me/gu8K/x7ntyxk0 ",
    cdx:"https://join.coindcx.com/invite/Z2qU"
}



    let data = await request.json();
    try{
        const docRef = await addDoc(collection(db,data.app),data)
        console.log(docRef.id);
        return NextResponse.json({success:true,data:link[data.app]})
    }catch(e){
        console.log(e);
        return NextResponse.json({success:false,data:"failure"})
        
    }
   
    
    
}