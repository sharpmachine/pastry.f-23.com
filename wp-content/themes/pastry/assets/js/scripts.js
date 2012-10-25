jQuery(function($) {
    $("#all").lifestream({
        limit: 3,
        list:[{ service: "facebook_page", user: "206228496092750"}, { service: "twitter", user: "lovepastry"}],
    });
    $("#facebook").lifestream({
        limit: 3,
        list:[{ service: "facebook_page", user: "206228496092750"}]
    });
    $("#twitter").lifestream({
        limit: 3,
        list:[{ service: "twitter", user: "lovepastry"}]
    });
});