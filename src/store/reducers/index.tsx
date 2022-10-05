import { DOWN, INCREASE_SNAKE, INCREMENT_SCORE, ISnakeCoord, LEFT, RESET, RESET_SCORE, RIGHT, SET_DIS_DIRECTION, UP } from "../actions";

export interface IGlobalState {
    snake: ISnakeCoord[] | [];
    disallowedDirection: string;
    score: number;
}
  
const globalState: IGlobalState = {
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

function addIncrement (actualSnake:ISnakeCoord[]) : ISnakeCoord{
    let x = actualSnake[actualSnake.length-2]?.x - actualSnake[actualSnake.length-1]?.x;
    let y =  actualSnake[actualSnake.length-2]?.y - actualSnake[actualSnake.length-1]?.y;
    return {
        x, y
    }

}

export const gameReducer = (state = globalState, action: any) => {
    let newSnake = [...state.snake];
    switch (action.type) {
        case RIGHT:
        case LEFT:
        case UP:
        case DOWN: {
            newSnake = [{
                x: state.snake[0].x + action.payload[0],
                y: state.snake[0].y + action.payload[1],
            }, ...newSnake];
            newSnake.pop();
            return {
                ...state,
                snake: newSnake
            };
        }
        case SET_DIS_DIRECTION:{
            return {
                ...state,
                disallowedDirection: action.payload
            }
        }
        case INCREASE_SNAKE:
            const snakeLen = state.snake.length;
            const increment = addIncrement(newSnake);
                return {
                ...state,
                snake: [
                    ...state.snake,
                    {
                        x: state.snake[snakeLen - 1].x - increment?.x,
                        y: state.snake[snakeLen - 1].y - increment?.y,
                    }
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