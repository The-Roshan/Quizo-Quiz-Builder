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

// Video modal start ================
$(document).ready(function() {
  // Gets the video src from the data-src on each button
  var $videoSrc;
  $('.video-btn').click(function() {
    $videoSrc = $(this).data( "src" );
  });
  console.log($videoSrc);
  // when the modal is opened autoplay it
  $('#myModal').on('shown.bs.modal', function (e) {
    // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get
    $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
  })
  // stop playing the youtube video when I close the modal
  $('#myModal').on('hide.bs.modal', function (e) {
    // a poor man's stop video
    $("#video").attr('src',$videoSrc);
  })
  // document ready
});
