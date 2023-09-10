// Text cleaning to remove Special Characters,line breaks And extra Spaces

export const cleanText = (inputString: string) => {
  const specialCharsAndSpacesRegex = /[^a-zA-Z0-9\s,.!?'"():;\-\n\r]/g;

  // Use the replace() method to remove special characters and spaces
  const cleanedString = inputString.replace(specialCharsAndSpacesRegex, "");

  // Remove extra spaces and line breaks
  const cleanedStringNoExtraSpaces = cleanedString.replace(/\s+/g, " ").trim();

  return cleanedStringNoExtraSpaces;
};

// example usage
// const inputString =
//   "Hello, @world!\n\nThis is a   #test string  \n  with (punctuation marks).";
// const result = cleanText(inputString);
//returns Hello, world! This is a test string with (punctuation marks).
