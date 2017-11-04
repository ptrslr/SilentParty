import React from 'react';
import { MdPlayArrow, MdPause, MdSkipPrevious, MdSkipNext } from 'react-icons/lib/md';

const Icon = (props) => {
  const resolve = (name) => {
    switch (props.name) {
      case 'play':
        return <MdPlayArrow />
      case 'pause':
        return <MdPause />
      case 'previous':
        return <MdSkipPrevious />
      case 'next' :
        return <MdSkipNext />
      default:
        return null;
    }
  }

  return (
    resolve(props.name)
  )
}

export default Icon;