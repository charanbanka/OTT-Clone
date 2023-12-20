import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import HomeContext from "../HomeContext";

const TopView = () => {
  const backgroundImageUrl =
    "http://localhost:8000/images/image/44dfb8a6-344d-4ef6-8ca7-0bf8620ba5c1";
  const styles = {
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "700px", // Set the desired height
    // Add more styling as needed
    width: "100%",
  };
  const state = useContext(HomeContext);
  console.log("sttate=>", state);

  function reducer(state, action) {
    switch (action) {
      case "inc":
        return { count: state.count + 1 };
      case "dec":
        return { count: state.count - 1 };
      default:
        return state;
    }
  }

  const [form, dispatch] = useReducer(reducer, { count: 0 });
  console.log("form", form);

  const btnRef = useRef();
  console.log("btnRef ouside=>", btnRef.current);
  const submit = () => {
    console.log("btn =>", btnRef.current.value);
  };
  useEffect(() => {
    console.log("use=effect");
  }, []);
  let value = useMemo(() => {
    console.log("usememo");
    return 100;
  }, []);
  let fun = useCallback((val) => {
    console.log("usecallback=>", val);
  }, []);
  console.log("value=>", value);
  fun();
  return (
    <div style={styles}>
      {/* <img src={backgroundImageUrl} /> */}

      <div style={{ color: "white" }}>{form.count}</div>
      <input ref={btnRef} name="id" type="text" />
      <button onClick={submit}>submit</button>
      <button onClick={() => dispatch("inc")}>INCREMENT</button>
      <button onClick={() => dispatch("dec")}>DECREMENT</button>
    </div>
  );
};

export default TopView;
