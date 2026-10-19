/* 메인 (1013 새로 작성, 내용은 data/site.js의 home)
   첫 화면 → 만든 이 → 증언으로 살펴본 사실(시기 + 카드) → 질문 2개 → 이어진 신앙 노선 */
(function () {
  var H = window.SITE.home;
  var scenes = H.scenes.map(function (c) {
    return '<li><div class="when">' + c.when + (c.note ? "<small>" + c.note + "</small>" : "") + '</div><a class="card" href="' + c.href + '"><strong>' + c.title +
      "</strong><span>" + c.desc + '</span><div class="row"><b class="cnt">증언자 ' + c.count + "명</b><em>증언 보기 →</em></div></a></li>";
  }).join("");
  var qs = H.questions.map(function (q) {
    return '<a class="qbox" href="' + q.href + '"><strong>' + q.title + "</strong><span>" + q.desc + "</span><em>" + q.more + " →</em></a>";
  }).join("");
  var flow = H.flow.map(function (f) {
    return '<a href="' + f.href + '"><b>' + f.name + "</b><small>" + f.desc + "</small></a>";
  }).join("<i>→</i>");
  document.getElementById("app").innerHTML =
    '<div class="hero"><div><p class="eyebrow">' + H.eyebrow + "</p><h1>" + H.title.split(", ").map(function (t) { return '<span class="nw">' + t + "</span>"; }).join(", ") + '</h1><p class="motto">' + H.motto + '</p><p class="lede">' + H.lede +
    '</p></div><figure><img src="' + H.photo + '" alt="' + H.photoCaption + '"><figcaption>' + H.photoCaption + "</figcaption></figure></div>" +
    '<p class="about">' + H.about + "</p>" +
    '<section class="blk"><h2>' + H.scenesTitle + '</h2><p class="sub">' + H.scenesLede + '</p><ol class="scenes">' + scenes + "</ol></section>" +
    '<section class="blk"><div class="qs">' + qs + "</div></section>" +
    '<section class="blk last"><h2>' + H.flowTitle + '</h2><p class="sub">' + H.flowLede + '</p><div class="flow">' + flow + '</div><p class="flow-note">' + H.flowNote + "</p></section>";
})();
