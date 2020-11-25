const words = require('../module/words');
// 랜덤 추출 함수
function randomItem(a) { 
    return a[Math.floor(Math.random() * a.length)];
}

// words를 배열로 변환
const wordsToArray = words.split('\n');


// 배열의 값중에 '(' 와 '-' 제거
const mappedWords = wordsToArray.map((word) => {
    if(word.includes('-')){
        let clean = word.replace(/-/gi, '');
        if(clean.includes('(')){
            let split = clean.split('');
            let index = split.indexOf('(');
            return split.slice(0, index).join('');
        } else {
            return clean;
        }
    } else {
        if (word.includes('(')) {
            let split = word.split('');
            let index = split.indexOf('(');
            return split.slice(0, index).join('');
        }

        return word;
    }
});


// 첫번째 글자 입력
let firstWord = '김밥';
let player = 'Player 1: ';
let count = 2;

// 시작
while(1) {
    console.log(player, firstWord);
    while(1) {  // fisrtWord 의 단어의 index를 찾아 값을 모조리 삭제
        let index = mappedWords.indexOf(firstWord);
        if(index > -1) {
            mappedWords.splice(index, 1);
        } else {
            break;
        }
    }

    // filteredWords = firstword 다음 단어로 가능한 단어들의 배열;
    let filteredWords = mappedWords.filter((word) => word[0] === firstWord[firstWord.length -1])
    if(filteredWords.length === 0 || filteredWords.length === 1) {
        // 만약 다음단어를 말할 게 없으면 break;
        console.log("\n★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★");
        console.log(player === 'Player 1: ' ? 'Player 1 Win !!' : 'Player 2 Win !!');
        console.log(`${count} 번째에서 탈락하셨습니다.`);
        console.log("★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★\n");
        break;
    }

    // randomWord = filteredWords 중 단어 하나 무작위로 선정
    let randomWord = randomItem(filteredWords);
    
    firstWord = randomWord;
    if(player === 'Player 1: '){
        player = 'Player 2: '
    } else {
        player = 'Player 1: '
    }
    count++;
}

