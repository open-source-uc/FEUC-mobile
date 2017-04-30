import Navigator from "../../navigation/Navigator";

export default function reducer(state, action) {
  const newState = Navigator.router.getStateForAction(action, state);
  return newState || state;
}
