import './App.css'
import Navbar from './components/Navbar.jsx'
import Manager from './components/Manager.jsx'

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
   
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:hidden"></div>

   
      <div className="absolute inset-0 -z-10 hidden dark:block">
        <div className="fixed inset-0 h-screen w-screen bg-slate-950">
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        </div>
      </div>

      <Navbar />
      <Manager/>
    </div>
  )
}

export default App
