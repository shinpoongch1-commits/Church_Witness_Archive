/* 증언 페이지 공통: 제목 → 증언 여러 개(질문 + 이름 + 증언 블록) (내용은 data/메뉴/하위.js의 window.PAGE, 예: data/son/loca.js)
   이름 → 인물 정보 모달, 증언 블록 → 인터뷰 원문 모달(해당 지점으로 이동)
   질문은 원고 자리 그대로 두고, 질문 하나 아래(다음 질문 전까지) 증언자를 이름 가나다순으로 정렬
   같은 증언자가 이어지면 이름은 한 번만, 블록만 이어 붙임
   (1006) 묶음 머리 { group, desc, ask } → 눌러서 접고 펼침(처음엔 모두 접힘) / 묶음 안내 desc·확인 note / 대화 세트 { who, set: [ {ask, text, find}, {note} ] } → 이름 한 번 + 질문·증언이 한 덩어리 */
(function () {
  var D = window.PAGE, asker = D.asker || "질문자";
  function quote(s) {
    return '<a class="quote js-modal" href="#" data-intvw="' + s.who + '" data-find="' + (s.find || "") + '">' + s.text +
      "<small>원문 보기 →</small></a>";
  }
  function ask(t) { return '<p class="ask"><b>' + window.SITE.view.ask(asker) + "</b>: " + t + "</p>"; }   // 1013 질문자 이름 → 인물 정보
  var seen = {};   // 1019: 약력(data/site.js brief)은 그 페이지에서 그 사람이 처음 나올 때만
  function brief(n) {
    var b = (window.SITE.brief || {})[n];
    if (!b || seen[n]) return "";
    seen[n] = 1;
    return '<span class="brief">' + b + "</span>";
  }
  function who(s) {   // (1012) in: 다른 사람 원문에 실린 말(질문자 설명 등) → 이름은 누르지 않음
    var l = s.label || s.who, tail = "";   // 1019: '박창호 사모'처럼 이름 뒤에 붙은 말은 밑줄 없이, 약력은 박창호 것
    if (l !== s.who && l.indexOf(s.who) === 0) { tail = '<span class="who-tail">' + l.slice(s.who.length) + "</span>"; l = s.who; }
    if (s.in && s.who !== window.SITE.asker) return '<span class="who">' + l + "</span>" + tail + brief(s.who);
    return '<a class="who js-modal" href="#" data-person="' + s.who + '">' + l + "</a>" + tail + brief(s.who);
  }
  function doc(s) {   // (1012) 문헌 블록: 이름(문헌 제목) → 원문(새 창), 블록 → 사진 크게
    return '<div class="say"><a class="who" href="' + s.link + '" target="_blank" rel="noopener">' + s.label + '</a><a class="quote" href="#" data-zoom="' + s.zoom + '">' +
      s.text + "<small>사진 보기 →</small></a></div>";
  }
  function set(s) {   // 대화 세트: 질문과 답이 오간 순서 그대로 한 덩어리
    return '<div class="say">' + who(s) + s.set.map(function (x) {
      if (x.note) return '<p class="note">' + x.note + "</p>";
      return (x.ask ? ask(x.ask) : "") + quote({ who: s.in || s.who, text: x.text, find: x.find });
    }).join("") + "</div>";
  }
  function items(list) {
    var groups = [], h = "";
    list.forEach(function (s, i) { if (!i || s.ask) groups.push({ ask: s.ask, list: [] }); groups[groups.length - 1].list.push(s); });
    groups.forEach(function (g) {
      if (g.ask) h += ask(g.ask);
      g.list.sort(function (a, b) { return (a.who || "").localeCompare(b.who || "", "ko"); });
      g.list.forEach(function (s, i) {
        if (s.zoom) { h += doc(s); return; }
        if (s.set) { h += set(s); return; }
        var p = g.list[i - 1];
        if (p && !p.set && p.who === s.who) { h = h.slice(0, -6) + quote(s) + "</div>"; return; }   // 같은 증언자 연속
        if (s.who) h += '<div class="say">' + who(s) + quote(s) + "</div>";
      });
    });
    return h;
  }
  var g = 0;   // 묶음 머리가 있으면 접기·펼치기: 처음엔 모두 접힘
  var secs = D.sections.map(function (s) {
    if (s.group) return (g++ ? "</details>" : "") + '<details class="grp"' + (s.id ? ' id="' + s.id + '"' : "") + '><summary><h2>' + s.group + "</h2></summary>" +
      (s.desc ? '<p class="desc">' + s.desc + "</p>" : "") + (s.ask ? ask(s.ask) : "");
    return '<section class="sec"' + (s.id ? ' id="' + s.id + '"' : "") + ">" + (s.title ? "<h2>" + s.title + "</h2>" : "") + (s.desc ? '<p class="desc">' + s.desc + "</p>" : "") +
      items(s.items) + (s.note ? '<p class="note">' + s.note + "</p>" : "") + "</section>";
  }).join("") + (g ? "</details>" : "");
  document.getElementById("app").innerHTML =
    '<div class="page-head"><h1 class="eyebrow">' + D.title + "</h1>" + (D.lede ? '<p class="lede">' + D.lede + "</p>" : "") + (D.note ? '<p class="note">' + D.note + "</p>" : "") + "</div>" + secs;
  var go = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));   // 1013 주소 끝 #id → 그 묶음을 펼치고 이동 (메인 '신풍교회의 뿌리' → shinpung_paik.html#jeong)
  if (go) { if (go.tagName === "DETAILS") go.open = true; go.scrollIntoView(); }
})();
