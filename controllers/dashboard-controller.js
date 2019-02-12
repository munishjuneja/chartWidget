angular.module('uiRouterApp')
    .controller('dashboardCtrl',['$interval',function($interval){
        var self = this;
        self.hello = "Hello Dashboard";
        self.obj = [
                          [{"xaxisValue":30,"yaxisValue":100},{"xaxisValue":28,"yaxisValue":415},{"xaxisValue":783,"yaxisValue":1},{"xaxisValue":1,"yaxisValue":1652},{"xaxisValue":19,"yaxisValue":4079},{"xaxisValue":592,"yaxisValue":276}],
                          [{"xaxisValue":30,"yaxisValue":100},{"xaxisValue":28,"yaxisValue":415},{"xaxisValue":783,"yaxisValue":1},{"xaxisValue":1,"yaxisValue":1652},{"xaxisValue":19,"yaxisValue":4079},{"xaxisValue":592,"yaxisValue":276}],
                        //   [{"xaxisValue":30,"yaxisValue":100},{"xaxisValue":28,"yaxisValue":415},{"xaxisValue":783,"yaxisValue":1},{"xaxisValue":1,"yaxisValue":1652},{"xaxisValue":19,"yaxisValue":4079},{"xaxisValue":592,"yaxisValue":276}],
                        //   [{"xaxisValue":30,"yaxisValue":100},{"xaxisValue":28,"yaxisValue":415},{"xaxisValue":783,"yaxisValue":1},{"xaxisValue":1,"yaxisValue":1652},{"xaxisValue":19,"yaxisValue":4079},{"xaxisValue":592,"yaxisValue":276}],
                        //   [{"xaxisValue":30,"yaxisValue":100},{"xaxisValue":28,"yaxisValue":415},{"xaxisValue":783,"yaxisValue":1},{"xaxisValue":1,"yaxisValue":1652},{"xaxisValue":19,"yaxisValue":4079},{"xaxisValue":592,"yaxisValue":276}]
                   ];   
        self.barGraph = [
                            {xaxisValue: 10, yaxisValue:20},
                            {xaxisValue: 20, yaxisValue:30},
                            {xaxisValue: 30, yaxisValue:40},
                            {xaxisValue: 40, yaxisValue:50},
                            {xaxisValue: 50, yaxisValue:60},
                            {xaxisValue: 60, yaxisValue:70}
                        ];
        self.barGraph2 = [
                            {xaxisValue: 10, yaxisValue:70},
                            {xaxisValue: 20, yaxisValue:60},
                            {xaxisValue: 30, yaxisValue:50},
                            {xaxisValue: 40, yaxisValue:40},
                            {xaxisValue: 50, yaxisValue:30},
                            {xaxisValue: 60, yaxisValue:20}
                        ];
        self.lineData = [
                            {xaxisValue: 10, yaxisValue:10},
                            {xaxisValue: 20, yaxisValue:20},
                            {xaxisValue: 30, yaxisValue:30},
                            {xaxisValue: 40, yaxisValue:40},
                            {xaxisValue: 50, yaxisValue:50},
                            {xaxisValue: 60, yaxisValue:20}
                        ];  
        self.lineData2 = [
                            {xaxisValue: 10, yaxisValue:10},
                            {xaxisValue: 20, yaxisValue:20},
                            {xaxisValue: 30, yaxisValue:30},
                            {xaxisValue: 40, yaxisValue:40},
                            {xaxisValue: 50, yaxisValue:50},
                            {xaxisValue: 60, yaxisValue:20}
                        ];  
        self.lineData3 = [
                            {xaxisValue: 10, yaxisValue:10},
                            {xaxisValue: 20, yaxisValue:20},
                            {xaxisValue: 30, yaxisValue:30},
                            {xaxisValue: 40, yaxisValue:40},
                            {xaxisValue: 50, yaxisValue:50},
                            {xaxisValue: 60, yaxisValue:20}
                        ];                        
        self.changeData = function(){
           self.obj.forEach(function(d){
               d.forEach(function(e){
                   e.xaxisValue = Math.round(Math.random()*100);
                   e.yaxisValue = Math.round(Math.random()*100);
               })
           })
           var lastX = self.obj[0][self.obj[0].length-1].xaxisValue;
           self.obj[0].push({xaxisValue: lastX+10,yaxisValue:(Math.random()*100)*(Math.random()*100)})
           var lastX = self.lineData[self.lineData.length-1].xaxisValue;
           self.lineData.push({xaxisValue: lastX+10,yaxisValue:Math.random()*100});
           self.lineData3.push({xaxisValue: lastX+10,yaxisValue:Math.random()*100});
           self.lineData2.push({xaxisValue: lastX+10,yaxisValue:Math.random()*100});
        //    self.lineData.forEach(function(d){
        //        d.yaxisValue = Math.random()*100;
        //    })
            // var color1 = "#0F0";
            // var color2 = "#F00";
            // if(!self.barGraph.length){
            //     lastX= 10;
            //     lastY = 20;
            //     self.barGraph.push({xaxisValue: lastX, yaxisValue: lastY});
            // }
            // var lastX = self.barGraph[self.barGraph.length-1].xaxisValue;
            // var lastY = self.barGraph[self.barGraph.length-1].yaxisValue;
            // self.barGraph.push({xaxisValue:lastX+10,yaxisValue:lastY+10});
            // self.color = eval("color"+ (Math.round(Math.random()*20)%2+1).toString())
        }

        self.removeAllData = function(){
            self.barGraph = [];
            
        }

        self.color = "#F00";
        self.color2 = "#0F0";
        self.color3 = "#00F";
        self.color4 = "#0FF";

        var interval;
    
        self.cancelInterval = function(){
            if (angular.isDefined(interval)) {
                $interval.cancel(interval);
                interval = undefined;
              }
        };
        
        self.startInterval = function(){
            interval = $interval(self.changeData,1000);
        };
    }])