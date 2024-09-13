"use client"

import {React,useState} from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react';
import Load from './Load';
import MainBody from './MainBody';



export default function Content() {
//getting the query params
    const params = useSearchParams();
    let valueOfq = params.get("a")||"agl";
   
  return (
    <Suspense fallback={<Load/>}>
        <MainBody value={valueOfq}/>
    </Suspense>

  )
}
