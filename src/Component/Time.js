import React, { useEffect, useState } from 'react'
import "../CSS/Time.css"
import { io } from "socket.io-client"

const Time = () => {

  const [socket, setsocket] = useState();
  const [PipeName, setPipeName] = useState();
  const [PipeInfo, setPipeInfo] = useState([]);

  const [ListId, setListId] = useState("")


  const [GlobalTime, setGlobalTime] = useState([]);
  const [GlobalMinute, setGlobalMinute] = useState();
  const [GlobalSecond, setGlobalSecond] = useState()

  useEffect(() => {
    const socket = io('http://43.204.140.248:3000');
    setsocket(socket);
    socket.emit("PipeInfo",PipeName);
      socket.on("PipeList", (doc) => {
        // window.location.reload(true);
        // console.clear();
        console.log(doc);
        setPipeInfo(doc);
        
      })
      let Hour = new Date().getHours()
        let Minute = new Date().getMinutes()
        let Second = new Date().getSeconds()
        let TodayDate = new Date().getDate();
        let TodayMonth = new Date().getMonth();
        let TodayYear = new Date().getFullYear();
        let AllMonth = ["Jan", "Feb", "Mar", "Apr", "May","June","Jul","Aug","Sept","Oct","Nov","Dec"]

      
        socket.emit("StoreTime", {Name: "ANMOL2",DATE: TodayDate, MONTH: AllMonth[TodayMonth], YEAR: TodayYear, HOUR: Hour, MINUTE: Minute, SECOND: Second})

      socket.on("GetStoreTime", (StoreTime) => {
        console.clear()
        console.log("......Get Store Time.......")
        
        console.log(TodayDate);
        console.log(AllMonth[TodayMonth]);
        console.log(TodayYear);

        console.log(StoreTime);
        setGlobalTime(StoreTime)
        console.log(GlobalTime);
      })





  }, [])

  



 
  const InputChange = (q) => {
     console.log(q)
     console.log(q.target.value)
     setPipeName(q.target.value)
     
     
  }
  const KeyPress = (w) => {
    console.clear()
    console.log(w)
    if(w.key == "Enter" && typeof(PipeName) != null && PipeName != ""){
      console.log(PipeName);
      console.log("Done");
      socket.emit("PipeInfo",PipeName);
      socket.on("PipeList", (doc) => {
        
        // console.clear();
        console.log(doc);
        setPipeInfo(doc);
        setPipeName("");
        // window.location.reload(true);
        let Hour = new Date().getHours()
        let Minute = new Date().getMinutes()
        let Second = new Date().getSeconds()
        let TodayDate = new Date().getDate();
        let TodayMonth = new Date().getMonth();
        let TodayYear = new Date().getFullYear();
        let AllMonth = ["Jan", "Feb", "Mar", "Apr", "May","June","Jul","Aug","Sept","Oct","Nov","Dec"]

      
        socket.emit("DeleteTime", {Name: "ANMOL", DATE: TodayDate, MONTH: AllMonth[TodayMonth], YEAR: TodayYear, HOUR: Hour, MINUTE: Minute, SECOND: Second})
        socket.emit("StoreTime", {Name: "ANMOL", DATE: TodayDate, MONTH: AllMonth[TodayMonth], YEAR: TodayYear, HOUR: Hour, MINUTE: Minute, SECOND: Second})
        socket.on("GetStoreTime", (StoreTime) => {
          console.clear()
          console.log("......Get Store Time.......")
          console.log(StoreTime);
          setGlobalTime(StoreTime)
          console.log(GlobalTime);
        })
       
      })
     

    }
      

  }
  const DeleteButton = (r) => {
    console.log(r.target.className);
    socket.emit("DeleteID",r.target.className)
    socket.on("Reload", (t) => {
      window.location.reload(true);
    })

    let Hour = new Date().getHours()
        let Minute = new Date().getMinutes()
        let Second = new Date().getSeconds()
        let TodayDate = new Date().getDate();
        let TodayMonth = new Date().getMonth();
        let TodayYear = new Date().getFullYear();
        let AllMonth = ["Jan", "Feb", "Mar", "Apr", "May","June","Jul","Aug","Sept","Oct","Nov","Dec"]



      
        socket.emit("DeleteTime", {Name: "ANMOL", DATE: TodayDate, MONTH: AllMonth[TodayMonth], YEAR: TodayYear, HOUR: Hour, MINUTE: Minute, SECOND: Second})
        socket.emit("StoreTime", {Name: "ANMOL", DATE: TodayDate, MONTH: AllMonth[TodayMonth], YEAR: TodayYear, HOUR: Hour, MINUTE: Minute, SECOND: Second})
        socket.on("GetStoreTime", (StoreTime) => {
          console.clear()
          console.log("......Get Store Time.......")
          console.log(StoreTime);
          setGlobalTime(StoreTime)
          console.log(GlobalTime);
        })





    
  }

  
  

  


  return (
    <div>
      <div className='TimeHeading'>
        {/* <div>TIME</div> */}
        {
          GlobalTime.map((a) => {
            return(
              <div>{a.DATE}/{a.MONTH}/{a.YEAR} &nbsp;{a.HOUR}:{a.MINUTE} --- {a.SECOND}</div>
            )
          })
        }
      </div>
      <div className='PipeInputBorder'>
      <input value={PipeName} onKeyDown={KeyPress} onChange={InputChange} className='PipeInput' placeholder='Enter Pipes Order'/>
      </div>

      {
        PipeInfo.map((e) => {
          return(
            <div className='PipeListBorder'>
            
            <div className='PipeList'>{e.Name}
            <button className={e._id} onClick={DeleteButton}>Delete</button>
           
            </div>
            
            
            </div>
          )
        })
      }
    </div>
  )
}

export default Time
