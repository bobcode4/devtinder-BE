const data = {
    age : "26",
    skills : ["JavaScript", "ReactJs", "NodeJs"],
    about : "Software Developer by proffesion",
    gender : "Male"
};

const allowedEditFields = [
    "lastName", "gender", "about", "skills", "age"
];

console.log(Object.keys(data).forEach(field => allowedEditFields.includes(field)));
