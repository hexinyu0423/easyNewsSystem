import ajax from '../js/ajax';

const form = document.forms.reg;

form.onsubmit = function (e) {
    e.preventDefault();
    ajax('post', '/api/admin/reg', {
        uid: form.uid.value,
        pwd: form.pwd.value
    })
        .then(result => {
            if (result.flag) {
                alert('注册成功\n请登录');
                location.replace('login.html')
            } else {
                alert(result.msg)
            }
        })
        .catch(e => {
            alert('服务器忙，请稍后再试')
        })
}