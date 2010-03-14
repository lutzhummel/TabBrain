
var tabStats = chrome.extension.getBackgroundPage().getTabStats();
var domainStats = chrome.extension.getBackgroundPage().getDomainStats();


function render() {
   var collectedTabs = tabStats.getCollectedTabs();
   var coList = createList(collectedTabs);
   var closedTabs = tabStats.getClosedTabs();
   var clList = createList(closedTabs);

   coList.forEach(function(item) {
      $('.list1').append(item);
   });

   clList.forEach(function(item) {
      $('.list2').append(item);
   });

   $('.listitem').click(function() {
      $("input[value="+this.id+"]").attr('checked',!($("input[value="+this.id+"]").attr('checked')));
   });

}

function createList(data) {
   var list = new Array();
   data.forEach(function(tab) {

      if(tab != null) {
         var thumbSize = "200px"
         if(tab.favIconUrl == undefined || tab.favIconUrl == ""){
            tab.favIconUrl = "icon.png";
         }

         if(tab.thumbnail == undefined){
            tab.thumbnail = "icon.png";
            thumbSize = "100px";
         }

         var item = "<li class='listitem' id='" + tab.tabID + "'><a class='screenshot' rel='"+tab.thumbnail+"' rev='"+thumbSize+"'><div id='shadow-container'><img src='" + tab.favIconUrl + "' alt='favicon' width='20px'/><input class='checkitem' type='checkbox' name='" + tab.url + "' value='" + tab.tabID + "'>" + tab.title + "</div></a></li>";

         list.push(item);
      }
   });    

   return list;
}

function cleanUp() {
   $(':checked').each(function(x) {
      chrome.tabs.remove(parseInt(this.value));
      $('#'+this.value).hide('slow');
   });
}
