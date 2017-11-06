import React from 'react';
import { MdPlayArrow, MdPause, MdSkipPrevious, MdSkipNext } from 'react-icons/lib/md';

const Icon = ({ name, className = "" }) => {
  let cls = `${className} icon`;
  const resolve = (name) => {
    switch (name) {
      case 'play':
        return <MdPlayArrow className={cls} />
      case 'pause':
        return <MdPause className={cls} />
      case 'previous':
        return <MdSkipPrevious className={cls} />
      case 'next' :
        return <MdSkipNext className={cls} />
      default:
        return null;
    }
  }

  return (
    resolve(name)
  )
}

export default Icon;