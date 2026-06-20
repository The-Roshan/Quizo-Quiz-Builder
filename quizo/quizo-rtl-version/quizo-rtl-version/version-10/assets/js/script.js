// ==================================================
// Project Name  :  Quizo
// Version       :  1.0.0
// Author        :  jthemes (https://themeforest.net/user/jthemes)
// ==================================================
$(function(){
  "use strict";
  
  // ========== Form-select-option ========== //
  $('.radio-list input').click(function () {
    $('input:not(:checked)').parent().removeClass("active");
    $('input:checked').parent().addClass("active");
  }); 
  
  
  $('.check-list label').on('change', function(e) {
    e.stopPropagation();
    if($(this).hasClass('active')) {
      $(this).removeClass("active");
    } else if( !$(this).hasClass('active') ) {
      $(this).addClass("active");
    }
  });

    // ================== CountDown function ================
  $('.countdown_timer').each(function(){
    $('[data-countdown]').each(function() {
      var $this = $(this), finalDate = $(this).data('countdown');
      $this.countdown(finalDate, function(event) {
        var $this = $(this).html(event.strftime(''
        + '<span>%M:%S</span>'));
      });
    });
  });
 
  //multi form ===================================
  //DOM elements
  const DOMstrings = {
    stepsBtnClass: 'step',
    stepsBtns: document.querySelectorAll(`.step`),
    stepsBar: document.querySelector('.progress_bar'),
    stepsForm: document.querySelector('.multisteps_form'),
    stepFormPanelClass: 'multisteps_form_panel',
    stepFormPanels: document.querySelectorAll('.multisteps_form_panel'),
    stepPrevBtnClass: 'js-btn-prev',
    stepNextBtnClass: 'js-btn-next'
  };
  
  
  //remove class from a set of items
  const removeClasses = (elemSet, className) => {
    
    elemSet.forEach(elem => {
      
      elem.classList.remove(className);
      
    });
    
  };
  
  //return exect parent node of the element
  const findParent = (elem, parentClass) => {
    
    let currentNode = elem;
    
    while (!currentNode.classList.contains(parentClass)) {
      currentNode = currentNode.parentNode;
    }
    
    return currentNode;
    
  };
  
  //get active button step number
  const getActiveStep = elem => {
    return Array.from(DOMstrings.stepsBtns).indexOf(elem);
  };
  
  //set all steps before clicked (and clicked too) to active
  const setActiveStep = activeStepNum => {
    
    //remove active state from all the state
    removeClasses(DOMstrings.stepsBtns, 'active');
    removeClasses(DOMstrings.stepsBtns, 'current');
    
    //set picked items to active
    DOMstrings.stepsBtns.forEach((elem, index) => {
      if (index <= activeStepNum) {
        elem.classList.add('active');
        $(elem).addClass(index);
        
      }
      
      if (index == activeStepNum) {
        elem.classList.add('current');
      }
      
    });
  };
  
  //get active panel
  const getActivePanel = () => {
    
    let activePanel;
    
    DOMstrings.stepFormPanels.forEach(elem => {
      
      if (elem.classList.contains('active')) {
        
        activePanel = elem;
        
      }
      
    });
    
    return activePanel;
    
  };
  
  //open active panel (and close unactive panels)
  const setActivePanel = activePanelNum => {
    
    const animation = $(DOMstrings.stepFormPanels, 'active').attr("data-animation");
    
    //remove active class from all the panels
    removeClasses(DOMstrings.stepFormPanels, 'active');
    removeClasses(DOMstrings.stepFormPanels, animation);
    removeClasses(DOMstrings.stepFormPanels, 'animate__animated');
    
    //show active panel
    DOMstrings.stepFormPanels.forEach((elem, index) => {
      if (index === activePanelNum) {
        
        elem.classList.add('active');
        // stepFormPanels
        elem.classList.add('animate__animated', animation);
        
        setTimeout(function() {
          removeClasses(DOMstrings.stepFormPanels, 'animate__animated', animation);
        }, 1200);
        
        setFormHeight(elem);
        
      }
    });
    
  };
  
  
  //set form height equal to current panel height
  const formHeight = activePanel => {
    
    const activePanelHeight = activePanel.offsetHeight;
    
    DOMstrings.stepsForm.style.height = `${activePanelHeight}px`;
    
  };
  
  const setFormHeight = () => {
    const activePanel = getActivePanel();
    
    formHeight(activePanel);
  };
  
  //STEPS BAR CLICK FUNCTION
  DOMstrings.stepsBar.addEventListener('click', e => {
    
    //check if click target is a step button
    const eventTarget = e.target;
    
    if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
      return;
    }
    
    //get active button step number
    const activeStep = getActiveStep(eventTarget);
    
    //set all steps before clicked (and clicked too) to active
    // setActiveStep(activeStep);
    
    //open active panel
    // setActivePanel(activeStep);
  });
  
  //PREV/NEXT BTNS CLICK
  DOMstrings.stepsForm.addEventListener('click', e => {
    
    const eventTarget = e.target;
    
    //check if we clicked on `PREV` or NEXT` buttons
    if (!(eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) || eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`))) {
      return;
    }
    
    //find active panel
    const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);
    
    let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);
    
    
    //set active step and active panel onclick
    if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`) ) {
      activePanelNum--;
      
      setActiveStep(activePanelNum);
      setActivePanel(activePanelNum);
      
    } else if(eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)  ) { 
      
      var form = $('#wizard');
      
      var parent_fieldset = $('.multisteps_form_panel.active');
      var next_step = true;
      
      parent_fieldset.find('.required').each( function(){
        next_step = false;
        var form = $('.required');
        form.validate();
        $(this).addClass('invalid is-invalid');
      }); 
      
      if( next_step === true || form.valid() === true ) {
        // $("html, body").animate({
        //     scrollTop: 0
        // }, 600);
        activePanelNum++;
        setActiveStep(activePanelNum);
        setActivePanel(activePanelNum);
      }
      
    } 
    
  });
  
  //SETTING PROPER FORM HEIGHT ONLOAD
  window.addEventListener('load', setFormHeight, true);
  
  //SETTING PROPER FORM HEIGHT ONRESIZE
  window.addEventListener('resize', setFormHeight, true);
  
  
});

// Progress-bar function here
function move() {
  var elem = document.getElementById("myBar");
  var width = parseInt(elem.innerHTML);
  var aim = width + 25;
  var id = setInterval(frame, 25);
  
  function frame() {
    if (width >= aim) {
      clearInterval(id);
    } else if(width >= 100) {
      width=0;
      aim = 25;
      elem.style.width = width + '%';
      elem.innerHTML = width * 1 + '%';
    } else {
      width++;
      elem.style.width = width + '%';
      elem.innerHTML = width * 1 + '%';
    }
  }
}


// ==================================================
// Project Name  :  Quizo
// File          :  JS Base
// Version       :  1.0.0
// Author        :  jthemes (https://themeforest.net/user/jthemes)
// ==================================================
// $(function(){
//   "use strict";
  
//   // ========== Form-select-option ========== //
//   $(".step_1").on('click', function(){
//     $(".step_1").removeClass("active");
//     $(this).addClass("active");
//   });
//   $(".step_2").on('click', function(){
//     $(".step_2").removeClass("active");
//     $(this).addClass("active");
//   });
//   $(".step_3").on('click', function(){
//     $(".step_3").removeClass("active");
//     $(this).addClass("active");
//   });
//   $(".step_4").on('click', function(){
//     $(".step_4").removeClass("active");
//     $(this).addClass("active");
//   });
  
//   // ================== CountDown function ================
//   $('.countdown_timer').each(function(){
//     $('[data-countdown]').each(function() {
//       var $this = $(this), finalDate = $(this).data('countdown');
//       $this.countdown(finalDate, function(event) {
//         var $this = $(this).html(event.strftime(''
//         + '<span>%M:%S</span>'));
//       });
//     });
//   });
  
// });

// var currentTab = 0; // Current tab is set to be the first tab (0)
// showTab(currentTab); // Display the current tab

// function showTab(n) {
//   // This function will display the specified tab of the form ...
//   var x = document.getElementsByClassName("multisteps_form_panel");
//   x[n].style.display = "block";
//   // ... and fix the Previous/Next buttons:
//   if (n == 0) {
//     document.getElementById("prevBtn").style.display = "none";
//   } else {
//     document.getElementById("prevBtn").style.display = "inline";
//   }
//   if (n == (x.length - 1)) {
//     document.getElementById("nextBtn").innerHTML = "Submit";
//   } else {
//     document.getElementById("nextBtn").innerHTML = "Next Question" + ' <span><i class="fas fa-arrow-left rounded-pill"></i></span>';
//   }
//   // ... and run a function that displays the correct step indicator:
//   fixStepIndicator(n)
// }

// function nextPrev(n) {
//   // This function will figure out which tab to display
//   var x = document.getElementsByClassName("multisteps_form_panel");
//   // Exit the function if any field in the current tab is invalid:
//   if (n == 1 && !validateForm()) return false;
//   // Hide the current tab:
//   x[currentTab].style.display = "none";
//   // Increase or decrease the current tab by 1:
//   currentTab = currentTab + n;
//   // if you have reached the end of the form... :
//   if (currentTab >= x.length) {
//     //...the form gets submitted:
//     document.getElementById("wizard").submit();
//     return false;
//   }
//   // Otherwise, display the correct tab:
//   showTab(currentTab);
// }

// function validateForm() {
//   // This function deals with validation of the form fields
//   var x, y, i, valid = true;
//   x = document.getElementsByClassName("multisteps_form_panel");
//   y = x[currentTab].getElementsByTagName("input");
//   // A loop that checks every input field in the current tab:
//   for (i = 0; i < y.length; i++) {
//     // If a field is empty...
//     if (y[i].value == "") {
//       // add an "invalid" class to the field:
//       y[i].className += " invalid";
//       // and set the current valid status to false:
//       valid = false;
//     }
//   }
//   // If the valid status is true, mark the step as finished and valid:
//   if (valid) {
//     document.getElementsByClassName("step")[currentTab].className += " finish";
//   }
//   return valid; // return the valid status
// }

// function fixStepIndicator(n) {
//   // This function removes the "active" class of all steps...
//   var i, x = document.getElementsByClassName("step");
//   for (i = 0; i < x.length; i++) {
//     x[i].className = x[i].className.replace(" active", "");
//   }
//   //... and adds the "active" class to the current step:
//   x[n].className += " active";
// }
// // Progress-bar function here
// function move() {
//   var elem = document.getElementById("myBar");
//   var width = parseInt(elem.innerHTML);
//   var aim = width + 25;
//   var id = setInterval(frame, 25);
  
//   function frame() {
//     if (width >= aim) {
//       clearInterval(id);
//     } else if(width >= 100) {
//       width=0;
//       aim = 25;
//       elem.style.width = width + '%';
//       elem.innerHTML = width * 1 + '%';
//     } else {
//       width++;
//       elem.style.width = width + '%';
//       elem.innerHTML = width * 1 + '%';
//     }
//   }
// }
