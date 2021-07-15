import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
// html에서 해당 값들을 불러옴
const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";
// 선언 시 오류 줄일 수 있음

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};
// retrun => object
const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (atction.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      // Date.now()로 난수 설정
      return [newToDoObj, ...state];
    // 가지고 있던 state와 newToDoObj를 통한 새로운 store 생성
    case DELETE_TODO:
      const cleaned = state.filter((toDo) => toDo.id !== action.id);
      // can't mutate store, we have to filter => make new store
      return cleaned;
    default:
      return state;
  }
};
const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));
// store가 변할 때 마다 console.log
const dispatchAddToDo = (text) => {
  store.dispatch(addToDo(text));
};
// 매개변수 text를 addToDo의 인자로써 dispatch 실행
// dispatch == 매개변수로 action(object)을 받음.
// addToDo => object를 리턴함
// 해당 action을 dispatch하며 reducer를 실행함
const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  // id가 string으로 올 수 있기 때문에 parseInt
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  // ""로 구분
  toDos.forEach((toDo) => {
    // object 내 toDo값에게 forEach로 함수
    const li = document.createElement("li");
    // document.creatElemnt("li")를 여러번 작성하지 않고, li선언시 해당 함수 실행
    const btn = document.createElement("button");
    // 이하 동일
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchDeleteToDo);
    // btn make
    li.id = toDo.id;
    // li의 id == toDo.id
    li.innerText = toDo.text;
    li.appendChild(btn);
    // 자식 설정
    ul.appendChild(li);
    // 이하 동일
  });
};

store.subscribe(paintToDos);
// store 값 변경 => paintToDos 실행
const onSubmit = (e) => {
  e.prevnetDefault();
  // refresh 막고
  const toDo = input.value;
  // input값을 toDo로 선언
  input.value = "";
  // ""로 object를 끊음
  dispatchAddToDo(toDo);
  // store의 dispatch 실행
};

form.addEventListener("submit", onSubmit);

// onSubmit =>
