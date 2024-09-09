import { NextResponse } from "next/server";
import db from "@/utils/firestore";
import { collection,addDoc } from "@firebase/firestore";

export async function POST(request) {
    let data = await request.json();
    try{
        const docRef = await addDoc(collection(db,"items"),data)
        console.log(docRef.id);
        return NextResponse.json({success:true,data:"https://angel-one.onelink.me/Wjgr/mlhw3tsu"})
    }catch(e){
        console.log(e);
        return NextResponse.json({success:false,data:"failure"})
        
    }
   
    
    
}