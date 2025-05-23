//객체 가져오기
const $startBtn = document.querySelector("#start-btn");
const $keyword = document.querySelector("#keyword");
const $chatList = document.querySelector(".chat");
const $gameBtn = document.querySelector("#game-btn");

//p태그의 textContent 를 변경
const keywordMent = (keyword) => {
  const $ment = document.querySelector("p.ment>span");
  $ment.textContent = keyword;
};
const createChatLi = (keyword) => {
  const $li = document.createElement("li");
  $li.textContent = keyword;
  $chatList.appendChild( $li);
  if( $chatList.children.length > 7 ){
    const $first = $chatList.children[0];
    $chatList.removeChild($first);
  }
};
/**
 * 시작 버튼을 누르면, 입력값이 있는지 확인하고
 * 있으면 ul(#chat)에 추가
 */
const handleStartBtn = () => {
  const elem = document.querySelector("#start-word").value;
  if (elem !== "") {
    createChatLi(elem);  //ul에 추가
    keywordMent(elem);   //멘트 추가

    const $main = document.querySelector("#main");
    $main.style.display = "none";
    const $game = document.querySelector("#game");
    $game.style.display = "flex";    
  } else {
    alert("낱말을 입력하세요");
    return;
  }
};
$startBtn.addEventListener("click", handleStartBtn);

//맞는 낱말이지 체크하기
const handleWordInput = () => {
  const keyword = $keyword.value.trim();
  if (keyword === "") {
    alert("낱말을 입력하세요");
    return;
  }
  // 이전 입력 문자
  const last = $chatList.lastElementChild.textContent;
  const lastword = last[last.length - 1];
  const firstword = keyword[0];
  //올바르게 입력되었는지 체크
  if (lastword === firstword) {
    //끝말잇기 성공
    keywordMent(keyword);
    //ul > li로 추가
    createChatLi(keyword);
  } else {
    //끝말잇기 실패
    alert(`클렸어요. ${lastword} 시작해야 합니다`);
  }
  $keyword.value = "";
  $keyword.focus();
};

$gameBtn.addEventListener("click", handleWordInput);
$keyword.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleWordInput();
  }
});
