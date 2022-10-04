import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { IGlobalState } from "../store/reducers";
import { clearBoard, drawObject, generateRandomPosition, IObjectBody } from "../utilities";


export interface ICanvasBoard {
    height: number;
    width: number;
  }
  
const CanvasBoard = ({ height, width }: ICanvasBoard) => {
    const canvasRef = useRef <HTMLCanvasElement | null> (null);
    const [context, setContext] = useState <CanvasRenderingContext2D | null> (null);
    const snake1 = useSelector((state: IGlobalState) => state.snake);
    /*const [pos, setPos] = useState<IObjectBody>(
	    generateRandomPosition(width - 20, height - 20)
	  );*/
        

    const handleKeyEvents = () => {

    }
    useEffect(()=>{
        setContext(canvasRef.current && canvasRef.current.getContext("2d")); 
        drawObject(context, snake1, "#91C483"); //Draws snake at the required position
		//drawObject(context, [pos], "#676FA3");
    }, [context]);

    useEffect(() => {
        window.addEventListener("keypress", handleKeyEvents);
    
        return () => {
          window.removeEventListener("keypress", handleKeyEvents);
        };
      }, [disallowedDirection, handleKeyEvents]); 

    return (
      <canvas
        ref={canvasRef}
        style={{
          border: "3px solid black",
        }}
        height={height}
        width={width}
      />
    );
};
export default CanvasBoard;