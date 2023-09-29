import React from 'react'
import '../index.css'

export default function DisplayRedMessage({message}) {
    if(!message) return null
  return (
    <div className='redMessage'>{message}</div>
  )
}
