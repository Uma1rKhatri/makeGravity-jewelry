import Routers from "./appRoutes";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
function App() {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <Routers />
    </PersistGate>
  </Provider>
  );
}

export default App;
