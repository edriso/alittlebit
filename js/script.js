/*global $, jQuery, alert, console*/
$(function () {
    'use strict';

// read more
    $('#feed .post-container .post-text, #blog .post-container .post-text').each(function () {
        if ((this).innerText.length >= 280) {
            var $copy = $(this).clone(),
                $postTxt = $copy.text().slice(0, 280).trim(),
                $link = "<a class='read-more'> More...</a>";
            $(this).hide().parents('.post-container').find('.post-text-mini').show().append($postTxt).append($link);
        }
    });
    
// post focus
    $('.post img.post-img, .post-text-mini .read-more').on("click", function () {
        var $mainPost = $(this).parents('.post'),
            $showPost = $mainPost.clone();
        $showPost.find('.post-text-mini').remove();
        $showPost.find('.post-text').fadeIn();
        $("#show-post-modal").find('.modal-content').children().remove();
        $("#show-post-modal").find('.modal-content').append($showPost);
        $("#show-post-modal").modal('show');
        $('#show-post-modal .react .icon-heart').on("click", function () {
            $(this).toggleClass('icon-love');
            $mainPost.find('.react .icon-heart').toggleClass('icon-love');
        });
        $('#show-post-modal .react .icon-save').on("click", function () {
            $(this).toggleClass('icon-saved');
            $mainPost.find('.react .icon-save').toggleClass('icon-saved');
        });
    });
    
// remove the post after closing the post modal
    $("#show-post-modal").on("click", function () {
        setTimeout(function () {
            if (!$("#show-post-modal").hasClass('show')) {
                $("#show-post-modal").find('.modal-content').children().remove();
            }
        }, 200);
    });

// post react
    $('.post .react .icon-heart').on("click", function () {
        $(this).toggleClass('icon-love');
    });
    $('.post .react .icon-save').on("click", function () {
        $(this).toggleClass('icon-saved');
    });
    
// Settings add a website
    $('#settings #add-link').on('click', function () {
        var $newLink = '<div class="form-group row col-12"><select class="col-4 col-md-3 col-lg-2 form-control"><option value="default" selected>Website</option><option value="facebook">Facebook</option><option value="tumblr">Tumblr</option><option value="twitter">Twitter</option><option value="instagram">Instagram</option><option value="skype">Skype</option><option value="youtube">Youtube</option><option value="vimeo">Vimeo</option><option value="pinterest">Pinterest</option><option value="linkedin">Linkedin</option><option value="github">Github</option><option value="dribble">Dribble</option></select><input type="text" class="col-8 col-md-9 col-lg-10 form-control" maxlength="100" placeholder="https://www.website.com/username"></div>';
        if ($('#settings #contacts-links > div.form-group').length < 10) {
            $('#settings #contacts-links').append($newLink);
        }
    });

// Modal remove user (settings block-follow list)
    $('#settings .user-container .icon').on('click', function () {
        $(this).parents('.modal-content').find('.modal-footer .btn[data-value=save]').addClass('btn-success');
        $(this).parents('.user-container').hide();
    });
    
// Modal remove user (delete comment)
    var goDelete = function () {
        $('#post-comments-modal .delete-comment li span').on('click', function () {
            var $selected = $(this),
                $commentContainer = $selected.parents('.comment-container');
            if ($selected.data('value') === "yes") {
                $commentContainer.fadeOut();
            } else if ($selected.data('value') === "no") {
                $commentContainer.find('.delete-comment').remove();
                $commentContainer.children().fadeIn();
            }
        });
    };
    
    $('#post-comments-modal .comment-container .dropdown-menu li:first-child').on('click', function () {
        var $thisComment = $(this).parent('.comment-container').clone(),
            $goDelete = '<div class="delete-comment"><ul class="row col-12"><li class="col-8"><h6>Are you sure?</h6></li><li class="col-2"><span data-value="yes">Yes</span></li><li class="col-2"><span data-value="no">No</span></li></ul></div>';
        $(this).parents('.comment-container').children().hide();
        $(this).parents('.comment-container').append($goDelete);
        goDelete();
    });
    
// Read All Notifications
    $('#notifications-modal .modal-footer .btn').on('click', function () {
        $('#notifications-modal .modal-body ul, .notifications-number').hide();
        $(this).hide();
    });
    
// Masonry
    var $feedMasonry = $('#feed #global-posts').masonry({itemSelector: '.post-container', percentPosition: true, gutter: 15}),
        $savedMasonry = $('#feed.saved #global-posts').masonry({itemSelector: '.post-container', percentPosition: true, gutter: 15}),
        $myMasonry = $('#blog #my-posts').masonry({itemSelector: '.post-container', percentPosition: true, gutter: 15});
    
// feed Filter
    $('#feed #posts-show-type li').on('click', function () {
        var $selected = $(this);
        if ($selected.hasClass("active")) {
            return;
        } else if ($selected.data('value') === "global") {
            $('#feed #global-posts .post-container').fadeIn();
            $feedMasonry.masonry('destroy');
            $feedMasonry.masonry({percentPosition: true, gutter: 15});
        } else if ($selected.data('value') === "following") {
            $('#feed #global-posts .post-container').hide();
            $('#feed #global-posts .post-container.following').fadeIn();
            $feedMasonry.masonry('destroy');
            $('#feed #global-posts').masonry({itemSelector: '.post-container.following', percentPosition: true, gutter: 15});
        }
        $selected.addClass("active").siblings().removeClass("active");
    });

// make star active badge invisible
    ( $('#blog .star-badge').data('value') >= 30 ) ? $('#blog .star-badge').removeClass('d-none') : $('#blog .star-badge').addClass('d-none');

// follow me blog and search page
    $('#blog #btn-follow, #search .btn-follow').on('click', function () {
        var $btn = $(this);
        $btn.toggleClass('following');
        $btn.hasClass('following') ? $btn.addClass('btn-success').find('.btn-text').text("Following") : $btn.removeClass('btn-success').find('.btn-text').text("Follow");
    });
    
// Change user-img, cover-photo in blog
    $('#blog .image-editor').cropit();

    $('#blog #change-user-img-modal form, #blog #change-cover-img-modal form').submit(function () {
        // Move cropped image data to hidden input
        var imageData = $('#blog .image-editor').cropit('export');
        $('#blog .hidden-image-data').val(imageData);

        // Print HTTP request params
        var formValue = $(this).serialize();
        // $('#result-data').text(formValue);

        // Prevent the form from actually submitting
        return false;
    });
    
// Calendar
    var $myCalendar = $('#calendar #calendar-container');
    $myCalendar.simpleCalendar();
    $myCalendar.find('header a.btn-prev').addClass('icon-angle-left').html('');
    $myCalendar.find('header a.btn-next').addClass('icon-angle-right').html('');
    $myCalendar.find('a.btn, a.day').removeAttr('href');
    
// Calendar happy and sad days
    var dayStatus = function (day, status) {
        if (status == 1) {
            $myCalendar.find(".day[data-value='" + day + "']").addClass('happy');
        } else {
            $myCalendar.find(".day[data-value='" + day + "']").addClass('sad');
        }
    };
    
// Calendar Change Month
    var changeMonth = function () {
        var $month = $myCalendar.find('.month span'),
            $year = $myCalendar.find('.month small');
        $month.attr('data-value', $month.html());
        $year.attr('data-value', $year.html());
        
        $myCalendar.find('.day').each(function () {
            $(this).attr({
                'data-value': $(this).html() + ' ' + $month.attr('data-value') + $year.attr('data-value')
            });
        });
        $myCalendar.find('a.day').removeAttr('href');
        
        $myCalendar.find('.day').on('click', function () {
            var $selected = $(this);
            if ($selected.hasClass('show-that-day')) {
                $('#calendar #day-post').fadeOut();
            } else if ($selected.hasClass('happy')) {
                $('#calendar #day-post #show-day-header span').html($selected.attr('data-value'));
                $('#calendar .day.happy').removeClass('show-that-day');
                $('#calendar #day-post').removeClass('d-none').slideDown();
            }
            
            if ($selected.hasClass('happy')) {
                $selected.toggleClass('show-that-day');
            }
        });
        
    //"Temporary", calendar make the happy and sad days ###for test
        dayStatus('13 november 2019');
        dayStatus('14 november 2019', 1);
        dayStatus('15 november 2019', 1);
        dayStatus('16 november 2019', 1);
        dayStatus('17 november 2019', 1);
    };
    changeMonth();
    
    $myCalendar.find('header a.btn').on('click', function () {
        changeMonth();
    });
    
//"Temporary", Reload Masonry to reload images ###We need a better solution for this
    var reloadFeedMasonry = function () {
        if ($('#feed #posts-show-type li[data-value=global]').hasClass('active') && $(window).scrollTop() < 10) {
            $feedMasonry.masonry('destroy');
            $feedMasonry.masonry({percentPosition: true, gutter: 15});
        }
    };
    $('#feed').ready(setTimeout(reloadFeedMasonry, 2000));
    $('#feed').ready(setTimeout(reloadFeedMasonry, 4000));
    $('#feed').ready(setTimeout(reloadFeedMasonry, 7000));

    var reloadsavedMasonry = function () {
        if ($(window).scrollTop() < 10) {
            $savedMasonry.masonry('destroy');
            $savedMasonry.masonry({percentPosition: true, gutter: 15});
        }
    };
    $('#feed.saved').ready(setTimeout(reloadsavedMasonry, 2000));
    $('#feed.saved').ready(setTimeout(reloadsavedMasonry, 4000));
    
    var reloadMyMasonry = function () {
        if ($(window).scrollTop() < 10) {
            $myMasonry.masonry('destroy');
            $myMasonry.masonry({percentPosition: true, gutter: 15});
        }
    };
    $('#blog').ready(setTimeout(reloadMyMasonry, 2000));
    $('#blog').ready(setTimeout(reloadMyMasonry, 4000));

});