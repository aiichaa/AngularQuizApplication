/**
 * Created by InFo on 06/12/2016.
 */
(function(){

    /*
     * attaching results controller function to the turtleFacts module
     */
    angular
        .module("turtleFacts")
        .controller("resultsCtrl", ResultsController);

    /*
     * injecting the custom service quizMetrics into the results controller
     * using the $inject method.
     *
     * Injecting dependencies like this is done so as to avoid issues when
     * uglifying the code. Function arguments will get shortened during the
     * uglify process but strings will not. Therefore by injecting the argument
     * as strings in an array using the $inject method we can be sure angular
     * still knows what we want to do.
     */
    ResultsController.$inject = ['quizMetrics', 'DataService'];

    /*
     * definition of the results controller function itself. Taking
     * quizMetrics as an argument
     */
    function ResultsController(quizMetrics, DataService){
        var vm = this;



        vm.quizMetrics = quizMetrics;
        vm.dataService = DataService;
        vm.getAnswerClass = getAnswerClass;
        vm.setActiveQuestion = setActiveQuestion;
        vm.reset = reset;
        vm.calculatePerc = calculatePerc; 
        vm.activeQuestion = 0;

        function calculatePerc(){


            return quizMetrics.numCorrect / DataService.quizQuestions.length * 100;
        }

        function setActiveQuestion(index){


            vm.activeQuestion = index;
        }

        function getAnswerClass(index){


            if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
                return "bg-success";
            }else if(index === DataService.quizQuestions[vm.activeQuestion].selected){
                return "bg-danger";
            }
        }

        function reset(){

            quizMetrics.changeState("results", false);
            quizMetrics.numCorrect = 0;

            for(var i = 0; i < DataService.quizQuestions.length; i++){
                var data = DataService.quizQuestions[i]; //binding the current question to data to keep code clean

                data.selected = null;
                data.correct = null;
            }
        }

    }

})();