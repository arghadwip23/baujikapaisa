"use client"

import {React} from 'react'
import Load from './Load';
import MainBody from './MainBody';
import { Suspense } from 'react';


export default function Content() {
//getting the query params
   
  return (
    <Suspense fallback={<Load/>}>
        <MainBody/>
    </Suspense>

  )
}
