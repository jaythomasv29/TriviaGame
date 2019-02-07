  //set initial game variables
        var currentQuestion = 0; //initial question
        var score = 0; //initial score
        var totQuestions = questions.length //total # of questions
        console.log(totQuestions);

        //get variables from DOM
        var container = document.querySelector('#quizContainer');
        var questionEl = document.querySelector('#question');
        var opt1 = document.querySelector('#opt1');
        var opt2 = document.querySelector('#opt2');
        var opt3 = document.querySelector('#opt3');
        var opt4 = document.querySelector('#opt4');
        var nextButton = document.querySelector('#nextButton');
        var resultCont = document.querySelector('#result');

        //function to load question
        function loadQuestion(questionIndex) {
            var q = questions[questionIndex];
            questionEl.textContent = q.question;
            opt1.textContent = q.option1;
            opt2.textContent = q.option2;
            opt3.textContent = q.option3;
            opt4.textContent = q.option4;
        };

        function countdownTimer() {
            var $timer = $('#timer');
            var $button = $('button');
            var counter = 60;
            var Countdown = setInterval(function () {
                $timer.text(counter);
                counter--;
                if (counter === 0) {
                    $timer.text("Quiz has ended, submitted as incomplete. Must Restart").addClass("text-danger");
                    clearInterval(Countdown);
                    $('button').fadeOut('slowly');
                    $('button').text('Restart').attr('onClick', 'location.reload();');
                    $('button').fadeIn('slowly');
                    $('.option').fadeOut('slowly');
                } if(counter <30) {
                    $timer.removeClass("text-success");
                    $timer.addClass("text-danger");
                }
            }, 1000);
        }
        function loadNextQuestion() {
            //countdown

            var selectedOption = document.querySelector('input[type=radio]:checked');
            if (!selectedOption) { //if not selected
                alert("Please select an answer");
                return;
            }
            var answer = selectedOption.value; //answer assigned value from querySelector
            if (questions[currentQuestion].answer == answer) {
                score += 10;
            }
            selectedOption.checked = false;
            currentQuestion++;
            if (currentQuestion == totQuestions - 1) { //executed on last question
                nextButton.textContent = 'Finish';
            }
            if (currentQuestion == totQuestions) {
                container.style.display = "none";
                nextButton.style.display = "none";

                resultCont.textContent = `Your score is: ${score}`;
                return;
            }
            loadQuestion(currentQuestion);
        }
        loadQuestion(currentQuestion);
        countdownTimer();//countdown timer function of 60 seconds