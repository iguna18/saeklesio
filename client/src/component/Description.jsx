import React from 'react'

export default function Description({text}) {
  return (
    <div dangerouslySetInnerHTML={{ __html: text }} />
  )
}
