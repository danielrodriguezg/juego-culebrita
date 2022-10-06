import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { increaseSnake, INCREMENT_SCORE, makeMove, MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP, resetGame, RESET_SCORE, scoreUpdates, stopGame } from "../store/actions";
import { IGlobalState } from "../store/reducers";
import { clearBoard, drawObject, generateRandomPosition, hasSnakeCollided, IObjectBody } from "../utilities";
import Instruction from "./Instructions";


export interface ICanvasBoard {
  height: number;
  width: number;
}

const CanvasBoard = ({ height, width }: ICanvasBoard) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [paused, setPaused] = useState<boolean>(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const snake1 = useSelector((state: IGlobalState) => state.snake);
  const disallowedDirection = useSelector((state: IGlobalState) => state.disallowedDirection);
  const dispatch = useDispatch();
  const [pos, setPos] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height - 20)
  );
  const [isConsumed, setIsConsumed] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);

  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(makeMove(dx, dy, MOVE_RIGHT));
      }

      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(makeMove(dx, dy, MOVE_LEFT));
      }

      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(makeMove(dx, dy, MOVE_UP));
      }

      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(makeMove(dx, dy, MOVE_DOWN));
      }
    },
    [dispatch]
  );

  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
      if (disallowedDirection) {
        switch (event.key) {
          case "p":
            dispatch(stopGame());
            setPaused(true);
            break;
          case "w":
            moveSnake(0, -20, disallowedDirection);
            setPaused(false);
            break;
          case "s":
            moveSnake(0, 20, disallowedDirection);
            setPaused(false);
            break;
          case "a":
            moveSnake(-20, 0, disallowedDirection);
            setPaused(false);
            break;
          case "d":
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            setPaused(false);
            break;
        }
      } else {
        if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN" &&
          event.key === "d"
        )
          moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
      }
    },
    [disallowedDirection, moveSnake, dispatch]
  );

  const resetBoard = useCallback(() => {
    window.removeEventListener("keypress", handleKeyEvents);
    dispatch(resetGame());
    dispatch(scoreUpdates(RESET_SCORE));
    setPos(generateRandomPosition(width - 20, height - 20));
    window.addEventListener("keypress", handleKeyEvents);
  }, [dispatch, handleKeyEvents, height, width]);

  useEffect(() => {
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    clearBoard(context);
    drawObject(context, snake1, "#91C483"); 
    drawObject(context, [pos], "#676FA3");
    if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) {
      setIsConsumed(!isConsumed);
    }
    if (hasSnakeCollided(snake1, snake1[0]) ||
      snake1[0].x >= width ||
      snake1[0].x < 0 ||
      snake1[0].y < 0 ||
      snake1[0].y >= height
    ) {
      setGameEnded(true);
      dispatch(stopGame());
      window.removeEventListener("keypress", handleKeyEvents);
    } else {
      setGameEnded(false);
    }
  }, [context, pos, snake1, height, isConsumed, width, dispatch, handleKeyEvents]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);

    return () => {
      window.removeEventListener("keypress", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);

  useEffect(() => {
    if (isConsumed) {
      const posi = generateRandomPosition(width - 20, height - 20);
      setPos(posi);
      setIsConsumed(false);

      dispatch(increaseSnake());

      dispatch(scoreUpdates(INCREMENT_SCORE));
    }
  }, [isConsumed, pos, height, width, dispatch]);


  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          border: gameEnded ? "3px solid red" : "3px solid black",
        }}
        height={height}
        width={width}
      />
      <h1 style={{fontSize: "30px", fontWeight: "bolder", color: "red"}}>{paused ? "PAUSADO":""}</h1>
      <Instruction resetBoard={resetBoard} />
    </>
  );
};
export default CanvasBoard;