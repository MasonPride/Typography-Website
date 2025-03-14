import "./App.css";
import { useState } from "react";
import TextInput from "./TextInput";
import TextDisplay from "./TextDisplay";
import FontSizeControl from "./FontSizeControl";

function App() {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(16);

  return (
    <div className="app-container">
      <div className="card">
        <TextInput onTextChange={setText} />
        <FontSizeControl fontSize={fontSize} onFontSizeChange={setFontSize} />
        <TextDisplay text={text} fontSize={fontSize} />
      </div>
    </div>
  );
}
export default App;
