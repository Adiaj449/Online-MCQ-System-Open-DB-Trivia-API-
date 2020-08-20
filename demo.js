
let url = 'https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple';

async function startExam(getAPI) {
    try {
        var data = await fetch(getAPI);
        return data.json();
    } catch (err) {
        return err;
    }
}

startExam(url).then(function (data) {

    let len = data['results'].length;

    var divProgress = document.createElement('div');
    divProgress.setAttribute('class', 'container');

    var panelDefault = document.createElement('div');
    panelDefault.setAttribute('class', 'panel panel-default col-sm-12');


    var questionHeading = document.createElement('div');
    questionHeading.setAttribute('class', 'panel-heading');

    questionHeading.innerHTML = "<h3>" + data['results'][0]['question'] + "</h3>";
    panelDefault.appendChild(questionHeading);

    let ansLen = data['results'][0]['incorrect_answers'].length;

    let defaultAnswer = document.createElement('btn');
    defaultAnswer.setAttribute('class', 'panel-body btn btn-primary');
    defaultAnswer.innerText = data['results'][0]['correct_answer'];

    panelDefault.appendChild(defaultAnswer);

    for (let i = 0; i < ansLen; i++) {
        let answerBody = document.createElement('btn');
        answerBody.setAttribute('class', 'panel-body btn btn-primary');
        answerBody.innerText = data['results'][0]['incorrect_answers'][i];

        answerBody.addEventListener('click', function () {
            alert(answerBody.innerText);
        })
        panelDefault.appendChild(answerBody);
    }


    divProgress.appendChild(panelDefault);
    var body = document.getElementsByTagName('body');
    document.body.appendChild(divProgress);

}).catch(function (err) {
    alert(err);
})
/*
startExam(url).then(function (data) {
    //console.log(data);
    let len = data['results'].length;
    console.log(len);


    var divProgress = document.createElement('div');
    divProgress.setAttribute('class', 'container');

    var heading = document.createElement('h2');
    heading.innerText = "Test Progress";

    var progress = document.createElement('div');
    progress.setAttribute('class', 'progress');

    var progressBar = document.createElement('div');
    progressBar.setAttribute('class', 'progress-bar');

    var rowBar = document.createElement('div');
    rowBar.setAttribute('class', 'row');

    for (let i = 0; i < len; i++) {
        var divQuetion = document.createElement('div');
        divQuetion.setAttribute('class', 'col-sm-12');

        var Question = document.createElement('h2');
        Question.innerText = "Question ." + (i + 1) + ") " + data['results'][i]['question'];

        divQuetion.appendChild(Question);

        var rowAnswer = document.createElement('div');
        rowAnswer.setAttribute('class', 'row text-center');

        var divAnsSetRowOne = document.createElement('button');
        divAnsSetRowOne.setAttribute('class', 'col-sm-4 btn btn-primary');
        divAnsSetRowOne.innerText = data['results'][i]['correct_answer'];
        rowAnswer.appendChild(divAnsSetRowOne);

        let ansLen = data['results'][i]['incorrect_answers'].length;
        console.log(ansLen);

        for (let j = 0; j < ansLen; j++) {
            let divAnsSetRowTwo = document.createElement('button');
            divAnsSetRowTwo.setAttribute('class', 'col-sm-4  btn btn-primary');
            divAnsSetRowTwo.innerText = data['results'][i]['incorrect_answers'][j];


            divAnsSetRowTwo.addEventListener('click',function(){
                divAnsSetRowTwo.setAttribute('style','background-color : yellow ; color : red');
                alert('Button Clicked'+ divAnsSetRowTwo.innerText);
            })
            rowAnswer.appendChild(divAnsSetRowTwo);
        }


        divQuetion.appendChild(rowAnswer);
        rowBar.appendChild(divQuetion);
    }

    progress.appendChild(progressBar);
    divProgress.appendChild(heading);
    divProgress.appendChild(progress);
    divProgress.appendChild(rowBar);

    var body = document.getElementsByTagName('body');
    document.body.appendChild(divProgress);


}).catch(function (err) {
    console.log(err);
})

*/