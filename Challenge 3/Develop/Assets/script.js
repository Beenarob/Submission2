// Assignment code here
// const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
// const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
// const numerals = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
// const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '+', '-', '.', '~', '|', '<', '>', '=', '-', '_', '/', ':', ';', '?', '[', ']', '{', '}', '~'];

// --------------------------Tried different ways to present the password pool and generate ramdom characters--------------------------------------------------------------------
const password_ele = document.getElementById("pwd_txt")
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numerals = "0123456789"
const specialCharacters = "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~"
const generate = document.getElementById("generate");


// This randomly selects an element in an array if the password length selected by a user is less than desired length.
var rdmCharacter = function (finalPassword, passwordLength, checking, array, range) {
  if (checking === true && finalPassword.length < passwordLength) {
    var selectRandom = Math.floor(Math.random() * range);
    // Both of the two ways of claming password pool work for this. If using an array then use "array[selectRandom]""
    finalPassword += array.charAt(selectRandom);
  }
  return finalPassword;
}

// The function to generate a password
var generatePassword = function () {
  var passwordPool = ""
  var passwordLength = window.prompt("How long is your password? \nMinimum 10 characters\nMaximun 158 characters");

  // Check for invalid input 
  while (passwordLength < 10 || passwordLength > 158 || isNaN(passwordLength)) {
    window.alert("Invalid input value. \nPlease enter a number between 10 and 158.")
    passwordLength = window.prompt("Please re-enter the desired length for your password to meet the following criteria: \nMinimum 10 characters\nMaximun 158 characters")
    // console.log(passwordLength)
    // console.log(typeof passwordLength)    
  }
  // Collect user wanted criterias
  var intitialCounter = 0
  var lcConfirm = window.confirm("Sounds Good. Would you like lowercase letters in your password?");
  var ucConfirm = window.confirm("Okay. Would you like uppercase letters in your password?");
  var nbrConfirm = window.confirm("Numbers are always a good idea to include, would like to include some?");
  var symbolConfirm = window.confirm("Sure. How about adding some special characters?");

  // Check for invalid selection
  if (lcConfirm) {
    passwordPool += lowerCase;
    intitialCounter = intitialCounter + 1
  }
  if (ucConfirm) {
    passwordPool += upperCase;
    intitialCounter = intitialCounter + 1
  }
  if (nbrConfirm) {
    passwordPool += numerals;
    intitialCounter = intitialCounter + 1
  }
  if (symbolConfirm) {
    passwordPool += specialCharacters;
    intitialCounter = intitialCounter + 1
  }
  if (passwordPool.length == 0) {
    window.alert("Please choose at least one of the criterias.");
    return null;
  }
  console.log(passwordPool)
  console.log(intitialCounter)
  // Define and start to generate password
  var finalPassword = "";
  //  It will fill the password with user specified criterias first so that at least 1 element of the selected criteria will be added to the password
  //  First fill in 1 of each chosen character type
  finalPassword = rdmCharacter(finalPassword, passwordLength, lcConfirm, lowerCase, 26)
  finalPassword = rdmCharacter(finalPassword, passwordLength, ucConfirm, upperCase, 26)
  finalPassword = rdmCharacter(finalPassword, passwordLength, nbrConfirm, numerals, 10)
  finalPassword = rdmCharacter(finalPassword, passwordLength, symbolConfirm, specialCharacters, specialCharacters.length)
  console.log(finalPassword)
  // Then fill with random characters from character pool
  for (let i = intitialCounter; i < passwordLength; i++) {
    finalPassword += passwordPool.charAt(Math.floor(Math.random() * passwordPool.length))
  }
  // shuffle the password to make it more random
  var shuffled = finalPassword.split('').sort(function () { return 0.5 - Math.random() }).join('');
  return shuffled
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
