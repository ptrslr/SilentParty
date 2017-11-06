/**
 * @param  time in miliseconds
 * @return time as string in format hh:mm
 */
export const formatTime = (t = 0) => {
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000) / 60);

  // slice so the seconds are always 2 digits
  return minutes + ":" + ("0" + seconds).slice(-2);
}
