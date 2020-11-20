import React from 'react'

import Box           from '@material-ui/core/Box'
import { Direction } from '@material-ui/core/styles'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
  dir: Direction
}

export default function TabPanel({ children, value, index, dir }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={ value !== index } dir={ dir }>
      { value === index && <Box p={ 3 }>{ children }</Box> }
    </div>
  )
}
