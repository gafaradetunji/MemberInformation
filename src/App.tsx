import React from 'react'
import '../src/styles/app.css'
import Members from './pages/members'
import { MemberProvider } from './context/membercontext'

function App() {

  return (
    <React.Fragment>
      <MemberProvider>
        <Members />
      </MemberProvider>
    </React.Fragment>
  )
}

export default App
