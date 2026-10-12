/* 손양원 목사: 이야기 아래에 표를 덧붙임 (이야기는 assets/page-story.js, 내용은 data/sohn/index.js의 table) */
(function () {
  var T = window.STORY.table;
  function kind(o) { return o.indexOf("일본 →") === 0 ? "tr" : o.indexOf("미국") === 0 ? "us" : o.indexOf("일본") === 0 ? "jp" : "mg"; }
  function owner(o) { if (!o) return ""; var p = o.split("<br>"); return '<span class="chip ' + kind(o) + '">' + p[0] + "</span>" + (p[1] ? "<div>" + p[1] + "</div>" : ""); }
  function ev(e) { var i = e.indexOf(" "); return /^\d/.test(e) ? "<b>" + e.slice(0, i) + "</b>" + e.slice(i) : e; }
  var head = T.cols.map(function (c) { return "<th>" + c + "</th>"; }).join("");
  var left = 0;
  var rows = T.rows.map(function (r) {
    var s = r.sohn ? r.sohn.split("<br>") : null, sohn = "";
    if (s) { sohn = '<td class="sohn" rowspan="' + (r.span || 1) + '"><strong>' + s[1] + "</strong><span>" + s[0] + "</span></td>"; left = (r.span || 1) - 1; }
    else if (left > 0) left--;
    else sohn = "<td></td>";
    var evs = r.events.length ? "<ul><li>" + r.events.map(ev).join("</li><li>") + "</li></ul>" : "";
    return "<tr" + (r.period ? "" : ' class="sub"') + '><td class="period">' + r.period + "</td><td>" + owner(r.owner) + '</td><td class="director">' + r.head + "</td>" + sohn + '<td class="ev">' + evs + "</td></tr>";
  }).join("");
  /* 1012 모바일: 같은 내용을 기간별 카드로 (손양원 목사 기간은 카드 위 띠로, 그 기간 안의 카드는 왼쪽 선) */
  var inSohn = 0;
  var cards = T.rows.map(function (r) {
    var h = "";
    if (r.sohn) { var s = r.sohn.split("<br>"); h += '<li class="m-sohn"><strong>손양원 목사 · ' + s[1] + "</strong><span>" + s[0] + "</span></li>"; inSohn = r.span || 1; }
    if (r.period) {
      h += '<li class="m-row' + (inSohn > 0 ? " in" : "") + '"><b class="m-period">' + r.period + "</b>" + (r.owner ? owner(r.owner) : "") +
        (r.head ? '<p class="m-head">' + r.head + "</p>" : "") +
        (r.events.length ? "<ul><li>" + r.events.map(ev).join("</li><li>") + "</li></ul>" : "") + "</li>";
    }
    if (inSohn > 0) inSohn--;
    return h;
  }).join("");
  document.getElementById("app").insertAdjacentHTML("beforeend",
    '<section class="sec"><h2>' + T.title + '</h2><div class="tbl"><table><thead><tr>' + head + "</tr></thead><tbody>" + rows +
    '</tbody></table></div><ol class="tbl-m">' + cards + '</ol><p class="src">' + T.source + "</p></section>");
})();
