var SharpIce = {
    Pages: {
        PartiallyLoadingPagesContainer: function (Pages) {
            SharpIce.Pages.PartiallyLoadingPages("/pages/" + Pages + ".html", "#container");
        },
        PartiallyLoadingPages: function (PagesLocation, Content) {
            $("body").stop(true, false); // 中断所有动画，防止出现渲染滞留
            $('#Loading').css('visibility', 'unset');
            $.ajax({
                url: PagesLocation,
                type: "get",
                success: function (data) {
                    $(Content).html($(data));
                    GlobalReloadFunctions();
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
            Swal.fire({ // 对话框内容
                icon: 'error',
                title: '出错啦Xwx',
                html: ErrorMessage,
                heightAuto: false,
            });
        },
        ShowFileContentInDialog: function (FileLocation) { // 获取文件内容并显示在对话框上
            $('#Loading').css('visibility', 'unset');
            $.ajax({
                url: FileLocation,
                dataType: "text",
                success: function (data) {
                    Swal.fire({
                        title: "许可证",
                        html: '<div class="CustomizeSlider" style="height: 20rem; white-space: pre-wrap;">' + data + '</div>',
                        confirmButtonText: "确定",
                        heightAuto: false, // 禁止自动高度
                        width: 'auto', // 自动宽度
                    });
                    GlobalReloadFunctions();
                    $('#Loading').css('visibility', 'hidden');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    SharpIce.DiaLog.Error('Ajax出错' +
                        '</br></br>错误信息：<pre style="text-align: left; background-color: mediumspringgreen; border-radius: 1rem; padding: 1rem;">' + JSON.stringify(jqXHR, null, 4) + '</pre>');
                    throw null;
                }
            });
        }
    }
};

function GlobalReloadFunctions() {
    $(".CustomizeSlider").mCustomScrollbar({ // 为CustomizeSlider类设置mCustomScrollbar的自定义滚动条
        theme: "light"
    });
}
