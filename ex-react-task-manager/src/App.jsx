import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Home from "./pages/TasksList.jsx";
import AddTask from "./pages/AddTask.jsx";
import NotFound from "./pages/NotFound";
import AppContext from "./context/AppContext.jsx";
import useTask from "./customHook/UseTasks.jsx";

function App() {
  const url = import.meta.env.VITE_BACKEND_URL;

  const { tasks } = useTask();

  const GlobalContexProvider = {
    tasks,
    useTask,
  };
  return (
    <AppContext.Provider value={GlobalContexProvider}>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
