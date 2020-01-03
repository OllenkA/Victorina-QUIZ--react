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
                    <p>Вы ответили правильно на {props.numberOfRightAnswer} вопросов
                        из {props.numberOfRightAnswer+props.numberOfIncorrectAnswer}
                    </p>
                </section>
                {/*{(props.numberOfRightAnswer%props.numberOfIncorrectAnswer<0)?*/}
                {/*    <section>*/}
                {/*        <h1>Congratulation!</h1>*/}
                {/*        <p>Вы ответили правильно на более 50% вопросов</p>*/}
                {/*        <p>Правильные ответы: {props.numberOfRightAnswer}</p>*/}
                {/*        <p>Неправильные ответы: {props.numberOfIncorrectAnswer}</p>*/}
                {/*    </section>*/}
                {/*    :<section>*/}
                {/*        <h1>Oooops!</h1>*/}
                {/*        <p>Вы ответили правильно на менее 50% вопросов</p>*/}
                {/*        <p>Неправильные ответы: {props.numberOfIncorrectAnswer}</p>*/}
                {/*        <p>Правильные ответы: {props.numberOfRightAnswer}</p>*/}
                {/*    </section>}*/}
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