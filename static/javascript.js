// Javascript

//modal("login").show("message");
//modal("permission").show();
var modal = function(type){
  return {
    show: function(message){
      if (message) {
        u("#" + type + " + * + * .message").html(message);
      }
      u("#" + type).first().checked = true;
      u("#" + type + " ~ * input").first().focus();
    },
    hide: function(){
      u("#" + type).first().checked = true;
    }
  };
};

u("form.login").ajax(function(data){
  if (data.error === false) {
    window.location.reload();
  }
  else {
    u("form.login p").html(data.error).addClass("message error");
  }
});

// Justify everything that has the class .sweet-justice
justify_my_love(document.querySelector(".sweet-justice"));

// Display the mathematics on the pagee
renderMathInElement(document.body);

// / internal
// "http://www.libre.university/" internal
// "http://github.com/libre/university" external
// /subject/V1LlrTSlmVl internal
// "http://atom.io/" external
// "https://pages.github.com/" external
u('a').each(function(link){
  if (!/(^\/.*|^https?\:\/\/[a-z]+\.libre\.university)/g.test(u(link).attr('href'))) {
    u(link).attr('target', '_blank');
  }
});
