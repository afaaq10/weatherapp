import React, { useState, createContext, useEffect } from 'react'
import Board from './components/Board'
import Keyboard from './components/Keyboard'
import { boardDefault, generateWords } from './Words'
import './App.css'
import GameOver from './components/GameOver'


export const AppContext = createContext()
const App = () => {
  const rightWord = "RIGHT"

  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({ letter: 0, attempt: 0 })
  const [wordSet, setNewWords] = useState(new Set())
  const [disabledState, setDisabledState] = useState([])
  const [gameOver, setGameOver] = useState({ gameOver: false, guessedWord: false })




  useEffect(() => {
    generateWords().then((words) => {
      setNewWords(words.wordSet)
      console.log(words)

    })


  }, [])






  const onDelete = () => {
    if (currAttempt.letter == 0) return
    const newBoard = [...board];

    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";


    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 })


  }

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    } else {
      alert("Word not found");
    }

    if (currWord === rightWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;

    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });

    }

  }

  const onSelectingLetter = (keyVal) => {

    if (currAttempt.letter > 4) return

    const newBoard = [...board];

    newBoard[currAttempt.attempt][currAttempt.letter] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter + 1 })



  }

  return (
    <AppContext.Provider value={{
      board, setBoard, currAttempt, setCurrAttempt, onDelete, onEnter, onSelectingLetter,
      rightWord, disabledState, setDisabledState, gameOver, setGameOver


    }}>
      <div className='App'>
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}



        </div>
      </div>
    </AppContext.Provider>
  )
}

export default App





// import React from 'react'
// import axios from 'axios'
// import { useState, useEffect } from 'react'
// import './App.css'

// import './im.jpeg'


// function App() {

//   const [weatherData, setWeatherData] = useState(null);
//   const [city, setCity] = useState('Srinagar');

//   const getData = () => {
//     // const APIKey = '99b72ecbbf458bcf9abee98ce7ca2415';

//     const APIKey = '546b8e7bc2e42c8c92a2572386d39b0a'; // change this to your api key
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;


//     // const url = "https://api.openweathermap.org/data/2.5/weather?city=London&appid='99b72ecbbf458bcf9abee98ce7ca2415'";
//     axios.get(url).then((res) => setWeatherData(res.data)).catch((err) => console.log(err))

//   }



//   const name = weatherData ? weatherData.name : '';
//   const desc = weatherData ? weatherData.weather[0].description : '';
//   const temp = weatherData ? weatherData.main.temp : '';
//   document.body.style = 'background-color:violet '
//   document.body.style = 'background-image:url("https://images.news18.com/ibnlive/uploads/2021/07/1627207399_space-1600x1200.jpg") '


//   const typing = (e) => {
//     setCity(e.target.value);
//   }
//   const click = () => {
//     getData();

//   }

//   useEffect(() => {
//     getData();

//     document.getElementById('in').focus();

//   }, [])



//   return (
//     <>
//       <nav >
//         <ul class="flex text-white space-x-3 space-y-5 px-5 py-4 ">
//           <li ></li>
//           <li >Home</li>
//           <li>Contact</li>
//           <li>Services</li>

//         </ul>
//         <div class="flex justify-center">
//           <button class=" mx-3 rounded-lg text-white border-2 border-rose-600 bg-blue-400 my-2 ">Click me</button>
//         </div>
//       </nav>
//       <div className=" container bg-green-500 md:invisible w-[100px] lg:invisible">
//         i am small
//       </div>
//       <div className=" container md:bg-blue-500 w-[300px] lg:invisible">
//         i am medium
//       </div>
//       <div className=" container lg:bg-pink-200 ">
//         i am large
//       </div>
//       <div className="weather">

//         {/* <input type="text" onChange={typing} /> */}
//         {/* <button onClick={click} >Get weather</button> */}
//         <input id="in" class="form-control form-control-lg mt-1" type="text" onChange={typing} placeholder="Enter your city here" aria-label=".form-control-lg example" />
//         <div class="text-center">
//           <button type="button" onClick={click} class="btn btn-outline-primary mt-3 text-center">Get weather</button>
//           {/* <button onClick={click} >Get weather</button> */}
//         </div>
//       </div>

//       <div className="cen">
//         <h1 class='mx-2 flex font-monospace text-xl '>{name}</h1>
//         <h1 class='mx-2 flex font-monospace text-xl' >  {temp}°C</h1>
//         <h1 class='mx-2 flex font-monospace text-xl'>{desc}</h1>



//       </div>




//     </>

//   )
// }

// export default App

