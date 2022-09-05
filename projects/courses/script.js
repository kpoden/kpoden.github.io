$( document ).ready(function() {    
    $('li').click(function (event) {
        if($(this).children().find('li').length) {
            
            $(this).children().find('li').slideToggle(100);
            $('.arrow__down').toggleClass('_up');
        }
    });
}); 