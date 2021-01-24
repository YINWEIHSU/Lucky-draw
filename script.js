const firstGroup = document.getElementById("firstGroup");
const secondGroup = document.getElementById("secondGroup");
const thirdGroup = document.getElementById("thirdGroup");

const inputButton = document.getElementById("inputButton");
const displayControl = document.getElementById("displayControl");
const displayTextinput = document.getElementById("displayTextinput");
const textDisplayControl = document.getElementById("textDisplayControl");

const textArea = document.getElementById("text-area");
const displayTextArea = document.getElementById("displayText");

const audio = document.getElementById("audio")

let data = [
  "壹萬元禮券",
  "捌仟元禮券",
  "柒仟元禮券",
  "伍仟元禮券",
  "參仟伍佰元禮券",
  "亞洲航線來回機票",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券"
];
let realData = [
  "壹萬元禮券",
  "壹萬元禮券",
  "捌仟元禮券",
  "柒仟元禮券",
  "伍仟元禮券",
  "伍仟元禮券",
  "伍仟元禮券",
  "伍仟元禮券",
  "伍仟元禮券",
  "伍仟元禮券",
  "伍仟元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券",
  "參仟伍佰元禮券"
];

// firstGroup.addEventListener('click', function() {
//   realData = firstAward
//   console.log(`已切換至第一組，內含${realData}`)
// })
// secondGroup.addEventListener('click', function() {
//   realData = secondAward
//   console.log(`已切換至第二組，內含${realData}`)
// })
// thirdGroup.addEventListener('click', function() {
//   realData = thirdAward
//   console.log(`已切換至第三組，內含${realData}`)
// })

//顯示或隱藏獎項內容
displayControl.addEventListener("click", function () {
  if (textArea.getAttribute("style")) {
    textArea.removeAttribute("style");
  } else {
    textArea.setAttribute("style", "display:none;");
  }
});

//顯示或隱藏虛擬獎項內容
textDisplayControl.addEventListener("click", function () {
  if (displayTextArea.getAttribute("style")) {
    displayTextArea.removeAttribute("style");
  } else {
    displayTextArea.setAttribute("style", "display:none;");
  }
});

//將Text Area 的內容放入Real Data
inputButton.addEventListener("click", function () {
  realData = textArea.value.split("\n").filter(function (n) {
    return n.length > 0;
  });

  console.log("已輸入獎項");
});

//將Text Area 的虛擬獎項內容放入 Data
displayTextinput.addEventListener("click", function () {
  data = displayTextArea.value.split("\n").filter(function (n) {
    return n.length > 0;
  });

  console.log("已輸入虛擬獎項");
});

let timer = null; //定時器
let flag = 0; //用於鍵盤事件狀態標記
window.onload = function () {
  let play = document.getElementById("play");
  // 開始抽獎
  play.onclick = playFun;

  // 鍵盤事件
  // document.onkeyup = function (event) {
  //   event = event || window.event;
  //   if (event.keyCode == 13) {
  //     if (flag == 0) {
  //       playFun();
  //       flag = 1;
  //     } else {
  //       stopFun();
  //       flag = 0;
  //     }
  //   }
  // };
};
// 開始抽獎
function playFun() {

  const title = document.getElementById("title");
  // const play = document.getElementById("play");
  audio.play()
  play.setAttribute("disabled", "");
  //每次都先清除上一次的定時器任務，避免抽獎效果累加頻率會越來越快
  clearInterval(timer);
  timer = setInterval(function () {
    const random = Math.floor(Math.random() * data.length);
    title.innerHTML = data[random];
  }, 80);

  setTimeout(stopFun, 2800);
}
//停止抽獎
function stopFun() {
  clearInterval(timer);
  play.removeAttribute("disabled", "");
  const title = document.getElementById("title");
  // const play = document.getElementById("play");
  const giftRandom = Math.floor(Math.random() * realData.length);

  title.innerHTML = realData[giftRandom];
  setTimeout(function () { alert(`恭喜抽中${title.innerHTML}`) }, 100)
  realData.splice(giftRandom, 1);

  let tenThousand = awardFilter(realData, "壹萬元禮券");
  let eightThousand = awardFilter(realData, "捌仟元禮券");
  let sevenThousand = awardFilter(realData, "柒仟元禮券");
  let fiveThousand = awardFilter(realData, "伍仟元禮券");
  let threeFiveThousand = awardFilter(realData, "參仟伍佰元禮券");

  console.log(`
剩下${realData.length}項，
分別為壹萬元禮券${tenThousand}張，
捌仟元禮券${eightThousand}張，
柒仟元禮券${sevenThousand}張，
伍仟元禮券${fiveThousand}張，
參仟伍佰元禮券${threeFiveThousand}張，`);

  console.log(realData);

  if (realData.length === 0) {
    console.log("抽完拉!");
    setTimeout(renderEmpty, 3000);
  }
}

//重新渲染畫面
function renderEmpty() {
  const title = document.getElementById("title");
  title.innerText = "本輪獎項已全數發送完畢";
}

function awardFilter(arr, award) {
  let target = award;
  let result = arr.filter((item) => item === target);
  return result.length;
}

// let displayAward = [
//     "壹萬元禮卷",
//     "捌仟元禮卷",
//     "柒仟元禮券",
//     "伍仟元禮券",
//     "參仟伍佰元禮券",
//     "華航亞洲航線來回機票",
//     "長榮亞洲航線來回機票",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "陶朱隱園黃金馬桶",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券"
// ]

// let firstAward = [
//     "壹萬元禮卷",
//     "壹萬元禮卷",
//     "捌仟元禮卷",
//     "柒仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券"
//   ]

// let secondAward = firstAward
// let thirdAward =  [
//     "壹萬元禮卷",
//     "壹萬元禮卷",
//     "捌仟元禮卷",
//     "柒仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "伍仟元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券",
//     "參仟伍佰元禮券"
//   ]
