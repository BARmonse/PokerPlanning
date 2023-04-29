import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {

  useEffect(() => {
    const socket = io("localhost:/5000/", {
      transports: ["websocket"]
    });

    socket.emit("test")

    return () => {
      console.log("DISCONNECTING")
      socket.disconnect()
    }
  }, [])

  return (
   <></>
  )
}

export default App
