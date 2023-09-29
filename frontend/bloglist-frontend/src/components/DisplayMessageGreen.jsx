import React from 'react'
import '../index.css'

export default function DisplayMessageGreen({message}) {
    if(!message) return null


  return (
    <div className='greenMessage'>{message}</div>
  )
}
