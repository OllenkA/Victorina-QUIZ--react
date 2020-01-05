export const START_GAME = 'START_GAME';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const ENDED_GAME = 'ENDED_GAME';
export const START_TIMER = 'START_TIMER';


const initialState = {
    questions: [
        {
            id: 1,
            question: 'Как называется синтаксическое расширение JavaScript?',
            answers: [
                {id: 1, answer: 'TypeScript', correct: false},
                {id: 2, answer: 'JSX', correct: true},
                {id: 3, answer: 'CoffeeScript', correct: false},
            ],
            visible: false
        },
        {
            id: 2,
            question: 'Сколько суток составляют високосный год?',
            answers: [
                {id: 1, answer: '336', correct: false},
                {id: 2, answer: '365', correct: false},
                {id: 3, answer: '366', correct: true},
            ],
            visible: false
        },
        {
            id: 3,
            question: 'Сколько музыкантов в квинтете?',
            answers: [
                {id: 1, answer: '5', correct: true},
                {id: 2, answer: '4', correct: false},
                {id: 3, answer: '6', correct: false},
            ],
            visible: false
        },
        {
            id: 4, question: 'Сколько холодных цветов в радуге?',
            answers: [
                {id: 1, answer: '6', correct: false},
                {id: 2, answer: '3', correct: true},
                {id: 3, answer: '2', correct: false},
            ],
            visible: false
        },
        {
            id: 5,
            question: 'Они позволяют разбить интерфейс на независимые части, про которые легко думать в отдельности.',
            answers: [
                {id: 1, answer: 'Элементы', correct: false},
                {id: 2, answer: 'Компоненты', correct: true},
                {id: 3, answer: 'Пропсы', correct: false},
            ],
            visible: false
        },
    ],
    time: 30,
    timer: 0,
    isStartGame: false,
    numberOfRightAnswer: 0,
    numberOfIncorrectAnswer: 0,
    isGameOver: false,
};

const shuffle = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        const random = Math.floor(Math.random() * arr.length);
        const temp = arr[i];
        arr[i] = arr[random];
        arr[random] = temp;
    }
    return arr
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case START_GAME:
            // let randomNumber = (num) => {
            //   return Math.round(Math.random()* num - 1)
            // };
            // let newArray = [...state.questions];
            // let randomArray = state.questions.map((el, index, array) => {
            //     if(randomArray.length !== array.length){
            //         for(let i = 0; i<= array.length; i++){
            //             let ind = array.findIndex(el => el.id === randomNumber(array.length));
            //             let s = newArr.slice(ind, ind -1);
            //             return newArray
            //             }
            //         }
            //     }else{
            //
            //     }
            // })
            let newStartArray = shuffle(state.questions.map(el => (
                {...el, answers: shuffle([...el.answers])})));
            newStartArray[0].visible = true;

            return {
                ...state,
                questions: newStartArray,
                isStartGame: true,
                isGameOver: false,
                numberOfRightAnswer: 0,
                numberOfIncorrectAnswer: 0,
            };
        case NEXT_QUESTION:
            let newArr = state.questions.map((el, index, array) => {
                if (el.question === action.text) {
                    if (index < array.length - 1) {
                        array[index + 1] = {...array[index + 1], visible: true}
                    }
                    return {
                        ...el,
                        visible: false
                    }
                } else {
                    return el
                }
            });
            let newScore = state.questions.find(el => {
                return action.text === el.question
            }).answers.find(el => (action.answer === el.answer && el.correct === true));
            return {
                ...state,
                questions: newArr,
                numberOfRightAnswer: newScore ? state.numberOfRightAnswer + 1 : state.numberOfRightAnswer,
                numberOfIncorrectAnswer: !newScore ? state.numberOfIncorrectAnswer + 1 : state.numberOfIncorrectAnswer,
            };
        case ENDED_GAME:
            let newArrayAfterEndedGame = state.questions.map(el => {
                return{
                    ...el,
                    visible: false,
                }
            });
            return {
                ...state,
                questions: newArrayAfterEndedGame,
                isStartGame: false,
                isGameOver: true,
                time: 30,
                // timer: 0,
            };
        case START_TIMER:
            return {
                ...state,
                time: state.time - 1,
                timer: action.timer,
            };
        default:
            return state;
    }
};

export const startGameTC = () => async (dispatch) => {
    let timer = await setInterval(() => {
        dispatch(startTimer(timer))
    }, 1000);
    dispatch(startGame());
};

export const finishGameTC = () => (dispatch, getState) => {
    clearInterval(getState().main.timer);
    dispatch(endedGame());
};

export const startGame = () => ({type: START_GAME});
export const startTimer = (timer) => ({type: START_TIMER, timer});
export const nextQuestion = (text, answer) => ({type: NEXT_QUESTION, text, answer});
export const endedGame = () => ({type: ENDED_GAME});

export default reducer;