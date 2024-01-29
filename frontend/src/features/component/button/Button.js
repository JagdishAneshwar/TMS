import React from 'react'
import './_button.scss';

const Button = ({value}) => {
  return (
    <button class="button" type="submit">{value}</button>
  )
}

export default Button