import { useState, useImperativeHandle } from 'react'

const Togglable = (props) => {
  const [showContent, setShowContent] = useState(false)
  const toggleShowContent = () => {
    setShowContent(!showContent)
  }
  useImperativeHandle(props.ref, () => {
    return { toggleShowContent }
  })
  const showButton = { display: showContent ? 'none' : '' }
  const showForm = { display: showContent ? '' : 'none' }
  return (
    <>
      <button style={showButton} onClick={toggleShowContent}>
        {props.buttonName}
      </button>
      <div style={showForm}>
        <div>{props.children}</div>
        <button onClick={toggleShowContent}>cancel</button>
      </div>
    </>
  )
}

export default Togglable
