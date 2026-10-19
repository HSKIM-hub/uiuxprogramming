const serviceName = "Daily:UI";
let isMissionRequested = false;
let submitCount = 0;

function makeMissionRequestMessage(email, requested) {
  if (requested == true) {
    return (
      email + "로 미션 신청이 완료되었습니다. 매일 새로운 미션이 전달됩니다."
    );
  }

  return "이메일을 입력한 뒤 신청해주세요.";
}

const missionRequestForm = document.querySelector("#mission-form");
const emailInput = document.querySelector("#email");
const missionRequestButton = document.querySelector("#missionRequestButton");
const missionRequestMessage = document.querySelector("#missionRequestMessage");

function handleMissionRequest(event) {
  event.preventDefault();

  const missionEmail = emailInput.value.trim();

  if (missionEmail === "") {
    missionRequestMessage.textContent = "이메일을 입력한 뒤 신청해주세요.";
    emailInput.focus();
    return;
  }

  isMissionRequested = true;
  submitCount += 1;

  missionRequestMessage.textContent = makeMissionRequestMessage(
    missionEmail,
    isMissionRequested,
  );

  missionRequestMessage.classList.add("is-success");
  missionRequestButton.textContent = "신청 완료";
  missionRequestButton.disabled = true;
}

missionRequestForm.addEventListener("submit", handleMissionRequest);

const themeButton = document.querySelector("#themeButton");
const nicknameInput = document.querySelector("#nickname");
const nicknameCount = document.querySelector("#nicknameCount");
const agreeCheck = document.querySelector("#agreeCheck");
const agreeMessage = document.querySelector("#agreeMessage");
const startButton = document.querySelector("#startButton");

function handleThemeClick(event) {
  const isDark = document.body.classList.toggle("dark");

  themeButton.textContent = isDark
    ? "라이트 테마로 바꾸기"
    : "다크 테마로 바꾸기";
}

themeButton.addEventListener("click", handleThemeClick);

function handleNickNameInput() {
  const maxLength = nicknameInput.maxLength;
  const currentLength = Math.min(maxLength, nicknameInput.value.length);
  nicknameCount.textContent = currentLength + " / 10";
}

nicknameInput.addEventListener("input", handleNickNameInput);

function handleAgreeChange() {
  const agreed = agreeCheck.checked;

  startButton.disabled = !agreed;
  agreeMessage.textContent = agreed
    ? "훈련을 시작할 수 있습니다"
    : "동의 후 훈련을 시작할 수 있습니다.";

  if (agreed) {
    agreeMessage.classList.add("is-ready");
  } else {
    agreeMessage.classList.remove("is-ready");
  }
}

agreeCheck.addEventListener("change", handleAgreeChange);

const tabs = document.querySelectorAll(".tab");
const panels = document.querySelectorAll(".panel");

function resetTabsAndPanels() {
  tabs.forEach(function (tab) {
    tab.classList.remove("is-active");
    tab.setAttribute("aria-selected", "false");
  });
  panels.forEach(function (panel) {
    panel.classList.remove("is-active");
    panel.hidden = true;
  });
}

function activateTab(clickedTab) {
  const targetSelector = clickedTab.dataset.target;
  const targetPanel = document.querySelector(targetSelector);

  clickedTab.classList.add("is-active");
  clickedTab.setAttribute("aria-selected", "true");

  targetPanel.classList.add("is-active");
  targetPanel.hidden = false;
}

function handleTabClick(event) {
  resetTabsAndPanels();
  activateTab(event.currentTarget);
}

tabs.forEach(function (tab) {
  tab.addEventListener("click", handleTabClick);
});
