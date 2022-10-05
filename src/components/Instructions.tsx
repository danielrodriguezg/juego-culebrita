import { Box, Button, Flex, Heading, Kbd } from "@chakra-ui/react";

export interface IInstructionProps {
  resetBoard: () => void;
}
const Instruction = ({ resetBoard }: IInstructionProps) => (
  <Box mt={3}>
    <Heading as="h6" size="lg">
      ¿Como jugar?
    </Heading>
    <Heading as="h5" size="sm" mt={1}>
    NOTA: Inicia el juego presionando <Kbd>D</Kbd>, 
    <br/>
    Reanuda el juego oprimiendo las teclas de movimiento
    </Heading>
    <Flex flexDirection="row" mt={3}>
      <Flex flexDirection={"column"}>
        <span>
          <Kbd>W</Kbd> Arriba
        </span>
        <span>
          <Kbd>A</Kbd> Izquierda
        </span>
        <span>
          <Kbd>S</Kbd> Abajo
        </span>
        <span>
          <Kbd>D</Kbd> Derecha
        </span>
        <span>
          <Kbd>P</Kbd> Pausa
        </span>
      </Flex>
      <Flex flexDirection="column">
        <Button onClick={() => resetBoard()}>Reiniciar</Button>
      </Flex>
    </Flex>
  </Box>
);

export default Instruction;