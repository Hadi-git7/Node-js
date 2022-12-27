
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */

function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */

function onDataReceived(text) {
  var text = text.trim();
  if (text === 'quit') {
    quit();
  }
  else if(text === 'hello\n'){
    hello();
  }  
  else if(text.startsWith('hello')){
   newHello(text)
  }
  else if(text === 'tomato'){
    tomato();
  }
  else if(text === 'exit'){
    exit();
  }
  else if(text === 'help'){
    help();
  }else if(text === 'list'){
    list()
  }
  else if (text.startsWith("add")) {
    addTask(text);
  }
  else if (text.startsWith("remove")) {
    removeTask(text);
  }
  else if (text.startsWith("edit")) {
    edit(text);
  }
  else if (text.startsWith("check")) {
    check(text);
  }
  else if (text.startsWith("uncheck")) {
    uncheck(text);
  }
  else{
    unknownCommand(text);
  }

}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
  console.log('--------------------')

}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(){
  console.log('hello!' )
  console.log('--------------------')
}
function tomato(){
  console.log('tomato!')
  console.log('--------------------')
}
function newHello(text){
  text == 'hello' ? console.log('hello!') : console.log(text + '!')
  console.log('--------------------')
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  let fs = require("fs");
  let data = JSON.stringify(objList);
  try {
    fs.writeFileSync(savefile, data);
    console.log(`Saving changes...`);
  } catch (error) {
    console.error(error);
  }
  console.log('Quitting now, goodbye!')
  process.exit();
}
function exit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}
// This help function displays all the possible commands that could be written inside tasks.js
const List = [help , hello, newHello ,list, addTask, removeTask, check,uncheck,tomato, quit ,exit];
function help(){
 List.forEach(element => console.log('-',element))
 console.log('--------------------')
}
// list function
const tasks = [];

function list(){
  console.log(`Here are the tasks:`)
  for (let i = 0; i < tasks.length; i++) {
    console.log(`${i + 1}. ${tasks[i]}`);
  }
  console.log('--------------------')
}
// Add function
  function addTask(text) {
    if (text == "add") {
    console.log('ERROR name a task to be added!')
    } else {
    arg = text.replace("add ", "");
    tasks.push(arg);
    console.log('Task ' +arg + ' has been added to list!')
    list()
  }
   
}
// Remove function
  function removeTask(text){
    if(text === 'remove'){
      tasks.pop()
      console.log('last task has been removed from list!')
    }
    else {
      let arr = text.split(" ");
      let index = parseInt(arr[1]);
      if (index < 1 || index > tasks.length) {
        console.log('this task number does not exist!');
      }
      else {
        tasks.splice(index - 1, 1);
        console.log('task ' + index + ' has been removed from list!')
      }
}
list()
}
// Edit function
  function edit(text){
    if(text === 'edit'){
      console.log('ERROR choose a task to edit!')
    }
    else {
      let arr = text.split(" ")
      let index = parseInt(arr[1]);
      if (isNaN(index)) {
      console.log('Please specify a task number to edit.');
      console.log('--------------------')
      } else {
      let str = String(arr.splice(2, arr.length - 2)).replace(/,/, " ");
      tasks[index - 1] = str;
      console.log("Task " + index + " has been changed to " + str + ".");
      }
      list();
      }
   
  }

  // check function

  function check(text) {
    const index = parseInt(text.substring(6)) - 1;
    if (isNaN(index) || index < 0 || index >= tasks.length) {
      console.log("Please enter a valid task number.");
    } else {
      tasks[index] = `[✓] ${tasks[index]}`;
      console.log(`Task ${index + 1} checked!`);
      list()
    }
  
  }

  // uncheck function

  function uncheck(text) {
    const index = parseInt(text.substring(8)) - 1;
    if (isNaN(index) || index < 0 || index >= tasks.length) {
      console.log("Please enter a valid task number.");
    } else {
      if (tasks[index].startsWith("[✓]")) {
        tasks[index] = tasks[index].substring(4, tasks[index].length);
        console.log(`Task ${index + 1} unchecked!`);
      } 
      list()
    }
   
  }
// savefile function
let savefile;
if (process.argv[2] == null) {
  savefile = "database.json";
} else {
  savefile = process.argv[2];
}

var list1;
const fs = require("fs");
try {
  let data = fs.readFileSync(savefile);
  var objList = JSON.parse(data);
}
catch (e) {
  console.log(`this file is not present, we will create it!`)
}
if (objList !== undefined) {
  list1 = objList.list1;
} else {
  objList = { "list1": tasks }
  list1 = objList.list1;
}
 
// The following line starts the application
startApp("Hadi Abou Homein")
