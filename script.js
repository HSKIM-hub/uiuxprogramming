const serviceName = "Re:hear";
let isSubscribed = false;
let submitCount = 0;

function makeMissionRequestMessage(email, subscribed) {
  if (subscribed == true) {
    return email + "로 신청이 완료되었습니다.";
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

  isSubscribed = true;
  submitCount += 1;

  missionRequestMessage.textContent = makeMissionRequestMessage(
    missionEmail,
    isSubscribed,
  );

  missionRequestMessage.classList.add("is-success");
  missionRequestButton.textContent = "신청 완료";
  missionRequestButton.disabled = true;
}

missionRequestForm.addEventListener("submit", handleMissionRequest);
