import React, { useState, useEffect } from 'react'

export default function useMediaQuery(obj: { query: string }) {
  let match_media = window.matchMedia(obj.query).matches
  const [state, setState] = useState(match_media)

  useEffect(() => {
    window.addEventListener('resize', function () {
      let match_media_effect = window.matchMedia(obj.query).matches
      setState(match_media_effect)
    })
  })

  return state
}

interface MediaProps {
  orientation?: string
  minWidth?: number
  maxWidth?: number
  minHeight?: number
  maxHeight?: number
  minResolution?: string | number
  maxResolution?: string | number
  children: React.ReactNode | ((matches: boolean) => React.ReactNode)
}

export function MediaQuery(props: MediaProps) {
  const query_array = []
  const orientation = props.orientation
  if (orientation) query_array.push('(orientation: ' + orientation + ')')
  const minWidth = props.minWidth
  if (minWidth) query_array.push('(min-width: ' + minWidth + 'px)')
  const maxWidth = props.maxWidth
  if (maxWidth) query_array.push('(max-width: ' + maxWidth + 'px)')
  const minHeight = props.minHeight
  if (minHeight) query_array.push('(min-height: ' + minHeight + 'px)')
  const maxHeight = props.maxHeight
  if (maxHeight) query_array.push('(max-height: ' + maxHeight + 'px)')

  const minResolution = props.minResolution
  if (minResolution)
    query_array.push(
      '(' +
        (typeof minResolution === 'string'
          ? 'min-resolution'
          : '-webkit-min-device-pixel-ratio') +
        ': ' +
        minResolution +
        ')'
    )
  const maxResolution = props.maxResolution
  if (maxResolution)
    query_array.push(
      '(' +
        (typeof maxResolution === 'string'
          ? 'max-resolution'
          : '-webkit-max-device-pixel-ratio') +
        ': ' +
        maxResolution +
        ')'
    )

  const query = query_array.join(' and ')
  const matches = useMediaQuery({ query: query })

  if (typeof props.children == 'function')
    return <div>{props.children(matches)}</div>

  if (!matches) return null
  return <div>{props.children}</div>
}
