import Body from "./components/Body";
import { Provider } from "react-redux";

import appStore from "./utils//appStore.js";
export default function App() {
  return (
    <div>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </div>
  );
}
