const SharpIce = {
    Pages: {
        PartiallyLoadingPagesContainer: (Pages) => {
            SharpIce.Pages.PartiallyLoadingPages(`/pages/${Pages}.html`, "#container");
        },
        PartiallyLoadingPages: (PagesLocation, Content) => {
            jQuery("body").stop(true, false); // 中断所有动画，防止出现渲染滞留
            jQuery('#Loading').css('visibility', 'unset');
            jQuery.ajax({
                url: PagesLocation,
                timeout: 60000,
                type: "get",
                success: (data) => {
                    jQuery(Content).empty().append(jQuery(data));
                    GlobalReloadFunctions();
                    jQuery('#Loading').css('visibility', 'hidden');
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    SharpIce.ErrorProcessing.AjaxError(jqXHR);
                    throw null;
                }
            });
        }
    },
    DiaLog: {
        Error: (ErrorMessage) => {
            Swal.fire({ // 对话框内容
                icon: 'error',
                title: '出错啦Xwx',
                html: ErrorMessage,
                heightAuto: false,
                confirmButtonText: "确定",
            });
        },
        ShowFileContentInDialog: (FileLocation) => { // 获取文件内容并显示在对话框上
            jQuery('#Loading').css('visibility', 'unset');
            jQuery.ajax({
                url: FileLocation,
                timeout: 60000,
                type: "get",
                dataType: "text",
                success: (data) => {
                    Swal.fire({
                        title: "许可证",
                        html: `<div class="CustomizeSlider" style="height: 20rem; white-space: pre-wrap;">${data}</div>`,
                        confirmButtonText: "确定",
                        heightAuto: false, // 禁止自动高度
                        width: 'auto', // 自动宽度
                    });
                    GlobalReloadFunctions();
                    jQuery('#Loading').css('visibility', 'hidden');
                },
                error: (jqXHR, textStatus, errorThrown) => {
                    SharpIce.ErrorProcessing.AjaxError(jqXHR);
                    throw null;
                }
            });
        }
    },
    ErrorProcessing: {
        AjaxError: (jqXHR) => {
            SharpIce.DiaLog.Error(`
            Ajax出错
            <h4 style="text-align: left;">错误信息：</h4>
            <pre style="text-align: left; background-color: mediumspringgreen; border-radius: 1rem; padding: 1rem;" class="CustomizeSlider">${JSON.stringify(jqXHR, null, 4)}</pre>
            `);
            jQuery('#Loading').css('visibility', 'hidden');
        }
    }
};

function GlobalReloadFunctions() {
    jQuery(".CustomizeSlider").mCustomScrollbar({ // 为CustomizeSlider类设置mCustomScrollbar的自定义滚动条
        theme: "dark"
    });
}
