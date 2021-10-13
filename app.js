function reverseString(str) {
    var CharList = str.split('');
    var reverseCharList = CharList.reverse()
    var reversedStr = reverseCharList.join('');
    return reversedStr;
}



function isPalindrome(str) {
    var reverse = reverseString(str)
    return str === reverse
}

var date = {
    day: 3,
    month: 2,
    year: 2020
}


function convertDateToString(date) {
    dateStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateStr.day = '0' + date.day
    } else {
        dateStr.day = date.day.toString()
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month
    } else {
        dateStr.month = date.month.toString()
    }

    dateStr.year = date.year.toString()

    return dateStr;
}

function getAllDateFormats(date) {
    var dateStr = convertDateToString(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd]
}

function checkPalindromeForAllDateFormats(date) {
    var listOfPalindromes = getAllDateFormats(date)
    var flag = false;
    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }
    return flag
}

function isLeapYear(year) {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

    if (month === 2) {
        // check Leap year
        if (isLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++
    }

    return {
        day: day,
        month: month,
        year: year
    };
}

function getPreviousDate(date) {
    var day = date.day - 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (isLeapYear(year)) {
            if (day < 1) {
                day = 29;
                month--
            }
        } else {
            if (day < 1) {
                day = 28,
                    month--
            }
        }
    } else if (month === 12 || month === 10 || month === 7 || month === 5) {
        if (day < 1) {
            day = 30;
            month--
        }
    } else if (month === 1) {
        day = 31;
        year--
    } else {
        if (day < 1) {
            day = 31;
            month--;
        }
    }

    return date = {
        day: day,
        month: month,
        year: year
    }
}

function getPreviousPalindromeDate(date) {
    var ctr = 0;
    var previousDate = getPreviousDate(date)
    console.log(previousDate)

    while (1) {
        ctr++;
        var isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindrome) {
            break;
        }
        previousDate = getPreviousDate(previousDate)
    }
    return [ctr, previousDate]
}

console.log(getPreviousPalindromeDate(date))

function getNextPalindromeDate(date) {
    var counter = 0;
    var nextDate = getNextDate(date);
    console.log(nextDate)

    while (1) {
        counter++;
        var isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate)
    }

    return [counter, nextDate];
}
console.log(getNextPalindromeDate(date));
// console.log(typeof(date.day))

const bdayInput = document.querySelector("#bday-input");
const checkBtn = document.querySelector("#check-btn");
const outputBox = document.querySelector("#output")

function clickHandler(e) {
    var bdayStr = bdayInput.value
    console.log(bdayStr)
    if (bdayStr !== '') {
        var listOfDate = bdayStr.split('-')
        date = {
            day: Number(listOfDate[2]),
            month: Number(listOfDate[1]),
            year: Number(listOfDate[0])
        }
        console.log(date)
        let isPalindrome = checkPalindromeForAllDateFormats(date)
        console.log(isPalindrome)
        if (isPalindrome) {
            outputBox.innerText = "Yay! Your birthdate is a Palindrome 🥳"
        } else {
            var [counter, nextDate] = getNextPalindromeDate(date);
            var [ctr, previousDate] = getPreviousPalindromeDate(date);
            var nxtDays = (counter == 1) ? `day` : `days`
            var prevDays = (ctr == 1) ? `day` : `days`
            outputBox.innerText = `The next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}. You missed it by ${counter} ${nxtDays} in future. Also the previous Palindrome date was ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${ctr} ${prevDays} in past`
        }
    } else {
        outputBox.innerText = "Please provide a valid date"
    }
}

checkBtn.addEventListener('click', clickHandler)