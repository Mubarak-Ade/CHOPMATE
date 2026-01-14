import React from 'react'
import clsx from "clsx"

export const Icon = ({icon: Icon, size=25, className}) => {
  return (
    <Icon size={size} className={clsx(className, "cursor-pointer")} />
  )
}
