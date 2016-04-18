var userEmail;
var $buttonSidebar = $('.btn.btn-default.btn-lg.button-sidebar');
var $signedInAs = $('.btn.btn-primary.signed-in-as');
var $googlePlusButtonSignOut = $('.btn.btn-warning.googleplus-button-sign-out');
var $googlePlusButton = $('.btn.btn-primary.googleplus-button');

function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());
    userEmail = profile.getEmail();

    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    $signedInAs.removeClass('invisible').text(profile.getName());
    $googlePlusButtonSignOut.removeClass('invisible');
    $googlePlusButton.addClass('invisible');
    $buttonSidebar.eq(3).removeClass('btn-favourites');
    $buttonSidebar.eq(4).addClass('btn-favourites');
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    $signedInAs.addClass('invisible');
    $googlePlusButtonSignOut.addClass('invisible');
    $googlePlusButton.removeClass('invisible');
    $buttonSidebar.eq(3).addClass('btn-favourites');
    $buttonSidebar.eq(4).removeClass('btn-favourites');
  }

