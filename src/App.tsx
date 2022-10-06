import { ChakraProvider, Container, Heading } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import CanvasBoard from './components/CanvasBoard';
import store from './store';
import ScoreCard from './components/ScoreCard';

function App() {
  return (
    <Provider store ={store}>
      <ChakraProvider>
        <Container maxW="container.lg" centerContent>
          <Heading as="h1" size="xl">Juego Culebrita</Heading>
          <ScoreCard/>
          <CanvasBoard height={500} width={700} />
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
