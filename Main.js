var $item = $('.carousel .item');
var $wHeight = $(window).height();
$item.eq(0).addClass('active');
$item.height($wHeight);
$item.addClass('full-screen');

$('.carousel img').each(function() {
    var $src = $(this).attr('src');
    var $color = $(this).attr('data-color');
    $(this).parent().css({
        'background-image': 'url(' + $src + ')',
        'background-color': $color
    });
    $(this).remove();
});

$(window).on('resize', function() {
    $wHeight = $(window).height();
    $item.height($wHeight);
});

$('.carousel').carousel({
    interval: 6000,
    pause: "false"
});

$(".collection-box").click(function() {
    var id = $(this).attr('id');
    var drop = "#drop-" + id;
    var dropul = "#drop-ul-" + id + " li";
    var paginationcontainer = "#pagination-container-" + id;
    var datacontainer = "#data-container-" + id;

    $(".cat-drop").each(function() {
        if ($(this).is(":visible")) {
            $(this).slideUp("slow");
        } else {
            $(this).hide();
        }
    });


    var DropDown_IsShowing = $(drop).is(":visible");
    if (DropDown_IsShowing) {
        $(drop).slideUp("slow");
    } else {
        $(drop).slideDown("slow");
        $('html,body').animate({
            scrollTop: $(drop).offset().top
        });
    }
});

$(".close-cat").click(function() {
    $(".cat-drop").slideUp("slow");
    $('html,body').animate({
        scrollTop: $(".collection-grey-area").offset().top
    });
});

$(document).ready(function() {
    var collCat = getUrlParameter('collection');

    if (collCat != null || collCat != undefined) {
        $('html,body').animate({
            scrollTop: $("#morecollections").offset().top
        });
        var coltodrop = "#drop-" + $("." + collCat).attr('id');
        $(coltodrop).slideDown("slow");
        $('html,body').animate({
            scrollTop: $(coltodrop).offset().top
        });
    };

    $host = $('[mag-thumb="inner"]');
    $host.mag();
});


$('.thumbnail-image-changer').hide();
$('#main-left-image' || '.thumbnail-image-changer').mouseover(function() {
    $('.thumbnail-image-changer').show('fast');
});


//$('a[href*=#]:not([href=#])').click(function () {
//    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '')
//        || location.hostname === this.hostname) {

//        var target = $(this.hash);
//        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//        if (target.length) {
//            $('html,body').animate({
//                scrollTop: target.offset().top
//            }, 1000);
//            return false;
//        }
//    }
//});

/* Search - Colour Selector */
jQuery(function($) {
    $("ul.colours li").click(function() {
        if ($(this).find('img').hasClass('border')) {
            $(this).find('img').removeClass('border');
            $(this).find('input').removeAttr('checked', 'checked');
        } else {
            $(this).find('img').addClass('border');
            $(this).find('input').attr('checked', 'checked');
        }
    });
});

$('#clear').click(function() {
    $('.style-checkbox').each(function() {
        $('.style-checkbox').prop('checked', false);
    });
});


$('#search-clear-all').click(function() {
    //reset all search criteria
    $("#search-sectors").val("all");

    $('ul.colours li').each(function() {
        $(this).find('img').removeClass('border');
        $(this).find('input').removeAttr('checked', 'checked');
    });

    $('.style-checkbox').each(function() {
        $('.style-checkbox').prop('checked', false);
    });

    $("#search-type").val("0");

    $("#search-end-use").val("0");

    $("#search-fr-inherant").val("0");

    $("#search-fr-treatable").val("0");

});

$(document).ready(function() {
    $('#main').find('.first').appendTo('#main');
    $('#main').find('.second').appendTo('#main');



    $("#list li img").eq(2).removeClass('opacity-low');
    $('#down').click(function() {
        $("#list li").eq(0).before($("#list li").last());
        $("#list li img").eq(3).addClass('opacity-low');
        $("#list li img").eq(2).removeClass('opacity-low');
        $("#main li").eq(0).before($("#main li").last());
        var col = $("#list li img").eq(2).attr("alt");
        $("#prod-colour").text(col);
    });

    $('#up').click(function() {
        $("#list li").last().after($("#list li").eq(0));
        $("#list li img").eq(1).addClass('opacity-low');
        $("#list li img").eq(2).removeClass('opacity-low');
        $("#main li").last().after($("#main li").eq(0));
        var col = $("#list li img").eq(2).attr("alt");
        $("#prod-colour").text(col);
    });
});

$('#add-to-swatch').click(function() {
    var _prodId = $("#image-main").attr("data-id");

    $.ajax({
        url: '/umbraco/Surface/SwatchBookSurface/AddToSwatchBook',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            prodId: _prodId
        }),
        success: function() {
            location.reload();
        }
    });
});

$(document).on('click', '.remove-swatch-icon', function() {
    var _prodId = $(this).attr("data-id");

    $.ajax({
        url: '/umbraco/Surface/SwatchBookSurface/RemoveFromSwatchBook',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            prodId: _prodId
        }),
        success: function() {
            location.reload();
        }
    });
});


//request-swatch-book
$("#request-watch-book").click(function() {
    $("#swatch-book-options").slideToggle("slow", function() {

    });
});

$("input[name='swatch-request']").change(function() {
    if ($(this).val() === 'virtual') {
        $("#order-virtual").show();
        $("#order-physical").hide();
    }

    if ($(this).val() === 'physical') {
        $("#order-virtual").hide();
        $("#order-physical").show();
    }
});

$("#order-virtual").click(function() {
    $("#swatch-book-virtual").slideToggle("slow", function() {

    });
});

$("#order-physical").click(function() {
    $("#swatch-book-physical").slideToggle("slow", function() {

    });
});

//image-thumb
$(".image-thumb").click(function() {

    $('.image-thumb').removeClass('active');
    $(this).addClass('active');
    //swap images and info
    var clikedDataId = $(this).attr('data-id');
    var clikedImage = $(this).attr('src');

    var clikedColour = $(this).attr('data-colourway');
    var clikedComps = $(this).attr('data-compositions');


    $("#prod-colourway").text(clikedColour);
    $("#prod-col").text(clikedColour);
    var clickedCompsReplaced = clikedComps.replace('&', '<br><br>');
    $("#fabric-comps").html("<h3 id='fabric-comps'>" + clickedCompsReplaced + "</h3>");

    $('#image-main').attr("src", clikedImage.replace("height=116", "height=555").replace("width=116", "width=555"));
    $('#image-main-zoom').attr("src", clikedImage.replace("height=116", "height=1110").replace("width=116", "width=1110"));
    $('#image-main').attr("data-id", clikedDataId);


});

$(document).ready(function() {
    var colourway = getUrlParameter('cw');
    if (colourway !== "") {
        //image-thumb
        $(".image-thumb").each(function(index) {
            var imgcolourway = $(this).attr('data-colourway');
            var imgComps = $(this).attr('data-compositions');
            var dataId = $(this).attr('data-id');

            if (imgcolourway === colourway) {
                var chosenImageSrc = $(this).attr('src');
                $("#prod-colourway").text(imgcolourway);
                $("#prod-col").text(imgcolourway);
                $("#fabric-comps").text(imgComps);
                $('.image-thumb').removeClass('active');
                $(this).addClass('active');
                $('#image-main').attr("data-id", dataId);
                $('#image-main').attr("src", chosenImageSrc.replace("height=116", "height=555").replace("width=116", "width=555"));
                $('#image-main-zoom').attr("src", chosenImageSrc.replace("height=116", "height=1110").replace("width=116", "width=1110"));
            }
        });
    }
});



$(".mr-open").click(function() {
    var clickId = $(this).attr('id');
    $(this).hide();
    $("#mr-" + clickId).show();
});

$(".close-mr").click(function() {
    $(".slider-more-description").hide();
    $(".slider-more-information").show();
});



$(document).ready(function() {
    var x = location.hash;
    if (x === "#swatch-book-physical") {
        $("#swatch-no-items").hide();
        $("#request-watch-book").hide();
        //load physical swatch book order
        $("#swatch-book-physical").slideToggle("slow", function() {

        });
    }
});

$(document).ready(function() {
    $('#searchbutton').click(function() {
        $('#searchmobile').fadeToggle();
        $('#searchmobile').css('display', 'inline');
    });
});

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};