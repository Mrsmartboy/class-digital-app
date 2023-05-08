import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timeElapsedInSeconds: 0,
    timeElapsedInMinutes: 25,
    isTimerRunning: true,
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  clearTimer = () => clearInterval(this.timerId)

  getIncrement = () => {
    const {timeElapsedInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInMinutes * 60 === timeElapsedInSeconds

    if (isTimerCompleted) {
      this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
      this.clearTimer()
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onResetBtn = () => {
    this.setState({
      timeElapsedInMinutes: 25,
      timeElapsedInSeconds: 0,
      isTimerRunning: true,
    })
    this.clearTimer()
  }

  onPlayBtn = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      this.timerId = setInterval(this.getIncrement, 1000)
    } else {
      this.clearTimer()
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  onIncreaseValue = () => {
    const {isTimerRunning} = this.state

    if (isTimerRunning) {
      this.setState(prevState => ({
        timeElapsedInMinutes: prevState.timeElapsedInMinutes + 1,
      }))
    }
  }

  onDecreaseValue = () => {
    const {timeElapsedInMinutes, isTimerRunning} = this.state

    if (timeElapsedInMinutes > 1 && isTimerRunning) {
      this.setState(prevState => ({
        timeElapsedInMinutes: prevState.timeElapsedInMinutes - 1,
      }))
    }
  }

  getRenderedTime = () => {
    const {timeElapsedInMinutes, timeElapsedInSeconds} = this.state
    const totalInSeconds = timeElapsedInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalInSeconds / 60)
    const seconds = Math.floor(totalInSeconds % 60)
    const minutesFormat = minutes > 9 ? minutes : `0${minutes}`
    const secondsFormat = seconds > 9 ? seconds : `0${seconds}`
    return `${minutesFormat}:${secondsFormat}`
  }

  render() {
    const {timeElapsedInMinutes, isTimerRunning} = this.state
    const timeText = this.getRenderedTime()
    const imageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const textValue = isTimerRunning ? 'Paused' : 'Running'
    const playOrPause = isTimerRunning ? 'Start' : 'Pause'
    return (
      <div className="bg-container">
        <h1 className="head">Digital Timer</h1>
        <div className="timer-container">
          <div className="card-container">
            <div className="time-run-container">
              <h1 className="time">{timeText}</h1>
              <span className="running">{textValue}</span>
            </div>
          </div>
          <div className="timer-control-container">
            <div className="control-container">
              <div className="start-container">
                <img
                  src={imageUrl}
                  alt="play"
                  className="icon"
                  onClick={this.onPlayBtn}
                />
                <p className="start">{playOrPause}</p>
              </div>
              <div className="reset-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset"
                  className="icon"
                  onClick={this.onResetBtn}
                />
                <p className="reset">Reset</p>
              </div>
            </div>
            <p className="timer-limit">Set Timer Limit</p>
            <div className="increase-or-decrease">
              <button
                type="button"
                className="increase-decrease-btn"
                onClick={this.onDecreaseValue}
              >
                -
              </button>
              <p className="number">{timeElapsedInMinutes}</p>
              <button
                type="button"
                className="increase-decrease-btn"
                onClick={this.onIncreaseValue}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
