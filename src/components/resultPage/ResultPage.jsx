import React from 'react';
import styles from './ResultPage.module.css';
import {connect} from "react-redux";

function ResultPage(props) {

    return (
        <section className={styles.wrapper}>
            <article>
                {(props.numberOfRightAnswer%props.numberOfIncorrectAnswer<=0)?
                    <section>
                        <h1>Congratulation!</h1>
                        <p>Вы ответили правильно на более 50% вопросов</p>
                        <p>Правильные ответы: {props.numberOfRightAnswer}</p>
                        <p>Неправильные ответы: {props.numberOfIncorrectAnswer}</p>
                    </section>
                    :<section>
                        <h1>Oooops!</h1>
                        <p>Вы ответили правильно на менее 50% вопросов</p>
                        <p>Неправильные ответы: {props.numberOfIncorrectAnswer}</p>
                        <p>Правильные ответы: {props.numberOfRightAnswer}</p>
                    </section>}
            </article>

        </section>
    );
}

const mapStateToProps = (state) => {
    return{
        numberOfRightAnswer: state.main.numberOfRightAnswer,
        numberOfIncorrectAnswer: state.main.numberOfIncorrectAnswer,
    }
};

export default connect(mapStateToProps, {})(ResultPage);
