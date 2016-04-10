  function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

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

    $('.btn.btn-default.btn-lg.button-sidebar').eq(3).addClass('btn-favourites');
    $('.btn.btn-default.btn-lg.button-sidebar').eq(4).removeClass('btn-favourites');
    $('.btn.btn-default.btn-lg.button-topbar').eq(3).addClass('btn-favourites');
    $('.btn.btn-default.btn-lg.button-topbar').eq(4).removeClass('btn-favourites');
  }
