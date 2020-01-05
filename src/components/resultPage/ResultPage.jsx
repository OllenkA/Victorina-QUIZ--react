import React from 'react';
import styles from './ResultPage.module.css';
import {connect} from "react-redux";

function ResultPage(props) {
    return (
        <section className={styles.wrapper}>
            <article>
                <section>
                    {(props.numberOfRightAnswer/props.numberOfIncorrectAnswer>1)?
                        <h2>Congratulation!</h2>:<h2>Oooops!</h2>}
                    <p>Вы ответили правильно на {props.numberOfRightAnswer} вопроса
                        из {props.questions.length}
                    </p>
                </section>
            </article>
        </section>
    );
}

const mapStateToProps = (state) => {
    return{
        questions: state.main.questions,
        numberOfRightAnswer: state.main.numberOfRightAnswer,
        numberOfIncorrectAnswer: state.main.numberOfIncorrectAnswer,
    }
};

export default connect(mapStateToProps, {})(ResultPage);