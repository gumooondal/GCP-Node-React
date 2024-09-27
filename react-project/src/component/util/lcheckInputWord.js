// util/lcheckInputWord.js
export const lcheckInputWord = (event) => {
  var expText = /[%=*><";',\-]/i; // 특수 문자 및 하이픈 검사
  const inputField = event.target; // 입력 필드 참조

  // 중복 이벤트 리스너 등록 방지
  if (inputField.dataset.listenerAdded) return;

  // 이벤트 리스너 등록
  inputField.addEventListener('input', function () {
    let inputValue = inputField.value; // 현재 입력값

    // 특수 문자 검사 및 제거
    if (expText.test(inputValue)) {
      alert("보안: 특수문자(%,=,*,>,<,\",',-)는 입력할 수 없습니다.");
      inputField.value = inputValue.replace(expText, ''); // 특수 문자 제거
      return;
    }

    // 공백 검사 및 제거
    if (/\s/.test(inputValue)) {
      alert("공백은 입력할 수 없습니다.");
      inputField.value = inputValue.replace(/\s/g, ''); // 공백 제거
      return;
    }

    // SQL 예약어 체크 및 제거
    const sqlArray = [
      "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
      "UNION", "FETCH", "DECLARE", "TRUNCATE", "TABLE", "OR"
    ];

    for (let i = 0; i < sqlArray.length; i++) {
      const regex = new RegExp(`\\b${sqlArray[i]}\\b`, "gi"); // 단어 경계 검사
      if (regex.test(inputValue)) {
        alert(`[${sqlArray[i]}]와(과) 같은 특정 문자로 검색할 수 없습니다.`);
        inputField.value = inputValue.replace(regex, ''); // SQL 예약어 제거
        break; // 첫 번째 발견된 예약어에서 루프 중단
      }
    }
  });

  // 이벤트 리스너가 이미 추가되었음을 표시
  inputField.dataset.listenerAdded = true;
};

