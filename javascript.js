$(function(){
  $("#slider").slider({
  	min:3,
  	max:30,
  	slide:function(event,ui){
      $("#circle").height(ui.value);
      $("#circle").width(ui.value);
  	}
  });
//declare variables
var paint = false;  //paintingerasing or not
var paint_erase= "paint";   //painting or erasing
var canvas = document.getElementById("paint");   //get the canvas and context
var ctx = canvas.getContext("2d")
var container = $("#container");   //get the canvas container;
var mouse = {x:0, y:0};   //mouse position

   //onload load saved work from localstorage
   if(localStorage.getItem("imgCanvas") != null){
   var img = new Image();
   img.onload = function(){
      ctx.drawImage(img,0,0);
      };

      img.src = localStorage.getItem("imgCanvas");

   }

   //set drawing parameters (linewidth, lineJoin, lineCap)
 ctx.lineJoin = "round";
 ctx.lineCap = "round";

 container.mousedown(function(e){
    paint = true;
    ctx.beginPath();
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    ctx.moveTo(mouse.x,mouse.y);
 });  //click inside container

   
   //move the mouse while holding mouse key
    container.mousemove(function(e){
    
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
   if(paint == true){
   	  if(paint_erase == "paint"){
   	  	//get color
   	  	ctx.strokeStyle = $("#paintColor").val();
   	  }else{
   	  	//white color, if we are erasing
   	  	ctx.strokeStyle = "white";
   	  }
   	  
   	  ctx.lineTo(mouse.x,mouse.y);
   	  ctx.stroke();
   }
 }); 

   //mouse up->we are not paintingerasing anymore
   container.mouseup(function(){
      paint = false;
   });

   //if we leave the container we are not paintingerasing anymore
    container.mouseleave(function(){
      paint = false;
   });

   //click on the reset button

    $("#reset").click(function(){
       ctx.clearRect(0,0,canvas.width,canvas.height);
       paint_erase = "paint";
       $("#erase").removeClass("eraseMode");
    });

   //click on the save button
     $("#save").click(function(){
        if(typeof(localStorage) != null){
        	localStorage.setItem("imgCanvas",
        		canvas.toDataURL());
        	
        }else{
        	window.alert("Your browser does not support local storage");
        }
     });
   //click on the erase button

   $("#erase").click(function(){
   	 if(paint_erase == "paint"){
   	 	paint_erase = "erase";
   	 }else{
   	 	paint_erase = "paint";
   	 }

   	   $(this).toggleClass("eraseMode");
   })

   //change color input
      $("#paintColor").change(function(){
         $("#circle").css("background-color",
         	$(this).val());
      });
   //change linewidth using slider

     $("#slider").slider({
  	min:3,
  	max:30,
  	slide:function(event,ui){
      $("#circle").height(ui.value);
      $("#circle").width(ui.value);
      ctx.lineWidth = ui.value;
  	}
  });

   //functions

});

