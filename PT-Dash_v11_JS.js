function doGet(e) {
  

  
  //Create a new HTML Template.  See the other Index.html file
  var htmlTemplate = HtmlService.createTemplateFromFile('Index');
  //Open the sheet.  Same ID as the main sheet.
  var mySheet      = SpreadsheetApp.openById("1iQ2KrINatAdjKhZ_uJrMMZmGh6Q8bpl8H70kO2V4ANs");
  var myOtherSheet = SpreadsheetApp.openById("10fWCk0oG01iCwFptCFFipljhdBMTFzYLVhX5BBHlZ6M");
  
  //Store the data from that sheet into my HTML Template
  var clientInfo   = mySheet.getDataRange().getValues();
  var activForLife = myOtherSheet.getDataRange().getValues();
  //////////////////////////////////////////////////

  /////////////////////////////////////////////////
  var searchColumnID = 1;
  
  htmlTemplate.headings = clientInfo[0]; 
  
  //set sentinel variables
  htmlTemplate.message = false;
  htmlTemplate.data     = false;
  
  var clientID = parseInt( e.parameter.id);
  htmlTemplate.clientID = clientID;
  
  //Active for life responses
  if ( activForLife){
    
    htmlTemplate.dataActivForLife = [];
    
    htmlTemplate.myActivData = {q1:"", q2:"", a1:"", a2:""};
    
    //htmlTemplate.myActivData.rows = activForLife.length;

    for(var i = 0; i < activForLife.length; i++){
      if (activForLife[i][1] == clientID ) {
        htmlTemplate.myActivData.q1 = activForLife[0][2];
        htmlTemplate.myActivData.a1 = activForLife[i][2];
        htmlTemplate.myActivData.q2 = activForLife[0][3];
        htmlTemplate.myActivData.a2 = activForLife[i][3];
      }
    }
  }
    
  var fancyDate = "";
  var tmpDateObj;
  
  //Graph #1
  if ( clientID > 0){
    
    htmlTemplate.data = [];
    
    htmlTemplate.myChartDataOne = [["date", "answer"]];
    for(var i = 0; i < clientInfo.length; i++){
      if (clientInfo[i][searchColumnID] == e.parameter.id ) {
        htmlTemplate.data.push(clientInfo[i]);
        
        tmpDateObj = new Date(clientInfo[i][2]);
        fancyDate = (tmpDateObj.getMonth() + 1) + '/' + tmpDateObj.getDate() + '/' +  tmpDateObj.getFullYear();
        
        htmlTemplate.myChartDataOne.push(
          [
            fancyDate,
            clientInfo[i][5]
          ]);
      
      }
    }
    
    if ( htmlTemplate.data.length < 1) {
      //We didn't find a match.  Set it to Null.
      htmlTemplate.message = "Client ID " +  e.parameter.id + " Not Found";   
    } else {
      htmlTemplate.myChartDataOne = JSON.stringify(htmlTemplate.myChartDataOne);
    }
  
  }
  ////////////////////////////////////////////////////////////////////////////
  //Graph #2
  if ( clientID > 0){
    
    htmlTemplate.data = [];
    
    htmlTemplate.myChartDataTwo = [["date", "answer"]];
    
    for(var i = 0; i < clientInfo.length; i++){
      if (clientInfo[i][searchColumnID] == e.parameter.id ) {
        htmlTemplate.data.push(clientInfo[i]);
        
         tmpDateObj = new Date(clientInfo[i][2]);
        fancyDate = (tmpDateObj.getMonth() + 1) + '/' + tmpDateObj.getDate() + '/' +  tmpDateObj.getFullYear();
        
        htmlTemplate.myChartDataTwo.push(
          [
            fancyDate,
            clientInfo[i][6]
          ]);
      
      }
    }
    
    if ( htmlTemplate.data.length < 1) {
      //We didn't find a match.  Set it to Null.
      htmlTemplate.message = "Client ID " +  e.parameter.id + " Not Found";   
    } else {
      htmlTemplate.myChartDataTwo = JSON.stringify(htmlTemplate.myChartDataTwo);
    }
  
  } 
  //////////////////////////////////////////////////////////////////////////////
  //Store the html content into a new variable after Evaluating the htmlTemplate
  var html = htmlTemplate.evaluate();
  
  return html;
}