$(function () {
  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function ($form, event, errors) {},
    submitSuccess: function ($form, event) {
      event.preventDefault();
      var name = $("input#fname").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var zipcode = $("input#zipcode").val();
      var message = $("textarea#message").val();

      $this = $("#sendMessageButton");
      $this.prop("disabled", true);

      $.ajax({
        url: "https://epic-mp3e.onrender.com/send-email",
        type: "POST",
        data: {
          name: name,
        email: email,
        phone: phone,
        zipcode: zipcode,
        message: message,
        },
        cache: false,
        error: function () {
          $("#success").html("<div class='alert alert-success'>");
          $("#success > .alert-success")
            .html(
              "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
          $("#success > .alert-success").append(
            "<strong>Your message has been sent. </strong>"
          );
          $("#success > .alert-success").append("</div>");
          $("#contactForm").trigger("reset");
        },
        
        complete: function () {
          setTimeout(function () {
            $this.prop("disabled", false);
          }, 1000);
        },
      });
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

$("#name").focus(function () {
  $("#success").html("");
});
