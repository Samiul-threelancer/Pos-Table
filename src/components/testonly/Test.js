import React from 'react'
import './test.css'
import { useRef } from 'react'
import Printer from '@eyelly/react-printer'
const Test = () => {
    const printContent = useRef(null)



  return (
    <>    
    <div ref={printContent}> this is content to print </div>
    <div> this is normal content </div>
    <Printer content={printContent}>
      <button>Printer</button>
    </Printer>
        
    </>


  )
}

export default Test