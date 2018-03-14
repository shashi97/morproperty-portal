
$(document).ready(function(){
    
    $(".toggle-horizontal-mob").height( $(window).height() - 75 );
    
    
    $(window).resize(function () {
        $(".toggle-horizontal-mob").height( $(window).height() -75 );
       

});
    
    $(".toggle-horizontal-mob").hide();
    
    $(".navbar .horizontal").click(function () {
        $(".toggle-horizontal-mob").animate ({
            left: 'toggle',
            opacity: 'toggle'
        })

    });
    
    
    
    
    $(".map .map-project-mob .details i").click(function() {
        $(".map .map-project-mob").hide(100)
    });
    

});