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
    ? "훈련 설정을 시작할 수 있습니다"
    : "동의 후 훈련 설정을 시작할 수 있습니다.";

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

const trainingFlow = document.querySelector("#training-flow");
const flowSteps = trainingFlow.querySelectorAll(".step");
const progressItems = trainingFlow.querySelectorAll(".progress_item");
const screenInput = document.querySelector("#screen-name");
const screenError = document.querySelector("#screen-error");
const screenNext = document.querySelector("#screen-next");
const countRange = document.querySelector("#count-range");
const countValue = document.querySelector("#count-value");
const levelOption = document.querySelector("#level-option");
const levelOptions = document.querySelector("#level-options");
const optionPrev = document.querySelector("#option-prev");
const optionNext = document.querySelector("#option-next");
const summaryPrev = document.querySelector("#summary-prev");
const finishButton = document.querySelector("#finish-button");
const restartButton = document.querySelector("#restart-button");
const summaryScreen = document.querySelector("#summary-screen");
const summaryCount = document.querySelector("#summary-count");
const summaryLevel = document.querySelector("#summary-level");

const formData = {
  screen: "",
  count: "1",
  customLevel: false,
  level: "보통",
};

function showStep(index) {
  flowSteps.forEach((step, i) => {
    step.hidden = i !== index;
  });
  progressItems.forEach((item, i) => {
    item.classList.toggle("is-active", i === index);
  });
}

const saveDialog = document.querySelector("#save-dialog");
const saveCancel = document.querySelector("#save-cancel");
const saveConfirm = document.querySelector("#save-confirm");

function revokeSaveAgreement() {
  agreeCheck.checked = false;
  trainingFlow.hidden = true;
  handleAgreeChange();
  agreeCheck.focus();
}

startButton.addEventListener("click", () => {
  if (!agreeCheck.checked) return;
  saveDialog.showModal();
});
saveCancel.addEventListener("click", () => {
  saveDialog.close();
  revokeSaveAgreement();
});
saveDialog.addEventListener("cancel", revokeSaveAgreement);
saveConfirm.addEventListener("click", () => {
  if (!agreeCheck.checked) return;
  saveDialog.close();
  trainingFlow.hidden = false;
  showStep(0);
  trainingFlow.scrollIntoView({ behavior: "smooth" });
  screenInput.focus();
});

function validateScreen() {
  const value = screenInput.value.trim();
  if (!value) {
    screenError.textContent = "연습할 화면을 입력해 주세요.";
    screenInput.classList.add("has-error");
    screenInput.focus();
    return false;
  }
  screenError.textContent = "";
  screenInput.classList.remove("has-error");
  formData.screen = value;
  return true;
}

screenNext.addEventListener("click", () => {
  if (!validateScreen()) return;
  showStep(1);
});

countRange.addEventListener("input", () => {
  countValue.value = countRange.value + "개";
});

levelOption.addEventListener("change", () => {
  levelOptions.hidden = !levelOption.checked;
});

optionPrev.addEventListener("click", () => showStep(0));
optionNext.addEventListener("click", () => {
  formData.count = countRange.value;
  formData.customLevel = levelOption.checked;
  const level = document.querySelector('input[name="level"]:checked');
  formData.level = formData.customLevel ? level.value : "보통";
  summaryScreen.textContent = formData.screen;
  summaryCount.textContent = formData.count + "개";
  summaryLevel.textContent = formData.customLevel
    ? formData.level
    : formData.level + " (기본)";
  showStep(2);
});

summaryPrev.addEventListener("click", () => showStep(1));
finishButton.addEventListener("click", () => showStep(3));

restartButton.addEventListener("click", () => {
  formData.screen = "";
  formData.count = "1";
  formData.customLevel = false;
  formData.level = "보통";
  screenInput.value = "";
  screenError.textContent = "";
  screenInput.classList.remove("has-error");
  countRange.value = "1";
  countValue.value = "1개";
  levelOption.checked = false;
  levelOptions.hidden = true;
  document.querySelector('input[name="level"][value="보통"]').checked = true;
  summaryScreen.textContent = "";
  summaryCount.textContent = "";
  summaryLevel.textContent = "";
  showStep(0);
});
