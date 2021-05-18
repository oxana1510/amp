"use strict";
function checkOnTarget(e, t) {
  var n = (e = e || window.event).target || e.srcElement;
  return n.classList.contains(t.replace(".", "")) || (n = n.closest(t))
    ? n
    : null;
}
function clickOnSelector(n, o) {
  if (
    "string" != typeof n ||
    "function" != typeof o ||
    !document.querySelector(n)
  )
    return null;
  document.addEventListener("click", function (e) {
    var t = e.target.closest(n);
    t && o(e, t);
  });
}
function hideScroll() {
  document.body.classList.add("no-scroll");
  var e = getScrollWidth(),
    t = document.body.scrollHeight > document.body.clientHeight;
  e && t && (document.body.style.paddingRight = e + "px");
}
function showScroll() {
  document.body.classList.remove("no-scroll"),
    (document.body.style.paddingRight = "");
}
function toggleScroll() {
  (document.body.classList.contains("no-scroll") ? showScroll : hideScroll)();
}
function getScrollWidth() {
  var e = document.createElement("div");
  (e.style.overflowY = "scroll"),
    (e.style.width = "50px"),
    (e.style.height = "50px"),
    document.body.appendChild(e);
  var t = e.offsetWidth - e.clientWidth;
  return document.body.removeChild(e), t;
}
document.addEventListener("DOMContentLoaded", function () {
  var r, l, e;
  !(function () {
    var e = document.querySelectorAll("table:not([class])");
    if (e)
      for (var t = 0; t < e.length; t++) {
        var n = document.createElement("div");
        n.setAttribute("class", "table-container"),
          e[t].parentNode.insertBefore(n, e[t]),
          n.appendChild(e[t]);
      }
  })(),
    clickOnSelector(".js-submenu-trigger", function (e, t) {
      var n = t.closest(".header-menu__item");
      n && n.classList.toggle("is-showing-sub");
    }),
    document.addEventListener("click", function (e) {
      if (!checkOnTarget(e, ".is-showing-sub")) {
        var t = document.querySelector(".is-showing-sub");
        t && t.classList.remove("is-showing-sub");
      }
    }),
    (function () {
      var t = document.getElementById("interestingButton");
      if (t) {
        var n = document.getElementById("interestingText");
        if (n) {
          var o = JSON.parse(t.getAttribute("data-labels"));
          t.addEventListener("click", function (e) {
            n.classList.contains("is-opened")
              ? (n.classList.remove("is-opened"),
                (t.innerText = o.closed ? o.closed : "Читать подробнее"))
              : (n.classList.add("is-opened"),
                (t.innerText = o.opened ? o.opened : "Свернуть"));
          });
        }
      }
    })(),
    (function () {
      var e = document.getElementById("showAllTesti");
      if (e) {
        var t = e.closest(".testi-texts");
        t &&
          e.addEventListener("click", function () {
            t.classList.add("is-uncollapsed");
          });
      }
    })(),
    (r = document.querySelector(".top-notify")),
    clickOnSelector(".js-move-to", function (e, t) {
      var n = t.getAttribute("data-target");
      if (n) {
        var o = document.getElementById(n);
        if (o)
          if ("scrollBehavior" in document.documentElement.style) {
            var i = o.getBoundingClientRect(),
              l = r ? r.offsetHeight : 0;
            window.scrollTo(0, i.top + window.scrollY - l);
          } else o.scrollIntoView();
      }
    }),
    clickOnSelector(".js-show-modal", function (e, t) {
      e.preventDefault();
      var n = t.getAttribute("data-target");
      if (n) {
        var o = document.getElementById(n);
        if (o) {
          var i = t.getAttribute("href");
          if (i && -1 !== i.indexOf("youtube")) {
            var l = o.querySelector(".youtube-container");
            if (l) {
              var r = o.querySelector(".dialog-header__title");
              if (r) {
                var c = t.getAttribute("data-title");
                r.innerHTML = c ? c.trim() : "Видео";
              }
              (l.innerHTML = ""),
                setTimeout(function () {
                  l.innerHTML =
                    '<iframe src="' +
                    i +
                    '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
                }, 250);
            }
          }
          hideScroll(), o.classList.add("is-visible");
        }
      }
    }),
    clickOnSelector(".js-close-modal", function (e, t) {
      for (
        var n = document.querySelectorAll(".modal"), o = 0;
        o < n.length;
        o++
      )
        n[o].classList.remove("is-visible");
      var i = t.closest(".modal");
      if (i) {
        var l = i.querySelector(".youtube-container");
        l &&
          setTimeout(function () {
            l.innerHTML = "";
          }, 250);
      }
      setTimeout(showScroll, 250);
    }),
    (l = document.querySelectorAll(".cities-list__item")),
    (e = document.getElementById("citiesInput")) &&
      l.length &&
      e.addEventListener("input", function (e) {
        var t = e.target.value.trim();
        if (t)
          for (i = 0; i < l.length; i++) {
            var n = l[i].getAttribute("data-name");
            if (n) {
              var o = n.trim();
              !o || -1 === o.toLowerCase().indexOf(t.toLowerCase())
                ? l[i].classList.add("is-hidden")
                : l[i].classList.remove("is-hidden");
            } else l[i].classList.add("is-hidden");
          }
        else
          for (var i = 0; i < l.length; i++) l[i].classList.remove("is-hidden");
      }),
    clickOnSelector(".js-burger-menu", function (e) {
      window.innerWidth < 480 &&
        document.documentElement.classList.toggle("burger-menu-opened");
    });
}),
  window.Element &&
    !Element.prototype.closest &&
    (Element.prototype.closest = function (e) {
      var t,
        n = (this.document || this.ownerDocument).querySelectorAll(e),
        o = this;
      do {
        for (t = n.length; 0 <= --t && n.item(t) !== o; );
      } while (t < 0 && (o = o.parentElement));
      return o;
    });
