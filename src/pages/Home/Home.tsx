import React from "react"
import TextField from "../../components/TextField/TextField"

const Home = () => {
  return (
    <div className="w-full">
      <TextField
        name="hahaha"
        onChange={(data) => {
          console.log(data)
        }}
        // hasError
        errorMsg="We have a problem"
        helperMsg="This is the helper msg"
        label=""
      />
    </div>
  )
}

export default Home
