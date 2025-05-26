'use client'
import React, { FC, ReactNode } from 'react'
import store from './store'
import { Provider } from 'react-redux'

const MyProvider:FC<{children:ReactNode}> = ({children}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default MyProvider