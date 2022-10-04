import { DOWN, INCREASE_SNAKE, INCREMENT_SCORE, ISnakeCoord, LEFT, MOVE_RIGHT, RESET, RESET_SCORE, RIGHT, SET_DIS_DIRECTION, UP } from "../actions";

interface IAction{
    type: string,
    payload: any
}

export interface IGlobalState {
    snake: ISnakeCoord[] | [];
    disallowedDirection: string;
    score: number;
}
  
const globalState: IGlobalState = {
    //Postion of the entire snake
    snake: [
      { x: 580, y: 300 },
      { x: 560, y: 300 },
      { x: 540, y: 300 },
      { x: 520, y: 300 },
      { x: 500, y: 300 },
      
    ],
    disallowedDirection: "",
    score: 0
};

export const gameReducer = (state = globalState, action: any) => {
    let newSnake = [...state.snake];
    switch (action.type) {
        case SET_DIS_DIRECTION:{
            console.log("gameReducer", SET_DIS_DIRECTION);
            return {
                ...state,
                disallowedDirection: action.payload
            }
        }
        case RIGHT:{
            console.log("gameReducer: "+action.payload)
            newSnake = [{
                x: state.snake[0].x + action.payload[0],
                y: state.snake[0].y + action.payload[1],
            }, ...newSnake];
            newSnake.pop();
            console.log(newSnake)
            return {
                ...state,
                snake: newSnake,
            };
        }
        case LEFT:{
            console.log("gameReducer: "+action.payload)
            newSnake = [{
                x: state.snake[0].x + action.payload[0],
                y: state.snake[0].y + action.payload[1],
            }, ...newSnake];
            newSnake.pop();
            console.log(newSnake)
            return {
                ...state,
                snake: newSnake,
            };
        }
        case UP:{
            console.log("gameReducer: "+action.payload)
            newSnake = [{
                x: state.snake[0].x + action.payload[0],
                y: state.snake[0].y + action.payload[1],
            }, ...newSnake];
            newSnake.pop();
            console.log(newSnake)
            return {
                ...state,
                snake: newSnake,
            };
        }
        case DOWN: {
            console.log("gameReducer: "+action.payload)
            newSnake = [{
                x: state.snake[0].x + action.payload[0],
                y: state.snake[0].y + action.payload[1],
            }, ...newSnake];
            newSnake.pop();
            console.log(newSnake)
            return {
                ...state,
                snake: newSnake,
            };
        }
        case INCREASE_SNAKE:
            const snakeLen = state.snake.length;
            return {
                ...state,
                snake: [
                ...state.snake,
                {
                    x: state.snake[snakeLen - 1].x - 20,
                    y: state.snake[snakeLen - 1].y - 20,
                },
                ],
            };

        case INCREMENT_SCORE:
            return {
                ...state,
                score: state.score + 1,
                };
                
        case RESET_SCORE:
            return { ...state, score: 0 };

        case RESET:
            return {
              ...state,
              snake: [
                { x: 580, y: 300 },
                { x: 560, y: 300 },
                { x: 540, y: 300 },
                { x: 520, y: 300 },
                { x: 500, y: 300 },
              ],
              disallowedDirection: ""
            };
        default:
            return state;
    }
};