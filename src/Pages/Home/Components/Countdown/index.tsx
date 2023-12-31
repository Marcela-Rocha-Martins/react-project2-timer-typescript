/* eslint-disable react-hooks/exhaustive-deps */
// import { useContext, useEffect, useState } from 'react'
// import { CountdownContainer, Separator } from './style'
// import { differenceInSeconds } from 'date-fns'
// import { CyclesContext } from '../../../../contexts/CyclesContext'

// export function Countdown() {
//   const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
//     useContext(CyclesContext)
//   const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
//   const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

//   useEffect(() => {
//     // let interval: number | NodeJS.Timer
//     let interval: NodeJS.Timer

//     if (activeCycle) {
//       interval = setInterval(() => {
//         const secondsDifference = differenceInSeconds(
//           new Date(),
//           new Date(activeCycle.startDate),
//         )

//         if (secondsDifference >= totalSeconds) {
//           markCurrentCycleAsFinished()
//           setAmountSecondsPassed(totalSeconds)
//           clearInterval(interval)
//         } else {
//           setAmountSecondsPassed(secondsDifference)
//         }
//       }, 1000)
//     }

//     return () => {
//       clearInterval(interval)
//     }
//   }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

//   const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

//   const minutesAmount = Math.floor(currentSeconds / 60)
//   const secondsAmount = currentSeconds % 60

//   const minutes = String(minutesAmount).padStart(2, '0')
//   const seconds = String(secondsAmount).padStart(2, '0')

//   useEffect(() => {
//     if (activeCycle) {
//       document.title = `${minutes}:${seconds}`
//     }
//   }, [minutes, seconds, activeCycle])

//   return (
//     <CountdownContainer>
//       <span>{minutes[0]}</span>
//       <span>{minutes[1]}</span>
//       <Separator>:</Separator>
//       <span>{seconds[0]}</span>
//       <span>{seconds[1]}</span>
//     </CountdownContainer>
//   )
// }

import { useContext, useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './style'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CyclesContext'

declare function clearInterval(intervalId: NodeJS.Timer): void

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    useContext(CyclesContext)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  let interval: NodeJS.Timer

  useEffect(() => {
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate),
        )

        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setAmountSecondsPassed(totalSeconds)
          clearInterval(interval as NodeJS.Timer)
        } else {
          setAmountSecondsPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval as NodeJS.Timer)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0
  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60
  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
