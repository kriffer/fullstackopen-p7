import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    if (!event) {
      setValue('')
      return
    }
    setValue(event.target.value)
  }

  const onClick = () => {
    if (type === 'button')
      setValue(!value)
  }

  return {
    type,
    value,
    onChange,
    onClick
  }
}