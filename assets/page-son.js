/* 손양원 목사: 이야기 끝에 운영 주체 흐름(flow), 그 아래 근거 자료 표(table, 처음엔 접힘)를 덧붙임
   (이야기는 assets/page-story.js, 내용은 data/son/index.js의 flow·table) */
(function () {
  var T = window.STORY.table;
  function kind(o) { return o.indexOf("일본 →") === 0 ? "tr" : o.indexOf("미국") === 0 ? "us" : o.indexOf("일본") === 0 ? "jp" : "mg"; }
  function owner(o) { if (!o) return ""; var p = o.split("<br>"); return '<span class="chip ' + kind(o) + '">' + p[0] + "</span>" + (p[1] ? "<div>" + p[1] + "</div>" : ""); }
  function ev(e) { var i = e.indexOf(" "); return /^\d/.test(e) ? "<b>" + e.slice(0, i) + "</b>" + e.slice(i) : e; }
  var head = T.cols.map(function (c) { return "<th>" + c + "</th>"; }).join("");
  var left = 0;
  var rows = T.rows.map(function (r) {
    var s = r.son ? r.son.split("<br>") : null, son = "";
    if (s) { son = '<td class="son" rowspan="' + (r.span || 1) + '"><strong>' + s[1] + "</strong><span>" + s[0] + "</span></td>"; left = (r.span || 1) - 1; }
    else if (left > 0) left--;
    else son = "<td></td>";
    var evs = r.events.length ? "<ul><li>" + r.events.map(ev).join("</li><li>") + "</li></ul>" : "";
    return "<tr" + (r.period ? "" : ' class="sub"') + '><td class="period">' + r.period + "</td><td>" + owner(r.owner) + '</td><td class="director">' + r.head + "</td>" + son + '<td class="ev">' + evs + "</td></tr>";
  }).join("");
  /* 1012 모바일: 같은 내용을 기간별 카드로 (손양원 목사 기간은 카드 위 띠로, 그 기간 안의 카드는 왼쪽 선) */
  var inSon = 0;
  var cards = T.rows.map(function (r) {
    var h = "";
    if (r.son) { var s = r.son.split("<br>"); h += '<li class="m-son"><strong>손양원 목사 · ' + s[1] + "</strong><span>" + s[0] + "</span></li>"; inSon = r.span || 1; }
    if (r.period) {
      h += '<li class="m-row' + (inSon > 0 ? " in" : "") + '"><b class="m-period">' + r.period + "</b>" + (r.owner ? owner(r.owner) : "") +
        (r.head ? '<p class="m-head">' + r.head + "</p>" : "") +
        (r.events.length ? "<ul><li>" + r.events.map(ev).join("</li><li>") + "</li></ul>" : "") + "</li>";
    }
    if (inSon > 0) inSon--;
    return h;
  }).join("");
  var F = window.STORY.flow;   /* 1013 운영 주체 흐름: 본문 끝에 붙임 */
  if (F) document.querySelector(".story").insertAdjacentHTML("beforeend", '<div class="oflow"><h4>' + F.title + "</h4><ol>" + F.steps.map(function (s) {
    var t = s.href ? "a" : "div";
    return "<li><" + t + (s.href ? ' href="' + s.href + '"' : "") + ' class="o-box"><b>' + s.y + "</b><strong>" + s.who + "</strong><span>" + s.what + "</span>" +
      (s.son ? "<em>" + s.son + (s.href ? " →" : "") + "</em>" : "") + "</" + t + "></li>";
  }).join("") + "</ol></div>");
  document.getElementById("app").insertAdjacentHTML("beforeend",
    '<details class="grp tbl-grp"><summary><h2>' + T.title + '</h2></summary><div class="tbl"><table><thead><tr>' + head + "</tr></thead><tbody>" + rows +
    '</tbody></table></div><ol class="tbl-m">' + cards + '</ol><p class="src">' + T.source + "</p></details>");
})();
