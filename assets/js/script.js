/* 11za static site — vanilla JS interactions (no frameworks) */
(function () {
    "use strict";

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- sticky navbar state ---------- */
    var nav = document.querySelector("[data-nav]");
    function onNavScroll() {
        nav.classList.toggle("scrolled", window.scrollY > 24);
    }
    onNavScroll();
    window.addEventListener("scroll", onNavScroll, { passive: true });


    /* ---------- scroll reveal (IntersectionObserver) ---------- */
    var revealEls = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealEls.forEach(function (el) { el.classList.add("in"); });
    } else {
        var io = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("in");
                        io.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -80px" }
        );
        revealEls.forEach(function (el) {
            el.style.transitionDelay = (el.getAttribute("data-delay") || "0") + "s";
            io.observe(el);
        });
    }

    /* ---------- product showcase tabs ---------- */
    var tabs = document.querySelectorAll(".show-tab");
    var panels = document.querySelectorAll(".show-panel");
    var blurb = document.querySelector("[data-show-blurb]");

    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            var id = tab.getAttribute("data-tab");
            tabs.forEach(function (t) {
                t.classList.toggle("active", t === tab);
                t.setAttribute("aria-selected", String(t === tab));
            });
            panels.forEach(function (p) {
                p.classList.toggle("show", p.getAttribute("data-panel") === id);
            });
            if (blurb) {
                blurb.style.opacity = "0";
                window.setTimeout(function () {
                    blurb.textContent = tab.getAttribute("data-blurb");
                    blurb.style.opacity = "1";
                }, 150);
            }
        });
    });

    /* ---------- FAQ accordion ---------- */
    var faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(function (item) {
        var btn = item.querySelector(".faq-q");
        btn.addEventListener("click", function () {
            var isOpen = item.classList.contains("open");
            faqItems.forEach(function (i) {
                i.classList.remove("open");
                i.querySelector(".faq-q").setAttribute("aria-expanded", "false");
            });
            if (!isOpen) {
                item.classList.add("open");
                btn.setAttribute("aria-expanded", "true");
            }
        });
    });

    /* ---------- hero parallax + workflow line draw ---------- */
    var heroMock = document.querySelector("[data-hero-mock]");
    var wf = document.querySelector("[data-wf]");
    var wfProgress = document.querySelector("[data-wf-progress]");
    var hero = document.getElementById("hero");
    var ticking = false;

    function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
            if (heroMock && hero) {
                var heroRect = hero.getBoundingClientRect();
                if (heroRect.bottom > 0) {
                    var y = clamp(window.scrollY * 0.12, 0, 90);
                    heroMock.style.transform = "translateY(" + y + "px)";
                }
            }
            if (wf && wfProgress) {
                var r = wf.getBoundingClientRect();
                var p = clamp((window.innerHeight * 0.8 - r.top) / r.height, 0, 1);
                wfProgress.style.transform = "scaleY(" + p + ")";
            }
            ticking = false;
        });
    }

    if (!reduceMotion) {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    } else if (wfProgress) {
        wfProgress.style.transform = "scaleY(1)";
    }
})();

// contact page

 $(document).ready(function () {
    $('.marquee-track').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
    
      cssEase: 'linear',
      infinite: true,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      pauseOnFocus: false,
      variableWidth: false,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  });