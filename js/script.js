console.log("欢迎访问 SharpIce 的个人站点👋");

var SharpIce = {
    Pages: {
        PartiallyLoadingPagesContainer: function (Pages) {
            SharpIce.Pages.PartiallyLoadingPages("/pages/" + Pages + ".html", "#container");
        },
        PartiallyLoadingPages: function (PagesLocation, Content) {
            $('#Loading').css('visibility', 'unset');
            $.ajax({
                url: PagesLocation,
                type: "get",
                success: function (data) {
                    $(Content).html($(data));
                    $('#Loading').css('visibility', 'hidden');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    SharpIce.DiaLog.Error('Ajax出错' +
                        '</br></br>错误信息：<pre style="text-align: left; background-color: mediumspringgreen; border-radius: 1rem; padding: 1rem;">' + JSON.stringify(jqXHR, null, 4) + '</pre>');
                    throw null;
                }
            });
        }
    },
    DiaLog: {
        Error: function (ErrorMessage) {
            Swal.mixin({
                position: 'top' // 设置顶部居中
            }).fire({ // 内容
                icon: 'error',
                title: '出错啦Xwx',
                html: ErrorMessage,
            });
        }
    }
};

window.onerror = function (message, source, lineno, colno, error) {
    if (error != null) {
        SharpIce.DiaLog.Error('消息：' + message +
            '</br></br>位置：' + source +
            '</br></br>行：' + lineno +
            '</br></br>列：' + colno +
            '</br></br>错误：' + error);
    }
}
