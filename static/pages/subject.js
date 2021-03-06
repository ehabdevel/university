// SUBJECT page
// action: { add, form: { save, remove, edit, cancel }}
// Non capturing group (http://stackoverflow.com/a/3513858/938236)
pagex(/^\/subject/, subject);
pagex(/^\/$/, subject);

function subject(bla){

  var action = {};

  // Functions for the subject
  action.add = function(e){
    console.log("Added");
    if(!user) {
      return login();
    }

    // if(!user.over(1000)) {
    //   return modal('permission').show(1000);
    // }

    template('template.add', {}, action.form).before('section.add');
    u(u('.preview.add').nodes.pop()).closest('form').find('input').first().focus();
  };

  // Add the handlers for the subject form (add or edit)
  action.form = function(){

    // Ajaxify the form to save it without reloading
    u('form', this).ajax(action.form.save);

    // Add the class dynamically
    u('form', this).addClass('add');

    // Give handle for canceling adding a new subject
    u('.cancel', this).on('click', action.form.remove);
  };

  // Action to perform once the subject is saved
  action.form.save = function(subject){
    window.location.reload();
  };

  // Cancel adding the template form
  action.form.remove = function(e){
    e.preventDefault();
    u(this).closest('form').remove();
  };

  // When editing one form
  action.form.edit = function(e){
    e.preventDefault();

    if(!user) {
      login();
    }

    // if(!user.over(500)) {
    //   return modal('permission').show(500);
    // }

    u(this).closest('form').addClass('edit');
    u(this).closest('form').find('input').first().focus();
  };

  action.form.cancel = function(){
    u(this).closest('form').removeClass('edit');
  };


  // IMPLEMENTATION
  u('button.add').on('click', action.add);

  // When we save a lesson that we were editing
  u('form.preview').ajax(action.form.save);

  // Edit a particular lesson
  u('form.preview .edit').on('click', action.form.edit);

  // Cancel the edition of a particular lesson
  u('form.preview .cancel').on('click', action.form.cancel);
};
