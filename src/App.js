import './App.css';
import React, { useState } from "react"
import { trackPromise } from 'react-promise-tracker';
import { nanoid } from 'nanoid'
import Question from './components/Question/Question';
import Starting from './components/Starting/Starting';
import blob5 from './images/blob5.png';
import blob51 from './images/blob5-1.png';

function App() {
  const [isStart, setStart] = useState(false);
  const [isFinished, setFinished] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [countOfCorrect, setCountOfCorrect] = useState(0)

  function handleStartButton() {
    trackPromise(fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
        const result = data.results;
        const resultsQuestions = [];
        for (let i = 0; i < 5; i++) {
          const currentQuestion = result[i];
          let resultsQuestion = {
            question: currentQuestion.question,
            correctAnswer: currentQuestion.correct_answer
          }

          let answers = [];
          currentQuestion.incorrect_answers.forEach(ans => {
            answers.push({answer: ans, isHendled: false});
          })
          answers.push({
            answer: currentQuestion.correct_answer, 
            isHendled: false
          })
          resultsQuestion["answers"] = answers;
          resultsQuestions.push(resultsQuestion);
        }
        setQuestions(resultsQuestions);
      }));
    setStart(true);
    setFinished(false);
  }

  function setAnswer(event, question) {
    const answer = event.target.textContent;
    setQuestions(oldQuestions => {
      return oldQuestions.map(q => {
        if (q.question === question) {
          let newAnswers = q.answers.map(ans => {
            if (ans.answer === answer) {
              return { ...ans, isHendled: !ans.isHendled }
            } else return { ...ans, isHendled: false };
          })
          return { ...q, answers: newAnswers };
        } else {
          return q;
        }
      })
    });
  }

  function checkAnswers(event) {
    event.preventDefault();
    setFinished(true);
    let count = 0;
    questions.forEach(q => {
      q.answers.forEach(ans => { 
        if (ans.isHendled && ans.answer === q.correctAnswer) count++;
      })
    })
    setCountOfCorrect(count);
  }

  function restartGame(event) {
    setStart(false);
    setFinished(false);
    setCountOfCorrect(0);
    setQuestions([]);
  }

  const questionsElements = questions.map(q => 
    <Question 
      key={nanoid()}
      question={q.question}
      answers={q.answers.map(ans => {
        return { ...ans, status: isFinished 
                          ? q.correctAnswer === ans.answer 
                                ? "correct"
                                : "incorrect"
                          : ""}
      })}
      answerClick={(event) => setAnswer(event, q.question)}
    />)

  return (
    <div className="App">
      <img className="blob5" src={blob5} alt=""/>
      <img className="blob51" src={blob51} alt=""/>
      {
        !isStart 
        ? <Starting handleClick={handleStartButton} />
        : <form className="questions">
            {questionsElements}
            { !isFinished 
                ? questions.length 
                  ? <div className="button-container">
                      <button 
                          onClick={checkAnswers} 
                          className="btn"
                          type="button">Check answers</button>
                    </div>
                  : ""
                : <div className="score">
                    <h2>
                      {`You scored ${countOfCorrect}/${questions.length} 
                      correct answers`}
                    </h2>
                    <button type="button" 
                            className="btn" 
                            onClick={restartGame}>Play again</button>
                  </div>
            }
          </form>
      }
    </div>
  );
}

export default App;
