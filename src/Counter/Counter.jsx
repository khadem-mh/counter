import React, { useCallback, useState } from 'react'
import './Counter.css'
import { MdCropRotate } from "react-icons/md";

export default function Counter() {

  const [number, setNumber] = useState(0)
  const [typeFunc, setTypeFunc] = useState('')
  const [rotateBox, setRotateBox] = useState(true)

  const numberHandler = useCallback(action => {
    setTypeFunc(action.type)
    switch (action.type) {
      case 'Max': return setNumber(num => num + 1)
      case 'Reset': return setNumber(num => num - num)
      case 'Min': return setNumber(num => num - 1)
      default: return 0
    }
  }, [])

  const rotateBoxHandler = useCallback(() => {

    const mainElem = document.querySelector('#main')
    const containsMain = document.querySelectorAll('.rotate')
    let containsMainArr = Array.from(containsMain)

    if (rotateBox) {
      mainElem.classList.remove('rotate-main-active')
      containsMainArr.forEach(item => item.classList.remove('rotate-active'))

      mainElem.classList.add('rotate-not-active')
      containsMainArr.forEach(item => item.classList.add('rotate-not-active'))
      setRotateBox(false)
    } else {
      mainElem.classList.remove('rotate-not-active')
      containsMainArr.forEach(item => item.classList.remove('rotate-not-active'))

      mainElem.classList.add('rotate-main-active')
      containsMainArr.forEach(item => item.classList.add('rotate-active'))
      setRotateBox(true)
    }
  }, [rotateBox])

  return (
    <div className='container' id='main'>
      <div className='icon-rotate'>
        <MdCropRotate onClick={() => rotateBoxHandler()} />
      </div>
      <div className='container__top'>
        <p className='top__number rotate'>{number}</p>
        <p className='top__type-func rotate'>{typeFunc ? typeFunc : 'Type'}</p>
      </div>

      <div className='container__bottom rotate'>
        <button onClick={() => numberHandler({ type: 'Max' })}>+</button>
        <button onClick={() => numberHandler({ type: 'Reset' })}>0</button>
        <button onClick={() => numberHandler({ type: 'Min' })}>-</button>
      </div>
    </div>
  )
}
