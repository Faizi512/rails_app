import "./parsley"
import "./rangeslider.min"

$( document ).ready(function() {
  


var isEmail =false
var isPhone =false
var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var formValidation = {};
validate();

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  $('input[type="range"]').rangeslider({
    polyfill : false,
    onInit : function() {
      this.output = $( '<div class="range-output" />' ).appendTo( this.$range.find(".rangeslider__handle") ).html( "£"+numberWithCommas(this.$element.val()) );
    },
    onSlide : function( position, value ) {
      if (value >= 100000) {
        this.output.html( "£"+numberWithCommas(value)+"+" );
      }else{
        this.output.html( "£"+numberWithCommas(value) );
      }
    }
  });

  $(".btn-next").click(function(){
    nextStep(1)
  });

  $( "#btn-submit" ).click(function() {
    if (anOtherValidate() == true && isEmail == true && isPhone == true) {
      debugger
      $('#btn-submit').prop('disabled', true);
      postData();
    }
  });

  $( ".what-bring" ).change(function() {
    if ($("input[name='what-bring']:checked").val() !== "") {
      nextStep(1);
    }
  });

  $( ".interest-paid-type" ).change(function() {
    if ($("input[name='interest-paid-type']:checked").val() !== "") {
      nextStep(1);
    }
  });

  window.onload = function onPageLoad() {
    $("#clickid").val(getUrlParameter("lid")  || "");
  }

  function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    fixStepIndicator(n)
  }

  function backStep(n){
    if (currentTab > 0) {
      $('.nextStep').prop('disabled', false);
      var x = document.getElementsByClassName("tab");
      x[currentTab].style.display = "none";
      currentTab = currentTab + n;
      showTab(currentTab);
    }
  }

  function nextStep(n) {
    $('#dealform').parsley().whenValidate({
      group: 'block-' + currentTab
    }).done(function() {
      var x = document.getElementsByClassName("tab");
      x[currentTab].style.display = "none";
      // Increase or decrease the current tab by 1:
      currentTab = currentTab + n;
      if (currentTab >= x.length) {
        if (anOtherValidate() == true){
          $('.nextStep').prop('disabled', true);
          postData()
        }else{
          $('#dealform').parsley().validate()
        }
        return true
      }
      showTab(currentTab);
    })
  }

  function anOtherValidate(){
    var selectedWhatBring = $("input[name='what-bring']:checked"). val();
    var selectedInterstPaidType = $("input[name='interest-paid-type']:checked").val();

    if (selectedWhatBring == ""){
      var x = document.getElementsByClassName("tab");
      x[0].style.display = "block";
      x[1].style.display = "none";
      x[2].style.display = "none";
      x[3].style.display = "none";
      x[4].style.display = "none";
      currentTab = 0
      $('#dealform').parsley().validate()
      return false
    }else if(selectedInterstPaidType == ""){
      var x = document.getElementsByClassName("tab");
      x[1].style.display = "block";
      x[0].style.display = "none";
      x[2].style.display = "none";
      x[3].style.display = "none";
      x[4].style.display = "none";
      currentTab = 1
      $('#dealform').parsley().validate()
      return false
    }else if($("input[name='invest-amount']").val() == ""){
      var x = document.getElementsByClassName("tab");
      x[2].style.display = "block";
      x[0].style.display = "none";
      x[1].style.display = "none";
      x[3].style.display = "none";
      x[4].style.display = "none";
      currentTab = 2
      $('#dealform').parsley().validate()
      return false
    }else if(document.getElementsByClassName('first_name')[0].value.length < 2
      || document.getElementsByClassName('last_name')[0].value.length < 2){
      var x = document.getElementsByClassName("tab");
      x[3].style.display = "block";
      x[0].style.display = "none";
      x[1].style.display = "none";
      x[2].style.display = "none";
      x[4].style.display = "none";
      currentTab = 3
      $('#dealform').parsley().validate()
      return false
    }else if(document.getElementsByClassName('email')[0].value.length < 4
      || document.getElementsByClassName('phone')[0].value.length < 10){
      var x = document.getElementsByClassName("tab");
      x[4].style.display = "block";
      x[0].style.display = "none";
      x[1].style.display = "none";
      x[2].style.display = "none";
      x[3].style.display = "none";
      currentTab = 4
      $('#dealform').parsley().validate()
      return false
    }
    return true
  }
  function validate(){
    formValidation = $('#dealform').parsley({
      trigger: "focusout",
      errorClass: 'error',
      successClass: 'valid',
      errorsWrapper: '<div class="parsley-error-list"></div>',
      errorTemplate: '<label class="error"></label>',
      errorsContainer (field) {
        if(field.$element.hasClass('approve')){
          return $('.error-checkbox')
        }
        if(field.$element.hasClass('phone')){
          return $('.phoneerror')
        }
        return field.$element.parent()
      },
    })
      validatePhone()
    validateEmail()
  }

   function validatePhone(){
      window.Parsley.addValidator('validphone', {
        validateString: function(value){
          var xhr = $.ajax('https://go.webformsubmit.com/dukeleads/restapi/v1.2/validate/mobile?key=50f64816a3eda24ab9ecf6c265cae858&value='+$('.phone').val());
          return xhr.then(function(json) {
            if (json.Result == "Valid") {
              isPhone = true
              return true
            }else{
              return $.Deferred().reject("Please Enter Valid Phone Number");
            }
          })
        },
        messages: {
           en: 'Please Enter Valid Phone Number',
        }
      });
    }

  function validateEmail(){
    window.Parsley.addValidator('validemail', {
      validateString: function(value){
        var xhr = $.ajax('https://go.webformsubmit.com/dukeleads/restapi/v1.2/validate/email?key=50f64816a3eda24ab9ecf6c265cae858&value='+$('.email').val());
        return xhr.then(function(json) {
          if (json.Result == "Valid") {
            isEmail = true
            return true
          }else if(json.status == "Invalid"){
            return $.Deferred().reject("Please Enter Valid Email Address");
          }else{
            isEmail = true
            return true
          }
        }).catch(function(e) {
          if (e == "Please Enter Valid Email Address") {
            return $.Deferred().reject("Please Enter Valid Email Address")
          }else{
            isEmail = true
            return true
          }
        });
      },
      messages: {
         en: 'Please Enter Valid Email Address',
      }
    });
  }

  function fixStepIndicator(num) {
    var progress = document.getElementById('progressBar');
    if(num >= 0) {
      progress.style.width = (num*20)+"%";
      progress.innerText = "Progress " + (num*20) + "%";
      if( num ==  0){
        progress.innerText = '';
      }
    }
  }

  function getData() {
    var e = JSON.parse(localStorage.getItem("parameters"))
    return {
      firstname: $("#first_name").val(),
      lastname: $("#last_name").val(),
      email: $("#email").val(),
      phone1: $("#phone").val(),
      interest_paid_type:$("input[name='interest-paid-type']:checked"). val(),
      investing_amount: $("input[name='invest-amount']").val(),
      what_bring: $("input[name='what-bring']:checked"). val(),
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
      parameters: e
    };
  }
  function postData() {
    var e = getData();
    e['before_send'] = JSON.stringify(getData());
    console.log(e)
    $.ajax({
      type: "POST",
      url: "",
      data: e,
      success: function(e) {
        console.log(e);
        window.location = "thank-you.html";
      },
      dataType: "json"
    })
  }

  function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
    }
  }

  function getFormattedCurrentDate() {
    var date = new Date();
    var day = addZero(date.getDate());
    var monthIndex = addZero(date.getMonth() + 1);
    var year = date.getFullYear();
    var min = addZero(date.getMinutes());
    var hr = addZero(date.getHours());
    var ss = addZero(date.getSeconds());

    return day + '/' + monthIndex + '/' + year + ' ' + hr + ':' + min + ':' + ss;
  }

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

});