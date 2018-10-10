$(function() {

	$('#switch_qlogin').click(function () {
		$("#frame").css('background-image','url("images/1.jpg")');
		$('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_bottom').animate({left: '0px', width: '70px'});
		$('#qlogin').css('display', 'none');
		$('#web_qr_login').css('display', 'block');
	});
	$('#switch_login').click(function () {
		$("#frame").css('background-image','url("images/2.jpg")');
		$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_bottom').animate({left: '154px', width: '70px'});

		$('#qlogin').css('display', 'block');
		$('#web_qr_login').css('display', 'none');
	});
});
