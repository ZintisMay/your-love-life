
//Script Start//////////////////////////////////////
//////////////////////////////////////////////////


	//globals

    // var middle = 800;
    // var width = middle;
    // var height = middle;
    // var radius = Math.min(width, height) /2;



    var middle = $('#vertical2').height() < $('#vertical2').width()? $('#vertical2').height() : $('#vertical2').width();
    var width = middle;
    var height = middle;
    var radius = Math.min(width, height) /2;

    var data = [];
    //////////////////////////////////////////

	// function resetWidthHeight(){
	// 	width = $('#vertical2').width();
	// 	height = $('#vertical2').height();
	// 	radius = Math.min(width, height) /2;
	// 	if(width<=height){
	// 		middle = width/2;
	// 	}else if(height < width){
	// 		middle = height /2;
	// 	}
	// }

	// $(window).resize(function(){
	// 	resetWidthHeight();
	// });


	//this returns a tick, to help count
	var tempObject = {
		tick: -1,
		ticker: function(){
		  this.tick++
		  return this.tick;
		}
	}

	//this returns a color using the return colores function
    var colorObject = {
      tick: 0,
      color:function(name){
        if(name == "poly"){
          return returnColores(name);
        }
        if(!this[name]){
          this[name] = returnColores(this.tick);
          this.tick++;
        }
        return this[name];
      }
    }



//////////////////////////////////////////////////

    angular.module('angularApp',[]).controller("MainCTRL", function($scope){


	  var date = new Date();



      $scope.calendar = {
      	numMonths:[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      	months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      	year:[]
      }

      $scope.today = {
      	year: date.getFullYear(),
      	month: date.getMonth() + 1
      }

	  // console.log($scope.today.year, typeof $scope.today.year);

      for(x=0;x<100;x++){
      	$scope.calendar.year.push($scope.today.year - x);
      }

      $scope.modalObject = {
      	name:'',
      	target: -1,
      	start: 0,
      	finish: 0,
      	startMo:date.getMonth() + 1,
      	startYr:date.getFullYear(),
      	endMo:date.getMonth() + 1,
      	endYr:date.getFullYear()
      }

      $scope.age = 0;
      $scope.pluralYear = "";
      $scope.month = $scope.calendar.months[$scope.today.month-1];
      $scope.year = date.getFullYear();
      // console.log($scope.year);

      function changeCurrentModalTarget(x, y){
      	$scope.modalObject.name = x;
      	$scope.modalObject.nameIndex = y;
      	console.log(x);
      	console.log($scope.modalObject);
      }
      $scope.changeCurrentModalTarget = changeCurrentModalTarget;

      //changes your birth year
      function updateAge(){

		// console.log($scope.today.year);
		// console.log($scope.today.month);

      	var yearMinusYear = $scope.today.year - $scope.year +1;

      	$scope.age = yearMinusYear;
      	
      	if($scope.age > 1){
      		$scope.pluralYear = 's';
      	}else{
      		$scope.pluralYear = '';
      	}

      	// console.log($scope.age);

      	makeChart();
      }
      $scope.updateAge = updateAge;

      // console.log($scope.today);
	  // console.log($scope.calendar);

      //these are the lovers being iterated upon
      $scope.lovers = [
        {name:"julie",episodes:[{start:1, finish:2, startMo:1, startYr:2015,endMo:2,endYr:2016},{start:1, finish:2, startMo:7, startYr:2010,endMo:9,endYr:2014}]},
        {name:"nicole",episodes:[{start:2, finish:4, startMo:5, startYr:2013,endMo:2,endYr:2015}]},
        // {name:"bob",episodes:[{start:24, finish:27},{start:30, finish:45}]},
        // {name:"amy",episodes:[{start:80, finish:90},{start:85, finish:95}]},
        // {name:"sex-o-tron9000",episodes:[{start:111, finish:113},{start:115, finish:125},{start:130, finish:150}]},
      ];

      // holds the add lover new lover
      $scope.currentLover= {
        name: "",
        start: null,//probably don't need this
        finish: null,//or this
        episodes: []
      };

      // removes a lover entirely
      function deleteEntry(x){
        $scope.lovers.splice(x,1);
        makeChart();
      }
      $scope.deleteEntry = deleteEntry;

      //receives the lover entry and episode entry, finds and splices that particular entry in that particular lover
      function deleteDate(x, y){
        var index = $scope.lovers.indexOf(x);
        var targetEp = $scope.lovers[index].episodes.indexOf(y);
        $scope.lovers[index].episodes.splice(targetEp, 1);

        // if($scope.lovers[index].episodes.length < 1){
        // 	deleteEntry(x);
        // }
        makeChart();
      }
      $scope.deleteDate = deleteDate;

      //creates a new date
      //needs to have prompt removed at some point
      function addDate(x){
        var begin, end;
        begin = parseInt(prompt('When did you start dating?'));
        end = parseInt(prompt('When did you stop dating?'));
        if(begin <= end){

          $scope.lovers[x].episodes.push({start:begin,finish:end});
        }else{
          alert('Made a mistake!');
        }

        $scope.lovers[x].episodes = sortArray($scope.lovers[x].episodes);

        $scope.makeChart();
      }
      $scope.addDate = addDate;

      //this allows the modal information to be transferred into the lovers objects
      function modalAddDate(x){

      	//vars
      	obj = $scope.modalObject;
      	var theIndex = $scope.modalObject.nameIndex;
      	console.log(theIndex);
      	console.log($scope.lovers[theIndex]);
      	console.log($scope.lovers);


      	if(obj.startYr <= obj.endYr && obj.startMo <= obj.endMo){
      		console.log($scope.lovers[theIndex]);
           $scope.lovers[theIndex].episodes.push({startMo:obj.startMo,startYr:obj.startYr,endMo:obj.endMo,endYr:obj.endYr});
      	}

        $scope.lovers[theIndex].episodes = sortArray($scope.lovers[theIndex].episodes);
      	console.log($scope.lovers[theIndex]);
        $scope.makeChart();
      }
      $scope.modalAddDate = modalAddDate;

      //this clears the modal object
      function modalClear(){
        $scope.modalObject = {
        	name: '',
        	target: -1,
        	startMo: 0, 
        	startYr: 0,
        	endMo: 0,
        	endYr: 0
        }
      }
      $scope.modalClear = modalClear;

      $scope.nameToggle = true;
      function toggleNames(){
        if($scope.nameToggle == true){
          $(".pink").css('background-color', '#52B3CE');
          $scope.nameToggle=false;
        }else{
          $(".pink").css('background-color', '#F990A7');
          $scope.nameToggle=true;
        }  
        makeChart();

        
      }
      $scope.toggleNames = toggleNames;

//ZINTISZINTISZINTIS

      //this is going to sort that object array list
      function sortArray(array){

        var oldArrayLength = array.length;
        var newArray = [];

        for(y=0;y<oldArrayLength;y++){

          var target = 0;
          var chosen = array[0];

          for(x=0;x<array.length;x++){
            if (array[x] < chosen){
              target = x;
              chosen = array[x];
            }
          }
          array.splice(target,1);
          newArray.push(chosen);
        }
        return newArray;
      }
      $scope.sortArray = sortArray;



      //adds a new episode for current lover
      function pusher(){
        if(!isNaN($scope.currentLover.start) || !isNaN($scope.currentLover.finish)){
          $scope.currentLover.episodes.push({start: $scope.currentLover.start, finish: $scope.currentLover.finish});
          $scope.currentLover.start = null; $scope.currentLover.finish = null;
        }        

      }
      $scope.pusher = pusher;

      //passes current lover into lovers
      function sender(){

      	if($scope.currentLover.name != ""){$scope.lovers.unshift({name:$scope.currentLover.name,episodes:$scope.currentLover.episodes})
      	}
       //  else{
      	// 	alert("Please enter a name.");
      	// }

        console.log($scope.lovers[0]);

        $scope.currentLover = {
        name: "",
        start: null,
        finish: null,
        episodes: []
        }
      }
      $scope.sender = sender;

      //this will add another start/finish to the current lover
	      // function makeLoverTimeline(start, finish){
	      //   $scope.currentLover.episodes.push({start:start,finish:finish});
	      // }
	      // $scope.makeLoverTimeline = makeLoverTimeline;
      
      //this function will take the current lover data and push it into the lovers
      function addLover(){

        $scope.lovers.unshift({name:$scope.currentLover.name,episodes:$scope.currentLover.episodes})
      }
      $scope.addLover = addLover;

        //NOT being used currently
          // function dateMaker(x){
          //   var array = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
          //   console.log(x);
          //   var b = (x%12)
          //   var a = ((x/12)-b);
          //   b = b.toString();
          //   a = a.toString();
          //   return( a+ ' years '+ b + ' months' );
          // }
          // $scope.dateMaker = dateMaker;
        ///////////////////////////

      //takes the array of lovers and converts it into a monthly singular array
      function makeChart(){
        
        // var months = $scope.age%12;
        // years = ($scope.age-months)/12; 
        // totalMonths = $scope.age;

        // console.log(years,'years',months,'months' );

        // var totalArray = [];
        var tempArray = [];
        var arrayx12 = [];

////////////////////////////////////////////////////////////////////////////////////////////
//this takes the lovers, age, and poops out an x12 array for use in the big chart
//this version converts start: and end: object vals into the chart
        function loverArrayBuilder(){

        	function convertLoversIntoArray(){

        	}

          var lovers = $scope.lovers;

          var age = $scope.age;

          arrayx12 = [];

          $('svg').empty();

          for(x=0;x<age;x++){

            arrayx12.push([]);
            // console.log(arrayx12[x]);

            for(y=0;y<12;y++){

	              var tempNameArray = [];

	              var currentMonth = (x*12)+y;
	              // console.log("currentMonth", currentMonth);

	              lovers.forEach(function(x){
	                // console.log("x", x);
	                for(ep in x.episodes){
	                  // console.log("ep", ep);
	                  if(currentMonth >= x.episodes[ep].start && currentMonth <= x.episodes[ep].finish ){
	                  
	                    // console.log("!!!!!!!!!!!!!!!!!!!!");
	                    tempNameArray.push(x.name);

	                  }
	                }
	              })

	              // console.log(tempNameArray);
	              arrayx12[x].push(tempNameArray);
            }

          }
          
        }

//this one will convert startMo, startYr, etc... into the appropriate array
        function loverArrayBuilder2(){

          var lovers = $scope.lovers;

          var age = $scope.age;

          arrayx12 = [];

          $('svg').empty();

          for(x=0;x<age;x++){

            arrayx12.push([]);
            // console.log(arrayx12[x]);

            for(y=0;y<12;y++){

				var tempNameArray = [];

				var currentMonth = y+1;
				var currentYear = date.getFullYear()-age+x+1;
				console.log("currentMonth", currentMonth, 'currentYear', currentYear);

				lovers.forEach(function(x){
					console.log("lovers", x);
					for(ep in x.episodes){
						// console.log("ep", ep);
						if(currentYear > x.episodes[ep].startYr && currentYear < x.episodes[ep].endYr ){

							tempNameArray.push(x.name);

						}else if(currentYear == x.episodes[ep].startYr){
							
							if(currentMonth >= x.episodes[ep].startMo){
								tempNameArray.push(x.name);
							}

						}else if(currentYear == x.episodes[ep].endYr){
							
							if(currentMonth <= x.episodes[ep].endMo){
								tempNameArray.push(x.name);
							}


						}
					}
				})

				// console.log(tempNameArray);
				arrayx12[x].push(tempNameArray);
            }

          }
          
        }

      loverArrayBuilder2();
      console.log(arrayx12);
      runPie(arrayx12, $scope.nameToggle);
      // console.log(arrayx12);
//////////////////////////////////////////////////////////////////////////////////////////

        //iterates over lovers, and then within episodes of each lover
        
        // for(x=0;x<totalMonths;x+=12){
        //   tempArray[y] = [];
        //   for(y=0;y<12;y++){
        //       $scope.lovers.forEach(function(oneLover){
        //       // console.log(oneLover);
        //       oneLover.episodes.forEach(function(oneEp){
        //         if(oneEp.start <=x && oneEp.finish >= x)
        //           {totalArray[x].push(oneLover.name);}
        //       });

        //     });
        //   }
            
        //   totalArray.push(tempArray);

        // }

        // for(x=0;x<totalMonths;x++){
        //   totalArray[x] = [];

        //   $scope.lovers.forEach(function(oneLover){
        //     // console.log(oneLover);
        //     oneLover.episodes.forEach(function(oneEp){
        //       if(oneEp.start <=x && oneEp.finish >= x)
        //         {totalArray[x].push(oneLover.name);}
        //     });

        //   });

        //   totalArray[x].push()
        // }

        // console.log(totalArray);

      }//MakeChart()

      $scope.makeChart = makeChart;
      $scope.makeChart();
    });//end Angular////////////////////////////////////////////


/////////////////////////////////////////////////////////////////////////////////
//built array

  function dummyArrayBuilder(){
    for(x=0;x<31;x++){
      
      var temp = []

      for(y=0;y<12;y++){

          temp.push({val:1,color:x});
      }

      data.push(temp);
    }   
  }
  dummyArrayBuilder();
/////////////////////////////////////////////////////////////////////////////////////////

//rotate object to call method for
  var rotate = {
    degrees: -15,
    me: function(){
      this.degrees += 15;
      if(degrees > 360){this.degrees -= 360}
      return this.degrees;
    }
  }
/////////////////////////////////////////////////////////////////////////////////

    //helper function that returns the color wheel from d3.scale.category20
  function returnColores(x){
    var colores = 
      ['#1f77b4',
      '#aec7e8',
      '#ff7f0e',
      '#ffbb78',
      '#2ca02c',
      '#98df8a',
      '#d62728',
      '#ff9896',
      '#9467bd',
      '#c5b0d5',
      '#8c564b',
      '#c49c94',
      '#e377c2',
      '#f7b6d2',
      '#7f7f7f',
      '#c7c7c7',
      '#bcbd22',
      '#dbdb8d',
      '#17becf',
      '#9edae5',
      '#1f77b4',
      'url("#Triangle2")',
      'url("#Triangle3")',
      'url("#Triangle4")'
      ];

      var id = ['url("#Triangle2")','url("#Triangle3")','url("#Triangle4")'];
    // return id[x%3];  
    if(x == 'poly'){return colores[21]};
    return colores[x%23];
  }


/////////////////////////////////////////////////////////////////////////////////
//PIEPIEPIEPIEPIEPIEPIEPIEPIEPIEPIEPIE
/////////////////////////////////////////////////////////////////////////////////
    //picks a random color
    var colorPicker = {
      counter: 20,
      upCounter: function(){
        this.counter += 1;
        if(this.counter>20){
          this.counter = 0;
        };
        console.log(this.counter)
        return this.counter;
      },

      upCounter2: function(){
        this.counter =  Math.floor((Math.random() * 20) + 1);;

        return this.counter;
      }
    }
    //make svg 
    // var svg = d3.select('#vertical2')
    //   .append('svg')
    //   .attr('width', width)
    //   .attr('height', height);

    var svg = d3.select('#vertical2')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // D3 pie generator////////////////////////////////////////////
    function makePie(data, index, nameToggle){

      var pie = d3.layout.pie()
      .padAngle(.01)
      .value(function(d){
        // console.log('a', d);
        return 1;
      })
      .sort(null);

      // console.log(pie(data));

      // hold pie + data
      var stencil = pie(data);

      //put container in svg
      var container = svg.append('g')
        .attr('transform', "translate("+height/2+","+width/2+")");
        // + width/2+ // + height /2 + 

      //make g for every element
      var g = container.selectAll('g') //make virtual arcs
        .data(stencil)//bind virtual arcs to data
        .enter()//create selection
        .append('g');

      //d3.arc = shape, sets radius sizes
      var arc = d3.svg.arc()
        .outerRadius((index + 1) * pieWidth - 2)
        .innerRadius(index * pieWidth+1);

        //access to color scale
      var color = d3.scale.category20();

      //fills using color
      // g.append('path')
      //   .attr('d', arc)
      //   .style('fill',function(d,i){
      //     console.log('b', d.data);
      //     // return ('url(#Triangle2)');
      //     return returnColores(d.data.color);
      //   });

      g.append('path')
        .attr('d', arc)
        .style('fill',function(d,i){
            // console.log('fill?', d.data);

          if(d.data.length > 1){

            return '#a9a9a9';

          }else if(typeof d.data[0] == 'string'){

            // if(d.data.length > 1){
            //   return colorObject.color('poly');
            // }

            return colorObject.color(d.data[0])

          }else if(d.data.color == null){
            // return 'hsla(0,0%,0%,0';
            //gray
            return '#f2f2f2';
          }else{

            return returnColores(d.data.color);

          }
          
          // return ('url(#Triangle2)');
          
        });



              //////////////////////////////////////////////////////////////////
              //////temporary text field to find segment generation patterns
              if(nameToggle == true){

                g.append("text")
                 .attr("transform", function(d) {
                   // console.log(arc.centroid(d));
                        return "translate(" + arc.centroid(d) + ")";
                    })
                    .attr("dy", ".35em")
                    // .attr("font-size", )
                    .style("text-anchor", "middle")
                    .text(function(d) {
                        console.log(d.data);

                        // ZZZZZZZZZZZZZZZZZZZZZZZZZZ
                        // return tempObject.ticker();
                        function giveNames(d){
                          var temp = '';
                          d.data.forEach(function(x){
                            temp += "\n" + x;
                          });
                          return temp;
                        }
                        return giveNames(d);

                        
                        // return d.value;
                    });
              }
              ////////////////////////////////////////////////////////////////////////
    
    }//end of makePie()/////////////////////////////////////////

    var pieWidth = parseInt(radius / data.length);

    //reusable function making the circle chart
    function runPie(data, nameToggle){

      $('g').empty();
      //run pie function
      pieWidth = parseInt(radius / data.length);
      // console.log(pieWidth);

      for (var i = 0; i < data.length; i++) {
          // var _cData = multiLevelData[i];
          makePie(data[i], i, nameToggle);
      }
    }
    // runPie(data);

