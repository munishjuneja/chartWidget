angular.module('uiRouterApp')
        .directive('lineChart',[function(){
            return{
                restrict: 'A',
                scope: {
                    graphData: '=',
                    color: '='
                },
                link: function($scope,$element,$attrs,$controller){
                    console.log($scope.graphData);
                    var div = d3.select($element[0]);
                    var data = $scope.graphData;
                        var margin = 30;
                        var width =  $element[0].offsetWidth;
                        var height =  $element[0].offsetHeight;
                        div.innerHTML = "";
                        var svg = div.append("svg")
                                    .attr("preserveAspectRatio","xMidYMid meet")
                                     .attr("viewBox","0 0 "+width+" "+height)

                        var xScale= d3.scaleLinear()
                                        .range([margin,width-margin])
                                        .domain(d3.extent(data,function(d){
                                            return d.xaxisValue;
                                        }));

                        var yScale = d3.scaleLinear()
                                        .range([height-margin,margin])
                                        .domain([0,d3.max(data,function(d){return d.yaxisValue})]);
                       
                        var line = d3.line()
                                     .x(function(d){
                                         return xScale(d.xaxisValue);
                                     })
                                     .y(function(d){
                                        return yScale(d.yaxisValue);
                                    })
                                    .curve(d3.curveBasis)


                        var x_axis = d3.axisBottom(xScale);
                        var y_axis = d3.axisLeft(yScale);
                        
                        svg.append("g")
                            .attr("transform","translate(0, "+(height-margin)+")")
                            .attr("class","x axis")
                            .call(x_axis);
                        
                        svg.append("g")
                            .attr("transform","translate("+margin+",0)")
                            .attr("class","y axis")
                            .call(y_axis);
                        
                        var g = svg.append("g");
                        g.append("path")
                           .attr("class","line")
                           .attr("d",line(data))
                           .attr("stroke-width",2)
                           .attr("fill","none")
                           .attr("stroke",$scope.color)

                        
                    $scope.$watch('graphData',function(newValue,oldValue){
                        xScale.domain(d3.extent(newValue,function(d) { return d.xaxisValue; }));
                        yScale.domain([0,d3.max(newValue,function(d){return d.yaxisValue})]);
                
                        var svg = d3.select($element[0]).transition();
            
                        svg.select(".line")  
                             .duration(750)
                             .attr("d", line(newValue))
                             .attr("stroke",$scope.color);
                        svg.select(".x.axis")
                             .duration(750)
                             .call(x_axis);
                        svg.select(".y.axis")
                             .duration(750)
                             .call(y_axis);
                        
                    },true)
                }
            }
        }]);