angular.module('uiRouterApp')
        .directive('barChart',[function(){
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

                         var xScale = d3.scaleBand().range([margin,width-margin]).padding(0.5);
                         xScale.domain(data.map(function(d) { return d.xaxisValue; }));

                        var yScale = d3.scaleLinear()
                                        .range([height-margin,margin])
                                        .domain([0,d3.max(data,function(d){return d.yaxisValue})]);

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
                        g.selectAll(".singlebar")
                          .data(data)
                          .enter().append("rect")
                          .attr("class", "singlebar")
                          .attr("fill",$scope.color)
                          .attr("x", function(d) { return xScale(d.xaxisValue); })
                          .attr("y", function(d) { return yScale(d.yaxisValue); })
                          .attr("width", xScale.bandwidth())
                          .attr("height", function(d) { return height-yScale(d.yaxisValue)-margin; })
                        
                    $scope.$watch('graphData',function(newValue,oldValue){
                        xScale.domain(newValue.map(function(d) { return d.xaxisValue; }));
                        yScale.domain([0,d3.max(newValue,function(d){return d.yaxisValue})]);
                
                        var bars = g.selectAll('.singlebar')
                                      .remove()
                                      .exit()
                                      .data(newValue);
                        
                        bars.enter()
                            .append("rect")
                            .attr("class", "singlebar")
                            .attr("fill",$scope.color)
                            .attr("x", function(d) { return xScale(d.xaxisValue); })
                            .attr("y", height-margin )
                            .attr("width", xScale.bandwidth())
                            .attr("height",0)
                            .transition()
                            .duration(300)
                            .ease(d3.easeCubic)
                            .attr("height", function(d) { return height-yScale(d.yaxisValue)-margin; })
                            .attr("y", function(d) { return yScale(d.yaxisValue); })
                            
                        
                        svg.select(".x.axis")
                             .call(x_axis);
                        svg.select(".y.axis")
                             .call(y_axis);
                        
                    },true)
                }
            }
        }]);