import React, { useEffect } from 'react'
import Left from '@/layouts/Left'
import Right from './layouts/Right'
import CardContent from './layouts/CardContent'
import { useStore } from './store'
import { useMediaQuery } from 'react-responsive' 
import { observer } from 'mobx-react'
const App: React.FC = (): JSX.Element => {
  const {userStore} = useStore()
  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  })

  return (
    <>
      <div
        className="h-screen w-full flex justify-center md:justify-start items-center md:items-start 
        bg absolute overflow-hidden md:overflow-auto bg-cover bg-no-repeat bg-center"
        style={!isMobile ?{ backgroundImage: `url(${userStore.user?.backgroundImage})` } : undefined}
      >
        <CardContent>
          <Left />
          <Right />
        </CardContent>
      </div>
    </>
  )
}

export default observer(App)
