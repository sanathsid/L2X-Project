/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIML = "/api/iml";
var jpdbIRL = "/api/irl";
var schoolDB = "School-DB";
var studentRel = "Student-Rel";
var connToken = "90938159|-31949272984363193|90955161";

$("#rollno").focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem("recno",lvData.rec_no);
}

function getRollnoAsJsonObj(){
    var rollno = $("#rollno").val();
    var jsonstr = { 
              studroll : rollno
    };
    return JSON.stringify(jsonstr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#rollno").val(record.rollno);
    $("#fullname").val(record.fullname);
    $("#classy").val(record.class);
    $("#dob").val(record.address);
    $("#enrolldate").val(record.dob);
    $("#address").val(record.doe);
    
}

function resetData(){
    $("#rollno").val("");
    $("#fullname").val("");
    $("#classy").val("");
    $("#dob").val("");
    $("#enrolldate").val("");
    $("#address").val("");
    $("#rollno").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#update").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#rollno").focus();
}

function saveData(){
    var jsonobj = validateData();
    if(jsonobj === " "){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonobj,schoolDB, studentRel);
    jQuery.ajaxSetup({async : false});
    var resobj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async : true});
    resetData();
    $("#rollno").focus(); 
}

function validateData(){
    
    var  fullname,rollno,classdiv,dob,doe,address;
    
    rollno = $("#rollno").val();
    fullname =  $("#fullname").val();
    classdiv = $("#classy").val();
    dob = $("#dob").val();
    doe = $("#enrolldate").val();
    address = $("#address").val();
    
    if(rollno === " "){
        alert("Roll Number is missing");
        $("#rollno").focus();
        return " ";
    }
    
    if(fullname === " "){
        alert("Student's name is missing");
        $("#fullname").focus();
        return " ";
    }
    
    if(classdiv === " "){
        alert("Class is missing");
        $("#classy").focus();
        return " ";
    }
    
    if(dob === " "){
        alert("Date of Birth is missing");
        $("#dob").focus();
        return " ";
    }
    
    if(doe === " "){
        alert("Date of Enrollnment is missing");
        $("#enrolldate").focus();
        return " ";
    }
       
    if(address === " "){
        alert("Address is missing");
        $("#address").focus();
        return " ";
    }
    
    var jsonobj = {
        studroll : rollno,
        studname : fullname,
        studclass : classdiv,
        studdob : dob,
        studdoe : doe,
        studaddress : address
    };
        return JSON.stringify(jsonobj);
 }
    
    function updateData(){
        $("#update").prop("disabled",true);
        jsonUpdate = validateData();
        var updateRequest = createUPDATERecordRequest(connToken,jsonUpdate,schoolDB, studentRel,localStorage.getItem("recno"));        
         jQuery.ajaxSetup({async : false});         
         var resjsonobj = executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
         jQuery.ajaxSetup({async : true});
         console.log(resjsonobj);
         resetForm();
         $("#rollno").focus(); 
    }
    
    function getStud(){
        var studrollJsonObj = getRollnoAsJsonObj();
        var getRequest = createGet_By_KeyRequest(connToken,schoolDB,studentRel,studrollJsonObj);
        jQuery.ajaxSetup({async : false});
        var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);   
        jQuery.ajaxSetup({async : true});
        if(resJsonObj.status === 400){
            $("#save").prop("disabled",false);
            $("#reset").prop("disabled",false);
            $("#rollno").focus();
        }
        else if(resJsonObj.status === 200){
            $("#rollno").prop("disabled",true);
            fillData(resJsonObj); 
            $("#update").prop("disabled",false);
            $("#reset").prop("disabled",false);
            $("#rollno").focus();
        }
    }
    
    
    
    