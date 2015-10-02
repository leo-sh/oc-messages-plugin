// load number of new messages at page loading
getMessageCount();

// load number of new messages in a loop
setInterval(getMessageCount, 60000);

// load and show new count of  messages
function getMessageCount() {
    var $newMessages = parseInt(0);

    // load data
    $.getJSON($('#badge-messages').data('request-url'), function(json) {
        // show or hide the badge for new messages
        $newMessages = parseInt(json.newMessages);
        if ($newMessages == 0) {
            $('#badge-messages').css('display', 'none');
        }
        else {
            $('#badge-messages').empty();
            $('#badge-messages').append($newMessages);
            $('#badge-messages').fadeIn('fast');
        }
    });
}

$('#icon-messages').click(function() {

    // remove all <li> entries from dropdown
    $('#dropdown-messages').find('li').remove();
    $('#dropdown-messages').find('ul').remove();

    // append title and loader to dropdown
    $('#dropdown-messages').append(
        '<li class="dropdown-header"><div class="arrow"></div>Messages' +
            '<a class="btn btn-info btn-xs" data-handler="onInit" data-control="ajax-modal" data-update-partial="messageNotifications::create_message" id="create-message-button">New message</a></li> ' +
        '<ul class="media-list"><li id="loader_messages"><div class="loader"><div class="sk-spinner sk-spinner-three-bounce">' +
        '<div class="sk-bounce1"></div><div class="sk-bounce2"></div><div class="sk-bounce3"></div></div></div></li></ul>' +
        '<li><div class="dropdown-footer"><a class="btn btn-default col-md-12" href="/messages">Show all messages</a></div></li>'
    );

    // load newest notifications
    $.ajax({
        'type': 'GET',
        'url': $(this).data('request-url'),
        'cache': false,
        'data': jQuery(this).parents("form").serialize(),
        'success': function (html) {
            $("#loader_messages").replaceWith(html);
            $('.time').timeago();
        }
    });

});