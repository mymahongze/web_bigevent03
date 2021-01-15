$(function () {
    $("#link_reg").on("click", function () {
        $(".reg_area").show()
        $(".login_area").hide()
    });

    $("#link_login").on("click", function () {
        $(".login_area").show()
        $(".reg_area").hide()
    })

    var form = layui.form
    // console.log(form);
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $("#form_reg input[name=password]").val()
            if (value != pwd) {
               return "两次输入密码不一致！"
            }
        }
    })

    // 发起注册用户的Ajax请求
    var layer = layui.layer;
    $("#form_reg").on("submit",function (e) {
        e.preventDefault()
        $.ajax({
            method:"POST",
            url: "/api/reguser",
            data: {
                username:$("#form_reg input[name=username]").val(),
                password:$("#form_reg input[name=password]").val()
            },
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功,请登录!")
                $('#link_login').click()
                $("#form_reg")[0].reset()
            }
        });
    })

    // 发起登录的Ajax请求
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("登录成功！");
                localStorage.setItem("token", res.token)
                location.href = "/index.html"
            }
        });
    });

})