export const START_GAME = 'START_GAME';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SCORING = 'SCORING';
export const ENDED_GAME = 'ENDED_GAME';

const initialState = {
    questions: [
        {
            id: 1,
            question: 'Сколько на Земле материков начинаются на букву «А»?',
            answers: [
                {id: 1, answer: 2, correct: false},
                {id: 2, answer: 5, correct: true},
                {id: 3, answer: 7, correct: false},
            ],
            visible: false
        },
        {
            id: 2,
            question: 'Сколько суток составляют високосный год?',
            answers: [
                {id: 1, answer: 336, correct: false},
                {id: 2, answer: 365, correct: false},
                {id: 3, answer: 366, correct: true},
            ],
            visible: false
        },
        {
            id: 3,
            question: 'Сколько музыкантов в квинтете?',
            answers: [
                {id: 1, answer: 5, correct: true},
                {id: 2, answer: 4, correct: false},
                {id: 3, answer: 6, correct: false},
            ],
            visible: false
        },
        {
            id: 4, question: 'Сколько холодных цветов в радуге?',
            answers: [
                {id: 1, answer: 6, correct: false},
                {id: 2, answer: 3, correct: true},
                {id: 3, answer: 2, correct: false},
            ],
            visible: false
        },
    ],
    isStartGame: false,
    numberOfRightAnswer: 0,
    numberOfIncorrectAnswer: 0,
    isGameOver: false,
};

const shuffle = (arr) => {
    for(let i = 0; i<arr.length; i++) {
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
            let newStartArray = shuffle(state.questions.map(el => ({...el, answers: shuffle([...el.answers])})));
            newStartArray[0].visible = true;

                // shuffle([...state.questions]);
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
            return {
                ...state,
                isStartGame: false,
                isGameOver: true,
            };
        case SCORING:
            return {
                ...state,

            };
        default:
            return state;
    }
};

// export const startGameWithComputerTC = (id) => async (dispatch, getState) => {
//     await dispatch(onMovePlayer(id));
//     let winner = await calculateWinner(getState().main.squares);
//     if (!winner) {
//         setTimeout(() => {
//             dispatch(startGameWithComputer());
//         }, 2000);
//     } else {
//         dispatch(setWinner(winner))
//     }
// };

export const startGame = () => ({type: START_GAME});
export const nextQuestion = (text, answer) => ({type: NEXT_QUESTION, text, answer});
export const endedGame = () => ({type: ENDED_GAME});

export default reducer;