console.log("欢迎访问 SharpIce 的个人站点👋");

var SharpIce = {
    Pages: {
        PartiallyLoadingPages: function (Pages) {
            $.ajax({
                url: '/pages/' + Pages + '.html',
                type: 'get',
                success: function (res) {
                    $('body').html($(res));
                }
            });
            window.history.pushState(null, null, '/');
        }
    }
}
