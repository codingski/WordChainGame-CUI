const words = require('../module/words');
const filteredWords5000 = require('../module/5000words');
const filteredWords10000 = require('../module/10000words');

/*
const fetch = require("node-fetch");
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
*/
// 랜덤 추출 함수
function randomItem(a) { 
    return a[Math.floor(Math.random() * a.length)];
}


// 글자 분리 함수 (두음법칙)
function getConstantVowel(kor) {
    const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ',
               'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ',
               'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const s = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ',
               'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ',
               'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const t = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ',
               'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
               'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ',
               'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    const ga = 44032;
    let uni = kor.charCodeAt(0);

    uni = uni - ga;

    let fn = parseInt(uni / 588);
    let sn = parseInt((uni - (fn * 588)) / 28);
    let tn = parseInt(uni % 28);

    return {
        f: f[fn],
        s: s[sn],
        t: t[tn]
    };
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


// 게임 오버됐을때 출력되는 함수
const gameOver = function(player, count){

    console.log(player === 'Player 2' ? 'Player 1 Win !!' : 'Player 2 Win !!');
    console.log(player === 'Player 2' ? `Player 2 님은 ${count} 번째에서 탈락하셨습니다.` : `Player 1 님은 ${count} 번째에서 탈락하셨습니다.`);

}

// 글자 수 제한 함수
function control(number1, number2) {
    return mappedWords.filter((word) => number1 <= word.length && word.length <= number2);
}

let wordList = control(2, 3);


// 평균 값 구하는 함수
function average(array){
    var result = 0;
    var arrLength = array.length;
    for(var i = 0; i < arrLength; i++){
      result += array[i];
    }
    return result/arrLength;
}

// 첫번째 글자 입력
let a = 0;
let b = 0;
let countSum = [];
let counter = 0;


// 시작
while(counter < 10000){
    // 첫번째 단어 랜덤 선택
    let firstWord = randomItem(wordList);
    let player = 'Player 1';
    console.log(player, firstWord);
    let count = 1;
    while(1) {
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////// player 1
        player = 'Player 1';
        if(count > 1) {
            // Player 1;

            // 5000한방단어 검열
            // 초성 확인
            initialLow = getConstantVowel(secondWord[secondWord.length - 1]);

            // 5000 두음법칙 적용 안해도 한방단어가 있을때
            if(filteredWords5000.some((word) => word[0] === secondWord[secondWord.length - 1])) {
                firstWord = filteredWords5000.filter((word) => word[0] === secondWord[secondWord.length - 1])[0];
                console.log(player, firstWord);
                console.log('Player 1 Win !!');
                a++;
                break;
            }

            // 5000에 두음법칙 적용
            // secondWord 의 맨 뒷글자가 'ㄴ'
            if (initialLow.f === 'ㄴ') {
                // 맨 뒷글자의 자음이 ㅕ ㅛ ㅠ ㅣ 중 하나일 경우
                if (initialLow.s === 'ㅕ' || initialLow.s === 'ㅛ' || initialLow.s === 'ㅠ' || initialLow.s === 'ㅣ') {
                    // ㄴ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                    secondWord = secondWord.replace(secondWord[secondWord.length - 1], String.fromCharCode(5292 + secondWord[secondWord.length - 1].charCodeAt()));
                    if(filteredWords5000.some((word) => word[0] === secondWord[secondWord.length - 1])) {
                        firstWord = filteredWords5000.filter((word) => word[0] === secondWord[secondWord.length - 1])[0];
                        console.log(player, firstWord);
                        console.log('Player 1 Win !!');
                        a++;
                        break;
                    }        
                } 
            }

            // 맨 뒷글자가 ㄹ일 경우
            if (initialLow.f === 'ㄹ') {
                // 맨 뒷글자의 자음이 ㅑ ㅕ ㅖ ㅛ ㅠ ㅣ 중 하나일 경우
                if (initialLow.s === 'ㅑ' || initialLow.s === 'ㅕ' || initialLow.s === 'ㅖ' || initialLow.s === 'ㅛ' || initialLow.s === 'ㅠ' || initialLow.s === 'ㅣ') {
                    // ㄹ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                    secondWord = secondWord.replace(secondWord[secondWord.length - 1], String.fromCharCode(3528 + secondWord[secondWord.length - 1].charCodeAt()));
                    if(filteredWords5000.some((word) => word[0] === secondWord[secondWord.length - 1])) {
                        firstWord = filteredWords5000.filter((word) => word[0] === secondWord[secondWord.length - 1])[0];
                        console.log(player, firstWord);
                        console.log('Player 1 Win !!');
                        a++;
                        break;
                    }

                // 맨 뒷글자의 자음이 ㅏ ㅐ ㅗ ㅚ ㅜ ㅡ 중 하나일 경우
                } else if (initialLow.s === 'ㅏ' || initialLow.s === 'ㅐ' || initialLow.s === 'ㅗ' || initialLow.s === 'ㅚ' || initialLow.s === 'ㅜ' || initialLow.s === 'ㅡ'){
                    // ㄹ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                    secondWord = secondWord.replace(secondWord[secondWord.length - 1], String.fromCharCode(3528 + secondWord[secondWord.length - 1].charCodeAt()));
                    if(filteredWords5000.some((word) => word[0] === secondWord[secondWord.length - 1])) {
                        firstWord = filteredWords5000.filter((word) => word[0] === secondWord[secondWord.length - 1])[0];
                        console.log(player, firstWord);
                        console.log('Player 1 Win !!');
                        a++;
                        break;
                    }    
                } 
            }

            // 한방단어에서 걸러지지 않았을 경우

            

            // filteredWords = secondWord 다음 단어로 가능한 단어들의 배열;
            filteredWords = wordList.filter((word) => secondWord[secondWord.length -1] === word[0]);

            // 단어 마지막글자의 모음이 'ㄴ' 과 'ㄹ' 이 아닌 경우
            if(initialLow.f !== 'ㄴ' && initialLow.f !== 'ㄹ'){
                if(filteredWords.length === 0) {
                    // 만약 다음단어를 말할 게 없으면 break;
                    gameOver(player, count);
                    b++;
                    break;
                } else {
                    firstWord = randomItem(filteredWords);
                    console.log(player, firstWord);
                    count++;
                }
            } 


            // 맨 뒷글자가 ㄴ일 경우
            if (initialLow.f === 'ㄴ') {
                // 맨 뒷글자의 자음이 ㅕ ㅛ ㅠ ㅣ 중 하나일 경우
                if (initialLow.s === 'ㅕ' || initialLow.s === 'ㅛ' || initialLow.s === 'ㅠ' || initialLow.s === 'ㅣ') {
                    // 맨 뒷글자로 모여진 단어가 0개 일 경우
                    if(filteredWords.length === 0) {
                        // ㄴ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                        secondWord = secondWord.replace(secondWord[secondWord.length - 1], String.fromCharCode(5292 + secondWord[secondWord.length - 1].charCodeAt()));
                        filteredWords = wordList.filter((word) => word[0] === secondWord[secondWord.length -1]);
                        if(filteredWords.length === 0) {
                            // 만약 다음단어를 말할 게 없으면 break;
                            gameOver(player, count);
                            b++;
                            break;
                        } else {
                            firstWord = randomItem(filteredWords);
                            console.log(player, firstWord);
                            count++;
                        }
                    } else {
                        firstWord = randomItem(filteredWords);
                        console.log(player, firstWord);
                        count++;
                    }         
                } else { // 만약 ㄴ이고 ㅕ ㅛ ㅠ ㅣ 가 없으면
                    if(filteredWords.length === 0) {
                        // 만약 다음단어를 말할 게 없으면 break;
                        gameOver(player, count);
                        b++;
                        break;
                    } else {
                        firstWord = randomItem(filteredWords);
                        console.log(player, firstWord);
                        count++;
                    }
                }
            }

            // 맨 뒷글자가 ㄹ일 경우
            if (initialLow.f === 'ㄹ') {
                // 맨 뒷글자의 자음이 ㅑ ㅕ ㅖ ㅛ ㅠ ㅣ 중 하나일 경우
                if (initialLow.s === 'ㅑ' || initialLow.s === 'ㅕ' || initialLow.s === 'ㅖ' || initialLow.s === 'ㅛ' || initialLow.s === 'ㅠ' || initialLow.s === 'ㅣ') {
                    // 맨 뒷글자로 모여진 단어가 0개 일 경우
                    if(filteredWords.length === 0) {
                        // ㄹ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                        secondWord = secondWord.replace(secondWord[secondWord.length - 1], String.fromCharCode(3528 + secondWord[secondWord.length - 1].charCodeAt()));
                        filteredWords = wordList.filter((word) => word[0] === secondWord[secondWord.length -1]);
                        if(filteredWords.length === 0) {
                            // 만약 다음단어를 말할 게 없으면 break;
                            gameOver(player, count);
                            b++;
                            break;
                        } else {
                            firstWord = randomItem(filteredWords);
                            console.log(player, firstWord);
                            count++;
                        }
                    } else {
                        firstWord = randomItem(filteredWords);
                        console.log(player, firstWord);
                        count++;
                    }
                // 맨 뒷글자의 자음이 ㅏ ㅐ ㅗ ㅚ ㅜ ㅡ 중 하나일 경우
                } else if (initialLow.s === 'ㅏ' || initialLow.s === 'ㅐ' || initialLow.s === 'ㅗ' || initialLow.s === 'ㅚ' || initialLow.s === 'ㅜ' || initialLow.s === 'ㅡ'){
                    // 맨 뒷글자로 모여진 단어가 0개일 경우
                    if(filteredWords.length === 0) {
                        // ㄹ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                        secondWord = secondWord.replace(secondWord[secondWord.length - 1], String.fromCharCode(3528 + secondWord[secondWord.length - 1].charCodeAt()));
                        filteredWords = wordList.filter((word) => word[0] === secondWord[secondWord.length -1]);
                        if(filteredWords.length === 0) {
                            // 만약 다음단어를 말할 게 없으면 break;
                            gameOver(player, count);
                            b++;
                            break;
                        } else {
                            firstWord = randomItem(filteredWords);
                            console.log(player, firstWord);
                            count++;
                        }
                    } else {
                        if(filteredWords.length === 0) {
                            // 만약 다음단어를 말할 게 없으면 break;
                            gameOver(player, count);
                            b++;
                            break;
                        } else {
                            firstWord = randomItem(filteredWords);
                            console.log(player, firstWord);
                            count++;
                        }
                    }
                } else {
                    if(filteredWords.length === 0) {
                        // 만약 다음단어를 말할 게 없으면 break;
                        gameOver(player, count);
                        b++;
                        break;
                    } else {
                        firstWord = randomItem(filteredWords);
                        console.log(player, firstWord);
                        count++;
                    }
                }
            }
        }
        while(1) {  // fisrtWord 의 단어의 index를 찾아 값을 모조리 삭제
            let index = wordList.indexOf(firstWord);
            if(index > -1) {
                wordList.splice(index, 1);
            } else {
                break;
            }
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////// player 2
        player = 'Player 2';
        if(player === 'Player 2'){
            // 10000한방단어 검열
            // 초성 확인
            initialLow = getConstantVowel(firstWord[firstWord.length - 1]);

            // 10000 두음법칙 적용 안해도 한방단어가 있을때
            if(filteredWords10000.some((word) => word[0] === firstWord[firstWord.length - 1])) {
                secondWord = filteredWords10000.filter((word) => word[0] === firstWord[firstWord.length - 1])[0];
                console.log(player, secondWord);
                console.log('player 2 win!!');
                b++;
                break;
            }

            // 10000에 두음법칙 적용
            // firstWord 의 맨 뒷글자가 'ㄴ'
            if (initialLow.f === 'ㄴ') {
                // 맨 뒷글자의 자음이 ㅕ ㅛ ㅠ ㅣ 중 하나일 경우
                if (initialLow.s === 'ㅕ' || initialLow.s === 'ㅛ' || initialLow.s === 'ㅠ' || initialLow.s === 'ㅣ') {
                    // ㄴ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                    firstWord = firstWord.replace(firstWord[firstWord.length - 1], String.fromCharCode(5292 + firstWord[firstWord.length - 1].charCodeAt()));
                    if(filteredWords10000.some((word) => word[0] === firstWord[firstWord.length - 1])) {
                        secondWord = filteredWords10000.filter((word) => word[0] === firstWord[firstWord.length - 1])[0];
                        console.log(player, secondWord);
                        console.log('player 2 win!!');
                        b++;
                        break;
                    }        
                } 
            }

            // 맨 뒷글자가 ㄹ일 경우
            if (initialLow.f === 'ㄹ') {
                // 맨 뒷글자의 자음이 ㅑ ㅕ ㅖ ㅛ ㅠ ㅣ 중 하나일 경우
                if (initialLow.s === 'ㅑ' || initialLow.s === 'ㅕ' || initialLow.s === 'ㅖ' || initialLow.s === 'ㅛ' || initialLow.s === 'ㅠ' || initialLow.s === 'ㅣ') {
                    // ㄹ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                    firstWord = firstWord.replace(firstWord[firstWord.length - 1], String.fromCharCode(3528 + firstWord[firstWord.length - 1].charCodeAt()));
                    if(filteredWords10000.some((word) => word[0] === firstWord[firstWord.length - 1])) {
                        secondWord = filteredWords10000.filter((word) => word[0] === firstWord[firstWord.length - 1])[0];
                        console.log(player, secondWord);
                        console.log('player 2 win!!');
                        b++;
                        break;
                    }

                // 맨 뒷글자의 자음이 ㅏ ㅐ ㅗ ㅚ ㅜ ㅡ 중 하나일 경우
                } else if (initialLow.s === 'ㅏ' || initialLow.s === 'ㅐ' || initialLow.s === 'ㅗ' || initialLow.s === 'ㅚ' || initialLow.s === 'ㅜ' || initialLow.s === 'ㅡ'){
                    // ㄹ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                    firstWord = firstWord.replace(firstWord[firstWord.length - 1], String.fromCharCode(3528 + firstWord[firstWord.length - 1].charCodeAt()));
                    if(filteredWords10000.some((word) => word[0] === firstWord[firstWord.length - 1])) {
                        secondWord = filteredWords10000.filter((word) => word[0] === firstWord[firstWord.length - 1])[0];
                        console.log(player, secondWord);
                        console.log('player 2 win!!');
                        b++;
                        break;
                    }    
                } 
            }

            // Player2 가 한방단어로 끝내지 못할 경우

            // filteredWords = firstword 다음 단어로 가능한 단어들의 배열;
            filteredWords = wordList.filter((word) => firstWord[firstWord.length -1] === word[0]);

            // 맨 뒷글자가 'ㄴ' 과 'ㄹ' 이 아닌 경우
            if(initialLow.f !== 'ㄴ' && initialLow.f !== 'ㄹ'){
                if(filteredWords.length === 0) {
                    // 만약 다음단어를 말할 게 없으면 break;
                    gameOver(player, count);
                    a++;
                    break;
                } else {
                    secondWord = randomItem(filteredWords);
                    console.log(player, secondWord);
                    count++;
                }
            } 

            // 맨 뒷글자가 ㄴ일 경우
            if (initialLow.f === 'ㄴ') {
                // 맨 뒷글자의 자음이 ㅕ ㅛ ㅠ ㅣ 중 하나일 경우
                if (initialLow.s === 'ㅕ' || initialLow.s === 'ㅛ' || initialLow.s === 'ㅠ' || initialLow.s === 'ㅣ') {
                    // 맨 뒷글자로 모여진 단어가 0개 일 경우
                    if(filteredWords.length === 0) {
                        // ㄴ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                        firstWord = firstWord.replace(firstWord[firstWord.length - 1], String.fromCharCode(5292 + firstWord[firstWord.length - 1].charCodeAt()));
                        filteredWords = wordList.filter((word) => word[0] === firstWord[firstWord.length -1]);
                        if(filteredWords.length === 0) {
                            // 만약 다음단어를 말할 게 없으면 break;
                            a++;
                            gameOver(player, count);
                            break;
                        } else {
                            secondWord = randomItem(filteredWords);
                            console.log(player, secondWord);
                            count++;
                        }
                    } else {
                        secondWord = randomItem(filteredWords);
                        console.log(player, secondWord);
                        count++;
                    }         
                } else { // 만약 ㄴ이고 ㅕ ㅛ ㅠ ㅣ가 아닌경우
                    if(filteredWords.length === 0) {
                        // 만약 다음단어를 말할 게 없으면 break;
                        gameOver(player, count);
                        a++;
                        break;
                    } else {
                        secondWord = randomItem(filteredWords);
                        console.log(player, secondWord);
                        count++;
                    }
                }
            }

            // 맨 뒷글자가 ㄹ일 경우
            if (initialLow.f === 'ㄹ') {
                // 맨 뒷글자의 자음이 ㅑ ㅕ ㅖ ㅛ ㅠ ㅣ 중 하나일 경우
                if (initialLow.s === 'ㅑ' || initialLow.s === 'ㅕ' || initialLow.s === 'ㅖ' || initialLow.s === 'ㅛ' || initialLow.s === 'ㅠ' || initialLow.s === 'ㅣ') {
                    // 맨 뒷글자로 모여진 단어가 0개 일 경우
                    if(filteredWords.length === 0) {
                        // ㄹ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                        firstWord = firstWord.replace(firstWord[firstWord.length - 1], String.fromCharCode(3528 + firstWord[firstWord.length - 1].charCodeAt()));
                        filteredWords = wordList.filter((word) => word[0] === firstWord[firstWord.length -1]);
                        if(filteredWords.length === 0) {
                            // 만약 다음단어를 말할 게 없으면 break;
                            gameOver(player, count);
                            a++;
                            break;
                        } else {
                            secondWord = randomItem(filteredWords);
                            console.log(player, secondWord);
                            count++;
                        }
                    } else {
                        secondWord = randomItem(filteredWords);
                        console.log(player, secondWord);
                        count++;
                    }
                // 맨 뒷글자의 자음이 ㅏ ㅐ ㅗ ㅚ ㅜ ㅡ 중 하나일 경우
                } else if (initialLow.s === 'ㅏ' || initialLow.s === 'ㅐ' || initialLow.s === 'ㅗ' || initialLow.s === 'ㅚ' || initialLow.s === 'ㅜ' || initialLow.s === 'ㅡ'){
                    // 맨 뒷글자로 모여진 단어가 0개일 경우
                    if(filteredWords.length === 0) {
                        // ㄹ -> ㅇ 으로 바꿔준 뒤 다시한번 배열을 만들어준다
                        firstWord = firstWord.replace(firstWord[firstWord.length - 1], String.fromCharCode(3528 + firstWord[firstWord.length - 1].charCodeAt()));
                        filteredWords = wordList.filter((word) => word[0] === firstWord[firstWord.length -1]);
                        if(filteredWords.length === 0) {
                            // 만약 다음단어를 말할 게 없으면 break;
                            gameOver(player, count);
                            a++;
                            break;
                        } else {
                            secondWord = randomItem(filteredWords);
                            console.log(player, secondWord);
                            count++;
                        }
                    } else {
                        secondWord = randomItem(filteredWords);
                        console.log(player, secondWord);
                        count++;
                    }
                } else {
                    if(filteredWords.length === 0) {
                        // 만약 다음단어를 말할 게 없으면 break;
                        gameOver(player, count);
                        a++;
                        break;
                    } else {
                        secondWord = randomItem(filteredWords);
                        console.log(player, secondWord);
                        count++;
                    }
                }
            }
        };

        while(1) {  // secondWord 의 단어의 index를 찾아 값을 모조리 삭제
            let index = wordList.indexOf(secondWord);
            if(index > -1) {
                wordList.splice(index, 1);
            } else {
                break;
            }
        }
    };
    countSum.push(count);
    wordList = control(2, 3);
    //console.log(player, firstWord);
    counter++;
    console.log(counter);
}
console.log('\n--------------------------------');
console.log('5000 vs 10000');
console.log(`Player 1: ${a} 번 승리
Player 2: ${b} 번 승리`);
console.log(`한판당 평균 사용 단어 개수: ${parseInt(average(countSum))}`);
console.log('');