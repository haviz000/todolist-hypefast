import AddTodo from "./component/AddTodo";
import ContentTodo from "./component/ContentTodo";
import './styles/App.css';

function App() {
  return (
    <div className="container">
      <div className="app__wrapper">
        <AddTodo />
        <ContentTodo />
      </div>
    </div>
  );
}

export default App;
