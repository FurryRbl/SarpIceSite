console.log("欢迎访问 SharpIce 的个人站点👋");

var SharpIce = {
    Pages: {
        PartiallyLoadingPagesBody: function (Pages) {
            $.ajax({
                url: "/pages/loading.html",
                type: "get",
                success: function (res) {
                    $("body").html($(res));
                },
            });
            setTimeout(function () {
                $.ajax({
                    url: "/pages/" + Pages + ".html",
                    type: "get",
                    success: function (res) {
                        $("body").html($(res));
                    },
                });
            }, 1000)
        },
    },
};
