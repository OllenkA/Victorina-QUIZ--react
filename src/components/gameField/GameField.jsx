import React, {useState} from 'react';
import styles from './GameField.module.css';
import {connect} from "react-redux";
import {nextQuestion, startGameTC, finishGameTC} from "../../redux/reducer";
import ResultPage from "../resultPage/ResultPage";

function GameField(props) {
    const [reply, setAnswer] = useState('');

    const getAnswer = (e) => {
        setAnswer((e.target.value));
    };

    let clickOnTheButtonNext = (text, reply) => {
        props.nextQuestion(text, reply);
        setAnswer('');
    };

    let question = props.questions.filter(el => el.visible === true).map((el, index) => {
        return <article key={index}>
            <section className={styles.question}>{el.question}</section>
            {el.answers.map((answer, i) => {
            return <div key={i} className={styles.answers}>
                <input type="radio" name="answer"
                                       checked={reply === answer.answer}
                                       value={answer.answer}
                                       onChange={getAnswer}/>{answer.answer}</div>})}
            <button onClick={() => clickOnTheButtonNext(el.question, reply)}>Next</button>
        </article>
    });

    if(!props.questions.find(el => el.visible === true) || props.time === 0){
        props.finishGameTC();
    }

    return (
        <article className={styles.fieldGame}>
            {!props.isStartGame ?<button onClick={props.startGameTC} className={styles.buttonStart}>
                    Start game
            </button>:
                <div className={styles.field}>
                    <div>0:{props.time}</div>
                    <div>{question}</div>
                </div>}
            {props.isGameOver && ((props.numberOfIncorrectAnswer + props.numberOfRightAnswer))
                ?<ResultPage/>:null}
        </article>
    );
}

let mapStateToProps = (state) => {
    return {
        questions: state.main.questions,
        isStartGame: state.main.isStartGame,
        isGameOver: state.main.isGameOver,
        numberOfRightAnswer: state.main.numberOfRightAnswer,
        numberOfIncorrectAnswer: state.main.numberOfIncorrectAnswer,
        time: state.main.time,
    }
};

export default connect(mapStateToProps, {startGameTC, nextQuestion, finishGameTC})(GameField);