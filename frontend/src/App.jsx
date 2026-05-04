import Home from "./page/Home"
import Group from "./page/Group"
import Navbar from "./components/Navbar"
import GroupCard from "./components/GroupCard"
import ExpenseModel from "./components/ExpenseModel"

function App() {

  return (
    <>
     <Navbar/>
     <Home/>
     <GroupCard/>
     <Group/>
     {/* <ExpenseModel/> */}
    </>
  )
}

export default App
