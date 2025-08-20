import "./App.css";
import Home from "./Pages/Home";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider>
      <Home />
    </MantineProvider>
  );
}

export default App;
