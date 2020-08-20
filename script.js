var resultMarks = 0;
var len;
var dataResult;
let url = 'https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple';
async function startExam(getAPI) {
    try {
        var data = await fetch(getAPI);
        return data.json();
    } catch (err) {
        return err;
    }
}

function userDetail() {
    var headingPanel = document.createElement('div');
    headingPanel.setAttribute('class', 'container');

    var rowPanel = document.createElement('div');
    rowPanel.setAttribute('class', 'row');

    var colProgress = document.createElement('div');
    colProgress.setAttribute('class', 'col-sm-12');

    var progress = document.createElement('p');
    progress.innerText = "Question : 1/10";

    var startBtn = document.createElement('button');
    startBtn.setAttribute('class', 'btn btn-primary');
    startBtn.innerText = "Start Exam";

    startBtn.addEventListener('click', function () {
        startExamBtn(0);
        startBtn.disabled = true;
    })

    var marksSession = document.createElement('p');
    marksSession.innerText = "Marks : " + 0;
    marksSession.id = 'marksSess';

    colProgress.appendChild(startBtn);
    colProgress.appendChild(progress);
    colProgress.appendChild(marksSession);

    rowPanel.appendChild(colProgress);
    headingPanel.appendChild(rowPanel);

    var body = document.getElementsByTagName('body');
    document.body.appendChild(headingPanel);
    pageQuestions(10);
}

function startExamBtn(questionNumber) {

    startExam(url).then(function (data) {
        document.getElementById('heading').innerHTML = "";


        len = data['results'].length;

        var divProgress = document.createElement('div');
        divProgress.setAttribute('class', 'container');

        var panelDefault = document.createElement('div');
        panelDefault.setAttribute('class', 'panel panel-default col-sm-12');


        var questionHeading = document.createElement('div');
        questionHeading.setAttribute('class', 'panel-heading');

        questionHeading.innerHTML = "<h3>" + data['results'][questionNumber]['question'] + "</h3>";
        panelDefault.appendChild(questionHeading);

        let ansLen = data['results'][questionNumber]['incorrect_answers'].length;

        let defaultAnswer = document.createElement('btn');
        defaultAnswer.setAttribute('class', 'panel-body btn btn-primary');
        defaultAnswer.innerText = data['results'][questionNumber]['correct_answer'];

        defaultAnswer.addEventListener('click', function () {
            var result = confirm("Are you confirm on Selected Answer");
            if (result) {
                let selectedResult = defaultAnswer.innerText;
                if (defaultAnswer.innerText == selectedResult) {
                    //alert(selectedResult);
                    resultMarks++;
                    document.getElementById('marksSess').innerText = "Marks Gained : " + resultMarks + "/ 10";
                    defaultAnswer.disabled = true;
                    console.log(resultMarks);
                }
            }
        })
        panelDefault.appendChild(defaultAnswer);

        for (let i = 0; i < ansLen; i++) {
            let answerBody = document.createElement('btn');
            answerBody.setAttribute('class', 'panel-body btn btn-primary');
            answerBody.innerText = data['results'][questionNumber]['incorrect_answers'][i];

            answerBody.addEventListener('click', function () {
                var result = confirm("Are you confirm on Selected Answer");
                if (result) {
                    let selectedResult = answerBody.innerText;
                    if (defaultAnswer.innerText == selectedResult) {
                        alert(selectedResult);
                        answerBody.disabled = true;
                    }
                }
            })
            panelDefault.appendChild(answerBody);
        }


        divProgress.appendChild(panelDefault);
        var headingDivision = document.getElementById('heading');
        //document.body.appendChild(divProgress);
        headingDivision.appendChild(divProgress);

    }).catch(function (err) {
        alert(err);
    })
}

function pageQuestions(dataLen) {
    var headingPanel = document.createElement('div');
    headingPanel.setAttribute('class', 'container');

    var rowPanel = document.createElement('div');
    rowPanel.setAttribute('class', 'row');

    var colProgress = document.createElement('div');
    colProgress.setAttribute('class', 'col-sm-12');
    colProgress.innerHTML = "<h3>Questions</h3>"
    let len = dataLen;

    for (let i = 0; i < len; i++) {
        let questionPage = document.createElement('button');
        //questionPage.setAttribute('class','btn btn-primary');
        questionPage.id = "btnQuestionSet"
        questionPage.innerText = i + 1;
        colProgress.appendChild(questionPage);

        questionPage.addEventListener('click', function () {
            startExamBtn(questionPage.innerText);
        })
    }

    rowPanel.appendChild(colProgress);

    headingPanel.appendChild(rowPanel);

    var body = document.getElementsByTagName('body');
    document.body.appendChild(headingPanel);
}
