function install(id,obj){
  //var divs = obj.getElementsByTagName("a");
  //var url="workflow://import-workflow/?url=https%3A%2F%2Fworkflow.is%2Fworkflows%2F"+id+".wflow&name="+encodeURI(divs[0].innerHTML)
  var url="https://workflow.is/workflows/"+id
  window.open(url)
  if(id=="0a228fe5a0204f9196e0dfc10058777e"){
	  alert("更新器正在更新中···\n请稍后添加")
  }else{
	var url="https://workflow.is/workflows/"+id
    window.open(url)
  }
  
 // var ua = navigator.userAgent.toLowerCase();
  //console.log(ua)
}
