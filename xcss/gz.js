function install(id,obj){
  //var divs = obj.getElementsByTagName("a");
  //var url="workflow://import-workflow/?url=https%3A%2F%2Fworkflow.is%2Fworkflows%2F"+id+".wflow&name="+encodeURI(divs[0].innerHTML)
  //var url="https://workflow.is/workflows/"+id
  //window.open(url)
  if(id=="1"){
	 var url="workflow://import-workflow/?url=https%3A%2F%2Fgitee.com%2Fyao07%2Fupdate_device%2Fraw%2Fmaster%2Fxiaoliao3.3&name=%E5%B0%8F%E8%89%AF%20-%20%E6%9B%B4%E6%96%B0%E5%99%A8%203.3"
    window.open(url)
  }else{
	var url="https://workflow.is/workflows/"+id
    window.open(url)
  }
  
 // var ua = navigator.userAgent.toLowerCase();
  //console.log(ua)
}
