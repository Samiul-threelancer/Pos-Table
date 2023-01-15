import React from 'react'

export const Problem = () => {

   var array = [2, -3, -5, -6]
   console.log("values of Array:", array)

   for (let i =0; i<array.length; i++){
    if (array[i]<=0){
        array.splice(i, 1, array[i] * (-1))
    }

    

   }
   const summation = array.reduce((a, b) => a+b, 0)
   
   console.log("Summation of array:", summation)
  
   

  return (

    <div>
   
    </div>
  )
}
