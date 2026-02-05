import { Header } from "./components/layout/Header";
import { Container } from "./components/layout/Container";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <div className="app">
      <Header />
      <Container>
        <HomePage />
      </Container>
    </div>
  );
}

export default App;
