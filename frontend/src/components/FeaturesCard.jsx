import React from 'react'
import {Icon} from './custom/Icon'
import {BookIcon, Star} from 'lucide-react'



export const FeaturesCard = ({icon: Icon, title, content}) => {
  return (
    <div>
      <Icon /> 
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  )
}
