var userEmail;

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
    $('.btn.btn-primary.signed-in-as').removeClass('invisible').text(profile.getName());
    $('.btn.btn-warning.googleplus-button-sign-out').removeClass('invisible');
    $('.btn.btn-primary.googleplus-button').addClass('invisible');
    $('.btn.btn-default.btn-lg.button-sidebar').eq(3).removeClass('btn-favourites');
    $('.btn.btn-default.btn-lg.button-sidebar').eq(4).addClass('btn-favourites');
    $('.btn.btn-default.btn-lg.button-topbar').eq(3).removeClass('btn-favourites');
    $('.btn.btn-default.btn-lg.button-topbar').eq(4).addClass('btn-favourites');
  }

  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    $('.btn.btn-primary.signed-in-as').addClass('invisible');
    $('.btn.btn-warning.googleplus-button-sign-out').addClass('invisible');
    $('.btn.btn-primary.googleplus-button').removeClass('invisible');
    $('.btn.btn-default.btn-lg.button-sidebar').eq(3).addClass('btn-favourites');
    $('.btn.btn-default.btn-lg.button-sidebar').eq(4).removeClass('btn-favourites');
    $('.btn.btn-default.btn-lg.button-topbar').eq(3).addClass('btn-favourites');
    $('.btn.btn-default.btn-lg.button-topbar').eq(4).removeClass('btn-favourites');
  }

