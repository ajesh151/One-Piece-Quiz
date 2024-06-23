import { useRef, useState } from 'react'
import { questions } from './questions.jsx'
import './App.css'

const Quiz = () => {
  let [index, setIndex] = useState(0);
  let [question, setQuestion]= useState(questions.questions[index]);
  let [result, setResult] = useState({score:0,correctAnswers:0,wrongAnswers:0})
  let [showResult,setShowResult] = useState(false)
  let [lock, setLock] = useState(false)
  let buttonText = "Next"

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)
  if(questions.questions.length === index + 1){buttonText="Finish"}
  
  let choice1 = useRef(null)
  let choice2 = useRef(null)
  let choice3 = useRef(null)
  let choice4 = useRef(null)

  let choice_array = [choice1, choice2, choice3, choice4]

  const checkAns = (e,ans) =>
    {
      if (lock == false) {
      if (question.correctAnswer === ans){
        e.target.classList.add("correct");
        setLock(true)
        setResult(previousState => {
          return { ...previousState, score: previousState.score + 1, correctAnswers: previousState.correctAnswers+1}
        })
      }
      else{
        e.target.classList.add("incorrect");
        setLock(true)
        for (let i = 0; i<4; i++){
          if (question.correctAnswer === question.choices[i]){
          choice_array[i].current.classList.add("correct")
          }
        }
        setResult(previousState => {
          return { ...previousState, wrongAnswers: previousState.wrongAnswers+1 }
        })

      }
    }
    }

  const next = () => {
      if(questions.questions.length === index + 1){
        setShowResult(true);
      }
      if (lock === true){
        setIndex(++index);
        setQuestion(questions.questions[index]);
        setLock(false);
        for (let i =0; i<4; i++){
          {
          choice_array[i].current.classList.remove("correct");
          choice_array[i].current.classList.remove("incorrect")
          }
        }
      }
    }
  const reset = () => {
    setIndex(0);
    setQuestion(questions.questions[0])
    setLock(false)
    setShowResult(false)
    setResult(previousState => {return {...previousState,wrongAnswers:0, correctAnswers:0, score:0}})
  }
    return(
      <div className="quiz-container">
        <h1 className="title">One Piece Quiz</h1>
        <hr></hr>
        {!showResult ? (
          <div>
            <div className="questions">
              <span className="active-question-no">{addLeadingZero(index + 1)}</span>
              <span className="total-question">/{addLeadingZero(questions.questions.length)}</span> 
              <span className="question-text">{question.question}</span>
            </div> 
            <ul>
              <li ref={choice1} onClick={(e)=>checkAns(e,question.choices[0])}>{question.choices[0]}</li>
              <li ref={choice2} onClick={(e)=>checkAns(e,question.choices[1])}>{question.choices[1]}</li>
              <li ref={choice3} onClick={(e)=>checkAns(e,question.choices[2])}>{question.choices[2]}</li>
              <li ref={choice4} onClick={(e)=>checkAns(e,question.choices[3])}>{question.choices[3]}</li> 
            </ul>
            <div className="flex-right">
              <button onClick={next} disabled={lock===false}>
              {buttonText}
              </button>
            </div> 
          </div>
        ) 
        : (
          <div className="result">
            <h3>Result</h3>
            <p>
              Total Question: <span>{questions.questions.length}</span>
            </p>
            <p>
              Total Score:<span> {result.score}</span>
            </p>
            <p>
              Correct Answers:<span> {result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers:<span> {result.wrongAnswers}</span>
            </p>
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </div>)
}
export default Quiz
