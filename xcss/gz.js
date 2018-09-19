function install(id,obj){
  var divs = obj.getElementsByTagName("a");
  var url="workflow://import-workflow/?url=https%3A%2F%2Fworkflow.is%2Fworkflows%2F"+id+".wflow&name="+encodeURI(divs[0].innerHTML)
  window.open(url)
}