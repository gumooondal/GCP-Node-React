//util/tcheckInputWord.js
export const tcheckInputWord = (value) => {
    // 특수문자 체크
    var expText = /[%=*><";',-]/i;
    if (expText.test(value)) {
        alert("보안: 특수문자(%,=,*,>,<)는 입력할 수 없습니다.");
        return false; // 특수문자 입력 방지
    }

    // 공백 검사
    if (/\s/.test(value)) { // 문자열 내에 공백이 있는지 검사
        alert("공백은 입력할 수 없습니다.");
        return false; // 공백 입력 방지
    }

    // SQL 예약어 체크 (단어 전체 일치만 체크)
    var sqlArray = [
        "SELECT", "INSERT", "DELETE", "UPDATE", "CREATE", "DROP", "EXEC",
        "UNION", "FETCH", "DECLARE", "TRUNCATE", "AND", "OR", "JOIN"
    ];

    for (var i = 0; i < sqlArray.length; i++) {
        var regex = new RegExp(`\\b${sqlArray[i]}\\b`, "gi"); // 단어 전체만 일치하는지 체크
        if (regex.test(value)) {
            alert("[" + sqlArray[i] + "]와(과) 같은 특정 문자로 검색할 수 없습니다.");
            return false; // SQL 예약어 발견
        }
    }
    return true; // 유효성 검사 통과
};
