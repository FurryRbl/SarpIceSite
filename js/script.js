console.log("欢迎访问 SharpIce 的个人站点👋");

var SharpIce = {
    Pages: {
        PartiallyLoadingPages: function (PagesLocation, Content) {
            $.ajax({
                url: PagesLocation,
                type: 'get',
                success: function (res) {
                    $(Content).html($(res));
                }
            });
            window.history.pushState(null, null, PagesLocation);
        }
    }
}
